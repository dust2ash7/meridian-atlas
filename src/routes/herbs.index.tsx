import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FilterButton, HerbFilterSheet } from "@/components/filters";
import { Chip, EmptyState, HerbCard, SearchField } from "@/components/pieces";
import { activeHerbFilterCount, emptyHerbFilters, filterHerbs, filtersFromHerbSearch } from "@/data/catalog";
import { actionLabel, HERB_ACTIONS, regionLabel, symptomLabel } from "@/data/labels";
import { getChannel } from "@/data/channels";
import type { Herb, HerbFilters } from "@/data/types";

export const Route = createFileRoute("/herbs/")({
  validateSearch: (search: Record<string, unknown>) => filtersFromHerbSearch(search),
  component: HerbsPage,
});

function HerbsPage() {
  const filters = { ...emptyHerbFilters, ...Route.useSearch() };
  const navigate = Route.useNavigate();
  const [open, setOpen] = useState(false);
  const herbs = filterHerbs(filters);
  const count = activeHerbFilterCount(filters);
  const grouped = !filters.q && count === 0;

  function update(next: Partial<HerbFilters>) {
    void navigate({ search: { ...filters, ...next }, replace: true });
  }

  const chips = [
    filters.action ? { key: "action" as const, label: actionLabel(filters.action) } : null,
    filters.channel ? { key: "channel" as const, label: getChannel(filters.channel)?.name ?? filters.channel } : null,
    filters.element ? { key: "element" as const, label: filters.element } : null,
    filters.symptom ? { key: "symptom" as const, label: symptomLabel(filters.symptom) } : null,
    filters.region ? { key: "region" as const, label: regionLabel(filters.region) } : null,
  ].filter((chip) => chip != null);

  return (
    <main>
      <h1 className="font-serif text-4xl">Herbs</h1>
      <p className="mt-2 text-base leading-relaxed text-muted">
        A materia medica for study. No shop, no doses. Every entry says not to self-dose.
      </p>
      <div className="mt-4 flex gap-2">
        <div className="min-w-0 flex-1">
          <SearchField value={filters.q} onChange={(q) => update({ q })} placeholder="Pinyin, English, Latin, action" />
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
      <p className="mt-4 text-sm text-faint">{herbs.length} herbs</p>
      {herbs.length === 0 ? (
        <div className="mt-3">
          <EmptyState title="No herbs in this cut" body="Clear a filter, or start from an action category.">
            {HERB_ACTIONS.slice(0, 3).map((action) => (
              <Chip key={action.id} onClick={() => update({ ...emptyHerbFilters, action: action.id })}>
                {action.label}
              </Chip>
            ))}
          </EmptyState>
        </div>
      ) : grouped ? (
        <div className="mt-2 space-y-6">
          {HERB_ACTIONS.map((action) => {
            const list = herbs.filter((herb) => herb.action === action.id);
            if (list.length === 0) return null;
            return (
              <section key={action.id}>
                <h2 className="mb-2 font-serif text-2xl">{action.label}</h2>
                <div className="grid gap-3">
                  {list.map((herb) => (
                    <HerbCard key={herb.id} herb={herb} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="mt-3 grid gap-3">
          {herbs.map((herb: Herb) => (
            <HerbCard key={herb.id} herb={herb} />
          ))}
        </div>
      )}
      {open ? (
        <HerbFilterSheet
          value={filters}
          onChange={(next) => void navigate({ search: next, replace: true })}
          onClose={() => setOpen(false)}
          onClear={() => void navigate({ search: { ...emptyHerbFilters, q: filters.q }, replace: true })}
        />
      ) : null}
    </main>
  );
}
