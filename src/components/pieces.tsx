import { Link } from "@tanstack/react-router";
import { Bookmark, ChevronLeft, Search, X } from "lucide-react";
import type { ReactNode } from "react";
import { getChannel } from "@/data/channels";
import { ELEMENT_BG, ELEMENT_BORDER, ELEMENT_TEXT, kindLabel, safetyLabel } from "@/data/labels";
import type { Herb, Point } from "@/data/types";
import { cn } from "@/lib/cn";
import { toggleSavedHerb, toggleSavedPoint, useSaved } from "@/lib/saved";

export function SearchField({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="flex h-12 items-center gap-2 rounded-2xl bg-panel px-3 shadow-card">
      <Search className="size-5 shrink-0 text-faint" aria-hidden="true" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        enterKeyHint="search"
        className="h-full min-w-0 flex-1 bg-transparent text-base text-paper outline-none placeholder:text-faint"
      />
      {value ? (
        <button type="button" className="grid size-11 place-items-center text-muted" onClick={() => onChange("")} aria-label="Clear search">
          <X className="size-4" />
        </button>
      ) : null}
    </label>
  );
}

export function PointCard({ point }: { point: Point }) {
  const channel = getChannel(point.channelId);
  const element = channel?.element;
  return (
    <Link
      to="/points/$pointId"
      params={{ pointId: point.id }}
      className={cn(
        "block min-h-20 rounded-2xl border-l-4 bg-panel px-4 py-3 shadow-card transition-shadow duration-200 hover:shadow-card-hover",
        element ? ELEMENT_BORDER[element] : "border-line",
      )}
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-serif text-2xl leading-none">{point.code}</span>
        <span className={cn("text-sm", element ? ELEMENT_TEXT[element] : "text-faint")}>
          {channel?.name ?? "Extra"}
        </span>
      </div>
      <p className="mt-1 text-base text-paper">{point.english}</p>
      <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">{point.summary}</p>
      {point.safety !== "general" ? (
        <p className={cn("mt-2 text-xs", point.safety === "pregnancy" ? "text-fire" : "text-earth")}>{safetyLabel(point.safety)}</p>
      ) : null}
    </Link>
  );
}

export function HerbCard({ herb }: { herb: Herb }) {
  return (
    <Link to="/herbs/$herbId" params={{ herbId: herb.id }} className="block min-h-20 rounded-2xl bg-panel px-4 py-3 shadow-card transition-shadow duration-200 hover:shadow-card-hover">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-serif text-xl leading-none">{herb.pinyin}</span>
        <span className="font-serif text-lg text-muted">{herb.hanzi}</span>
      </div>
      <p className="mt-1 text-base text-paper">{herb.english}</p>
      <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">{herb.summary}</p>
    </Link>
  );
}

export function BackLink({ to, label }: { to: "/" | "/points" | "/herbs" | "/systems" | "/routines" | "/saved" | "/browse"; label: string }) {
  return (
    <Link to={to} className="inline-flex min-h-11 items-center gap-1 text-sm text-muted">
      <ChevronLeft className="size-4" />
      {label}
    </Link>
  );
}

export function SectionTitle({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <h2 className="font-serif text-2xl leading-tight">{children}</h2>
      {aside}
    </div>
  );
}

export function Chip({ children, onClick, active }: { children: ReactNode; onClick?: () => void; active?: boolean }) {
  const className = cn(
    "inline-flex min-h-11 shrink-0 items-center rounded-full px-3 text-sm",
    active ? "bg-paper text-ink" : "bg-panel text-muted shadow-card",
  );
  if (!onClick) return <span className={className}>{children}</span>;
  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export function SavePointButton({ id }: { id: string }) {
  const saved = useSaved();
  const on = saved.points.includes(id);
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => toggleSavedPoint(id)}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm",
        on ? "bg-paper text-ink" : "bg-panel text-paper shadow-card",
      )}
    >
      <Bookmark className="size-4" fill={on ? "currentColor" : "none"} />
      {on ? "Saved" : "Save"}
    </button>
  );
}

export function SaveHerbButton({ id }: { id: string }) {
  const saved = useSaved();
  const on = saved.herbs.includes(id);
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => toggleSavedHerb(id)}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm",
        on ? "bg-paper text-ink" : "bg-panel text-paper shadow-card",
      )}
    >
      <Bookmark className="size-4" fill={on ? "currentColor" : "none"} />
      {on ? "Saved" : "Save"}
    </button>
  );
}

export function ElementDot({ element }: { element: string | null | undefined }) {
  if (!element || !(element in ELEMENT_BG)) return <span className="size-2 rounded-full bg-faint" />;
  return <span className={cn("size-2 rounded-full", ELEMENT_BG[element as keyof typeof ELEMENT_BG])} />;
}

export function EmptyState({ title, body, children }: { title: string; body: string; children?: ReactNode }) {
  return (
    <div className="rounded-2xl bg-panel px-4 py-6 shadow-card">
      <h2 className="font-serif text-2xl">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
      {children ? <div className="mt-4 flex flex-wrap gap-2">{children}</div> : null}
    </div>
  );
}

export function RoleLine({ point }: { point: Point }) {
  if (point.roles.length === 0 && point.kinds.length === 0) return null;
  const labels = point.roles.length ? point.roles : point.kinds.map(kindLabel);
  return <p className="text-sm text-earth">{labels.join(" · ")}</p>;
}
