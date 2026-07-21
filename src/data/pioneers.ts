export type Pioneer = {
  slug: string;
  name: string;
  role: string;
  tag: string;
  bio: string;
  origin: string;
  years: string;
  streaming?: {
    spotify?: string;
    apple?: string;
    bandcamp?: string;
    youtube?: string;
  };
};

export const PIONEERS: Pioneer[] = [
  {
    slug: "k-rino",
    name: "K-Rino",
    role: "Founder · Artist · SPC",
    tag: "FOUNDER",
    origin: "Houston, TX",
    years: "1987 - Present",
    bio: "Founding pillar of the South Park Coalition and one of Houston's most prolific and lyrically respected voices. K-Rino answered the call to build A.R.C. and set the standard for conscious craft the collective still lives by. Full bio pending.",
  },
  {
    slug: "wickett-crickett",
    name: "O.G. Wickett Crickett",
    role: "Legendary DJ · Radio",
    tag: "PIONEER",
    origin: "Houston, TX",
    years: "1980s - Present",
    bio: "The legendary Houston radio and mixtape DJ whose ear shaped the sound of the city. A pioneer whose stamp of approval opened doors long before the industry noticed. Full bio pending.",
  },
  {
    slug: "ganxsta-nip",
    name: "Ganxsta Nip",
    role: "Artist · South Park Coalition",
    tag: "ARTIST",
    origin: "Houston, TX",
    years: "1990s - Present",
    bio: "A South Park Coalition original and horrorcore innovator whose imprint on Houston Hip Hop is permanent. Full bio pending.",
  },
  {
    slug: "clche",
    name: "Cl'Che",
    role: "Artist",
    tag: "ARTIST",
    origin: "Houston, TX",
    years: "1990s - Present",
    bio: "A defining voice of Houston R&B and Hip Hop, Cl'Che brings soul and steel to the collective in equal measure. Full bio pending.",
  },
  {
    slug: "fiya",
    name: "Fiya the Media Mogul",
    role: "Media · Culture",
    tag: "MEDIA",
    origin: "Houston, TX",
    years: "2000s - Present",
    bio: "Media architect and culture builder. Fiya has documented and amplified Houston's independent scene for two decades. Full bio pending.",
  },
  {
    slug: "zin",
    name: "Zin",
    role: "Artist · Producer",
    tag: "ARTIST",
    origin: "Houston, TX",
    years: "1990s - Present",
    bio: "Artist and producer whose work bridges the classic Houston sound with the collective's forward vision. Full bio pending.",
  },
  {
    slug: "murder-one",
    name: "Murder One",
    role: "Artist",
    tag: "ARTIST",
    origin: "Houston, TX",
    years: "1990s - Present",
    bio: "A voice from the trenches with a message for the block. Full bio pending.",
  },
  {
    slug: "mr-cap",
    name: "Mr. Cap",
    role: "Label · Executive",
    tag: "EXECUTIVE",
    origin: "Houston, TX",
    years: "1990s - Present",
    bio: "Label owner and executive whose business posture helped make ownership a Houston standard. Full bio pending.",
  },
];

export function getPioneer(slug: string): Pioneer | undefined {
  return PIONEERS.find((p) => p.slug === slug);
}
