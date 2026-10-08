import { SlidersHorizontal, X } from "lucide-react";
import type { ReactNode } from "react";
import { CHANNELS } from "@/data/channels";
import { HERB_ACTIONS, KINDS, REGIONS, SAFETY, SYMPTOMS, ELEMENTS } from "@/data/labels";
import type { HerbFilters, PointFilters } from "@/data/types";
import { cn } from "@/lib/cn";

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="mt-4">
      <legend className="text-xs tracking-wide text-faint uppercase">{title}</legend>
      <div className="mt-2 flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

function Option({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn("min-h-11 rounded-full px-3 text-sm", selected ? "bg-paper text-ink" : "bg-panel-2 text-muted")}
    >
      {label}
    </button>
  );
}

export function FilterButton({ count, onClick }: { count: number; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex min-h-12 items-center gap-2 rounded-2xl bg-panel px-3 text-sm text-paper shadow-card">
      <SlidersHorizontal className="size-4" />
      Filter
      {count > 0 ? <span className="rounded-full bg-earth px-2 py-0.5 text-xs text-ink">{count}</span> : null}
    </button>
  );
}

export function Sheet({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/75">
      <button type="button" className="absolute inset-0 z-0" aria-label="Close filters" onClick={onClose} />
      <div className="sheet-pad relative z-10 max-h-[86vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-panel px-4 pt-3 shadow-card">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-line" />
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-serif text-2xl">{title}</h2>
          <button type="button" onClick={onClose} className="grid size-11 place-items-center rounded-full bg-panel-2" aria-label="Close">
            <X className="size-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function PointFilterSheet({
  value,
  onChange,
  onClose,
  onClear,
}: {
  value: PointFilters;
  onChange: (next: PointFilters) => void;
  onClose: () => void;
  onClear: () => void;
}) {
  const set = (key: keyof PointFilters, next: string) => onChange({ ...value, [key]: value[key] === next ? "" : next });
  return (
    <Sheet title="Organize points" onClose={onClose}>
      <Group title="Body region">
        {REGIONS.map((item) => (
          <Option key={item.id} label={item.label} selected={value.region === item.id} onClick={() => set("region", item.id)} />
        ))}
      </Group>
      <Group title="Channel">
        {CHANNELS.filter((channel) => channel.id !== "extra").map((channel) => (
          <Option key={channel.id} label={channel.name} selected={value.channel === channel.id} onClick={() => set("channel", channel.id)} />
        ))}
        <Option label="Extra points" selected={value.channel === "extra"} onClick={() => set("channel", "extra")} />
      </Group>
      <Group title="Element">
        {ELEMENTS.map((item) => (
          <Option key={item.id} label={item.label} selected={value.element === item.id} onClick={() => set("element", item.id)} />
        ))}
      </Group>
      <Group title="Symptom or goal">
        {SYMPTOMS.map((item) => (
          <Option key={item.id} label={item.label} selected={value.symptom === item.id} onClick={() => set("symptom", item.id)} />
        ))}
      </Group>
      <Group title="Point type">
        {KINDS.map((item) => (
          <Option key={item.id} label={item.label} selected={value.kind === item.id} onClick={() => set("kind", item.id)} />
        ))}
      </Group>
      <Group title="Herb action of a paired herb">
        {HERB_ACTIONS.map((item) => (
          <Option key={item.id} label={item.label} selected={value.action === item.id} onClick={() => set("action", item.id)} />
        ))}
      </Group>
      <Group title="Safety">
        {SAFETY.map((item) => (
          <Option key={item.id} label={item.label} selected={value.safety === item.id} onClick={() => set("safety", item.id)} />
        ))}
      </Group>
      <div className="mt-6 flex gap-2">
        <button type="button" onClick={onClear} className="min-h-12 flex-1 rounded-2xl bg-panel-2 text-sm text-paper">
          Clear
        </button>
        <button type="button" onClick={onClose} className="min-h-12 flex-1 rounded-2xl bg-paper text-sm font-semibold text-ink">
          Show results
        </button>
      </div>
    </Sheet>
  );
}

export function HerbFilterSheet({
  value,
  onChange,
  onClose,
  onClear,
}: {
  value: HerbFilters;
  onChange: (next: HerbFilters) => void;
  onClose: () => void;
  onClear: () => void;
}) {
  const set = (key: keyof HerbFilters, next: string) => onChange({ ...value, [key]: value[key] === next ? "" : next });
  return (
    <Sheet title="Organize herbs" onClose={onClose}>
      <Group title="Action">
        {HERB_ACTIONS.map((item) => (
          <Option key={item.id} label={item.label} selected={value.action === item.id} onClick={() => set("action", item.id)} />
        ))}
      </Group>
      <Group title="Meridian entered">
        {CHANNELS.filter((channel) => channel.element).map((channel) => (
          <Option key={channel.id} label={channel.name} selected={value.channel === channel.id} onClick={() => set("channel", channel.id)} />
        ))}
      </Group>
      <Group title="Element of a meridian entered">
        {ELEMENTS.map((item) => (
          <Option key={item.id} label={item.label} selected={value.element === item.id} onClick={() => set("element", item.id)} />
        ))}
      </Group>
      <Group title="Symptom or goal">
        {SYMPTOMS.map((item) => (
          <Option key={item.id} label={item.label} selected={value.symptom === item.id} onClick={() => set("symptom", item.id)} />
        ))}
      </Group>
      <Group title="Linked body region">
        {REGIONS.map((item) => (
          <Option key={item.id} label={item.label} selected={value.region === item.id} onClick={() => set("region", item.id)} />
        ))}
      </Group>
      <div className="mt-6 flex gap-2">
        <button type="button" onClick={onClear} className="min-h-12 flex-1 rounded-2xl bg-panel-2 text-sm text-paper">
          Clear
        </button>
        <button type="button" onClick={onClose} className="min-h-12 flex-1 rounded-2xl bg-paper text-sm font-semibold text-ink">
          Show results
        </button>
      </div>
    </Sheet>
  );
}
