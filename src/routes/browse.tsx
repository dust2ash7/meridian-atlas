import { createFileRoute, Link } from "@tanstack/react-router";
import { BodyRegions, ElementCycle } from "@/components/diagrams";
import { BackLink, ElementDot } from "@/components/pieces";
import { CHANNELS } from "@/data/channels";
import { emptyHerbFilters, emptyPointFilters } from "@/data/catalog";
import { ELEMENTS, ELEMENT_TEXT, HERB_ACTIONS, SYMPTOMS } from "@/data/labels";
import { ROUTINES } from "@/data/routines";
import { IDEA_ESSAYS, VESSEL_ESSAYS } from "@/data/systems";
import { cn } from "@/lib/cn";

const DIMS = ["region", "channel", "symptom", "element", "action", "extra"] as const;

export const Route = createFileRoute("/browse")({
  validateSearch: (search: Record<string, unknown>) => ({
    dim: typeof search.dim === "string" && (DIMS as readonly string[]).includes(search.dim) ? search.dim : "region",
  }),
  component: BrowsePage,
});

function BrowsePage() {
  const { dim } = Route.useSearch();
  return (
    <main>
      <BackLink to="/" label="Explore" />
      {dim === "region" ? <Regions /> : null}
      {dim === "channel" ? <Channels /> : null}
      {dim === "symptom" ? <Symptoms /> : null}
      {dim === "element" ? <Elements /> : null}
      {dim === "action" ? <Actions /> : null}
      {dim === "extra" ? <Extra /> : null}
    </main>
  );
}

function Heading({ title, text }: { title: string; text: string }) {
  return (
    <>
      <h1 className="mt-2 font-serif text-4xl">{title}</h1>
      <p className="mt-2 text-base leading-relaxed text-muted">{text}</p>
    </>
  );
}

function Regions() {
  return (
    <>
      <Heading title="Body regions" text="The drawing faces you. The back is the plate on the right. Tap a button to open that region." />
      <div className="mt-4">
        <BodyRegions />
      </div>
    </>
  );
}

function Channels() {
  return (
    <>
      <Heading title="Meridians" text="Open the channel essay, or jump straight to its points." />
      <ul className="mt-4 grid gap-2">
        {CHANNELS.map((channel) => (
          <li key={channel.id} className="rounded-2xl bg-panel px-4 py-3 shadow-card">
            <div className="flex items-center gap-2">
              <ElementDot element={channel.element} />
              <span className={cn("text-sm", channel.element ? ELEMENT_TEXT[channel.element] : "text-faint")}>
                {channel.element ?? "midline"}
              </span>
            </div>
            <p className="mt-1 font-serif text-2xl">
              {channel.code} · {channel.name}
            </p>
            <p className="text-sm text-muted">{channel.limb}</p>
            <div className="mt-3 flex gap-2">
              <Link to="/systems/$systemId" params={{ systemId: channel.id }} className="inline-flex min-h-11 items-center rounded-full bg-paper px-3 text-sm font-semibold text-ink">
                About
              </Link>
              <Link to="/points" search={{ ...emptyPointFilters, channel: channel.id }} className="inline-flex min-h-11 items-center rounded-full bg-panel-2 px-3 text-sm text-paper">
                Points
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function Symptoms() {
  return (
    <>
      <Heading title="Symptoms and goals" text="These are reasons people look a point up. They are not a symptom checker." />
      <ul className="mt-4 grid gap-2">
        {SYMPTOMS.map((symptom) => (
          <li key={symptom.id}>
            <Link to="/points" search={{ ...emptyPointFilters, symptom: symptom.id }} className="block min-h-16 rounded-2xl bg-panel px-4 py-3 shadow-card">
              <span className="block text-base">{symptom.label}</span>
              <span className="text-sm text-muted">{symptom.hint}</span>
            </Link>
          </li>
        ))}
        <li>
          <Link to="/routines" className="block min-h-16 rounded-2xl bg-panel px-4 py-3 shadow-card">
            <span className="block text-base">Short routines</span>
            <span className="text-sm text-muted">{ROUTINES.length} sequences with timing</span>
          </Link>
        </li>
      </ul>
    </>
  );
}

function Elements() {
  return (
    <>
      <Heading title="Five elements" text="A teaching wheel. The solid path generates. Dashes are the controlling cycle." />
      <div className="mt-4 rounded-2xl bg-panel p-3 shadow-card">
        <ElementCycle />
        <p className="px-2 pb-2 text-center text-sm text-faint">Wood feeds fire, fire feeds earth, earth feeds metal, metal feeds water, water feeds wood.</p>
      </div>
      <ul className="mt-3 grid gap-2">
        {ELEMENTS.map((element) => (
          <li key={element.id}>
            <Link to="/systems/$systemId" params={{ systemId: element.id }} className="flex min-h-16 items-center justify-between rounded-2xl bg-panel px-4 shadow-card">
              <span>
                <span className={cn("block font-serif text-2xl", ELEMENT_TEXT[element.id])}>{element.label}</span>
                <span className="text-sm text-muted">
                  {element.season} · {element.flavor}
                </span>
              </span>
              <span className="text-faint">Open</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

function Actions() {
  return (
    <>
      <Heading title="Herb actions" text="Herbs are grouped by what textbooks say they do, not by a shop aisle." />
      <ul className="mt-4 grid gap-2">
        {HERB_ACTIONS.map((action) => (
          <li key={action.id}>
            <Link to="/herbs" search={{ ...emptyHerbFilters, action: action.id }} className="block min-h-16 rounded-2xl bg-panel px-4 py-3 shadow-card">
              <span className="block text-base">{action.label}</span>
              <span className="text-sm text-muted">{action.hint}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

function Extra() {
  const links = [
    { id: "ren", title: "Ren vessel", text: "Fully detailed, with its own points." },
    { id: "du", title: "Du vessel", text: "Fully detailed, with its own points." },
    ...VESSEL_ESSAYS.map((essay) => ({ id: essay.id, title: essay.title, text: essay.summary })),
    { id: "extra", title: "Extra points", text: "Yintang, Anmian, and the other famous outsiders." },
    ...IDEA_ESSAYS.filter((essay) => essay.id !== "yin-yang").map((essay) => ({ id: essay.id, title: essay.title, text: essay.summary })),
  ];
  return (
    <>
      <Heading title="Extra systems" text="Kept apart from the twelve primary channels so the maps do not blur." />
      <ul className="mt-4 grid gap-2">
        {links.map((link) => (
          <li key={link.id}>
            <Link to="/systems/$systemId" params={{ systemId: link.id }} className="block min-h-16 rounded-2xl bg-panel px-4 py-3 shadow-card">
              <span className="block text-base">{link.title}</span>
              <span className="text-sm text-muted">{link.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
