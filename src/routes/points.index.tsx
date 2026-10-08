import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FilterButton, PointFilterSheet } from "@/components/filters";
import { Chip, EmptyState, PointCard, SearchField } from "@/components/pieces";
import { activePointFilterCount, emptyPointFilters, filterPoints, pointFilterLabels, filtersFromPointSearch } from "@/data/catalog";
import { getChannel } from "@/data/channels";
import { SYMPTOMS } from "@/data/labels";
import type { PointFilters } from "@/data/types";

export const Route = createFileRoute("/points/")({
  validateSearch: (search: Record<string, unknown>) => filtersFromPointSearch(search),
  component: PointsPage,
});

function PointsPage() {
  const filters = { ...emptyPointFilters, ...Route.useSearch() };
  const navigate = Route.useNavigate();
  const [open, setOpen] = useState(false);
  const points = filterPoints(filters);
  const count = activePointFilterCount(filters);
  const chips = pointFilterLabels(filters);

  function update(next: Partial<PointFilters>) {
    void navigate({ search: { ...filters, ...next }, replace: true });
  }

  const grouped = !filters.q && count === 0;

  return (
    <main>
      <h1 className="font-serif text-4xl">Points</h1>
      <p className="mt-2 text-base leading-relaxed text-muted">
        Well-known points from the twelve channels, Ren, Du, and a short extra set. The rest of the classical numbers can be added beside them.
      </p>
      <div className="mt-4 flex gap-2">
        <div className="min-w-0 flex-1">
          <SearchField value={filters.q} onChange={(q) => update({ q })} placeholder="Code, pinyin, region, symptom" />
        </div>
        <FilterButton count={count} onClick={() => setOpen(true)} />
      </div>
      {chips.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <Chip key={chip.key} active onClick={() => update({ [chip.key]: "" })}>
              {chip.label} ×
            </Chip>
          ))}
        </div>
      ) : null}
      <p className="mt-4 text-sm text-faint">{points.length} points</p>
      {points.length === 0 ? (
        <div className="mt-3">
          <EmptyState title="No points in this cut" body="Try a wider filter, or start from a symptom people actually look up.">
            {SYMPTOMS.slice(0, 4).map((symptom) => (
              <Chip key={symptom.id} onClick={() => update({ ...emptyPointFilters, symptom: symptom.id })}>
                {symptom.label}
              </Chip>
            ))}
          </EmptyState>
        </div>
      ) : grouped ? (
        <div className="mt-2 space-y-6">
          {groupByChannel(points).map((group) => (
            <section key={group.id}>
              <h2 className="mb-2 font-serif text-2xl">{group.name}</h2>
              <div className="grid gap-3">
                {group.points.map((point) => (
                  <PointCard key={point.id} point={point} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="mt-3 grid gap-3">
          {points.map((point) => (
            <PointCard key={point.id} point={point} />
          ))}
        </div>
      )}
      {open ? (
        <PointFilterSheet
          value={filters}
          onChange={(next) => void navigate({ search: next, replace: true })}
          onClose={() => setOpen(false)}
          onClear={() => void navigate({ search: { ...emptyPointFilters, q: filters.q }, replace: true })}
        />
      ) : null}
    </main>
  );
}

function groupByChannel(points: ReturnType<typeof filterPoints>) {
  const map = new Map<string, typeof points>();
  for (const point of points) {
    const list = map.get(point.channelId) ?? [];
    list.push(point);
    map.set(point.channelId, list);
  }
  return [...map.entries()].map(([id, list]) => ({
    id,
    name: getChannel(id)?.name ?? id,
    points: list,
  }));
}
