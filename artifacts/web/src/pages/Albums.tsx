import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Disc3,
  Download,
  Pause,
  Play,
  SkipBack,
  SkipForward,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import album from "@/lib/operatoros-album.json";

const asset = (name: string) =>
  `${import.meta.env.BASE_URL}albums/operatoros/${name}`;
const albumPath = "/soundstudio/albums/operatoros";
const totalMinutes = Math.round(
  album.tracks.reduce((sum, track) => sum + track.duration_seconds, 0) / 60,
);
const time = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
const button =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

function useAlbumMetadata(detail: boolean) {
  useEffect(() => {
    const previousTitle = document.title;
    const title = detail
      ? `${album.title} by ${album.artist} | Sound Studio`
      : "Albums | Sound Studio";
    const description = detail
      ? album.description
      : "Explore complete albums from Shotgun Ninjas Productions.";
    document.title = title;
    const changes: Array<() => void> = [];
    const set = (selector: string, attribute: string, value: string) => {
      const el = document.querySelector(selector);
      if (!el) return;
      const before = el.getAttribute(attribute);
      el.setAttribute(attribute, value);
      changes.push(() =>
        before === null
          ? el.removeAttribute(attribute)
          : el.setAttribute(attribute, before),
      );
    };
    const url = `https://shotgunninjas.com/soundstudio/albums${detail ? "/operatoros" : ""}`;
    set('link[rel="canonical"]', "href", url);
    set('meta[name="description"]', "content", description);
    for (const kind of ["og", "twitter"]) {
      const key = kind === "og" ? "property" : "name";
      set(`meta[${key}="${kind}:title"]`, "content", title);
      set(`meta[${key}="${kind}:description"]`, "content", description);
      set(
        `meta[${key}="${kind}:image"]`,
        "content",
        "https://shotgunninjas.com/albums/operatoros/cover.png",
      );
    }
    set('meta[property="og:url"]', "content", url);
    set('meta[property="og:image:width"]', "content", "1672");
    set('meta[property="og:image:height"]', "content", "941");
    return () => {
      document.title = previousTitle;
      changes.forEach((restore) => restore());
    };
  }, [detail]);
}

export function AlbumShelf() {
  return (
    <section
      aria-labelledby="albums-title"
      className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2
          id="albums-title"
          className="flex items-center gap-3 text-2xl font-bold font-[var(--font-display)]"
        >
          <Disc3 className="text-primary" aria-hidden="true" />
          Albums
        </h2>
        <Link
          to="/soundstudio/albums"
          className="text-sm text-muted-foreground hover:text-white"
        >
          Browse albums <span aria-hidden="true">→</span>
        </Link>
      </div>
      <Link
        to={albumPath}
        className="group grid overflow-hidden rounded-2xl border border-primary/25 bg-card transition-colors hover:border-primary/70 focus-visible:outline-2 focus-visible:outline-primary sm:grid-cols-2"
      >
        <img
          src={asset("cover.png")}
          alt="OperatorOS artwork: the Shotgun Ninjas universe surrounding Pastah John"
          className="aspect-video h-full w-full object-cover"
          loading="lazy"
        />
        <div className="flex flex-col justify-center p-6 sm:p-8">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-primary">
            Featured album
          </p>
          <h3 className="mb-2 text-3xl font-bold font-[var(--font-display)]">
            {album.title}
          </h3>
          <p className="text-muted-foreground">
            {album.artist} · {album.tracks.length} tracks · {totalMinutes} min
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {album.description}
          </p>
          <span className="mt-6 flex items-center gap-2 text-sm font-semibold">
            Enter the album{" "}
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </section>
  );
}

export function Albums() {
  useAlbumMetadata(false);
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 pt-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/soundstudio"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Sound Studio
          </Link>
          <h1 className="mt-8 text-4xl font-bold font-[var(--font-display)]">
            The album collection
          </h1>
          <p className="mt-3 text-muted-foreground">
            Complete releases. Their own artwork, their own sequence, their own
            space.
          </p>
        </div>
        <AlbumShelf />
      </main>
      <Footer />
    </div>
  );
}

export function OperatorOSAlbum() {
  useAlbumMetadata(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const request = useRef(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState("");
  const current = selected === null ? null : album.tracks[selected];

  useEffect(() => {
    return () => {
      request.current++;
    };
  }, []);

  const play = async (index: number, toggle = true) => {
    const audio = audioRef.current;
    const track = album.tracks[index];
    if (!audio || !track) return;
    const id = ++request.current;
    setError("");
    if (selected === index && !audio.paused) {
      if (toggle) audio.pause();
      return;
    }
    if (selected !== index || audio.error) {
      audio.src = asset(track.file);
      setSelected(index);
    }
    if (audio.ended) audio.currentTime = 0;
    try {
      await audio.play();
    } catch (cause) {
      if (
        id !== request.current ||
        (cause instanceof DOMException && cause.name === "AbortError")
      )
        return;
      setPlaying(false);
      setError(
        "Playback could not start. Use the player’s play button to retry, or download the track.",
      );
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 pb-12 pt-24 sm:pt-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/soundstudio/albums"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            All albums
          </Link>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl">
            <img
              src={asset("cover.png")}
              alt="OperatorOS album artwork featuring Pastah John and the Shotgun Ninjas universe"
              className="aspect-video w-full object-contain"
              fetchPriority="high"
            />
            <div className="p-6 sm:p-10">
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">
                Sound Studio / Album 001
              </p>
              <h1 className="break-words text-4xl font-bold font-[var(--font-display)] sm:text-6xl">
                {album.title}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                {album.artist}
              </p>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                {album.description}
              </p>
              <p className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">
                November 2, 2026 · {album.tracks.length} tracks · {totalMinutes}{" "}
                minutes
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  onClick={() => void play(0, false)}
                  className={`${button} bg-primary text-primary-foreground hover:bg-primary/85`}
                >
                  <Play className="h-4 w-4" />
                  Play album
                </button>
                <a
                  href={album.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${button} border border-white/20 hover:bg-white/5`}
                >
                  Listen on Suno
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <section aria-labelledby="tracklist-title" className="mt-10">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
              <h2
                id="tracklist-title"
                className="text-2xl font-bold font-[var(--font-display)]"
              >
                The tracklist
              </h2>
              <span className="text-sm text-muted-foreground">
                In the original album order
              </span>
            </div>
            <ol className="overflow-hidden rounded-2xl border border-white/10 bg-card">
              {album.tracks.map((track, index) => (
                <li
                  key={track.position}
                  className={`flex items-center gap-2 border-b border-white/5 px-3 py-3 last:border-0 sm:gap-4 sm:px-5 ${selected === index ? "bg-primary/10" : "hover:bg-white/[0.03]"}`}
                >
                  <button
                    onClick={() => void play(index)}
                    aria-label={`${selected === index && playing ? "Pause" : "Play"} ${track.title}`}
                    aria-current={selected === index ? "true" : undefined}
                    className="flex min-w-0 flex-1 items-center gap-3 rounded-lg py-2 text-left focus-visible:outline-2 focus-visible:outline-primary sm:gap-5"
                  >
                    <span className="w-6 shrink-0 text-center text-xs tabular-nums text-muted-foreground">
                      {String(track.position).padStart(2, "0")}
                    </span>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${selected === index ? "bg-primary text-white" : "bg-white/5 text-muted-foreground"}`}
                    >
                      {selected === index && playing ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </span>
                    <span className="min-w-0 break-words text-sm font-medium sm:text-base">
                      {track.title}
                    </span>
                  </button>
                  <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                    {time(track.duration_seconds)}
                  </span>
                  <a
                    href={asset(track.file)}
                    download={track.filename}
                    aria-label={`Download ${track.title}`}
                    className="rounded-lg p-3 text-muted-foreground hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-primary"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ol>
          </section>

          <section
            aria-label="Album player"
            className="sticky bottom-3 z-30 mt-6 rounded-2xl border border-primary/25 bg-background/95 p-4 shadow-2xl backdrop-blur-xl sm:p-5"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary">
                  {current
                    ? `Track ${selected! + 1} / ${album.tracks.length}`
                    : "Ready to listen"}
                </p>
                <p
                  className="mt-1 truncate text-sm font-semibold"
                  aria-live="polite"
                >
                  {current?.title ?? `${album.title} · ${album.artist}`}
                </p>
              </div>
              <div className="flex shrink-0 gap-1">
                <button
                  aria-label="Previous album track"
                  disabled={selected === null || selected === 0}
                  onClick={() => selected !== null && void play(selected - 1)}
                  className="rounded-full p-3 hover:bg-white/10 disabled:opacity-30"
                >
                  <SkipBack className="h-5 w-5" />
                </button>
                <button
                  aria-label="Next album track"
                  disabled={
                    selected === null || selected === album.tracks.length - 1
                  }
                  onClick={() => selected !== null && void play(selected + 1)}
                  className="rounded-full p-3 hover:bg-white/10 disabled:opacity-30"
                >
                  <SkipForward className="h-5 w-5" />
                </button>
              </div>
            </div>
            <audio
              ref={audioRef}
              controls
              preload="none"
              aria-label="OperatorOS audio player"
              className="h-10 w-full"
              onPlay={() => {
                setPlaying(true);
                setError("");
              }}
              onPause={() => setPlaying(false)}
              onError={() => {
                setPlaying(false);
                setError(
                  "This track could not load. Please retry or use its download link.",
                );
              }}
              onEnded={() => {
                setPlaying(false);
                if (selected !== null && selected < album.tracks.length - 1)
                  void play(selected + 1);
              }}
            />
            {error && (
              <p role="alert" className="mt-3 text-sm text-red-300">
                {error}
              </p>
            )}
          </section>
          <Link
            to="/soundstudio"
            className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sound Studio
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
