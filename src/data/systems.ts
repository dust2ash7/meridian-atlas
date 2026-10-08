import { CHANNELS } from "./channels";
import { ELEMENTS, GENERATING, CONTROLLING } from "./labels";
import type { ElementId } from "./types";

export type Essay = {
  id: string;
  title: string;
  eyebrow: string;
  summary: string;
  paragraphs: string[];
  element?: ElementId | null;
};

export const VESSEL_ESSAYS: Essay[] = [
  {
    id: "chong",
    title: "Chong",
    eyebrow: "Extraordinary vessel",
    summary: "The sea of blood, studied with the opening point SP4.",
    element: null,
    paragraphs: [
      "The Chong vessel does not have its own numbered points the way Ren and Du do. Charts draw it through the abdomen, using meeting points on the Kidney channel and the front midline. This atlas does not yet list every meeting point. The practical study pair is the opening point.",
      "SP4 opens the Chong. PC6 is the coupled point. Together they are the textbook pair for a counterflow pattern in the chest and stomach, and for some cycle teachings. “Sea of blood” is an image of abundance and of the uterus in classical gynecology, not a lab value.",
      "The other six extraordinary vessels, besides Ren and Du, are summarized this way on purpose. Add meeting-point pages later without mixing them into the twelve primary channels.",
    ],
  },
  {
    id: "dai",
    title: "Dai",
    eyebrow: "Extraordinary vessel",
    summary: "The belt vessel, the only horizontal channel in the usual set.",
    element: null,
    paragraphs: [
      "The Dai is drawn around the waist like a belt, tying the vertical channels. GB41 opens it. SJ5 is the coupled point. GB26, the namesake point on the Gallbladder channel at the waist, is not in this atlas yet — add it beside the other Gallbladder points when you extend the set.",
      "Teaching themes are a heavy waist, damp sitting in the belt line, and a feeling that the upper and lower body are not communicating. Those are classroom metaphors. They are not a diagnosis of bloating, pelvic pain, or weight.",
    ],
  },
  {
    id: "yin-qiao",
    title: "Yin Qiao",
    eyebrow: "Extraordinary vessel",
    summary: "The yin heel vessel. KI6 opens it.",
    element: null,
    paragraphs: [
      "The qiao vessels are about gait, the inner and outer legs, and the opening and closing of the eyes in classical sleep theory. Yin Qiao is the inner one. KI6 is the opening point. LU7 is coupled.",
      "Students meet it when a case mentions inner-leg tightness, a dry throat at night, or sleep that will not settle, always as pattern language. It is not a sleep medicine and not a pelvic protocol.",
    ],
  },
  {
    id: "yang-qiao",
    title: "Yang Qiao",
    eyebrow: "Extraordinary vessel",
    summary: "The yang heel vessel. BL62 opens it.",
    element: null,
    paragraphs: [
      "Yang Qiao runs the outer body. BL62 opens it, with SI3 as the coupled point — the same pair, reversed, that opens the Du vessel. The shared points are a memory hook, not two names for one channel.",
      "Classical indications include a tight outer leg and certain eye and sleep pictures, including historical notes on seizures. Seizure care is emergency medicine. The vessel page is for orientation only.",
    ],
  },
  {
    id: "yin-wei",
    title: "Yin Wei",
    eyebrow: "Extraordinary vessel",
    summary: "Links the yin channels. PC6 opens it.",
    element: null,
    paragraphs: [
      "Wei vessels are described as tying the yin or the yang channels together. Yin Wei’s opening point is PC6, coupled with SP4. That is why PC6 shows up both as a nausea point and as a vessel key.",
      "Textbook themes are chest pain in the traditional sense, a knotted feeling in the heart, and interior yin patterns. Chest pain in real life is assessed medically first. The point pages repeat that.",
    ],
  },
  {
    id: "yang-wei",
    title: "Yang Wei",
    eyebrow: "Extraordinary vessel",
    summary: "Links the yang channels. SJ5 opens it.",
    element: null,
    paragraphs: [
      "Yang Wei’s opening point is SJ5, coupled with GB41. Charts associate it with the sides of the body, chills and fever at the surface, and lateral headache.",
      "It is easy to confuse with the Dai vessel because they share the SJ5–GB41 pair in opposite roles. SJ5 opens Yang Wei. GB41 opens the Dai. The coupled point is the partner, not the opener.",
    ],
  },
];

export const IDEA_ESSAYS: Essay[] = [
  {
    id: "yin-yang",
    title: "Organ pairs and yin-yang",
    eyebrow: "How the channels are paired",
    summary: "Six pairs. Yin on the inner surface, yang on the outer, in the simple limb rule.",
    element: null,
    paragraphs: [
      "Each primary channel has a partner. The yin channel is named for a zang organ and runs more protected surfaces of the limbs. The yang channel is named for a fu organ and runs the more exposed surfaces. The pair shares an element, except that fire has two pairs: Heart with Small Intestine, and Pericardium with San Jiao.",
      "Yin and yang here are positions and functions in a teaching system, not moral labels and not a blood test. A “yin deficiency” sentence in a textbook is a pattern name. It is not something this atlas can see in you.",
      "The clock on each channel page is the horary sequence students memorize, from Lung at 3–5 a.m. around the day. It is a mnemonic. It does not schedule illness.",
    ],
  },
  {
    id: "auricular",
    title: "Auricular zones",
    eyebrow: "A separate system",
    summary: "The ear is mapped as its own microsystem. These are not body-meridian points.",
    element: null,
    paragraphs: [
      "Ear acupuncture is a twentieth-century map laid over an older interest in the ear. Zones are named for body parts and for functions. They are not the same as SI19 or SJ17, which are channel points in front of or behind the ear. Do not mix the numbers.",
      "Zones students meet first: Shenmen in the triangular fossa, for settling; Lung in the cavum of the concha, the region of a hidden hollow; Stomach and Spleen nearby in the concha; Kidney and Liver toward the cymba; Sympathetic on the inner edge of the antihelix; Endocrine in the intertragic notch; Occiput on the antitragus. Locations are approximate on a phone. A trained person uses a real ear and a point detector or a chart, not a screenshot.",
      "Self-care, if any, is a light pinch of the ear lobe or the Shenmen area for a few breaths. Do not press into the canal, do not use seeds or needles from a kit on a guess, and stop if you feel dizzy. Pregnancy, infection, and jewelry allergies are reasons to leave the ear alone.",
    ],
  },
  {
    id: "scalp",
    title: "Scalp lines",
    eyebrow: "A separate system",
    summary: "Jiao-style scalp lines are clinic maps. They are not Du-channel points and not a self-needling guide.",
    element: null,
    paragraphs: [
      "Scalp acupuncture draws lines on the hair-bearing head that correspond, in that system, to motor and sensory regions. They are needled transversely under the scalp in a clinic. This page names them so they are not confused with Du20 or Sishencong.",
      "The motor line and the sensory line sit on the side of the head, roughly over the part of the brain those names suggest. A chorea-and-tremor line is drawn in front of the motor line. A foot motor-sensory area sits near the midline, beside the crown. Exact centimeters from bony landmarks belong in a current manual with a diagram, not in an app you might be tempted to copy onto someone’s head.",
      "Do not needle the scalp from this description. Do not press hard along a line hoping to treat a stroke, tremor, or paralysis. Those conditions need medical rehabilitation. Gentle contact on the crown is already described on Du20, and that is a different, lighter idea.",
    ],
  },
];

export function elementEssay(id: ElementId): Essay {
  const element = ELEMENTS.find((item) => item.id === id)!;
  const genIndex = GENERATING.indexOf(id);
  const parent = GENERATING[(genIndex + 4) % 5];
  const child = GENERATING[(genIndex + 1) % 5];
  const controlIndex = CONTROLLING.indexOf(id);
  const controls = CONTROLLING[(controlIndex + 1) % 5];
  const controlledBy = CONTROLLING[(controlIndex + 4) % 5];
  const channels = CHANNELS.filter((channel) => channel.element === id)
    .map((channel) => channel.name)
    .join(" and ");
  return {
    id,
    title: element.label,
    eyebrow: "Five elements",
    summary: `${element.season} · ${element.climate} · ${channels}.`,
    element: id,
    paragraphs: [
      `${element.label} is the element of ${channels}. The season students attach is ${element.season.toLowerCase()}, the climate is ${element.climate.toLowerCase()}, the sense organ is the ${element.sense.toLowerCase()}, the tissue is the ${element.tissue.toLowerCase()}, and the flavor is ${element.flavor.toLowerCase()}. The emotion in the classical set is ${element.emotion.toLowerCase()}. None of these are personality test results.`,
      `Generating cycle: ${parent} generates ${element.label.toLowerCase()}, and ${element.label.toLowerCase()} generates ${child}. The image is a parent feeding a child. It is a memory wheel for relationships between channels, not a diet rule.`,
      `Controlling cycle: ${element.label.toLowerCase()} controls ${controls}, and is controlled by ${controlledBy}. The image is a grandparent keeping a grandchild in check. When textbooks say an element is “overacting,” they mean this wheel, not a measured lab cycle.`,
    ],
  };
}

export function findEssay(id: string) {
  return VESSEL_ESSAYS.find((essay) => essay.id === id) ?? IDEA_ESSAYS.find((essay) => essay.id === id) ?? (ELEMENTS.some((item) => item.id === id) ? elementEssay(id as ElementId) : undefined);
}

export const OPENING_POINTS: Record<string, { opening: string; coupled: string; role: string }> = {
  ren: { opening: "lu7", coupled: "ki6", role: "LU7 opens the Ren vessel. KI6 is the coupled point." },
  du: { opening: "si3", coupled: "bl62", role: "SI3 opens the Du vessel. BL62 is the coupled point." },
  chong: { opening: "sp4", coupled: "pc6", role: "SP4 opens the Chong vessel. PC6 is the coupled point." },
  dai: { opening: "gb41", coupled: "sj5", role: "GB41 opens the Dai vessel. SJ5 is the coupled point." },
  "yin-qiao": { opening: "ki6", coupled: "lu7", role: "KI6 opens the Yin Qiao vessel. LU7 is the coupled point." },
  "yang-qiao": { opening: "bl62", coupled: "si3", role: "BL62 opens the Yang Qiao vessel. SI3 is the coupled point." },
  "yin-wei": { opening: "pc6", coupled: "sp4", role: "PC6 opens the Yin Wei vessel. SP4 is the coupled point." },
  "yang-wei": { opening: "sj5", coupled: "gb41", role: "SJ5 opens the Yang Wei vessel. GB41 is the coupled point." },
};
