import { CHANNELS, CHANNEL_ORDER, getChannel } from "./channels";
import { HERBS } from "./herbs";
import { actionLabel, elementLabel, kindLabel, regionLabel, symptomLabel } from "./labels";
import { LOWER_POINTS } from "./points-lower";
import { REST_POINTS } from "./points-rest";
import { UPPER_POINTS } from "./points-upper";
import { getRoutine, ROUTINES } from "./routines";
import type { ElectroId, Herb, HerbFilters, Point, PointFilters } from "./types";

/**
 * All shipped points. To add a classical point, put it in the file for its
 * channel (upper arm, lower/back, or ren-du-extra) with the right `order`.
 * Keep the id stable: saves and links use it.
 */
export const POINTS: Point[] = [...UPPER_POINTS, ...LOWER_POINTS, ...REST_POINTS];

export { CHANNELS, HERBS, ROUTINES, getChannel, getRoutine };

const pointIds = new Set<string>();
for (const point of POINTS) {
  if (pointIds.has(point.id)) throw new Error(`Duplicate point id: ${point.id}`);
  pointIds.add(point.id);
  if (!getChannel(point.channelId)) throw new Error(`Unknown channel on ${point.id}`);
}

const herbIds = new Set(HERBS.map((herb) => herb.id));
if (herbIds.size !== HERBS.length) throw new Error("Duplicate herb id");

for (const herb of HERBS) {
  for (const pairing of herb.pairings) {
    if (!herbIds.has(pairing.herbId)) throw new Error(`${herb.id} pairs unknown herb ${pairing.herbId}`);
  }
  for (const channelId of herb.channelIds) {
    if (!getChannel(channelId)) throw new Error(`${herb.id} enters unknown channel ${channelId}`);
  }
}

for (const point of POINTS) {
  for (const herbId of point.herbIds) {
    if (!herbIds.has(herbId)) throw new Error(`${point.id} lists unknown herb ${herbId}`);
  }
}

for (const routine of ROUTINES) {
  for (const step of routine.steps) {
    if (!pointIds.has(step.pointId)) throw new Error(`${routine.id} missing point ${step.pointId}`);
  }
}

export const emptyPointFilters: PointFilters = {
  q: "",
  region: "",
  channel: "",
  element: "",
  symptom: "",
  kind: "",
  safety: "",
  action: "",
};

export const emptyHerbFilters: HerbFilters = {
  q: "",
  action: "",
  channel: "",
  symptom: "",
  element: "",
  region: "",
};

export function norm(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "");
}

function pointBlob(point: Point) {
  const channel = getChannel(point.channelId);
  return norm(
    [
      point.code,
      point.pinyin,
      point.hanzi,
      point.english,
      point.location,
      point.actions,
      point.summary,
      point.nearby,
      point.roles.join(" "),
      point.tags.join(" "),
      point.symptoms.map(symptomLabel).join(" "),
      regionLabel(point.region),
      channel?.name ?? "",
      channel?.alias ?? "",
      channel?.code ?? "",
      channel?.pinyin ?? "",
      elementLabel(channel?.element ?? ""),
    ].join(" "),
  );
}

function herbBlob(herb: Herb) {
  return norm(
    [
      herb.pinyin,
      herb.hanzi,
      herb.english,
      herb.latin,
      herb.uses,
      herb.summary,
      herb.cautions,
      herb.tags.join(" "),
      herb.flavors.join(" "),
      herb.nature,
      actionLabel(herb.action),
      herb.also.map(actionLabel).join(" "),
      herb.symptoms.map(symptomLabel).join(" "),
      herb.channelIds.map((id) => getChannel(id)?.name ?? id).join(" "),
    ].join(" "),
  );
}

const pointSearch = new Map(POINTS.map((point) => [point.id, pointBlob(point)]));
const herbSearch = new Map(HERBS.map((herb) => [herb.id, herbBlob(herb)]));

export function getPoint(id: string) {
  return POINTS.find((point) => point.id === id);
}

export function getHerb(id: string) {
  return HERBS.find((herb) => herb.id === id);
}

function channelRank(id: string) {
  const index = CHANNEL_ORDER.indexOf(id);
  return index === -1 ? 99 : index;
}

export function comparePoints(a: Point, b: Point) {
  const channel = channelRank(a.channelId) - channelRank(b.channelId);
  if (channel !== 0) return channel;
  return a.order - b.order;
}

export function pointsInChannel(channelId: string) {
  return POINTS.filter((point) => point.channelId === channelId).sort(comparePoints);
}

export function filterPoints(filters: PointFilters) {
  const query = norm(filters.q);
  return POINTS.filter((point) => {
    const channel = getChannel(point.channelId);
    if (query && !pointSearch.get(point.id)?.includes(query)) return false;
    if (filters.region && point.region !== filters.region) return false;
    if (filters.channel && point.channelId !== filters.channel) return false;
    if (filters.element && channel?.element !== filters.element) return false;
    if (filters.symptom && !point.symptoms.includes(filters.symptom as Point["symptoms"][number])) return false;
    if (filters.kind && !point.kinds.includes(filters.kind as Point["kinds"][number])) return false;
    if (filters.safety && point.safety !== filters.safety) return false;
    if (filters.action) {
      const matched = point.herbIds.some((id) => {
        const herb = getHerb(id);
        return herb?.action === filters.action || herb?.also.includes(filters.action as Herb["action"]);
      });
      if (!matched) return false;
    }
    return true;
  }).sort(comparePoints);
}

export function filterHerbs(filters: HerbFilters) {
  const query = norm(filters.q);
  return HERBS.filter((herb) => {
    if (query && !herbSearch.get(herb.id)?.includes(query)) return false;
    if (filters.action && herb.action !== filters.action && !herb.also.includes(filters.action as Herb["action"])) return false;
    if (filters.channel && !herb.channelIds.includes(filters.channel)) return false;
    if (filters.symptom && !herb.symptoms.includes(filters.symptom as Herb["symptoms"][number])) return false;
    if (filters.element) {
      const enters = herb.channelIds.some((id) => getChannel(id)?.element === filters.element);
      if (!enters) return false;
    }
    if (filters.region) {
      const linked = POINTS.some((point) => point.region === filters.region && point.herbIds.includes(herb.id));
      if (!linked) return false;
    }
    return true;
  }).sort((a, b) => a.pinyin.localeCompare(b.pinyin));
}

export function searchAll(q: string) {
  const filters = { ...emptyPointFilters, q };
  const herbFilters = { ...emptyHerbFilters, q };
  return {
    points: q.trim() ? filterPoints(filters) : [],
    herbs: q.trim() ? filterHerbs(herbFilters) : [],
  };
}

export function relatedPoints(point: Point) {
  const family = pointsInChannel(point.channelId);
  const index = family.findIndex((item) => item.id === point.id);
  const picked: Point[] = [];
  for (let distance = 1; distance < family.length && picked.length < 4; distance += 1) {
    const before = family[index - distance];
    const after = family[index + distance];
    if (before) picked.push(before);
    if (after) picked.push(after);
  }
  return picked.slice(0, 6);
}

export function herbsForPoint(point: Point) {
  return point.herbIds.map((id) => getHerb(id)).filter((herb): herb is Herb => Boolean(herb));
}

export function pointsForHerb(herbId: string) {
  return POINTS.filter((point) => point.herbIds.includes(herbId)).sort(comparePoints);
}

export function herbsForChannel(channelId: string) {
  return HERBS.filter((herb) => herb.channelIds.includes(channelId)).sort((a, b) => a.pinyin.localeCompare(b.pinyin));
}

export function activePointFilterCount(filters: PointFilters) {
  return [filters.region, filters.channel, filters.element, filters.symptom, filters.kind, filters.safety, filters.action].filter(Boolean).length;
}

export function activeHerbFilterCount(filters: HerbFilters) {
  return [filters.action, filters.channel, filters.symptom, filters.element, filters.region].filter(Boolean).length;
}

export const ELECTRO_COPY: Record<ElectroId, string> = {
  none: "Introductory charts rarely assign a standard electroacupuncture setting here. Clinics that use current choose frequency and intensity for that person. No milliamp figure is given, because copying one would be misleading.",
  "pain-research":
    "Some pain studies have used low-frequency stimulation on this point, often near 2 Hz or a dense-disperse pattern such as 2/100 Hz, at a gentle muscle twitch. Protocols disagree, and the numbers are not a setting to reproduce. No milliamp dose is listed.",
  "nausea-research":
    "Nausea research has often used PC6, sometimes with gentle electrical stimulation reported around 10–25 Hz in supervised trials. Devices, side of the body, and intensity were chosen by clinicians. Do not improvise a device. No milliamp dose is listed.",
};

export const FEATURED_POINT_IDS = ["li4", "st36", "lv3", "pc6", "gb20", "ht7", "yintang", "sp6"];

export function pointFilterLabels(filters: PointFilters) {
  const chips: { key: keyof PointFilters; label: string }[] = [];
  if (filters.region) chips.push({ key: "region", label: regionLabel(filters.region) });
  if (filters.channel) chips.push({ key: "channel", label: getChannel(filters.channel)?.name ?? filters.channel });
  if (filters.element) chips.push({ key: "element", label: elementLabel(filters.element) });
  if (filters.symptom) chips.push({ key: "symptom", label: symptomLabel(filters.symptom) });
  if (filters.kind) chips.push({ key: "kind", label: kindLabel(filters.kind) });
  if (filters.safety) {
    const label =
      filters.safety === "pregnancy" ? "Pregnancy avoid" : filters.safety === "caution" ? "Use caution" : "General acupressure";
    chips.push({ key: "safety", label });
  }
  if (filters.action) chips.push({ key: "action", label: actionLabel(filters.action) });
  return chips;
}

export function readPointFilters(search: Record<string, unknown>): PointFilters {
  const str = (key: keyof PointFilters) => (typeof search[key] === "string" ? search[key] : "");
  return {
    q: str("q"),
    region: str("region"),
    channel: str("channel"),
    element: str("element"),
    symptom: str("symptom"),
    kind: str("kind"),
    safety: str("safety"),
    action: str("action"),
  };
}

/** Only the filters that are actually set, so a plain /points URL can render without a redirect. */
export function filtersFromPointSearch(search: Record<string, unknown>): Partial<PointFilters> {
  const full = readPointFilters(search);
  const set: Partial<PointFilters> = {};
  (Object.keys(full) as (keyof PointFilters)[]).forEach((key) => {
    if (full[key]) set[key] = full[key];
  });
  return set;
}

export function readHerbFilters(search: Record<string, unknown>): HerbFilters {
  const str = (key: keyof HerbFilters) => (typeof search[key] === "string" ? search[key] : "");
  return {
    q: str("q"),
    action: str("action"),
    channel: str("channel"),
    symptom: str("symptom"),
    element: str("element"),
    region: str("region"),
  };
}

export function filtersFromHerbSearch(search: Record<string, unknown>): Partial<HerbFilters> {
  const full = readHerbFilters(search);
  const set: Partial<HerbFilters> = {};
  (Object.keys(full) as (keyof HerbFilters)[]).forEach((key) => {
    if (full[key]) set[key] = full[key];
  });
  return set;
}
