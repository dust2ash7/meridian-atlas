import { createFileRoute, Link } from "@tanstack/react-router";
import { BackLink, ElementDot, HerbCard, PointCard } from "@/components/pieces";
import { ElementCycle } from "@/components/diagrams";
import { herbsForChannel, pointsInChannel } from "@/data/catalog";
import { CHANNELS, getChannel } from "@/data/channels";
import { ELEMENT_TEXT, ELEMENTS } from "@/data/labels";
import { findEssay, OPENING_POINTS } from "@/data/systems";
import { getPoint } from "@/data/catalog";
import { cn } from "@/lib/cn";
import type { ElementId } from "@/data/types";

export const Route = createFileRoute("/systems/$systemId")({
  component: SystemPage,
});

function SystemPage() {
  const { systemId } = Route.useParams();
  const channel = getChannel(systemId);
  const essay = findEssay(systemId);

  if (channel) return <ChannelPage id={channel.id} />;
  if (essay && ELEMENTS.some((item) => item.id === systemId)) return <ElementPage id={systemId as ElementId} />;
  if (essay && systemId === "yin-yang") return <PairsPage />;
  if (essay) return <EssayPage id={systemId} />;

  return (
    <main>
      <BackLink to="/systems" label="Systems" />
      <h1 className="mt-2 font-serif text-4xl">That system is not written yet</h1>
      <p className="mt-2 text-muted">Choose a channel, a vessel, or an element from the list.</p>
    </main>
  );
}

function ChannelPage({ id }: { id: string }) {
  const channel = getChannel(id)!;
  const points = pointsInChannel(id);
  const herbs = herbsForChannel(id);
  const opening = OPENING_POINTS[id];
  const pair = channel.pairId ? getChannel(channel.pairId) : undefined;
  return (
    <article>
      <BackLink to="/systems" label="Systems" />
      <header className="mt-2">
        <div className="flex items-center gap-2">
          <ElementDot element={channel.element} />
          <p className={cn("text-sm", channel.element ? ELEMENT_TEXT[channel.element] : "text-faint")}>
            {channel.element ? `${channel.element} · ${channel.polarity}` : channel.alias ?? "Extraordinary"}
          </p>
        </div>
        <h1 className="font-serif text-4xl">
          {channel.name} <span className="text-muted">{channel.code}</span>
        </h1>
        <p className="mt-1 font-serif text-xl text-muted">{channel.hanzi}</p>
        <p className="text-sm text-faint">{channel.pinyin}</p>
        {channel.alias ? <p className="mt-2 text-sm text-muted">{channel.alias}</p> : null}
      </header>
      <p className="mt-4 text-base leading-relaxed">{channel.pathway}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{channel.note}</p>
      <ul className="mt-4 grid gap-2">
        {channel.themes.map((theme) => (
          <li key={theme} className="rounded-xl bg-panel px-3 py-2 text-sm text-paper">
            {theme}
          </li>
        ))}
      </ul>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl bg-panel px-3 py-2">
          <dt className="text-xs text-faint">Organ system</dt>
          <dd className="mt-1">{channel.organ}</dd>
        </div>
        <div className="rounded-xl bg-panel px-3 py-2">
          <dt className="text-xs text-faint">Teaching clock</dt>
          <dd className="mt-1">{channel.clock ?? "Not on the organ clock"}</dd>
        </div>
      </dl>
      {pair ? (
        <p className="mt-4 text-sm text-muted">
          Paired with{" "}
          <Link to="/systems/$systemId" params={{ systemId: pair.id }} className="text-earth">
            {pair.name}
          </Link>
          .
        </p>
      ) : null}
      {opening ? <Opening note={opening} /> : null}
      <section className="mt-8">
        <h2 className="font-serif text-2xl">Points in this atlas</h2>
        <p className="mt-1 text-sm text-faint">
          {points.length} of {channel.classicalCount} classical numbers. Add the missing ones in order beside their neighbors.
        </p>
        <div className="mt-3 grid gap-3">
          {points.map((point) => (
            <PointCard key={point.id} point={point} />
          ))}
        </div>
      </section>
      {herbs.length > 0 ? (
        <section className="mt-8">
          <h2 className="font-serif text-2xl">Herbs that enter {channel.name}</h2>
          <div className="mt-3 grid gap-3">
            {herbs.map((herb) => (
              <HerbCard key={herb.id} herb={herb} />
            ))}
          </div>
        </section>
      ) : (
        <p className="mt-6 text-sm text-muted">Herbs in this atlas are described as entering the twelve primary channels, not this vessel.</p>
      )}
    </article>
  );
}

function Opening({ note }: { note: { opening: string; coupled: string; role: string } }) {
  const opening = getPoint(note.opening);
  const coupled = getPoint(note.coupled);
  return (
    <section className="mt-4 rounded-2xl bg-panel px-4 py-3 shadow-card">
      <h2 className="font-serif text-xl">Opening point</h2>
      <p className="mt-1 text-sm text-muted">{note.role}</p>
      <div className="mt-3 grid gap-2">
        {opening ? <PointCard point={opening} /> : null}
        {coupled ? <PointCard point={coupled} /> : null}
      </div>
    </section>
  );
}

function ElementPage({ id }: { id: ElementId }) {
  const essay = findEssay(id)!;
  const channels = CHANNELS.filter((channel) => channel.element === id);
  return (
    <article>
      <BackLink to="/systems" label="Systems" />
      <p className={cn("mt-2 text-sm", ELEMENT_TEXT[id])}>Five elements</p>
      <h1 className="font-serif text-4xl">{essay.title}</h1>
      <p className="mt-2 text-muted">{essay.summary}</p>
      <div className="mt-4 rounded-2xl bg-panel p-3 shadow-card">
        <ElementCycle highlight={id} />
      </div>
      {essay.paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 24)} className="mt-4 text-base leading-relaxed">
          {paragraph}
        </p>
      ))}
      <section className="mt-6 grid gap-2">
        {channels.map((channel) => (
          <Link key={channel.id} to="/systems/$systemId" params={{ systemId: channel.id }} className="min-h-14 rounded-2xl bg-panel px-4 py-3 shadow-card">
            <span className="font-serif text-xl">{channel.name}</span>
            <span className="mt-1 block text-sm text-muted">{channel.polarity} · {channel.limb}</span>
          </Link>
        ))}
      </section>
      <section className="mt-6">
        <h2 className="font-serif text-2xl">Herbs that enter these channels</h2>
        <div className="mt-3 grid gap-3">
          {channels.flatMap((channel) => herbsForChannel(channel.id)).filter((herb, index, list) => list.findIndex((item) => item.id === herb.id) === index).slice(0, 8).map((herb) => (
            <HerbCard key={herb.id} herb={herb} />
          ))}
        </div>
      </section>
    </article>
  );
}

function PairsPage() {
  const essay = findEssay("yin-yang")!;
  const pairs = [
    ["lu", "li"],
    ["st", "sp"],
    ["ht", "si"],
    ["bl", "ki"],
    ["pc", "sj"],
    ["gb", "lv"],
  ] as const;
  return (
    <article>
      <BackLink to="/systems" label="Systems" />
      <h1 className="mt-2 font-serif text-4xl">{essay.title}</h1>
      {essay.paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 20)} className="mt-3 text-base leading-relaxed">
          {paragraph}
        </p>
      ))}
      <ul className="mt-4 grid gap-2">
        {pairs.map(([a, b]) => {
          const left = getChannel(a)!;
          const right = getChannel(b)!;
          return (
            <li key={a} className="rounded-2xl bg-panel px-4 py-3 shadow-card">
              <p className={cn("text-xs", left.element ? ELEMENT_TEXT[left.element] : "")}>{left.element}</p>
              <p className="mt-1 text-base">
                <Link to="/systems/$systemId" params={{ systemId: left.id }} className="text-paper">
                  {left.name}
                </Link>
                <span className="text-faint"> · {left.polarity} · </span>
                <Link to="/systems/$systemId" params={{ systemId: right.id }} className="text-paper">
                  {right.name}
                </Link>
                <span className="text-faint"> · {right.polarity}</span>
              </p>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

function EssayPage({ id }: { id: string }) {
  const essay = findEssay(id)!;
  const opening = OPENING_POINTS[id];
  return (
    <article>
      <BackLink to="/systems" label="Systems" />
      <p className="mt-2 text-sm text-earth">{essay.eyebrow}</p>
      <h1 className="font-serif text-4xl">{essay.title}</h1>
      <p className="mt-2 text-muted">{essay.summary}</p>
      {essay.paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 28)} className="mt-4 text-base leading-relaxed">
          {paragraph}
        </p>
      ))}
      {opening ? <Opening note={opening} /> : null}
    </article>
  );
}
