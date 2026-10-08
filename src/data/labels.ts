import type { ElementId, FlavorId, HerbActionId, KindId, NatureId, RegionId, SafetyId, SymptomId } from "./types";

export const REGIONS: { id: RegionId; label: string; hint: string }[] = [
  { id: "head-face", label: "Head and face", hint: "Forehead, eyes, jaw, cheeks" },
  { id: "neck", label: "Neck", hint: "Base of the skull, throat, nape" },
  { id: "chest", label: "Chest", hint: "Sternum, ribs, side of the chest" },
  { id: "abdomen", label: "Abdomen", hint: "Above and below the navel" },
  { id: "back", label: "Back", hint: "Along the spine and shoulder blade" },
  { id: "shoulder-arm", label: "Shoulder and arm", hint: "Shoulder, upper arm, elbow, forearm" },
  { id: "hand", label: "Hand", hint: "Wrist, palm, fingers" },
  { id: "hip-leg", label: "Hip and leg", hint: "Hip, thigh, knee, calf" },
  { id: "foot", label: "Foot", hint: "Ankle, top of the foot, sole" },
  { id: "ear", label: "Ear", hint: "In front of the ear, not the ear canal" },
];

export const SYMPTOMS: { id: SymptomId; label: string; hint: string }[] = [
  { id: "pain", label: "Pain relief", hint: "Aches people often look up" },
  { id: "headache", label: "Headache", hint: "Temple, nape, forehead" },
  { id: "stress", label: "Stress and shen", hint: "Restlessness, worry, spirit" },
  { id: "sleep", label: "Sleep", hint: "Winding down at night" },
  { id: "digestion", label: "Digestion", hint: "Fullness, appetite, abdomen" },
  { id: "nausea", label: "Nausea", hint: "Queasiness, travel, fullness" },
  { id: "immunity", label: "Immunity and colds", hint: "First signs of a cold, surface" },
  { id: "womens", label: "Women’s health", hint: "Cycle discomfort in traditional terms" },
  { id: "energy", label: "Energy and fatigue", hint: "Tiredness, low vitality" },
  { id: "breathing", label: "Breathing", hint: "Chest, cough teaching patterns" },
  { id: "tension", label: "Local muscle tension", hint: "Neck, shoulder, jaw, calf" },
  { id: "ed", label: "Erectile difficulty", hint: "What people call ED. Traditional patterns, not a treatment." },
  { id: "memory", label: "Memory and focus", hint: "Brain fog and forgetfulness, in traditional language. Not dementia care." },
  { id: "worry", label: "Worry", hint: "A busy, uneasy mind. Not a treatment for anxiety." },
  { id: "dizziness", label: "Dizziness", hint: "A light or spinning head in textbook language. Not a stroke check." },
  { id: "eyes", label: "Eyes", hint: "Tired eyes and frontal strain." },
  { id: "ears", label: "Ears", hint: "Traditional notes on ringing and the ear. Not hearing care." },
  { id: "sinus", label: "Sinus and nose", hint: "Stuffy face and the start of a cold." },
  { id: "low-back", label: "Low back", hint: "A tired or achy waist. Not an injury plan." },
  { id: "constipation", label: "Constipation", hint: "Ordinary sluggish bowels." },
  { id: "urinary", label: "Urinary", hint: "Frequency and damp, in old language. Not an infection test." },
  { id: "cold", label: "Cold limbs", hint: "Hands and feet that stay cold." },
  { id: "palpitations", label: "Palpitations", hint: "A fluttering chest in spirit language. Not a heart exam." },
  { id: "joints", label: "Joints", hint: "Stiff or achy joints people look up." },
];

export const KINDS: { id: KindId; label: string; hint: string }[] = [
  { id: "source", label: "Source", hint: "Yuan-source points" },
  { id: "luo", label: "Luo", hint: "Connecting points" },
  { id: "xi-cleft", label: "Xi-cleft", hint: "Cleft points, often for acute patterns" },
  { id: "front-mu", label: "Front-mu", hint: "Alarm points on the torso" },
  { id: "back-shu", label: "Back-shu", hint: "Transport points on the back" },
  { id: "five-shu", label: "Five-shu", hint: "Well, spring, stream, river, sea" },
  { id: "command", label: "Command", hint: "Points taught for a whole region" },
  { id: "extra", label: "Extra point", hint: "Outside the 14 channels" },
  { id: "opening", label: "Opening", hint: "Opens an extraordinary vessel" },
  { id: "influential", label: "Influential", hint: "Hui-meeting points" },
];

export const HERB_ACTIONS: { id: HerbActionId; label: string; hint: string }[] = [
  { id: "release-exterior", label: "Release exterior", hint: "Surface wind-cold or wind-heat" },
  { id: "clear-heat", label: "Clear heat", hint: "Cool a hot pattern" },
  { id: "drain-damp", label: "Drain damp", hint: "Heaviness, swelling, damp" },
  { id: "transform-phlegm", label: "Transform phlegm", hint: "Phlegm in the chest or middle" },
  { id: "move-qi", label: "Move qi", hint: "Stuck, tight, or distended" },
  { id: "move-blood", label: "Move blood", hint: "Fixed pain, stasis language" },
  { id: "tonify-qi", label: "Tonify qi", hint: "Tiredness, weak appetite" },
  { id: "tonify-blood", label: "Tonify blood", hint: "Dryness, pallor, cycles" },
  { id: "tonify-yang", label: "Tonify yang", hint: "Cold, low back, vitality" },
  { id: "tonify-yin", label: "Tonify yin", hint: "Dryness, nights, fluids" },
  { id: "calm-shen", label: "Calm shen", hint: "Spirit, sleep, restlessness" },
  { id: "extinguish-wind", label: "Extinguish wind", hint: "Internal wind teaching patterns" },
  { id: "stabilize-bind", label: "Stabilize and bind", hint: "Leakage, holding" },
];

export const SAFETY: { id: SafetyId; label: string; hint: string }[] = [
  { id: "general", label: "General acupressure", hint: "Ordinary gentle pressure" },
  { id: "caution", label: "Use caution", hint: "Eyes, throat, arteries, lungs, or strong stimulation" },
  { id: "pregnancy", label: "Traditionally avoided in pregnancy", hint: "Not for self-care routines while pregnant" },
];

export const ELEMENTS: { id: ElementId; label: string; season: string; climate: string; sense: string; tissue: string; emotion: string; flavor: string }[] = [
  { id: "wood", label: "Wood", season: "Spring", climate: "Wind", sense: "Eyes", tissue: "Sinews", emotion: "Anger, in the classical set", flavor: "Sour" },
  { id: "fire", label: "Fire", season: "Summer", climate: "Heat", sense: "Tongue", tissue: "Vessels", emotion: "Joy, in the classical set", flavor: "Bitter" },
  { id: "earth", label: "Earth", season: "Late summer", climate: "Damp", sense: "Mouth", tissue: "Flesh", emotion: "Pensiveness", flavor: "Sweet" },
  { id: "metal", label: "Metal", season: "Autumn", climate: "Dryness", sense: "Nose", tissue: "Skin", emotion: "Grief", flavor: "Acrid" },
  { id: "water", label: "Water", season: "Winter", climate: "Cold", sense: "Ears", tissue: "Bones", emotion: "Fear", flavor: "Salty" },
];

export const NATURES: { id: NatureId; label: string }[] = [
  { id: "hot", label: "Hot" },
  { id: "warm", label: "Warm" },
  { id: "neutral", label: "Neutral" },
  { id: "cool", label: "Cool" },
  { id: "cold", label: "Cold" },
];

export const FLAVOR_LABEL: Record<FlavorId, string> = {
  acrid: "Acrid",
  bitter: "Bitter",
  sweet: "Sweet",
  sour: "Sour",
  salty: "Salty",
  bland: "Bland",
  astringent: "Astringent",
};

export const regionLabel = (id: string) => REGIONS.find((r) => r.id === id)?.label ?? id;
export const symptomLabel = (id: string) => SYMPTOMS.find((s) => s.id === id)?.label ?? id;
export const kindLabel = (id: string) => KINDS.find((k) => k.id === id)?.label ?? id;
export const actionLabel = (id: string) => HERB_ACTIONS.find((a) => a.id === id)?.label ?? id;
export const elementLabel = (id: string) => ELEMENTS.find((e) => e.id === id)?.label ?? id;
export const safetyLabel = (id: string) => SAFETY.find((s) => s.id === id)?.label ?? id;
export const natureLabel = (id: string) => NATURES.find((n) => n.id === id)?.label ?? id;

export const ELEMENT_TEXT: Record<ElementId, string> = {
  wood: "text-wood",
  fire: "text-fire",
  earth: "text-earth",
  metal: "text-metal",
  water: "text-water",
};

export const ELEMENT_BG: Record<ElementId, string> = {
  wood: "bg-wood",
  fire: "bg-fire",
  earth: "bg-earth",
  metal: "bg-metal",
  water: "bg-water",
};

export const ELEMENT_BORDER: Record<ElementId, string> = {
  wood: "border-wood",
  fire: "border-fire",
  earth: "border-earth",
  metal: "border-metal",
  water: "border-water",
};

export const DISCLAIMER =
  "Educational reference only. Acupressure descriptions are for learning and gentle self-care. Do not needle yourself. Stop if pain, dizziness, or unusual symptoms occur. Seek licensed care for illness, pregnancy, or injury.";

export const GENERATING: ElementId[] = ["wood", "fire", "earth", "metal", "water"];
export const CONTROLLING: ElementId[] = ["wood", "earth", "water", "fire", "metal"];
