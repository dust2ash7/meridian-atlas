import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { BackLink, PointCard, SaveHerbButton } from "@/components/pieces";
import { emptyHerbFilters, getHerb, pointsForHerb } from "@/data/catalog";
import { getChannel } from "@/data/channels";
import { actionLabel, FLAVOR_LABEL, natureLabel, symptomLabel } from "@/data/labels";
import { remember } from "@/lib/saved";

export const Route = createFileRoute("/herbs/$herbId")({
  loader: ({ params }) => getHerb(params.herbId) ?? null,
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData ? `${loaderData.pinyin} · Meridian Atlas` : "Herb · Meridian Atlas" }],
  }),
  component: HerbPage,
});

function HerbPage() {
  const herb = Route.useLoaderData();
  useEffect(() => {
    if (herb) remember({ kind: "herb", id: herb.id });
  }, [herb]);

  if (!herb) {
    return (
      <main>
        <BackLink to="/herbs" label="All herbs" />
        <h1 className="mt-2 font-serif text-4xl">That herb is not in the atlas yet</h1>
        <p className="mt-2 text-muted">Browse by action. New herbs can be added as another object with a stable id.</p>
      </main>
    );
  }

  const points = pointsForHerb(herb.id);
  const actions = [herb.action, ...herb.also];

  return (
    <article>
      <BackLink to="/herbs" label="All herbs" />
      <header className="mt-2">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm text-earth">{actionLabel(herb.action)}</p>
          <SaveHerbButton id={herb.id} />
        </div>
        <h1 className="font-serif text-4xl leading-tight">{herb.pinyin}</h1>
        <p className="mt-1 font-serif text-2xl text-muted">{herb.hanzi}</p>
        <p className="mt-1 text-lg">{herb.english}</p>
        <p className="mt-1 text-sm text-faint italic">{herb.latin}</p>
        <p className="mt-3 text-base leading-relaxed text-paper">{herb.summary}</p>
      </header>

      <section className="mt-5 rounded-2xl border border-earth/50 bg-panel px-4 py-3">
        <p className="text-sm leading-relaxed text-earth">Not for self-dosing. This page is not a formula, not a strength, and not a substitute for a licensed herbalist or physician.</p>
      </section>

      <section className="mt-6">
        <h2 className="font-serif text-2xl">Category</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {actions.map((action) => (
            <Link key={action} to="/herbs" search={{ ...emptyHerbFilters, action }} className="inline-flex min-h-11 items-center rounded-full bg-panel px-3 text-sm shadow-card">
              {actionLabel(action)}
            </Link>
          ))}
        </div>
        <p className="mt-3 text-base leading-relaxed">
          {natureLabel(herb.nature)} · {herb.flavors.map((flavor) => FLAVOR_LABEL[flavor]).join(", ")}
        </p>
      </section>

      <section className="mt-6">
        <h2 className="font-serif text-2xl">Meridians entered</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {herb.channelIds.map((id) => {
            const channel = getChannel(id);
            return (
              <Link key={id} to="/systems/$systemId" params={{ systemId: id }} className="inline-flex min-h-11 items-center rounded-full bg-panel px-3 text-sm shadow-card">
                {channel?.name ?? id}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="font-serif text-2xl">Traditional uses</h2>
        <p className="mt-2 text-base leading-relaxed text-paper">{herb.uses}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {herb.symptoms.map((symptom) => (
            <Link key={symptom} to="/points" search={{ q: "", region: "", channel: "", element: "", symptom, kind: "", safety: "", action: "" }} className="inline-flex min-h-11 items-center rounded-full bg-panel-2 px-3 text-sm">
              {symptomLabel(symptom)}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="font-serif text-2xl">Common pairings</h2>
        <ul className="mt-2 space-y-3">
          {herb.pairings.map((pairing) => {
            const other = getHerb(pairing.herbId);
            if (!other) return null;
            return (
              <li key={pairing.herbId} className="rounded-2xl bg-panel px-4 py-3 shadow-card">
                <Link to="/herbs/$herbId" params={{ herbId: other.id }} className="font-serif text-xl">
                  {other.pinyin} {other.hanzi}
                </Link>
                <p className="mt-1 text-sm leading-relaxed text-muted">{pairing.idea}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="font-serif text-2xl">Cautions</h2>
        <p className="mt-2 text-base leading-relaxed text-paper">{herb.cautions}</p>
      </section>

      <section className="mt-6">
        <h2 className="font-serif text-2xl">Points with a similar aim</h2>
        {points.length === 0 ? (
          <p className="mt-2 text-sm text-muted">No point in this atlas lists this herb yet. Add the herb id to a point’s herbIds when you extend the set.</p>
        ) : (
          <div className="mt-3 grid gap-3">
            {points.slice(0, 8).map((point) => (
              <PointCard key={point.id} point={point} />
            ))}
          </div>
        )}
      </section>
    </article>
  );
}
