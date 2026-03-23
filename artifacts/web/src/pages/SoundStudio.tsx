import { useState, useRef, useEffect, useCallback } from "react";
import {
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
  VolumeX,
  SkipBack,
  SkipForward,
  Disc3,
  Headphones,
  Radio,
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

const genreFilters = ["All", "Rap", "Rock", "Instrumental", "Cinematic", "Aggressive", "Experimental"];

function StudioHero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-20">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-background to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.15)_0%,transparent_70%)]" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[100px] animate-pulse" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-primary/3 blur-[80px] animate-pulse [animation-delay:1s]" />

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute bottom-8 bg-primary/20 rounded-full"
            style={{
              left: `${2.5 * i}%`,
              width: "2px",
              height: `${12 + Math.sin(i * 0.5) * 20 + Math.random() * 15}px`,
              opacity: 0.3 + Math.sin(i * 0.3) * 0.2,
              animation: `pulse ${2 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-8">
          <Radio className="h-3 w-3 text-primary animate-pulse" />
          <span className="text-xs font-[var(--font-display)] tracking-widest text-primary/80">
            SOUND STUDIO
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 font-[var(--font-display)]">
          <span className="text-gradient">Sound</span>{" "}
          <span className="text-foreground">Studio</span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-3 leading-relaxed">
          Original productions from Shotgun Ninjas.
        </p>
        <p className="text-sm text-primary/70 font-[var(--font-display)] tracking-wider">
          Music forged in the dark. Built for impact.
        </p>
      </div>
    </section>
  );
}

function FeaturedTrack({ song, isCurrent, isPlaying, onPlay }: {
  song: Song;
  isCurrent: boolean;
  isPlaying: boolean;
  onPlay: (song: Song) => void;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 mb-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(220,38,38,0.1)_0%,transparent_60%)]" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />

      <div className="relative z-10 p-6 sm:p-8">
        <div className="flex items-start gap-2 mb-4">
          <span className="text-[10px] font-[var(--font-display)] tracking-widest text-primary/60 uppercase">
            Latest Drop
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <button
            onClick={() => onPlay(song)}
            aria-label={isCurrent && isPlaying ? "Pause featured track" : "Play featured track"}
            className="relative group w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center flex-shrink-0 hover:border-primary/40 transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-2xl bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            {isCurrent && isPlaying ? (
              <div className="flex items-end gap-1 h-8">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-primary rounded-full"
                    style={{
                      height: `${12 + Math.random() * 20}px`,
                      animation: `pulse ${0.5 + i * 0.15}s ease-in-out infinite alternate`,
                    }}
                  />
                ))}
              </div>
            ) : (
              <Play className="h-10 w-10 text-primary ml-1 group-hover:scale-110 transition-transform" />
            )}
          </button>

          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold font-[var(--font-display)] mb-1">
              {song.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">Shotgun Ninjas</p>
            {song.tags && (
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {song.tags.split(",").map((tag) => (
                  <span
                    key={tag.trim()}
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-medium tracking-wider bg-primary/10 text-primary/80 border border-primary/10"
                  >
                    {tag.trim().toUpperCase()}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyVault() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card py-20 px-8">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.05)_0%,transparent_60%)]" />

      <div className="relative z-10 text-center max-w-md mx-auto">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping [animation-duration:3s]" />
          <div className="relative w-20 h-20 rounded-full bg-primary/5 border border-primary/20 flex items-center justify-center">
            <Headphones className="h-8 w-8 text-primary/60" />
          </div>
        </div>

        <h3 className="text-xl font-bold font-[var(--font-display)] mb-3">
          Silence before impact.
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          The vault is loading. New heat coming soon.
        </p>
        <div className="flex justify-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-1 bg-primary/30 rounded-full"
              style={{
                height: `${8 + Math.sin(i) * 8}px`,
                animation: `pulse ${1.5 + i * 0.2}s ease-in-out infinite alternate`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function NoSearchResults() {
  return (
    <div className="text-center py-16">
      <Search className="h-10 w-10 text-muted-foreground/50 mx-auto mb-4" />
      <p className="text-muted-foreground font-medium">No tracks match your search.</p>
      <p className="text-sm text-muted-foreground/60 mt-1">Try a different keyword or clear the filter.</p>
    </div>
  );
}

function TrackCard({
  song,
  isCurrent,
  isPlaying,
  isAdmin,
  isEditing,
  editName,
  editTags,
  onPlay,
  onDownload,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  onEditNameChange,
  onEditTagsChange,
}: {
  song: Song;
  isCurrent: boolean;
  isPlaying: boolean;
  isAdmin: boolean;
  isEditing: boolean;
  editName: string;
  editTags: string;
  onPlay: (song: Song) => void;
  onDownload: (song: Song) => void;
  onStartEdit: (song: Song) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onDelete: (song: Song) => void;
  onEditNameChange: (val: string) => void;
  onEditTagsChange: (val: string) => void;
}) {
  return (
    <div
      className={`group relative flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 ${
        isCurrent
          ? "bg-primary/5 border-primary/30 shadow-md shadow-primary/10"
          : "bg-card border-border hover:border-primary/20"
      }`}
    >
      <button
        onClick={() => onPlay(song)}
        aria-label={isCurrent && isPlaying ? `Pause ${song.name}` : `Play ${song.name}`}
        className={`relative w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
          isCurrent && isPlaying
            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
            : "bg-primary/10 text-primary hover:bg-primary/20 hover:shadow-md hover:shadow-primary/20"
        }`}
      >
        {isCurrent && isPlaying ? (
          <Pause className="h-5 w-5" />
        ) : (
          <Play className="h-5 w-5 ml-0.5" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              value={editName}
              onChange={(e) => onEditNameChange(e.target.value)}
              className="flex-1 px-3 py-1.5 bg-background border border-border rounded-lg text-sm text-foreground focus:ring-2 focus:ring-primary/50 focus:outline-none"
              placeholder="Song name"
            />
            <input
              value={editTags}
              onChange={(e) => onEditTagsChange(e.target.value)}
              className="flex-1 px-3 py-1.5 bg-background border border-border rounded-lg text-sm text-foreground focus:ring-2 focus:ring-primary/50 focus:outline-none"
              placeholder="Tags (comma-separated)"
            />
            <div className="flex gap-1">
              <button
                onClick={onSaveEdit}
                className="p-1.5 text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors"
              >
                <Check className="h-4 w-4" />
              </button>
              <button
                onClick={onCancelEdit}
                className="p-1.5 text-muted-foreground hover:bg-secondary rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className={`text-sm font-semibold truncate ${isCurrent ? "text-primary" : "text-foreground"}`}>
              {song.name}
            </p>
            {song.tags && (
              <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                {song.tags.split(",").slice(0, 4).map((tag) => (
                  <span
                    key={tag.trim()}
                    className="px-2 py-0.5 rounded-full text-[9px] font-medium tracking-wider bg-primary/5 text-primary/60 border border-primary/10"
                  >
                    {tag.trim().toUpperCase()}
                  </span>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <div className="flex items-center gap-0.5 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onDownload(song)}
          className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
          title="Download"
        >
          <Download className="h-4 w-4" />
        </button>

        {isAdmin && !isEditing && (
          <>
            <button
              onClick={() => onStartEdit(song)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50"
              title="Edit"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(song)}
              className="p-2 text-muted-foreground hover:text-destructive transition-colors rounded-lg hover:bg-destructive/5"
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function NowPlayingBar({
  currentSong,
  isPlaying,
  progress,
  duration,
  volume,
  onPlayPause,
  onSkip,
  onSeek,
  onVolumeChange,
  formatTime,
}: {
  currentSong: Song;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  onPlayPause: () => void;
  onSkip: (dir: "prev" | "next") => void;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formatTime: (s: number) => string;
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-xl border-t border-primary/10">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={() => onSkip("prev")}
              aria-label="Previous track"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <SkipBack className="h-4 w-4" />
            </button>
            <button
              onClick={onPlayPause}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
            </button>
            <button
              onClick={() => onSkip("next")}
              aria-label="Next track"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <SkipForward className="h-4 w-4" />
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-3 flex-shrink-0 min-w-0 max-w-[180px]">
            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <Disc3 className={`h-4 w-4 text-primary ${isPlaying ? "animate-spin [animation-duration:3s]" : ""}`} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">{currentSong.name}</p>
              <p className="text-[10px] text-muted-foreground">Shotgun Ninjas</p>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground w-8 text-right tabular-nums">
                {formatTime(progress)}
              </span>
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={progress}
                onChange={onSeek}
                aria-label="Seek position"
                className="flex-1 h-1 accent-primary cursor-pointer"
              />
              <span className="text-[10px] text-muted-foreground w-8 tabular-nums">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            {volume === 0 ? (
              <VolumeX className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Volume2 className="h-4 w-4 text-muted-foreground" />
            )}
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={onVolumeChange}
              aria-label="Volume"
              className="w-20 h-1 accent-primary cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SoundStudio() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
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
    const matchesSearch = s.name.toLowerCase().includes(q) || (s.tags || "").toLowerCase().includes(q);
    const matchesFilter = activeFilter === "All" || (s.tags || "").toLowerCase().includes(activeFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  const latestSong = songs.length > 0 ? songs[0] : null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <audio ref={audioRef} preload="none" />

      <StudioHero />

      <main className="flex-1 pb-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {!loading && latestSong && (
            <FeaturedTrack
              song={latestSong}
              isCurrent={currentSong?.id === latestSong.id}
              isPlaying={isPlaying}
              onPlay={playSong}
            />
          )}

          <div className="mb-8">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                <input
                  type="search"
                  placeholder="Search tracks, tags, genres..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all"
                />
              </div>

              {!isAdmin ? (
                <button
                  onClick={() => setShowAdminLogin(true)}
                  className="p-3.5 bg-card border border-border rounded-xl text-muted-foreground/60 hover:text-foreground hover:border-primary/20 transition-all"
                  title="Admin Login"
                >
                  <Lock className="h-5 w-5" />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="inline-flex items-center gap-2 px-5 py-3.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 text-sm font-medium shadow-lg shadow-primary/20"
                  >
                    <Upload className="h-4 w-4" />
                    {uploading ? "Uploading..." : "Upload"}
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
                    className="p-3.5 bg-card border border-border rounded-xl text-muted-foreground hover:text-foreground hover:border-primary/20 transition-all"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {genreFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wider whitespace-nowrap transition-all ${
                    activeFilter === filter
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/20"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {showAdminLogin && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Admin login">
              <div className="bg-card border border-border rounded-2xl p-8 w-full max-w-sm mx-4 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Lock className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold font-[var(--font-display)]">Admin Access</h3>
                </div>
                <input
                  type="password"
                  placeholder="Enter admin password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
                  className="w-full px-4 py-3.5 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 mb-4"
                  autoFocus
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleAdminLogin}
                    className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 font-medium text-sm shadow-lg shadow-primary/20 transition-all"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setShowAdminLogin(false);
                      setPasswordInput("");
                    }}
                    className="flex-1 px-4 py-3 bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/80 font-medium text-sm transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <div className="text-center py-20">
              <div className="relative w-12 h-12 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
                <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              </div>
              <p className="text-muted-foreground text-sm">Loading tracks...</p>
            </div>
          ) : songs.length === 0 ? (
            <EmptyVault />
          ) : filteredSongs.length === 0 ? (
            <NoSearchResults />
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-[var(--font-display)] tracking-widest text-muted-foreground">
                  ALL TRACKS
                </h2>
                <span className="text-xs text-muted-foreground/60 tabular-nums">
                  {filteredSongs.length} {filteredSongs.length === 1 ? "track" : "tracks"}
                </span>
              </div>
              <div className="space-y-2">
                {filteredSongs.map((song) => (
                  <TrackCard
                    key={song.id}
                    song={song}
                    isCurrent={currentSong?.id === song.id}
                    isPlaying={isPlaying}
                    isAdmin={isAdmin}
                    isEditing={editingSong === song.id}
                    editName={editName}
                    editTags={editTags}
                    onPlay={playSong}
                    onDownload={handleDownload}
                    onStartEdit={startEdit}
                    onSaveEdit={saveEdit}
                    onCancelEdit={() => setEditingSong(null)}
                    onDelete={handleDeleteSong}
                    onEditNameChange={setEditName}
                    onEditTagsChange={setEditTags}
                  />
                ))}
              </div>
            </div>
          )}

          {!loading && songs.length > 0 && (
            <div className="mt-16 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border bg-card/50">
                <Headphones className="h-4 w-4 text-primary/60" />
                <span className="text-xs text-muted-foreground font-[var(--font-display)] tracking-wider">
                  BUILT FOR HEADPHONES AND HEAVY ROTATION
                </span>
                <Headphones className="h-4 w-4 text-primary/60" />
              </div>
            </div>
          )}
        </div>
      </main>

      {currentSong && (
        <NowPlayingBar
          currentSong={currentSong}
          isPlaying={isPlaying}
          progress={progress}
          duration={duration}
          volume={volume}
          onPlayPause={() => playSong(currentSong)}
          onSkip={skipTo}
          onSeek={seek}
          onVolumeChange={changeVolume}
          formatTime={formatTime}
        />
      )}

      <Footer />
    </div>
  );
}
