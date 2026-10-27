import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import snpLogo from "@/assets/SNPlogo.png";
import { trackOutbound } from "@/lib/trackOutbound";
import { KAGE_STATUS, KAGE_URL } from "@/lib/kage";

const mainLinks = [
  { name: "Home", href: "/" },
  { name: "OperatorOS", href: "/operatoros" },
  { name: "Controversy Archive", href: "/controversy-archive" },
  { name: "Sound Studio", href: "/soundstudio" },
  { name: "Neon Racer", href: "https://neonracer.net" },
  { name: "Play Pack Pilot", href: "https://playpackpilot.com" },
  { name: "Ninja DAW", href: "https://shotgunninjas.studio" },
  { name: "Ninja Village", href: "https://shotgunninjavillage.com" },
  { name: "Kage", href: KAGE_URL, status: KAGE_STATUS },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];
const exploreLinks = mainLinks.slice(2, 9);
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileTrigger = useRef<HTMLButtonElement>(null);
  const exploreTrigger = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const closeNavigation = () => {
    setIsOpen(false);
    setExploreOpen(false);
  };
  useEffect(closeNavigation, [location.pathname]);
  useEffect(() => {
    if (!isOpen && !exploreOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      closeNavigation();
      (isOpen ? mobileTrigger : exploreTrigger).current?.focus();
    };
    const onPointer = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !navRef.current?.contains(event.target)
      )
        closeNavigation();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [isOpen, exploreOpen]);
  const home = (event: React.MouseEvent) => {
    event.preventDefault();
    closeNavigation();
    if (location.pathname !== "/") navigate("/");
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };
  function item(link: (typeof mainLinks)[number], className = "") {
    const active =
      !link.href.startsWith("http") && location.pathname === link.href;
    const style = `inline-flex min-h-11 items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${focusRing} ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"} ${className}`;
    if (link.href.startsWith("http"))
      return (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${link.name} (opens in a new tab)`}
          onClick={() => {
            closeNavigation();
            trackOutbound(link.href, `navbar:${link.name}`);
          }}
          className={style}
        >
          {link.name}
          <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {"status" in link && link.status && (
            <span className="ml-auto text-[10px] text-muted-foreground">
              {link.status}
            </span>
          )}
        </a>
      );
    return (
      <Link
        key={link.name}
        to={link.href}
        onClick={link.href === "/" ? home : closeNavigation}
        aria-current={active ? "page" : undefined}
        className={style}
      >
        {link.name}
      </Link>
    );
  }
  return (
    <nav
      ref={navRef}
      aria-label="Primary navigation"
      className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link
          to="/"
          onClick={home}
          className={`flex min-h-11 items-center gap-3 rounded-lg ${focusRing}`}
          aria-label="Shotgun Ninjas home"
        >
          <img src={snpLogo} alt="" className="h-9 w-9 object-contain" />
          <span className="text-sm font-bold tracking-[0.12em] text-foreground">
            SHOTGUN NINJAS
            <span className="mt-1 block text-[10px] font-normal tracking-[0.2em] text-muted-foreground">
              PRODUCTIONS
            </span>
          </span>
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {item(mainLinks[0])}
          {item(mainLinks[1])}
          <button
            ref={exploreTrigger}
            type="button"
            onClick={() => setExploreOpen((value) => !value)}
            aria-expanded={exploreOpen}
            aria-controls="explore-navigation"
            className={`inline-flex min-h-11 items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground ${focusRing}`}
          >
            Explore
            <ChevronDown
              className={`h-4 w-4 transition-transform ${exploreOpen ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>
          {item(mainLinks[9])}
          {item(mainLinks[10], "ml-3 border border-border text-foreground")}
        </div>
        <button
          ref={mobileTrigger}
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className={`inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border text-foreground lg:hidden ${focusRing}`}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {exploreOpen && (
        <div
          id="explore-navigation"
          className="absolute right-8 top-[calc(100%+0.75rem)] hidden w-[min(42rem,calc(100vw-4rem))] rounded-2xl border border-border bg-card p-5 shadow-2xl lg:block"
        >
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Software, music & original worlds
          </p>
          <div className="grid grid-cols-2 gap-1">
            {exploreLinks.map((link) => item(link))}
          </div>
        </div>
      )}
      {isOpen && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-border bg-background p-4 lg:hidden"
        >
          <div className="mx-auto grid max-w-7xl gap-1">
            {mainLinks.map((link) => item(link, "w-full"))}
          </div>
        </div>
      )}
    </nav>
  );
}
