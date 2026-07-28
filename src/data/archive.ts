/**
 * The A.R.C. event archive, transcribed from the original flyers and photos.
 *
 * Details here (dates, venues, line-ups) are read off the artwork itself, so
 * treat the flyer as the source of truth when editing. Several flyers give a
 * day and month but no year; those are left without one rather than guessed.
 */

export type Track = "outreach" | "peace" | "culture" | "wellness";

export interface ArchiveEntry {
  /** Media manifest slug. */
  name: string;
  title: string;
  /** Short line under the title — date and venue where the flyer states them. */
  meta: string;
  track: Track;
  blurb: string;
}

export const TRACKS: { id: Track; label: string }[] = [
  { id: "outreach", label: "Outreach" },
  { id: "peace", label: "Peace" },
  { id: "culture", label: "Culture" },
  { id: "wellness", label: "Wellness" },
];

export const FLYERS: ArchiveEntry[] = [
  {
    name: "conscious-bash",
    title: "Conscious Bash",
    meta: "Sat Feb 4, 2017 · Good Hope Baptist Church",
    track: "culture",
    blurb:
      "Super Bowl weekend. One Houston-One Hood, a Wickett Crickett / Zin legacy panel and unity award, and a live show hosted by K-Rino and Mr. Cap.",
  },
  {
    name: "peace-ride",
    title: "Houston Peace Ride",
    meta: "Mar 2 · Scott St & 45S to Scott & Airport",
    track: "peace",
    blurb:
      "A ride against street violence calling out slab lines, bike clubs, rappers and activists, ending in a peace rally on Scott Street.",
  },
  {
    name: "peace-roundtable",
    title: "Community Roundtable 4",
    meta: "Oct 23 · Scott's Community Care",
    track: "peace",
    blurb:
      "United in Peace Houston working the Scott Street Peace Initiative into a template for reducing violence across the city.",
  },
  {
    name: "bridging-the-gap",
    title: "Bridging the Gap",
    meta: "Sat June 22 · SHAPE Community Center",
    track: "peace",
    blurb:
      "A public forum built to bring the generations together — community members, activists, artists, business owners and law enforcement in one room.",
  },
  {
    name: "fifty-meals",
    title: "50 Rappers 50 Meals",
    meta: "Sat July 6 · 2001 Commerce St",
    track: "outreach",
    blurb:
      "Artists cooking, bagging and handing out meals near downtown. The pillar in its plainest form.",
  },
  {
    name: "back-2-school",
    title: "Back 2 School Supply Drive",
    meta: "Fri Aug 9, 2019 · Original Big Belly's",
    track: "outreach",
    blurb:
      "Backpacks and supplies collected all day, with Brad \u201CScarface\u201D Jordan and local entertainers meeting families.",
  },
  {
    name: "toy-drive",
    title: "Donate a Toy",
    meta: "Drop-off · 4443 Old Spanish Trail",
    track: "outreach",
    blurb: "Every child deserve one. A toy drive run out of the Old Spanish Trail space.",
  },
  {
    name: "garden-club",
    title: "Garden Club",
    meta: "April 20 · 3–5PM · 4443 Old Spanish Trail",
    track: "wellness",
    blurb:
      "Seeding, raised bed prep, irrigation and garden education. Bring starter plants, non-GMO.",
  },
  {
    name: "natural-healing",
    title: "Natural Healing",
    meta: "Oct 19 · 3–5PM · 4443 Old Spanish Trail",
    track: "wellness",
    blurb:
      "How to eat to live, in the garden. Sound and breath healing with RC Love, natural health demonstration with Sister Shareefa Muhammad.",
  },
  {
    name: "dj-workshop",
    title: "DJ Workshop",
    meta: "Mar 23 · 3–6PM · 4443 Old Spanish Trail",
    track: "culture",
    blurb:
      "The first element of hip hop. Mixing, scratching and battling, live on the turntables with DJ Tricky C and the city's DJs.",
  },
  {
    name: "the-movement",
    title: "The Movement: Live",
    meta: "Sept 30 · 3–5PM · 4443 Old Spanish Trail",
    track: "culture",
    blurb: "Cl'Che, Sa'D and Boujee Baby. An artistic power space for all ages.",
  },
];

export function flyer(name: string): ArchiveEntry {
  const entry = FLYERS.find((f) => f.name === name);
  if (!entry) throw new Error(`No flyer "${name}" in the archive`);
  return entry;
}

/**
 * Kept apart from the event flyers: this one is a memorial notice for founding
 * pioneer O.G. Wickett Crickett, not an event to promote.
 */
export const MEMORIAL: ArchiveEntry = {
  name: "wickett-crickett-memorial",
  title: "In Honor of O.G. Wickett Crickett",
  meta: "Oct 21 · Houston Memorial Gardens, Pearland",
  track: "culture",
  blurb:
    "A balloon release for Darrell Wayne Veal, sponsored by A.R.C., alongside a live interview with his family on K-Rino Radio.",
};

export interface PhotoEntry {
  name: string;
  title: string;
  meta?: string;
}

export const PHOTOS: PhotoEntry[] = [
  {
    name: "peace-ride-leaders",
    title: "Teach Peace on the roadside",
    meta: "Houston Peace Ride · with Dr. Abdul Haleem Muhammad",
  },
  {
    name: "meal-packing",
    title: "Bagging meals for the neighborhood",
  },
  {
    name: "spc-performance",
    title: "Performing under the Wickett Crickett banner",
    meta: "Sept 30, 2023 · with South Park Coalition",
  },
  {
    name: "peace-ride-families",
    title: "Families riding for peace",
    meta: "Houston Peace Ride",
  },
  {
    name: "sheila-jackson-lee",
    title: "With Congresswoman Sheila Jackson Lee",
  },
  {
    name: "dj-set-yard",
    title: "Turntables in the yard",
    meta: "Old Spanish Trail",
  },
  {
    name: "forum-audience",
    title: "A full house at SHAPE",
    meta: "Bridging the Gap",
  },
  {
    name: "spc-audience",
    title: "The room, before the show",
    meta: "Sept 30, 2023",
  },
  {
    name: "supply-drop",
    title: "Supplies delivered to families",
  },
  {
    name: "noi-headquarters",
    title: "Southwest Regional HQ, Old Spanish Trail",
  },
];
