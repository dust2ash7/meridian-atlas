import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BackLink } from "@/components/pieces";
import { getPoint } from "@/data/catalog";
import { DISCLAIMER, safetyLabel } from "@/data/labels";
import { getRoutine } from "@/data/routines";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/routines/$routineId")({
  component: RoutinePage,
});

function RoutinePage() {
  const { routineId } = Route.useParams();
  const routine = getRoutine(routineId);
  const [step, setStep] = useState(0);
  const [timer, setTimer] = useState({ left: 0, running: false });

  useEffect(() => {
    setStep(0);
    setTimer({ left: 0, running: false });
  }, [routineId]);

  useEffect(() => {
    if (!timer.running || timer.left <= 0) return;
    const id = window.setTimeout(() => {
      setTimer((current) => {
        if (!current.running) return current;
        const left = current.left - 1;
        return { left, running: left > 0 };
      });
    }, 1000);
    return () => window.clearTimeout(id);
  }, [timer]);

  if (!routine) {
    return (
      <main>
        <BackLink to="/routines" label="Routines" />
        <h1 className="mt-2 font-serif text-4xl">That routine is not listed</h1>
      </main>
    );
  }

  const current = routine.steps[step];
  const point = current ? getPoint(current.pointId) : undefined;
  const total = routine.steps.reduce((sum, item) => sum + item.seconds, 0);

  function startHold() {
    if (!current || current.seconds <= 0) return;
    setTimer({ left: current.seconds, running: true });
  }

  function stopHold() {
    setTimer((currentTimer) => ({ left: currentTimer.left, running: false }));
  }

  return (
    <article>
      <BackLink to="/routines" label="Routines" />
      <p className="mt-2 text-sm text-earth">Acupressure sequence</p>
      <h1 className="font-serif text-4xl">{routine.title}</h1>
      <p className="mt-2 text-base leading-relaxed text-muted">{routine.aim}</p>
      <p className="mt-3 text-sm leading-relaxed text-faint">{DISCLAIMER}</p>
      <p className="mt-3 text-sm text-faint">
        About {Math.max(1, Math.round(total / 60))} minutes if you hold each step once.
      </p>

      <ol className="mt-4 space-y-2">
        {routine.steps.map((item, index) => {
          const linked = getPoint(item.pointId);
          const on = index === step;
          return (
            <li key={item.pointId}>
              <button
                type="button"
                onClick={() => {
                  setStep(index);
                  setTimer({ left: 0, running: false });
                }}
                className={cn("w-full rounded-2xl px-4 py-3 text-left shadow-card", on ? "bg-panel-2" : "bg-panel")}
              >
                <span className="text-xs text-faint">
                  Step {index + 1} · {item.seconds}s
                </span>
                <span className="mt-1 block font-serif text-2xl">{linked?.code}</span>
                <span className="text-sm text-muted">{linked?.english}</span>
                {linked && linked.safety !== "general" ? (
                  <span className={cn("mt-1 block text-xs", linked.safety === "pregnancy" ? "text-fire" : "text-earth")}>
                    {safetyLabel(linked.safety)}
                  </span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ol>

      {point && current ? (
        <section className="mt-4 rounded-2xl bg-panel px-4 py-4 shadow-card">
          <p className="text-xs tracking-wide text-faint uppercase">Now</p>
          <h2 className="font-serif text-3xl">
            {point.code} {point.pinyin}
          </h2>
          <p className="mt-2 text-base leading-relaxed">{current.how}</p>
          <p className="mt-3 font-serif text-4xl tabular-nums">{timer.running || timer.left > 0 ? timer.left : current.seconds}s</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={startHold} className="min-h-12 rounded-2xl bg-paper px-4 text-sm font-semibold text-ink">
              {timer.running ? "Restart hold" : "Start hold"}
            </button>
            <button type="button" onClick={stopHold} className="min-h-12 rounded-2xl bg-panel-2 px-4 text-sm text-paper">
              Pause
            </button>
            <Link to="/points/$pointId" params={{ pointId: point.id }} className="inline-flex min-h-12 items-center rounded-2xl bg-panel-2 px-4 text-sm text-paper">
              Full point page
            </Link>
          </div>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              disabled={step === 0}
              onClick={() => {
                setStep((value) => Math.max(0, value - 1));
                setTimer({ left: 0, running: false });
              }}
              className="min-h-11 flex-1 rounded-xl bg-panel-2 text-sm disabled:opacity-40"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={step === routine.steps.length - 1}
              onClick={() => {
                setStep((value) => Math.min(routine.steps.length - 1, value + 1));
                setTimer({ left: 0, running: false });
              }}
              className="min-h-11 flex-1 rounded-xl bg-panel-2 text-sm disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </section>
      ) : null}
    </article>
  );
}
