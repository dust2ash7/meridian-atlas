export type ElementId = "wood" | "fire" | "earth" | "metal" | "water";
export type Polarity = "yin" | "yang";

export type RegionId =
  | "head-face"
  | "neck"
  | "chest"
  | "abdomen"
  | "back"
  | "shoulder-arm"
  | "hand"
  | "hip-leg"
  | "foot"
  | "ear";

export type SymptomId =
  | "pain"
  | "headache"
  | "stress"
  | "sleep"
  | "digestion"
  | "nausea"
  | "immunity"
  | "womens"
  | "energy"
  | "breathing"
  | "tension"
  | "ed"
  | "memory"
  | "worry"
  | "dizziness"
  | "eyes"
  | "ears"
  | "sinus"
  | "low-back"
  | "constipation"
  | "urinary"
  | "cold"
  | "palpitations"
  | "joints";

export type KindId =
  | "source"
  | "luo"
  | "xi-cleft"
  | "front-mu"
  | "back-shu"
  | "five-shu"
  | "command"
  | "extra"
  | "opening"
  | "influential";

export type SafetyId = "general" | "caution" | "pregnancy";
export type ElectroId = "none" | "pain-research" | "nausea-research";

export type HerbActionId =
  | "release-exterior"
  | "clear-heat"
  | "drain-damp"
  | "transform-phlegm"
  | "move-qi"
  | "move-blood"
  | "tonify-qi"
  | "tonify-blood"
  | "tonify-yang"
  | "tonify-yin"
  | "calm-shen"
  | "extinguish-wind"
  | "stabilize-bind";

export type NatureId = "hot" | "warm" | "neutral" | "cool" | "cold";
export type FlavorId = "acrid" | "bitter" | "sweet" | "sour" | "salty" | "bland" | "astringent";

export type Point = {
  id: string;
  code: string;
  pinyin: string;
  hanzi: string;
  english: string;
  channelId: string;
  /** Classical point number. Insert missing points beside their neighbors. */
  order: number;
  region: RegionId;
  location: string;
  nearby: string;
  actions: string;
  summary: string;
  symptoms: SymptomId[];
  kinds: KindId[];
  roles: string[];
  safety: SafetyId;
  press: string;
  skip: string;
  /** Textbook-style note for students. Not a needling instruction. */
  needleDepth: string;
  needleAngle: string;
  electro: ElectroId;
  herbIds: string[];
  tags: string[];
};

export type Channel = {
  id: string;
  code: string;
  name: string;
  alias?: string;
  hanzi: string;
  pinyin: string;
  element: ElementId | null;
  polarity: Polarity | null;
  pairId: string | null;
  limb: string;
  clock: string | null;
  organ: string;
  /** How many numbered points the classical channel has. */
  classicalCount: number;
  themes: string[];
  pathway: string;
  note: string;
};

export type Herb = {
  id: string;
  pinyin: string;
  hanzi: string;
  english: string;
  latin: string;
  action: HerbActionId;
  also: HerbActionId[];
  nature: NatureId;
  flavors: FlavorId[];
  channelIds: string[];
  uses: string;
  summary: string;
  symptoms: SymptomId[];
  pairings: { herbId: string; idea: string }[];
  cautions: string;
  tags: string[];
};

export type RoutineStep = {
  pointId: string;
  seconds: number;
  how: string;
};

export type Routine = {
  id: string;
  title: string;
  aim: string;
  steps: RoutineStep[];
};

export type PointFilters = {
  q: string;
  region: string;
  channel: string;
  element: string;
  symptom: string;
  kind: string;
  safety: string;
  action: string;
};

export type HerbFilters = {
  q: string;
  action: string;
  channel: string;
  symptom: string;
  element: string;
  region: string;
};
