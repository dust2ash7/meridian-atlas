import { Link, useRouterState } from "@tanstack/react-router";
import { Bookmark, Compass, Leaf, MapPinned, Waypoints } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { DISCLAIMER } from "@/data/labels";
import { acceptDisclaimer, useSaved } from "@/lib/saved";
import { cn } from "@/lib/cn";

const TABS = [
  { id: "explore", to: "/", label: "Explore", icon: Compass },
  { id: "points", to: "/points", label: "Points", icon: MapPinned },
  { id: "herbs", to: "/herbs", label: "Herbs", icon: Leaf },
  { id: "systems", to: "/systems", label: "Systems", icon: Waypoints },
  { id: "saved", to: "/saved", label: "Saved", icon: Bookmark },
] as const;

function tabFor(path: string) {
  if (path.startsWith("/points")) return "points";
  if (path.startsWith("/herbs")) return "herbs";
  if (path.startsWith("/systems")) return "systems";
  if (path.startsWith("/saved")) return "saved";
  return "explore";
}

export function Shell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const saved = useSaved();
  const [booted, setBooted] = useState(false);
  const active = tabFor(path);

  useEffect(() => {
    setBooted(true);
  }, []);

  const showDisclaimer = booted && !saved.accepted;

  return (
    <div className="min-h-screen bg-ink text-paper">
      <header className="sticky top-0 z-20 border-b border-line/80 bg-ink/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <Link to="/" className="group flex min-h-11 items-center gap-3">
            <Mark />
            <span>
              <span className="block font-serif text-xl leading-none tracking-tight">Meridian Atlas</span>
              <span className="mt-1 block text-xs tracking-wide text-faint uppercase">Channels, points, herbs</span>
            </span>
          </Link>
        </div>
      </header>
      <div className="mx-auto w-full max-w-3xl px-4 pt-4 pb-36">
        {showDisclaimer ? (
          <aside className="mb-5 rounded-3xl bg-panel p-5 shadow-card">
            <p className="text-xs tracking-wide text-earth uppercase">Before you browse</p>
            <h2 id="disclaimer-title" className="mt-2 font-serif text-3xl text-paper">
              A reference, not a treatment
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">{DISCLAIMER}</p>
            <p className="mt-3 text-sm leading-relaxed text-faint">
              Needle depths, angles, and electroacupuncture notes are textbook descriptions for students. They are not instructions.
            </p>
            <button
              type="button"
              className="mt-5 flex min-h-12 w-full items-center justify-center rounded-2xl bg-paper px-4 text-base font-semibold text-ink"
              onClick={() => acceptDisclaimer()}
            >
              I understand — this is a reference
            </button>
          </aside>
        ) : null}
        {children}
        <footer className="mt-10 border-t border-line pt-4">
          <p className="text-sm leading-relaxed text-faint">{DISCLAIMER}</p>
        </footer>
      </div>
      <nav className="tabbar fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ink/95 backdrop-blur-md" aria-label="Primary">
        <ul className="mx-auto grid max-w-3xl grid-cols-5">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const on = active === tab.id;
            return (
              <li key={tab.id}>
                <Link
                  to={tab.to}
                  aria-current={on ? "page" : undefined}
                  className={cn(
                    "flex min-h-14 flex-col items-center justify-center gap-1 text-xs",
                    on ? "text-paper" : "text-faint",
                  )}
                >
                  <Icon className="size-5" strokeWidth={on ? 2.25 : 1.75} />
                  {tab.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

function Mark() {
  return (
    <svg viewBox="0 0 36 36" className="size-9 text-earth" aria-hidden="true">
      <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <path d="M18 6 v24 M10 12c4 3 12 3 16 0 M10 24c4-3 12-3 16 0" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="18" cy="12" r="1.4" fill="var(--color-water)" />
      <circle cx="18" cy="24" r="1.4" fill="var(--color-fire)" />
    </svg>
  );
}
