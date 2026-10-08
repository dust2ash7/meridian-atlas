import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Ear, Leaf, ListChecks, MapPinned, Pentagon, PersonStanding, Route as RouteIcon } from "lucide-react";
import { useState } from "react";
import { BodyRegions } from "@/components/diagrams";
import { HerbCard, PointCard, SearchField, SectionTitle } from "@/components/pieces";
import { FEATURED_POINT_IDS, getPoint, searchAll } from "@/data/catalog";
import { SYMPTOMS } from "@/data/labels";
import { ROUTINES } from "@/data/routines";
import { emptyPointFilters } from "@/data/catalog";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => {
    const q = typeof search.q === "string" ? search.q.trim() : "";
    return q ? { q } : {};
  },
  component: ExplorePage,
});

const CARDS = [
  { dim: "region", title: "By body region", text: "Head, chest, hand, back, foot.", icon: PersonStanding },
  { dim: "channel", title: "By meridian", text: "The twelve channels, Ren, and Du.", icon: RouteIcon },
  { dim: "symptom", title: "By symptom or goal", text: "Pain, sleep, digestion, colds.", icon: MapPinned },
  { dim: "element", title: "By element", text: "Wood, fire, earth, metal, water.", icon: Pentagon },
  { dim: "action", title: "By herb action", text: "Release, clear, tonify, calm.", icon: Leaf },
  { dim: "extra", title: "Extra systems", text: "Vessels, ear, scalp, extra points.", icon: Ear },
] as const;

function ExplorePage() {
  const q = Route.useSearch().q ?? "";
  const navigate = useNavigate();
  const [draft, setDraft] = useState(q);
  const results = searchAll(q);
  const featured = FEATURED_POINT_IDS.map((id) => getPoint(id)).filter((point) => point != null);

  function commit(value: string) {
    setDraft(value);
    void navigate({ to: "/", search: { q: value }, replace: true });
  }

  return (
    <main>
      <p className="text-sm text-earth">Educational field guide</p>
      <h1 className="mt-1 max-w-sm font-serif text-4xl leading-tight">Find a point, a channel, or an herb.</h1>
      <p className="mt-2 max-w-md text-base leading-relaxed text-muted">
        Traditional language, in plain words. Pressure only. Nothing here is a diagnosis.
      </p>
      <div className="mt-4">
        <SearchField value={draft} onChange={commit} placeholder="Search LI4, Zusanli, headache, mint…" />
      </div>

      {q.trim() ? (
        <section className="mt-6">
          <SectionTitle aside={<span className="text-sm text-faint">{results.points.length + results.herbs.length} found</span>}>
            Results
          </SectionTitle>
          {results.points.length + results.herbs.length === 0 ? (
            <p className="rounded-2xl bg-panel px-4 py-5 text-sm leading-relaxed text-muted">
              Nothing matched. Try a code like PC6, a pinyin name, or a goal such as sleep.
            </p>
          ) : (
            <div className="grid gap-3">
              {results.points.slice(0, 12).map((point) => (
                <PointCard key={point.id} point={point} />
              ))}
              {results.herbs.slice(0, 8).map((herb) => (
                <HerbCard key={herb.id} herb={herb} />
              ))}
            </div>
          )}
        </section>
      ) : (
        <>
          <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
            {SYMPTOMS.map((symptom) => (
              <Link
                key={symptom.id}
                to="/points"
                search={{ ...emptyPointFilters, symptom: symptom.id }}
                className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-panel px-3 text-sm text-muted shadow-card"
              >
                {symptom.label}
              </Link>
            ))}
          </div>

          <section className="mt-8">
            <SectionTitle>Start from a question</SectionTitle>
            <div className="grid gap-3 sm:grid-cols-2">
              {CARDS.map((card) => {
                const Icon = card.icon;
                return (
                  <Link key={card.dim} to="/browse" search={{ dim: card.dim }} className="flex min-h-20 gap-3 rounded-2xl bg-panel p-4 shadow-card">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-panel-2 text-earth">
                      <Icon className="size-5" />
                    </span>
                    <span>
                      <span className="block text-base text-paper">{card.title}</span>
                      <span className="mt-1 block text-sm text-muted">{card.text}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="mt-8">
            <SectionTitle
              aside={
                <Link to="/routines" className="inline-flex min-h-11 items-center text-sm text-earth">
                  All routines
                </Link>
              }
            >
              Self-care routines
            </SectionTitle>
            <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
              {ROUTINES.map((routine) => (
                <Link key={routine.id} to="/routines/$routineId" params={{ routineId: routine.id }} className="w-56 shrink-0 rounded-2xl bg-panel p-4 shadow-card">
                  <ListChecks className="size-5 text-earth" />
                  <p className="mt-3 font-serif text-xl leading-tight">{routine.title}</p>
                  <p className="mt-2 line-clamp-3 text-sm text-muted">{routine.aim}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <SectionTitle>Where to look</SectionTitle>
            <BodyRegions />
            <p className="mt-3 text-sm leading-relaxed text-muted">
              The figure is a map, not a body to treat. Use the buttons under it. It faces you, so the back is drawn to the side.
            </p>
          </section>

          <section className="mt-8">
            <SectionTitle>Often opened</SectionTitle>
            <div className="grid gap-3 sm:grid-cols-2">
              {featured.map((point) => (
                <PointCard key={point.id} point={point} />
              ))}
            </div>
          </section>

          <details className="mt-8 rounded-2xl bg-panel px-4 py-3 shadow-card">
            <summary className="min-h-11 cursor-pointer list-none py-2 text-base text-paper">How to read a page</summary>
            <div className="space-y-2 pb-2 text-sm leading-relaxed text-muted">
              <p>A code such as LI4 is the channel plus the point number. Pinyin is the Mandarin reading. Chinese characters sit beside it.</p>
              <p>Actions are traditional teaching phrases — move qi, clear heat, calm shen. They are not lab results.</p>
              <p>A cun is a body-inch measured on that person, not a ruler inch. Needle notes use it only so students can recognize a chart.</p>
              <p>Acupressure here means fingers, about 30–90 seconds. Needling is a licensed practice. Do not needle yourself.</p>
            </div>
          </details>
        </>
      )}
    </main>
  );
}
