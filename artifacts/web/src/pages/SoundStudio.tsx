import { useState, useRef, useEffect, useCallback } from "react";
import {
  Music,
  Play,
  Pause,
  Download,
  Search,
  Lock,
  LogOut,
  Upload,
  Trash2,
  Edit,
  Check,
  X,
  Volume2,
  SkipBack,
  SkipForward,
  Tag,
} from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  listSongs,
  verifyAdmin,
  createSong,
  updateSong,
  deleteSong,
  requestUploadUrl,
  getSongStreamUrl,
  type Song,
} from "@/lib/api";

export default function SoundStudio() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  const [uploading, setUploading] = useState(false);
  const [editingSong, setEditingSong] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editTags, setEditTags] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchSongs = useCallback(async () => {
    try {
      const data = await listSongs();
      setSongs(data);
    } catch {
      toast.error("Failed to load songs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setProgress(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      setIsPlaying(false);
      const idx = songs.findIndex((s) => s.id === currentSong?.id);
      if (idx >= 0 && idx < songs.length - 1) {
        playSong(songs[idx + 1]);
      }
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("ended", onEnded);
    };
  }, [currentSong, songs]);

  const playSong = (song: Song) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentSong?.id === song.id) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
      return;
    }

    setCurrentSong(song);
    audio.src = getSongStreamUrl(song.fileUrl);
    audio.volume = volume;
    audio.play();
    setIsPlaying(true);
  };

  const skipTo = (direction: "prev" | "next") => {
    if (!currentSong) return;
    const idx = filteredSongs.findIndex((s) => s.id === currentSong.id);
    const nextIdx = direction === "next" ? idx + 1 : idx - 1;
    if (nextIdx >= 0 && nextIdx < filteredSongs.length) {
      playSong(filteredSongs[nextIdx]);
    }
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = t;
      setProgress(t);
    }
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  const handleDownload = (song: Song) => {
    const a = document.createElement("a");
    a.href = getSongStreamUrl(song.fileUrl);
    a.download = `${song.name}.mp3`;
    a.click();
  };

  const handleAdminLogin = async () => {
    try {
      const { verified } = await verifyAdmin(passwordInput);
      if (verified) {
        setIsAdmin(true);
        setAdminPassword(passwordInput);
        setShowAdminLogin(false);
        setPasswordInput("");
        toast.success("Admin access granted");
      } else {
        toast.error("Invalid password");
      }
    } catch {
      toast.error("Failed to verify password");
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".mp3")) {
      toast.error("Only MP3 files are supported");
      return;
    }

    setUploading(true);
    try {
      const { uploadURL, objectPath } = await requestUploadUrl({
        fileName: file.name,
        contentType: "audio/mpeg",
        adminPassword,
      });

      const uploadRes = await fetch(uploadURL, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": "audio/mpeg" },
      });

      if (!uploadRes.ok) {
        throw new Error("Failed to upload file to storage");
      }

      const songName = file.name.replace(/\.mp3$/i, "").replace(/[-_]/g, " ");
      await createSong({
        name: songName,
        tags: "",
        fileUrl: objectPath,
        adminPassword,
      });

      toast.success(`"${songName}" uploaded!`);
      fetchSongs();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDeleteSong = async (song: Song) => {
    if (!confirm(`Delete "${song.name}"?`)) return;
    try {
      await deleteSong(song.id, adminPassword);
      toast.success("Song deleted");
      if (currentSong?.id === song.id) {
        audioRef.current?.pause();
        setCurrentSong(null);
        setIsPlaying(false);
      }
      fetchSongs();
    } catch {
      toast.error("Failed to delete song");
    }
  };

  const startEdit = (song: Song) => {
    setEditingSong(song.id);
    setEditName(song.name);
    setEditTags(song.tags);
  };

  const saveEdit = async () => {
    if (!editingSong) return;
    try {
      await updateSong(editingSong, {
        name: editName,
        tags: editTags,
        adminPassword,
      });
      toast.success("Song updated");
      setEditingSong(null);
      fetchSongs();
    } catch {
      toast.error("Failed to update song");
    }
  };

  const formatTime = (s: number) => {
    if (!isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const filteredSongs = songs.filter((s) => {
    const q = search.toLowerCase();
    return s.name.toLowerCase().includes(q) || (s.tags || "").toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <audio ref={audioRef} preload="none" />

      <main className="flex-1 pt-24 pb-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-[var(--font-display)] tracking-widest text-primary mb-3">
              Sound Studio // Original Music
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-gradient">Sound Studio</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Original productions from Shotgun Ninjas. Listen, download, and vibe.
            </p>
          </div>

          <div className="flex items-center gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search songs or tags..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {!isAdmin ? (
              <button
                onClick={() => setShowAdminLogin(true)}
                className="p-3 bg-card border border-border rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                title="Admin Login"
              >
                <Lock className="h-5 w-5" />
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="inline-flex items-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 text-sm font-medium"
                >
                  <Upload className="h-4 w-4" />
                  {uploading ? "Uploading..." : "Upload MP3"}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".mp3,audio/mpeg"
                  onChange={handleUpload}
                  className="hidden"
                />
                <button
                  onClick={() => {
                    setIsAdmin(false);
                    setAdminPassword("");
                    toast.info("Logged out of admin");
                  }}
                  className="p-3 bg-card border border-border rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          {showAdminLogin && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <div className="bg-card border border-border rounded-xl p-8 w-full max-w-sm mx-4">
                <h3 className="text-lg font-bold mb-4 font-[var(--font-display)]">Admin Access</h3>
                <input
                  type="password"
                  placeholder="Enter admin password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 mb-4"
                  autoFocus
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleAdminLogin}
                    className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium text-sm"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setShowAdminLogin(false);
                      setPasswordInput("");
                    }}
                    className="flex-1 px-4 py-2.5 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 font-medium text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <div className="text-center py-20">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading tracks...</p>
            </div>
          ) : filteredSongs.length === 0 ? (
            <div className="text-center py-20">
              <Music className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {songs.length === 0
                  ? "No tracks yet. Check back soon!"
                  : "No tracks match your search."}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredSongs.map((song) => {
                const isCurrent = currentSong?.id === song.id;
                const isEditing = editingSong === song.id;

                return (
                  <div
                    key={song.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                      isCurrent
                        ? "bg-primary/5 border-primary/30"
                        : "bg-card border-border hover:border-primary/20"
                    }`}
                  >
                    <button
                      onClick={() => playSong(song)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                        isCurrent && isPlaying
                          ? "bg-primary text-primary-foreground"
                          : "bg-primary/10 text-primary hover:bg-primary/20"
                      }`}
                    >
                      {isCurrent && isPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4 ml-0.5" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      {isEditing ? (
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="flex-1 px-3 py-1.5 bg-background border border-border rounded text-sm text-foreground"
                            placeholder="Song name"
                          />
                          <input
                            value={editTags}
                            onChange={(e) => setEditTags(e.target.value)}
                            className="flex-1 px-3 py-1.5 bg-background border border-border rounded text-sm text-foreground"
                            placeholder="Tags (comma-separated)"
                          />
                          <div className="flex gap-1">
                            <button
                              onClick={saveEdit}
                              className="p-1.5 text-emerald-400 hover:bg-emerald-500/10 rounded"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setEditingSong(null)}
                              className="p-1.5 text-muted-foreground hover:bg-secondary rounded"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className={`text-sm font-medium truncate ${isCurrent ? "text-primary" : "text-foreground"}`}>
                            {song.name}
                          </p>
                          {song.tags && (
                            <div className="flex items-center gap-1 mt-0.5">
                              <Tag className="h-3 w-3 text-muted-foreground" />
                              <p className="text-xs text-muted-foreground truncate">
                                {song.tags}
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => handleDownload(song)}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        title="Download"
                      >
                        <Download className="h-4 w-4" />
                      </button>

                      {isAdmin && !isEditing && (
                        <>
                          <button
                            onClick={() => startEdit(song)}
                            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSong(song)}
                            className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {currentSong && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border">
          <div className="max-w-5xl mx-auto px-4 py-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => skipTo("prev")}
                  className="p-1.5 text-muted-foreground hover:text-foreground"
                >
                  <SkipBack className="h-4 w-4" />
                </button>
                <button
                  onClick={() => playSong(currentSong)}
                  className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                </button>
                <button
                  onClick={() => skipTo("next")}
                  className="p-1.5 text-muted-foreground hover:text-foreground"
                >
                  <SkipForward className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate mb-1">{currentSong.name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground w-8 text-right">
                    {formatTime(progress)}
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={duration || 0}
                    step={0.1}
                    value={progress}
                    onChange={seek}
                    className="flex-1 h-1 accent-primary cursor-pointer"
                  />
                  <span className="text-[10px] text-muted-foreground w-8">
                    {formatTime(duration)}
                  </span>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
                <Volume2 className="h-4 w-4 text-muted-foreground" />
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={changeVolume}
                  className="w-20 h-1 accent-primary cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
