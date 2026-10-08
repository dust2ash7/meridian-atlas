import { createFileRoute, Link } from "@tanstack/react-router";
import { DISCLAIMER } from "@/data/labels";
import { ROUTINES } from "@/data/routines";
import { getPoint } from "@/data/catalog";

export const Route = createFileRoute("/routines/")({
  component: RoutinesPage,
});

function RoutinesPage() {
  return (
    <main>
      <h1 className="font-serif text-4xl">Routines</h1>
      <p className="mt-2 text-base leading-relaxed text-muted">Six short sequences. Three to five points, with a suggested hold. Pressure only.</p>
      <p className="mt-3 text-sm leading-relaxed text-faint">{DISCLAIMER}</p>
      <ul className="mt-4 grid gap-3">
        {ROUTINES.map((routine) => {
          const seconds = routine.steps.reduce((sum, step) => sum + step.seconds, 0);
          return (
            <li key={routine.id}>
              <Link to="/routines/$routineId" params={{ routineId: routine.id }} className="block rounded-2xl bg-panel px-4 py-4 shadow-card">
                <p className="font-serif text-2xl">{routine.title}</p>
                <p className="mt-1 text-sm text-faint">
                  {routine.steps.length} points · about {Math.round(seconds / 60)} min
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{routine.aim}</p>
                <p className="mt-2 text-xs text-earth">
                  {routine.steps.map((step) => getPoint(step.pointId)?.code).filter(Boolean).join(" · ")}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
