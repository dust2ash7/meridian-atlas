import { Link } from "@tanstack/react-router";
import { emptyPointFilters } from "@/data/catalog";
import { ELEMENT_TEXT, GENERATING, REGIONS } from "@/data/labels";
import type { ElementId } from "@/data/types";
import { cn } from "@/lib/cn";

const POSITIONS: Record<ElementId, { x: number; y: number }> = {
  wood: { x: 120, y: 36 },
  fire: { x: 198, y: 92 },
  earth: { x: 168, y: 176 },
  metal: { x: 72, y: 176 },
  water: { x: 42, y: 92 },
};

export function ElementCycle({ highlight }: { highlight?: ElementId | null }) {
  const generating = GENERATING.map((id) => POSITIONS[id]);
  const genPath = generating.map((point, index) => `${index === 0 ? "M" : "L"}${point.x} ${point.y}`).join(" ") + " Z";
  return (
    <svg viewBox="0 0 240 220" className="mx-auto w-full max-w-xs text-faint" role="img" aria-label="Five element cycle. Solid line generates. Dashed lines control.">
      <path d={genPath} fill="none" stroke="currentColor" strokeWidth="1.25" />
      <line x1="120" y1="36" x2="168" y2="176" stroke="var(--color-line)" strokeDasharray="3 3" />
      <line x1="198" y1="92" x2="72" y2="176" stroke="var(--color-line)" strokeDasharray="3 3" />
      <line x1="168" y1="176" x2="42" y2="92" stroke="var(--color-line)" strokeDasharray="3 3" />
      <line x1="72" y1="176" x2="120" y2="36" stroke="var(--color-line)" strokeDasharray="3 3" />
      <line x1="42" y1="92" x2="198" y2="92" stroke="var(--color-line)" strokeDasharray="3 3" />
      {(Object.keys(POSITIONS) as ElementId[]).map((id) => {
        const point = POSITIONS[id];
        const on = highlight === id;
        return (
          <g key={id}>
            <circle cx={point.x} cy={point.y} r={on ? 16 : 13} className={on ? "fill-panel" : "fill-ink"} stroke="currentColor" />
            <text x={point.x} y={point.y + 4} textAnchor="middle" fontSize="11" className={cn("fill-current font-sans", ELEMENT_TEXT[id])}>
              {id}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

const INK = "fill-ink stroke-current";

export function BodyRegions({ active }: { active?: string }) {
  return (
    <div>
      <svg viewBox="0 0 240 280" className="pointer-events-none mx-auto w-full max-w-xs text-faint" role="img" aria-hidden="true">
        <rect x="176" y="78" width="48" height="112" rx="14" className={INK} strokeWidth="1.6" />
        <text x="200" y="138" textAnchor="middle" fontSize="12" className="fill-muted font-sans">
          Back
        </text>
        <circle cx="86" cy="36" r="24" className={INK} strokeWidth="1.6" />
        <text x="86" y="40" textAnchor="middle" fontSize="12" className="fill-muted font-sans">
          Head
        </text>
        <ellipse cx="114" cy="36" rx="8" ry="12" className={INK} strokeWidth="1.6" />
        <rect x="74" y="62" width="24" height="18" rx="6" className={INK} strokeWidth="1.6" />
        <rect x="58" y="84" width="56" height="46" rx="12" className={INK} strokeWidth="1.6" />
        <text x="86" y="112" textAnchor="middle" fontSize="12" className="fill-muted font-sans">
          Chest
        </text>
        <rect x="26" y="88" width="26" height="52" rx="12" className={INK} strokeWidth="1.6" />
        <rect x="120" y="88" width="26" height="52" rx="12" className={INK} strokeWidth="1.6" />
        <rect x="27" y="144" width="24" height="22" rx="8" className={INK} strokeWidth="1.6" />
        <rect x="121" y="144" width="24" height="22" rx="8" className={INK} strokeWidth="1.6" />
        <rect x="66" y="134" width="40" height="38" rx="10" className={INK} strokeWidth="1.6" />
        <text x="86" y="158" textAnchor="middle" fontSize="12" className="fill-muted font-sans">
          Belly
        </text>
        <rect x="64" y="180" width="18" height="62" rx="8" className={INK} strokeWidth="1.6" />
        <rect x="90" y="180" width="18" height="62" rx="8" className={INK} strokeWidth="1.6" />
        <rect x="58" y="246" width="26" height="16" rx="6" className={INK} strokeWidth="1.6" />
        <rect x="88" y="246" width="26" height="16" rx="6" className={INK} strokeWidth="1.6" />
      </svg>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {REGIONS.map((region) => {
          const on = active === region.id;
          return (
            <Link
              key={region.id}
              to="/points"
              search={{ ...emptyPointFilters, region: region.id }}
              aria-current={on ? "page" : undefined}
              className={cn(
                "flex min-h-14 flex-col justify-center rounded-2xl px-3 py-2 shadow-card",
                on ? "bg-paper text-ink" : "bg-panel text-paper",
              )}
            >
              <span className="text-base">{region.label}</span>
              <span className={cn("text-sm", on ? "text-ink/70" : "text-muted")}>{region.hint}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
