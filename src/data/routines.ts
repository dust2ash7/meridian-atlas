import type { Routine } from "./types";

/** Short acupressure sequences. Each step links to a full point page. */
export const ROUTINES: Routine[] = [
  {
    id: "tension-headache",
    title: "Tension headache",
    aim: "For a dull, tight headache at the temples or the nape, when you mainly need to soften the muscles and settle. Not for a sudden severe headache.",
    steps: [
      { pointId: "yintang", seconds: 45, how: "Rest a finger between the brows. Light pressure, eyes soft." },
      { pointId: "gb20", seconds: 50, how: "Thumbs in the hollows under the skull, into the muscle, slightly toward the eyes. Not straight up." },
      { pointId: "taiyang", seconds: 40, how: "Slow circles at the temple. Lighten up if you feel a strong pulse." },
      { pointId: "li4", seconds: 45, how: "Press the meat between thumb and index finger. Skip this step in pregnancy." },
      { pointId: "lv3", seconds: 45, how: "Thumb in the hollow on the top of the foot, between the first and second bones." },
    ],
  },
  {
    id: "nausea",
    title: "Nausea",
    aim: "For ordinary queasiness, travel, or a full stomach. Not for severe vomiting, chest pain, or a head injury.",
    steps: [
      { pointId: "pc6", seconds: 60, how: "Three finger-widths up from the wrist crease, between the tendons. Ease off if the fingers tingle." },
      { pointId: "st36", seconds: 45, how: "Just beside the shin, four finger-widths below the kneecap." },
      { pointId: "ren12", seconds: 40, how: "Soft palm halfway from the navel to the breastbone. Stop if it is sharp." },
      { pointId: "li4", seconds: 30, how: "Optional, on the hand. Skip in pregnancy." },
    ],
  },
  {
    id: "pre-sleep",
    title: "Pre-sleep calm",
    aim: "A short wind-down when the mind is busy. It will not override pain, caffeine, or a sleep disorder.",
    steps: [
      { pointId: "yintang", seconds: 50, how: "Finger between the brows while you lengthen the exhale." },
      { pointId: "anmian", seconds: 45, how: "Behind the ear, halfway toward the skull-base hollow. Mild, both sides if you can." },
      { pointId: "ht7", seconds: 40, how: "Hollow on the wrist crease, little-finger side. Stay off any tingling." },
      { pointId: "pc6", seconds: 30, how: "Inner forearm, a quiet press, not a hard one." },
      { pointId: "ki1", seconds: 30, how: "Thumb in the hollow of the sole. Stop if it feels too intense." },
    ],
  },
  {
    id: "digestion",
    title: "Digestion after meals",
    aim: "For ordinary fullness after eating. Wait until you are not still chewing, and skip it if pain is severe.",
    steps: [
      { pointId: "ren12", seconds: 40, how: "Soft circles on the midline, halfway to the breastbone." },
      { pointId: "st25", seconds: 30, how: "Two thumb-widths out from the navel, both sides, gentle." },
      { pointId: "st36", seconds: 50, how: "The leg point beside the shin. Sit, foot relaxed." },
      { pointId: "sp6", seconds: 40, how: "Inner leg, above the ankle. Skip the whole step in pregnancy." },
      { pointId: "pc6", seconds: 30, how: "Add this if the chest also feels full or queasy." },
    ],
  },
  {
    id: "neck-shoulder",
    title: "Neck and shoulder tightness",
    aim: "For muscle tightness from sitting, not for a neck injury, numbness, or a headache that is new and severe.",
    steps: [
      { pointId: "gb21", seconds: 40, how: "Pinch the top of the shoulder muscle. Do not press down into the chest. Skip in pregnancy. Sit, in case you feel lightheaded." },
      { pointId: "gb20", seconds: 40, how: "Skull-base hollows, mild, into the muscle." },
      { pointId: "bl10", seconds: 30, how: "Just beside the midline under the skull. Broad and mild." },
      { pointId: "si11", seconds: 40, how: "Middle of the shoulder blade. If you cannot reach, use a ball against a wall or skip." },
      { pointId: "li10", seconds: 30, how: "Forearm muscle a little below the elbow, hand loose." },
    ],
  },
  {
    id: "steady-energy",
    title: "Steady energy",
    aim: "A quiet routine for ordinary tiredness. It is not a treatment for fatigue with weight loss, fever, chest pain, or depression.",
    steps: [
      { pointId: "st36", seconds: 60, how: "Beside the shin, below the knee. The main step." },
      { pointId: "ren6", seconds: 40, how: "Warm palm just below the navel. No drilling. Skip strong pressure in pregnancy." },
      { pointId: "du20", seconds: 30, how: "Fingertips on the crown, almost no pressure." },
      { pointId: "ki3", seconds: 40, how: "Inner ankle hollow, off the pulse." },
      { pointId: "sp6", seconds: 30, how: "Inner leg. Skip in pregnancy." },
    ],
  },
  {
    id: "clear-head",
    title: "Clear head and memory",
    aim: "A quiet scalp-and-wrist sequence for ordinary fog and a scattered mind. Not care for dementia, a new concussion, or a sudden change in speech or face.",
    steps: [
      { pointId: "yintang", seconds: 40, how: "Finger between the brows. Soften the eyes." },
      { pointId: "du24", seconds: 30, how: "Fingertips on the midline at the front hairline. Almost no pressure." },
      { pointId: "du20", seconds: 40, how: "Rest on the crown. Do not push." },
      { pointId: "sishencong", seconds: 40, how: "Four fingertips in a small ring around the crown." },
      { pointId: "ht7", seconds: 40, how: "Hollow on the wrist crease, little-finger side. Off any tingle." },
    ],
  },
  {
    id: "worried-mind",
    title: "Ease a worried mind",
    aim: "For a busy, uneasy mind in the moment. Not a treatment for anxiety, panic, or depression.",
    steps: [
      { pointId: "yintang", seconds: 45, how: "Rest a finger between the brows and lengthen the exhale." },
      { pointId: "ht7", seconds: 45, how: "Gentle press in the wrist hollow." },
      { pointId: "pc6", seconds: 40, how: "Inner forearm, three finger-widths above the wrist, between the tendons." },
      { pointId: "ren17", seconds: 30, how: "Soft palm on the center of the chest. Stop if it is tender or you are short of breath." },
      { pointId: "lv3", seconds: 40, how: "Thumb in the hollow on the top of the foot." },
    ],
  },
  {
    id: "low-back-warmth",
    title: "Low-back warmth",
    aim: "For a tired, achy waist after sitting. Not for an injury, pain down the leg, numbness, or trouble passing urine.",
    steps: [
      { pointId: "du4", seconds: 50, how: "Warm palm on the midline of the waist. No jackknife." },
      { pointId: "bl23", seconds: 45, how: "Loose fist or palm on the muscle just beside the spine, both sides if you can reach." },
      { pointId: "bl25", seconds: 30, how: "A bit lower, still on the muscle beside the spine. Mild." },
      { pointId: "ki3", seconds: 40, how: "Inner ankle hollow, off the pulse." },
    ],
  },
  {
    id: "tired-eyes",
    title: "Tired eyes",
    aim: "For screen-tired eyes and a tight brow. Not for vision loss, eye pain, or a sudden headache.",
    steps: [
      { pointId: "bl2", seconds: 30, how: "Fingertip in the inner brow notch, upward, never down into the eye." },
      { pointId: "gb14", seconds: 30, how: "Above the middle of the eyebrow, on the bone. Light." },
      { pointId: "taiyang", seconds: 35, how: "Soft circles at the temple. Lighten if you feel a pulse." },
      { pointId: "gb20", seconds: 40, how: "Skull-base hollows, into the muscle, slightly toward the eyes." },
      { pointId: "lv3", seconds: 30, how: "Top of the foot, between the first and second bones." },
    ],
  },
  {
    id: "stuffy-nose",
    title: "Stuffy nose",
    aim: "For a mild stuffy face at the start of a cold. Not for a high fever, one-sided facial pain, or trouble breathing.",
    steps: [
      { pointId: "yintang", seconds: 30, how: "Between the brows, light." },
      { pointId: "li20", seconds: 30, how: "Beside the nostrils, in the groove. Shallow. Do not press into the nose." },
      { pointId: "bl2", seconds: 25, how: "Inner brow, upward only." },
      { pointId: "li4", seconds: 40, how: "The hand point. Skip in pregnancy." },
    ],
  },
  {
    id: "cold-limbs",
    title: "Cold hands and feet",
    aim: "For hands and feet that stay cold when you are otherwise well. Not for a limb that is pale, numb, or suddenly cold on one side.",
    steps: [
      { pointId: "pc8", seconds: 30, how: "Press the center of the palm with the thumb of the other hand. Then switch." },
      { pointId: "st36", seconds: 50, how: "Beside the shin, below the knee. The longer step." },
      { pointId: "ki3", seconds: 40, how: "Inner ankle hollow, off the pulse." },
      { pointId: "ren6", seconds: 40, how: "Warm palm just below the navel. Skip strong pressure in pregnancy." },
    ],
  },
];

export function getRoutine(id: string) {
  return ROUTINES.find((routine) => routine.id === id);
}
