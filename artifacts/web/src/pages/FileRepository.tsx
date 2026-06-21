import { useState, useRef, useCallback, useEffect } from "react";
import {
  Lock,
  LogOut,
  Upload,
  Download,
  Trash2,
  FileBox,
  ArrowLeft,
  HardDrive,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  verifyAdmin,
  listRepositoryFiles,
  requestRepositoryUploadUrl,
  saveRepositoryFile,
  deleteRepositoryFile,
  uploadFileToStorage,
  getRepositoryDownloadUrl,
  type RepositoryFile,
} from "@/lib/api";

const MAX_FILE_SIZE = 5 * 1024 * 1024 * 1024; // 5GB

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / Math.pow(1024, i);
  return `${value.toFixed(value >= 100 || i === 0 ? 0 : 1)} ${units[i]}`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function FileRepository() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [verifying, setVerifying] = useState(false);

  const [files, setFiles] = useState<RepositoryFile[]>([]);
  const [loading, setLoading] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingName, setUploadingName] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchFiles = useCallback(async (password: string) => {
    setLoading(true);
    try {
      const data = await listRepositoryFiles(password);
      setFiles(data);
    } catch {
      toast.error("Failed to load files");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = async () => {
    if (!passwordInput.trim()) return;
    setVerifying(true);
    try {
      const { verified } = await verifyAdmin(passwordInput);
      if (verified) {
        setIsAdmin(true);
        setAdminPassword(passwordInput);
        setPasswordInput("");
        toast.success("Access granted");
        fetchFiles(passwordInput);
      } else {
        toast.error("Invalid password");
      }
    } catch {
      toast.error("Failed to verify password");
    } finally {
      setVerifying(false);
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setAdminPassword("");
    setFiles([]);
  };

  const handleUpload = useCallback(
    async (file: File) => {
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File exceeds the 5GB limit");
        return;
      }
      setUploading(true);
      setUploadProgress(0);
      setUploadingName(file.name);
      try {
        const contentType = file.type || "application/octet-stream";
        const { uploadURL, objectPath } = await requestRepositoryUploadUrl({
          name: file.name,
          size: file.size,
          contentType,
          adminPassword,
        });

        await uploadFileToStorage(uploadURL, file, setUploadProgress);

        await saveRepositoryFile({
          name: file.name,
          size: file.size,
          contentType,
          fileUrl: objectPath,
          adminPassword,
        });

        toast.success(`"${file.name}" uploaded`);
        fetchFiles(adminPassword);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Upload failed");
      } finally {
        setUploading(false);
        setUploadProgress(0);
        setUploadingName("");
      }
    },
    [adminPassword, fetchFiles]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (uploading) return;
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDownload = (file: RepositoryFile) => {
    const a = document.createElement("a");
    a.href = getRepositoryDownloadUrl(file.id, adminPassword);
    a.download = file.name;
    a.click();
  };

  const handleDelete = async (file: RepositoryFile) => {
    if (!confirm(`Delete "${file.name}"? This cannot be undone.`)) return;
    try {
      await deleteRepositoryFile(file.id, adminPassword);
      toast.success("File deleted");
      setFiles((prev) => prev.filter((f) => f.id !== file.id));
    } catch {
      toast.error("Failed to delete file");
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !isAdmin && passwordInput.trim() && !verifying) {
        handleLogin();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, passwordInput, verifying]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              to="/soundstudio"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Sound Studio
            </Link>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/3 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <HardDrive className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold font-[var(--font-display)] tracking-tight">
                  File Repository
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Private vault — upload, store and retrieve files up to 5GB.
                </p>
              </div>
            </div>
          </div>

          {!isAdmin ? (
            <div className="max-w-md mx-auto mt-12">
              <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-8">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.06)_0%,transparent_60%)]" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5">
                    <Lock className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-center font-[var(--font-display)] mb-2">
                    Restricted Access
                  </h2>
                  <p className="text-sm text-muted-foreground text-center mb-6">
                    Enter the admin password to access the repository.
                  </p>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Admin password"
                    autoFocus
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all mb-4"
                  />
                  <button
                    onClick={handleLogin}
                    disabled={verifying || !passwordInput.trim()}
                    className="w-full px-5 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all disabled:opacity-50"
                  >
                    {verifying ? "Verifying..." : "Unlock"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                  {files.length} {files.length === 1 ? "file" : "files"} stored
                </p>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-400 hover:text-foreground hover:border-primary/20 transition-all"
                >
                  <LogOut className="h-4 w-4" />
                  Lock
                </button>
              </div>

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  if (!uploading) setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                className={`relative rounded-2xl border-2 border-dashed transition-all mb-8 ${
                  dragActive
                    ? "border-primary bg-primary/5"
                    : "border-border/60 bg-card/50 hover:border-primary/30"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileSelect}
                  className="hidden"
                  disabled={uploading}
                />

                {uploading ? (
                  <div className="px-8 py-12 text-center">
                    <Upload className="h-8 w-8 text-primary mx-auto mb-4 animate-pulse" />
                    <p className="text-sm font-medium text-foreground mb-1 truncate max-w-md mx-auto">
                      Uploading {uploadingName}
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      {uploadProgress}%
                    </p>
                    <div className="max-w-md mx-auto h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-200"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full px-8 py-12 text-center cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                      <Upload className="h-7 w-7 text-primary" />
                    </div>
                    <p className="text-base font-semibold text-foreground mb-1">
                      Drop a file or click to upload
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Any file type, up to 5GB
                    </p>
                  </button>
                )}
              </div>

              {loading ? (
                <div className="text-center py-16 text-muted-foreground text-sm">
                  Loading files...
                </div>
              ) : files.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-14 h-14 rounded-2xl bg-card border border-border flex items-center justify-center mx-auto mb-5">
                    <FileBox className="h-6 w-6 text-muted-foreground/40" />
                  </div>
                  <p className="text-foreground font-semibold mb-2">No files yet.</p>
                  <p className="text-sm text-muted-foreground/60">
                    Upload your first file to get started.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="group flex items-center gap-4 p-4 rounded-xl border border-border/60 bg-card/80 hover:border-primary/15 hover:bg-card transition-all"
                    >
                      <div className="w-11 h-11 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center flex-shrink-0">
                        <FileBox className="h-5 w-5 text-primary/70" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {formatBytes(file.size)} · {file.contentType || "unknown"} ·{" "}
                          {formatDate(file.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          onClick={() => handleDownload(file)}
                          title="Download"
                          aria-label={`Download ${file.name}`}
                          className="p-2.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 transition-all"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(file)}
                          title="Delete"
                          aria-label={`Delete ${file.name}`}
                          className="p-2.5 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 transition-all"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default FileRepository;
