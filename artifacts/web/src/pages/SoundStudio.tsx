import { useState, useRef, useEffect, useCallback, useMemo } from "react";
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
import studioHeroBg from "@assets/ChatGPT_Image_Mar_23,_2026,_03_33_48_PM_1774294437568.png";

const genreFilters = ["All", "Rap", "Rock", "Instrumental", "Cinematic", "Aggressive", "Experimental"];

function StudioHero({
  search,
  onSearchChange,
  activeFilter,
  onFilterChange,
  isAdmin,
  uploading,
  onAdminClick,
  onUploadClick,
  onLogout,
  latestSong,
  currentSong,
  isPlaying,
  onPlay,
}: {
  search: string;
  onSearchChange: (v: string) => void;
  activeFilter: string;
  onFilterChange: (v: string) => void;
  isAdmin: boolean;
  uploading: boolean;
  onAdminClick: () => void;
  onUploadClick: () => void;
  onLogout: () => void;
  latestSong: Song | null;
  currentSong: Song | null;
  isPlaying: boolean;
  onPlay: (song: Song) => void;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={studioHeroBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-[25%_center] sm:object-[left_center]"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/60 to-black/85" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(0,0,0,0.5)_0%,transparent_70%)]" />

      <div className="relative z-10 min-h-[520px] sm:min-h-[580px] lg:min-h-[620px] flex flex-col">
        <div className="flex-1 flex items-center pt-24 pb-8 sm:pt-28 sm:pb-12">
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-end">
              <div className="lg:w-1/2 xl:w-5/12 text-center lg:text-left">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-primary/25 bg-black/40 backdrop-blur-sm mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </span>
                  <span className="text-[10px] font-[var(--font-display)] tracking-[0.3em] text-primary/90 uppercase">
                    Original Music // Shotgun Ninjas
                  </span>
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 font-[var(--font-display)] leading-[0.9]">
                  <span className="text-gradient drop-shadow-[0_0_60px_rgba(220,38,38,0.4)]">Sound</span>
                  <br />
                  <span className="text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">Studio</span>
                </h1>

                <p className="text-base sm:text-lg text-gray-300 max-w-md mx-auto lg:mx-0 mb-6 leading-relaxed">
                  Original sound from the shadows.{" "}
                  <br className="hidden sm:block" />
                  Built to hit hard.
                </p>

                {latestSong && (
                  <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                    <button
                      onClick={() => onPlay(latestSong)}
                      className="inline-flex items-center gap-2.5 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:bg-primary/90 transition-all duration-200"
                    >
                      {currentSong?.id === latestSong.id && isPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                      Play Latest
                    </button>
                    <a
                      href="#tracks"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-gray-200 rounded-xl font-semibold text-sm backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                    >
                      Browse Tracks
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
          <div className="bg-black/50 backdrop-blur-xl border border-white/8 rounded-2xl p-4 sm:p-5 shadow-2xl shadow-black/50">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="search"
                  placeholder="Search tracks, tags, genres..."
                  value={search}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/8 rounded-xl text-foreground placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 focus:bg-white/8 transition-all"
                />
              </div>

              {!isAdmin ? (
                <button
                  onClick={onAdminClick}
                  className="p-3.5 bg-white/5 border border-white/8 rounded-xl text-gray-500 hover:text-foreground hover:border-primary/20 hover:bg-white/8 transition-all"
                  title="Admin Login"
                  aria-label="Admin login"
                >
                  <Lock className="h-5 w-5" />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={onUploadClick}
                    disabled={uploading}
                    className="inline-flex items-center gap-2 px-5 py-3.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 text-sm font-semibold shadow-lg shadow-primary/20"
                  >
                    <Upload className="h-4 w-4" />
                    {uploading ? "Uploading..." : "Upload"}
                  </button>
                  <button
                    onClick={onLogout}
                    className="p-3.5 bg-white/5 border border-white/8 rounded-xl text-gray-400 hover:text-foreground hover:border-primary/20 transition-all"
                    title="Logout"
                    aria-label="Admin logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
              {genreFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => onFilterChange(filter)}
                  className={`px-4 py-2 rounded-full text-[11px] font-semibold tracking-[0.1em] whitespace-nowrap transition-all duration-200 uppercase ${
                    activeFilter === filter
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "bg-white/5 border border-white/8 text-gray-400 hover:text-foreground hover:border-primary/15 hover:bg-white/8"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedTrack({
  song,
  isCurrent,
  isPlaying,
  onPlay,
}: {
  song: Song;
  isCurrent: boolean;
  isPlaying: boolean;
  onPlay: (song: Song) => void;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/15 bg-gradient-to-br from-card via-card/95 to-primary/3 mb-12">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(220,38,38,0.08)_0%,transparent_50%)]" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/4 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/3 rounded-full blur-[60px]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="relative z-10 p-8 sm:p-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
          <span className="text-[10px] font-[var(--font-display)] tracking-[0.3em] text-primary/50 uppercase">
            Latest Drop
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-primary/20 to-transparent" />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-8">
          <button
            onClick={() => onPlay(song)}
            aria-label={isCurrent && isPlaying ? "Pause featured track" : "Play featured track"}
            className="relative group w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-primary/15 via-primary/5 to-transparent border border-primary/15 flex items-center justify-center flex-shrink-0 hover:border-primary/30 transition-all duration-500"
          >
            <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {isCurrent && isPlaying ? (
              <div className="flex items-end gap-1.5 h-10">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(220,38,38,0.5)]"
                    style={{
                      animation: `pulse ${0.4 + i * 0.12}s ease-in-out infinite alternate`,
                    }}
                  />
                ))}
              </div>
            ) : (
              <Play className="h-12 w-12 text-primary/80 ml-1.5 group-hover:text-primary group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(220,38,38,0.4)] transition-all duration-300" />
            )}
          </button>

          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold font-[var(--font-display)] mb-2 tracking-tight">
              {song.name}
            </h3>
            <p className="text-xs text-muted-foreground mb-4 font-[var(--font-display)] tracking-wider uppercase">
              Shotgun Ninjas Productions
            </p>
            {song.tags && (
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {song.tags.split(",").map((tag) => (
                  <span
                    key={tag.trim()}
                    className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.15em] bg-primary/10 text-primary/80 border border-primary/15 uppercase"
                  >
                    {tag.trim()}
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
  const vaultBars = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        h: 4 + Math.sin(i * 0.6) * 10 + Math.sin(i * 1.1) * 6,
        delay: (i * 0.08).toFixed(2),
        dur: (2 + Math.sin(i * 0.4) * 1).toFixed(2),
      })),
    [],
  );

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-b from-card via-card to-card/80 py-24 sm:py-28 px-8">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.06)_0%,transparent_55%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[120px]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />

      <div className="relative z-10 text-center max-w-lg mx-auto">
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-[-8px] rounded-full border border-primary/10 animate-ping [animation-duration:4s]" />
          <div className="absolute inset-[-4px] rounded-full border border-primary/5" />
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary/10 to-primary/3 border border-primary/15 flex items-center justify-center shadow-[0_0_40px_rgba(220,38,38,0.1)]">
            <Headphones className="h-10 w-10 text-primary/50" />
          </div>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold font-[var(--font-display)] mb-4 tracking-tight">
          Silence before impact.
        </h3>
        <p className="text-muted-foreground/60 text-sm sm:text-base leading-relaxed mb-8 max-w-sm mx-auto">
          The vault is quiet for now. New productions are being forged in the dark. Check back soon.
        </p>

        <div className="flex justify-center items-end gap-1 h-8 mb-8">
          {vaultBars.map((bar, i) => (
            <div
              key={i}
              className="bg-primary/15 rounded-t-sm"
              style={{
                width: "2px",
                height: `${bar.h}px`,
                animation: `pulse ${bar.dur}s ease-in-out infinite alternate`,
                animationDelay: `${bar.delay}s`,
              }}
            />
          ))}
        </div>

        <p className="text-[10px] font-[var(--font-display)] tracking-[0.3em] text-primary/30 uppercase">
          First drop incoming
        </p>
      </div>
    </div>
  );
}

function NoSearchResults() {
  return (
    <div className="text-center py-20">
      <div className="w-14 h-14 rounded-2xl bg-card border border-border flex items-center justify-center mx-auto mb-5">
        <Search className="h-6 w-6 text-muted-foreground/40" />
      </div>
      <p className="text-foreground font-semibold mb-2">No tracks found.</p>
      <p className="text-sm text-muted-foreground/50">Try a different keyword or clear the filter.</p>
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
      className={`group relative flex items-center gap-4 p-4 sm:p-5 rounded-xl border transition-all duration-300 ${
        isCurrent
          ? "bg-primary/5 border-primary/25 shadow-lg shadow-primary/8"
          : "bg-card/80 border-border/60 hover:border-primary/15 hover:bg-card hover:shadow-md hover:shadow-primary/5"
      }`}
    >
      {isCurrent && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/3 via-transparent to-transparent pointer-events-none" />
      )}

      <button
        onClick={() => onPlay(song)}
        aria-label={isCurrent && isPlaying ? `Pause ${song.name}` : `Play ${song.name}`}
        className={`relative w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
          isCurrent && isPlaying
            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
            : "bg-primary/8 text-primary/70 hover:bg-primary/15 hover:text-primary hover:shadow-md hover:shadow-primary/15"
        }`}
      >
        {isCurrent && isPlaying ? (
          <Pause className="h-5 w-5" />
        ) : (
          <Play className="h-5 w-5 ml-0.5" />
        )}
      </button>

      <div className="flex-1 min-w-0 relative z-10">
        {isEditing ? (
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              value={editName}
              onChange={(e) => onEditNameChange(e.target.value)}
              className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:ring-2 focus:ring-primary/50 focus:outline-none"
              placeholder="Song name"
            />
            <input
              value={editTags}
              onChange={(e) => onEditTagsChange(e.target.value)}
              className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:ring-2 focus:ring-primary/50 focus:outline-none"
              placeholder="Tags (comma-separated)"
            />
            <div className="flex gap-1">
              <button
                onClick={onSaveEdit}
                className="p-2 text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors"
              >
                <Check className="h-4 w-4" />
              </button>
              <button
                onClick={onCancelEdit}
                className="p-2 text-muted-foreground hover:bg-secondary rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className={`font-semibold truncate ${isCurrent ? "text-primary" : "text-foreground"}`}>
              {song.name}
            </p>
            {song.tags && (
              <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                {song.tags
                  .split(",")
                  .slice(0, 4)
                  .map((tag) => (
                    <span
                      key={tag.trim()}
                      className="px-2 py-0.5 rounded-full text-[9px] font-semibold tracking-[0.12em] bg-primary/8 text-primary/60 border border-primary/10 uppercase"
                    >
                      {tag.trim()}
                    </span>
                  ))}
              </div>
            )}
          </>
        )}
      </div>

      <div className="flex items-center gap-0.5 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => onDownload(song)}
          className="p-2.5 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
          title="Download"
          aria-label={`Download ${song.name}`}
        >
          <Download className="h-4 w-4" />
        </button>

        {isAdmin && !isEditing && (
          <>
            <button
              onClick={() => onStartEdit(song)}
              className="p-2.5 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50"
              title="Edit"
              aria-label={`Edit ${song.name}`}
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(song)}
              className="p-2.5 text-muted-foreground hover:text-destructive transition-colors rounded-lg hover:bg-destructive/5"
              title="Delete"
              aria-label={`Delete ${song.name}`}
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
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-t border-primary/10">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-primary/2 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-3.5">
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
              className="w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 transition-all duration-200"
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

          <div className="hidden sm:flex items-center gap-3 flex-shrink-0 min-w-0 max-w-[200px]">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/15 flex items-center justify-center flex-shrink-0">
              <Disc3
                className={`h-5 w-5 text-primary/70 ${isPlaying ? "animate-spin [animation-duration:3s]" : ""}`}
              />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">{currentSong.name}</p>
              <p className="text-[10px] text-muted-foreground/70 font-[var(--font-display)] tracking-wider uppercase">
                Shotgun Ninjas
              </p>
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

  useEffect(() => {
    if (!showAdminLogin) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowAdminLogin(false);
        setPasswordInput("");
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showAdminLogin]);

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
    const matchesSearch =
      s.name.toLowerCase().includes(q) || (s.tags || "").toLowerCase().includes(q);
    const matchesFilter =
      activeFilter === "All" || (s.tags || "").toLowerCase().includes(activeFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  const latestSong = songs.length > 0 ? songs[0] : null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <audio ref={audioRef} preload="none" />

      <StudioHero
        search={search}
        onSearchChange={setSearch}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        isAdmin={isAdmin}
        uploading={uploading}
        onAdminClick={() => setShowAdminLogin(true)}
        onUploadClick={() => fileInputRef.current?.click()}
        onLogout={() => {
          setIsAdmin(false);
          setAdminPassword("");
          toast.info("Logged out of admin");
        }}
        latestSong={latestSong}
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlay={playSong}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept=".mp3,audio/mpeg"
        onChange={handleUpload}
        className="hidden"
      />

      <main id="tracks" className="flex-1 pb-32 pt-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {!loading && latestSong && (
            <FeaturedTrack
              song={latestSong}
              isCurrent={currentSong?.id === latestSong.id}
              isPlaying={isPlaying}
              onPlay={playSong}
            />
          )}

          {showAdminLogin && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
              role="dialog"
              aria-modal="true"
              aria-label="Admin login"
            >
              <div className="bg-card border border-border/60 rounded-2xl p-8 sm:p-10 w-full max-w-sm mx-4 shadow-2xl shadow-primary/5">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/15 flex items-center justify-center">
                    <Lock className="h-5 w-5 text-primary/70" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-[var(--font-display)]">Admin Access</h3>
                    <p className="text-[10px] text-muted-foreground/50 tracking-wider uppercase">
                      Sound Studio
                    </p>
                  </div>
                </div>
                <input
                  type="password"
                  placeholder="Enter admin password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
                  className="w-full px-4 py-4 bg-background border border-border/60 rounded-xl text-foreground placeholder-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/20 mb-5"
                  autoFocus
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleAdminLogin}
                    className="flex-1 px-4 py-3.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 font-semibold text-sm shadow-lg shadow-primary/20 transition-all"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setShowAdminLogin(false);
                      setPasswordInput("");
                    }}
                    className="flex-1 px-4 py-3.5 bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/80 font-semibold text-sm transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <div className="text-center py-24">
              <div className="relative w-14 h-14 mx-auto mb-5">
                <div className="absolute inset-0 rounded-full border-2 border-primary/10" />
                <div className="absolute inset-0 rounded-full border-2 border-primary/60 border-t-transparent animate-spin" />
              </div>
              <p className="text-muted-foreground text-sm font-[var(--font-display)] tracking-wider uppercase">
                Loading tracks
              </p>
            </div>
          ) : songs.length === 0 ? (
            <EmptyVault />
          ) : filteredSongs.length === 0 ? (
            <NoSearchResults />
          ) : (
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 bg-gradient-to-r from-primary/30 to-transparent" />
                  <h2 className="text-xs font-[var(--font-display)] tracking-[0.25em] text-muted-foreground/70 uppercase">
                    All Tracks
                  </h2>
                </div>
                <span className="text-[10px] text-muted-foreground/60 tabular-nums font-[var(--font-display)] tracking-wider">
                  {filteredSongs.length} {filteredSongs.length === 1 ? "TRACK" : "TRACKS"}
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

          <div className="mt-20 text-center">
            <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-8" />
            <p className="text-[10px] font-[var(--font-display)] tracking-[0.35em] text-muted-foreground/50 uppercase mb-2">
              Built for headphones & heavy rotation
            </p>
            <p className="text-[10px] font-[var(--font-display)] tracking-[0.2em] text-primary/40 uppercase">
              Shotgun Ninjas Productions
            </p>
          </div>
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
