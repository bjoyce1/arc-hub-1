import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Briefcase, Crown, Radio, HandHeart, ArrowRight, ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/arc/Hero";
import { Ribbon } from "@/components/arc/Ribbon";
import { PillarCard } from "@/components/arc/PillarCard";
import { AlbumRail } from "@/components/arc/AlbumRail";
import { StatCounter } from "@/components/arc/StatCounter";
import { Reveal } from "@/components/arc/Reveal";
import { ChapterLabel } from "@/components/arc/ChapterLabel";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "A.R.C. Artists Respecting Community",
  alternateName: "Artists Respecting Community",
  foundingDate: "2014",
  foundingLocation: "Houston, TX",
  description:
    "A Houston-born movement uniting artists, producers, and DJs around consciousness, ownership, and community action.",
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A.R.C. Artists Respecting Community | Houston Movement Since 2014" },
      {
        name: "description",
        content:
          "The main hub for A.R.C. Artists Respecting Community. A Houston born movement of artists uniting for consciousness, ownership, and community action since 2014.",
      },
      { property: "og:title", content: "A.R.C. Artists Respecting Community | Houston Movement Since 2014" },
      {
        property: "og:description",
        content:
          "The main hub for A.R.C. Artists Respecting Community. A Houston born movement of artists uniting for consciousness, ownership, and community action since 2014.",
      },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  component: Home,
});

const PILLARS = [
  {
    icon: Briefcase,
    title: "Business of Music",
    body: "Educating artists on the business of music. Protecting their art from an industry built to enrich itself, not its creators.",
  },
  {
    icon: Crown,
    title: "Ownership",
    body: "Encouraging artists to own their masters, their publishing, and the platforms they build their careers on.",
  },
  {
    icon: Radio,
    title: "Positive Content",
    body: "Adding balance to the airwaves. Releasing content that counters the negativity dominating radio, TV, and social media.",
  },
  {
    icon: HandHeart,
    title: "Community Action",
    body: "Feeding the homeless, clothing drives, neighborhood clean-ups, conflict resolution, and speaking at schools.",
  },
];

const PIONEERS = [
  "O.G. Wickett Crickett",
  "Ganxsta Nip",
  "Cl'Che",
  "Fiya the Media Mogul",
  "Zin",
  "Murder One",
  "Mr. Cap",
  "K-Rino",
];

function Home() {
  return (
    <>
      <Hero />

      <Ribbon
        items={["Education", "Ownership", "Consciousness", "Community", "Culture", "Respect"]}
      />

      {/* Origin */}
      <section className="relative py-28 sm:py-40">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <ChapterLabel index="01 / 05">The Origin</ChapterLabel>
          <Reveal>
            <h2 className="mt-8 text-4xl font-extrabold leading-[0.95] tracking-[-0.035em] text-ivory sm:text-6xl md:text-[4.5rem]">
              A charge from the Minister.<br />
              A movement in Houston.
            </h2>
          </Reveal>
        </div>

        <div className="mx-auto mt-20 grid max-w-6xl gap-10 px-6 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="border border-hairline bg-surface p-8 sm:p-10">
              <div className="flex items-center justify-between font-mono-tech text-[10px] uppercase tracking-[0.3em] text-dim">
                <span>CHICAGO / 2014</span>
                <span>SCENE 01</span>
              </div>
              <p className="mt-10 text-3xl font-extrabold leading-[1] tracking-[-0.03em] text-ivory sm:text-4xl">
                Farrakhan met with Hip Hop&rsquo;s leaders and urged them to bring
                consciousness back into the music.
              </p>
              <p className="mt-6 text-sm leading-relaxed text-mute">
                The Honorable Minister Louis Farrakhan gathered prominent members of
                the Hip Hop community from across the country. He urged them to end
                senseless beefs and build examples the community could benefit from.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col justify-between border border-hairline bg-ink-2 p-8 sm:p-10">
              <div>
                <div className="flex items-center justify-between font-mono-tech text-[10px] uppercase tracking-[0.3em] text-dim">
                  <span>HOUSTON / 2014</span>
                  <span>SCENE 02</span>
                </div>
                <p className="mt-10 text-3xl font-extrabold leading-[1] tracking-[-0.03em] text-ivory sm:text-4xl">
                  Dr. Abdul Haleem Muhammad brought the charge home. K-Rino answered
                  and gathered the room.
                </p>
                <p className="mt-6 text-sm leading-relaxed text-mute">
                  Shortly after, the first A.R.C. meeting was held, pioneered by
                  veteran artists, producers, label owners, and DJs.
                </p>
              </div>
              <Link
                to="/about"
                className="group mt-10 inline-flex items-center gap-2 font-mono-tech text-[11px] uppercase tracking-[0.3em] text-red hover:text-ivory transition-colors"
              >
                Read the full story
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pillars */}
      <section className="relative border-y border-hairline bg-ink-2 py-28 sm:py-40">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <ChapterLabel index="02 / 05">The Four Pillars</ChapterLabel>
          <Reveal>
            <h2 className="mt-8 text-4xl font-extrabold tracking-[-0.035em] text-ivory sm:text-6xl md:text-[4.5rem]">
              What we stand on.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-mute">
              Twelve years in, the mission hasn&rsquo;t changed. Educate, own,
              uplift, act.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-16 grid max-w-7xl gap-px border border-hairline bg-hairline px-0 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <PillarCard key={p.title} {...p} index={i} />
          ))}
        </div>
      </section>

      {/* Discography */}
      <section className="py-28 sm:py-40">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <ChapterLabel index="03 / 05">Discography</ChapterLabel>
        </div>
        <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6">
          <AlbumRail />
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-hairline bg-ink-2 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <ChapterLabel>Impact</ChapterLabel>
          <Reveal>
            <h2 className="mt-6 text-3xl font-extrabold tracking-[-0.03em] text-ivory sm:text-5xl">
              Twelve years. One movement.
            </h2>
          </Reveal>
        </div>
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-2 divide-x divide-hairline border-y border-hairline sm:grid-cols-4">
          <StatBlock><StatCounter value={12} suffix="+" label="Years Active" accent="red" /></StatBlock>
          <StatBlock><StatCounter value={2} label="Albums Released" /></StatBlock>
          <StatBlock><StatCounter value={100} suffix="+" label="Artists Reached" /></StatBlock>
          <StatBlock><StatCounter value={1000} suffix="+" label="Community Served" accent="green" /></StatBlock>
        </div>
      </section>

      {/* Pioneers index */}
      <section className="py-28 sm:py-40">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <ChapterLabel index="04 / 05">The Pioneers</ChapterLabel>
          <Reveal>
            <h2 className="mt-8 text-4xl font-extrabold tracking-[-0.035em] text-ivory sm:text-6xl md:text-[4.5rem]">
              The names that built the room.
            </h2>
          </Reveal>
        </div>

        <div className="mx-auto mt-16 max-w-4xl border-t border-hairline">
          {PIONEERS.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
            >
              <Link
                to="/pioneers"
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-hairline px-4 py-6 transition-colors duration-150 hover:bg-surface sm:gap-8 sm:px-8 sm:py-8"
              >
                <span className="font-mono-tech text-[11px] uppercase tracking-[0.3em] text-dim">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 truncate text-2xl font-extrabold tracking-[-0.02em] text-ivory transition-colors group-hover:text-red sm:text-4xl">
                  {name}
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-dim transition-colors group-hover:text-red" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Anchor quote — full viewport */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden border-y border-hairline bg-ink">
        <div className="pointer-events-none absolute inset-x-8 top-8 flex items-center justify-between font-mono-tech text-[10px] uppercase tracking-[0.3em] text-dim sm:inset-x-12">
          <span>05 / 05</span>
          <span>THE ANCHOR</span>
        </div>
        <div className="relative mx-auto max-w-6xl px-6 py-24 text-center">
          <Reveal>
            <blockquote className="text-4xl font-extrabold leading-[0.95] tracking-[-0.035em] text-ivory sm:text-7xl md:text-[6.5rem]">
              &ldquo;The community won&rsquo;t respect{" "}
              <span className="text-red">US</span>
              <br />
              unless <span className="text-red">WE</span> respect the community.&rdquo;
            </blockquote>
            <div className="mt-14">
              <Link to="/contact" className="btn-red">
                Join the movement
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function StatBlock({ children }: { children: React.ReactNode }) {
  return <div className="px-6 py-10 sm:px-8 sm:py-14">{children}</div>;
}
