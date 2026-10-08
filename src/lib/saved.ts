import { useEffect, useSyncExternalStore } from "react";

const KEY = "meridian-atlas-v1";

export type RecentItem = { kind: "point" | "herb"; id: string };

type Persisted = {
  points: string[];
  herbs: string[];
  recent: RecentItem[];
  accepted: boolean;
};

const empty: Persisted = { points: [], herbs: [], recent: [], accepted: false };

let data: Persisted = empty;
let ready = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* private mode */
  }
  emit();
}

function sanitize(parsed: Partial<Persisted>): Persisted {
  const strings = (value: unknown) =>
    Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
  const recent = Array.isArray(parsed.recent)
    ? parsed.recent.filter(
        (item): item is RecentItem =>
          !!item &&
          typeof item === "object" &&
          (item.kind === "point" || item.kind === "herb") &&
          typeof item.id === "string",
      )
    : [];
  return {
    points: strings(parsed.points),
    herbs: strings(parsed.herbs),
    recent: recent.slice(0, 12),
    accepted: parsed.accepted === true,
  };
}

export function hydrateSaved() {
  if (ready || typeof localStorage === "undefined") return;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) data = sanitize(JSON.parse(raw) as Partial<Persisted>);
  } catch {
    data = empty;
  }
  ready = true;
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return ready ? data : empty;
}

export function useSaved() {
  const state = useSyncExternalStore(subscribe, getSnapshot, () => empty);
  useEffect(() => {
    hydrateSaved();
  }, []);
  return state;
}

export function toggleSavedPoint(id: string) {
  hydrateSaved();
  const has = data.points.includes(id);
  data = { ...data, points: has ? data.points.filter((item) => item !== id) : [id, ...data.points] };
  persist();
}

export function toggleSavedHerb(id: string) {
  hydrateSaved();
  const has = data.herbs.includes(id);
  data = { ...data, herbs: has ? data.herbs.filter((item) => item !== id) : [id, ...data.herbs] };
  persist();
}

export function remember(item: RecentItem) {
  hydrateSaved();
  const recent = [item, ...data.recent.filter((entry) => !(entry.kind === item.kind && entry.id === item.id))].slice(0, 12);
  data = { ...data, recent };
  persist();
}

export function acceptDisclaimer() {
  hydrateSaved();
  data = { ...data, accepted: true };
  persist();
}
