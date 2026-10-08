import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { BackLink, HerbCard, PointCard, RoleLine, SavePointButton } from "@/components/pieces";
import { ELECTRO_COPY, emptyPointFilters, getPoint, herbsForPoint, relatedPoints } from "@/data/catalog";
import { getChannel } from "@/data/channels";
import { ELEMENT_TEXT, regionLabel, safetyLabel, symptomLabel } from "@/data/labels";
import { remember } from "@/lib/saved";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/points/$pointId")({
  loader: ({ params }) => getPoint(params.pointId) ?? null,
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData ? `${loaderData.code} ${loaderData.pinyin} · Meridian Atlas` : "Point · Meridian Atlas" }],
  }),
  component: PointPage,
});

function PointPage() {
  const point = Route.useLoaderData();
  useEffect(() => {
    if (point) remember({ kind: "point", id: point.id });
  }, [point]);

  if (!point) {
    return (
      <main>
        <BackLink to="/points" label="All points" />
        <h1 className="mt-2 font-serif text-4xl">That point is not in the atlas yet</h1>
        <p className="mt-2 text-muted">The id may be mistyped. Browse the channels and add missing numbers later beside their neighbors.</p>
      </main>
    );
  }

  const channel = getChannel(point.channelId);
  const herbs = herbsForPoint(point);
  const related = relatedPoints(point);
  const element = channel?.element;

  return (
    <article>
      <BackLink to="/points" label="All points" />
      <header className="mt-2">
        <div className="flex items-start justify-between gap-3">
          <p className={cn("text-sm", element ? ELEMENT_TEXT[element] : "text-faint")}>
            {channel?.name ?? "Extra"}
            {point.kinds.includes("extra") ? " · Extra point" : ""}
          </p>
          <SavePointButton id={point.id} />
        </div>
        <h1 className="font-serif text-5xl leading-none">{point.code}</h1>
        <p className="mt-2 font-serif text-2xl">
          {point.hanzi} · {point.pinyin}
        </p>
        <p className="mt-1 text-lg text-muted">{point.english}</p>
        <p className="mt-3 text-base leading-relaxed text-paper">{point.summary}</p>
        <RoleLine point={point} />
        {point.safety !== "general" ? (
          <p className={cn("mt-2 text-sm", point.safety === "pregnancy" ? "text-fire" : "text-earth")}>{safetyLabel(point.safety)}</p>
        ) : null}
      </header>

      <Section title="System">
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <Fact label="Channel" value={channel ? `${channel.name} (${channel.code})` : "Extra"} />
          <Fact label="Element" value={element ? element[0].toUpperCase() + element.slice(1) : "Not one of the five"} />
          <Fact label="Yin or yang" value={channel?.polarity ? channel.polarity : "Extra point"} />
          <Fact label="Organ system" value={channel?.organ ?? "Extra points"} />
          <Fact label="Region" value={regionLabel(point.region)} />
          <Fact label="Limb rule" value={channel?.limb ?? "—"} />
        </dl>
        {channel ? (
          <Link to="/systems/$systemId" params={{ systemId: channel.id }} className="mt-3 inline-flex min-h-11 items-center text-sm text-earth">
            Open the {channel.name} page
          </Link>
        ) : null}
      </Section>

      <Section title="Where it is">
        <p className="text-base leading-relaxed text-paper">{point.location}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">Nearby: {point.nearby}</p>
      </Section>

      <Section title="Traditionally said to">
        <p className="text-base leading-relaxed text-paper">{point.actions}</p>
      </Section>

      <Section title="What people look up">
        <div className="flex flex-wrap gap-2">
          {point.symptoms.map((symptom) => (
            <Link
              key={symptom}
              to="/points"
              search={{ ...emptyPointFilters, symptom }}
              className="inline-flex min-h-11 items-center rounded-full bg-panel-2 px-3 text-sm text-paper"
            >
              {symptomLabel(symptom)}
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Acupressure">
        <p className="text-base leading-relaxed text-paper">{point.press}</p>
        <p className="mt-2 text-sm leading-relaxed text-earth">When not to press: {point.skip}</p>
        <p className="mt-2 text-sm text-faint">About 30–90 seconds is the usual window, unless the step above is shorter. Stop if pain, dizziness, or anything unusual shows up.</p>
      </Section>

      <section className="mt-4 rounded-2xl border border-fire/40 bg-panel px-4 py-4">
        <h2 className="text-xs tracking-wide text-fire uppercase">Licensed practice only</h2>
        <p className="mt-2 font-serif text-2xl">Needle depth, angle, electroacupuncture</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Textbook language for students. Not instructions. A cun is a body-inch on that person, not a ruler inch. Do not needle yourself.
        </p>
        <h3 className="mt-4 text-sm text-faint">Depth</h3>
        <p className="mt-1 text-base leading-relaxed">{point.needleDepth}</p>
        <h3 className="mt-4 text-sm text-faint">Angle</h3>
        <p className="mt-1 text-base leading-relaxed">{point.needleAngle}</p>
        <h3 className="mt-4 text-sm text-faint">Electroacupuncture</h3>
        <p className="mt-1 text-base leading-relaxed">{ELECTRO_COPY[point.electro]}</p>
      </section>

      {related.length > 0 ? (
        <Section title="Nearby on this channel">
          <div className="grid gap-3">
            {related.map((item) => (
              <PointCard key={item.id} point={item} />
            ))}
          </div>
        </Section>
      ) : null}

      {herbs.length > 0 ? (
        <Section title="Herbs often paired for a similar pattern">
          <p className="mb-3 text-sm text-muted">A study link, not a formula and not a dose.</p>
          <div className="grid gap-3">
            {herbs.map((herb) => (
              <HerbCard key={herb.id} herb={herb} />
            ))}
          </div>
        </Section>
      ) : null}

      {point.tags.length > 0 ? (
        <Section title="Tags">
          <p className="text-sm leading-relaxed text-faint">{point.tags.join(" · ")}</p>
        </Section>
      ) : null}
    </article>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-6">
      <h2 className="font-serif text-2xl">{title}</h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-panel px-3 py-2">
      <dt className="text-xs text-faint">{label}</dt>
      <dd className="mt-1 text-paper capitalize">{value}</dd>
    </div>
  );
}
