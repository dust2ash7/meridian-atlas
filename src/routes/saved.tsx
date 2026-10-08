import { createFileRoute, Link } from "@tanstack/react-router";
import { HerbCard, PointCard } from "@/components/pieces";
import { getHerb, getPoint } from "@/data/catalog";
import { useSaved } from "@/lib/saved";

export const Route = createFileRoute("/saved")({
  component: SavedPage,
});

function SavedPage() {
  const saved = useSaved();
  const points = saved.points.map((id) => getPoint(id)).filter((point) => point != null);
  const herbs = saved.herbs.map((id) => getHerb(id)).filter((herb) => herb != null);
  const recent = saved.recent
    .map((item) => {
      if (item.kind === "point") {
        const point = getPoint(item.id);
        return point ? { kind: "point" as const, point } : null;
      }
      const herb = getHerb(item.id);
      return herb ? { kind: "herb" as const, herb } : null;
    })
    .filter((item) => item != null);

  const empty = points.length === 0 && herbs.length === 0 && recent.length === 0;

  return (
    <main>
      <h1 className="font-serif text-4xl">Saved</h1>
      <p className="mt-2 text-base leading-relaxed text-muted">Kept on this device only. No account.</p>

      {empty ? (
        <div className="mt-4 rounded-2xl bg-panel px-4 py-5 shadow-card">
          <h2 className="font-serif text-2xl">Nothing saved yet</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">Open a point or an herb and tap Save. Or start from a category if you are not sure where to look.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link to="/browse" search={{ dim: "symptom" }} className="inline-flex min-h-11 items-center rounded-full bg-paper px-3 text-sm font-semibold text-ink">
              By symptom
            </Link>
            <Link to="/browse" search={{ dim: "region" }} className="inline-flex min-h-11 items-center rounded-full bg-panel-2 px-3 text-sm">
              By region
            </Link>
            <Link to="/routines" className="inline-flex min-h-11 items-center rounded-full bg-panel-2 px-3 text-sm">
              Routines
            </Link>
          </div>
        </div>
      ) : null}

      <section className="mt-6">
        <h2 className="font-serif text-2xl">Points</h2>
        {points.length === 0 ? (
          <p className="mt-2 text-sm text-faint">No saved points.</p>
        ) : (
          <div className="mt-3 grid gap-3">
            {points.map((point) => (
              <PointCard key={point.id} point={point} />
            ))}
          </div>
        )}
      </section>

      <section className="mt-6">
        <h2 className="font-serif text-2xl">Herbs</h2>
        {herbs.length === 0 ? (
          <p className="mt-2 text-sm text-faint">No saved herbs.</p>
        ) : (
          <div className="mt-3 grid gap-3">
            {herbs.map((herb) => (
              <HerbCard key={herb.id} herb={herb} />
            ))}
          </div>
        )}
      </section>

      <section className="mt-6">
        <h2 className="font-serif text-2xl">Recently viewed</h2>
        {recent.length === 0 ? (
          <p className="mt-2 text-sm text-faint">Pages you open will collect here.</p>
        ) : (
          <div className="mt-3 grid gap-3">
            {recent.map((item) =>
              item.kind === "point" ? <PointCard key={`p-${item.point.id}`} point={item.point} /> : <HerbCard key={`h-${item.herb.id}`} herb={item.herb} />,
            )}
          </div>
        )}
      </section>
    </main>
  );
}
