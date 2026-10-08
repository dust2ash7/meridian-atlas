import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ElementDot } from "@/components/pieces";
import { CHANNELS } from "@/data/channels";
import { ELEMENT_TEXT, ELEMENTS } from "@/data/labels";
import { IDEA_ESSAYS, VESSEL_ESSAYS } from "@/data/systems";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/systems/")({
  component: SystemsPage,
});

function SystemsPage() {
  const primary = CHANNELS.filter((channel) => channel.element);
  const midline = CHANNELS.filter((channel) => channel.id === "ren" || channel.id === "du");
  return (
    <main>
      <h1 className="font-serif text-4xl">Systems</h1>
      <p className="mt-2 text-base leading-relaxed text-muted">
        The same map, told as channels, vessels, elements, and the systems that should stay separate.
      </p>

      <Group title="Twelve primary channels">
        {primary.map((channel) => (
          <Row key={channel.id} href={channel.id} title={`${channel.name}`} meta={`${channel.code} · ${channel.polarity} · ${channel.element}`} element={channel.element} />
        ))}
      </Group>

      <Group title="Ren and Du, fully detailed">
        {midline.map((channel) => (
          <Row key={channel.id} href={channel.id} title={channel.name} meta={channel.alias ?? channel.hanzi} element={null} />
        ))}
      </Group>

      <Group title="Other extraordinary vessels">
        {VESSEL_ESSAYS.map((essay) => (
          <Row key={essay.id} href={essay.id} title={essay.title} meta={essay.summary} element={null} />
        ))}
      </Group>

      <Group title="Five elements">
        {ELEMENTS.map((element) => (
          <Link key={element.id} to="/systems/$systemId" params={{ systemId: element.id }} className="flex min-h-16 items-center justify-between rounded-2xl bg-panel px-4 shadow-card">
            <span>
              <span className={cn("block font-serif text-2xl", ELEMENT_TEXT[element.id])}>{element.label}</span>
              <span className="text-sm text-muted">{element.season}</span>
            </span>
          </Link>
        ))}
      </Group>

      <Group title="Pairs, ear, scalp, extra points">
        <Row href="yin-yang" title="Organ pairs and yin-yang" meta="Six pairs, one teaching clock" element={null} />
        {IDEA_ESSAYS.filter((essay) => essay.id !== "yin-yang").map((essay) => (
          <Row key={essay.id} href={essay.id} title={essay.title} meta="Separate from the body meridians" element={null} />
        ))}
        <Row href="extra" title="Extra points" meta="Not on the 14 channels" element={null} />
      </Group>
    </main>
  );
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="mb-3 font-serif text-2xl">{title}</h2>
      <div className="grid gap-2">{children}</div>
    </section>
  );
}

function Row({ href, title, meta, element }: { href: string; title: string; meta: string; element: string | null }) {
  return (
    <Link to="/systems/$systemId" params={{ systemId: href }} className="flex min-h-16 items-center gap-3 rounded-2xl bg-panel px-4 shadow-card">
      <ElementDot element={element} />
      <span>
        <span className="block text-base">{title}</span>
        <span className="text-sm text-muted">{meta}</span>
      </span>
    </Link>
  );
}
