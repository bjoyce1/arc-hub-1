import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Briefcase, Crown, Radio, HandHeart, ArrowRight } from "lucide-react";
import { Hero } from "@/components/arc/Hero";
import { Ribbon } from "@/components/arc/Ribbon";
import { PillarCard } from "@/components/arc/PillarCard";
import { AlbumRail } from "@/components/arc/AlbumRail";
import { StatCounter } from "@/components/arc/StatCounter";
import { Reveal } from "@/components/arc/Reveal";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "A.R.C. — Artists Respecting Community",
  alternateName: "Artists Respecting Community",
  foundingDate: "2014",
  foundingLocation: "Houston, TX",
  description:
    "A Houston-born movement uniting artists, producers, and DJs around consciousness, ownership, and community action.",
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A.R.C. — Artists Respecting Community | Houston Movement Since 2014" },
      {
        name: "description",
        content:
          "The main hub for A.R.C. — Artists Respecting Community. A Houston-born movement of artists uniting for consciousness, ownership, and community action since 2014.",
      },
      { property: "og:title", content: "A.R.C. — Artists Respecting Community | Houston Movement Since 2014" },
      {
        property: "og:description",
        content:
          "The main hub for A.R.C. — Artists Respecting Community. A Houston-born movement of artists uniting for consciousness, ownership, and community action since 2014.",
      },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(jsonLd) },
    ],
  }),
  component: Home,
});

const PILLARS = [
  {
    icon: Briefcase,
    title: "Business of Music",
    body: "Educating artists on the business of music — protecting their art from an industry built to enrich itself, not its creators.",
  },
  {
    icon: Crown,
    title: "Ownership",
    body: "Encouraging artists to own their masters, their publishing, and the platforms they build their careers on.",
  },
  {
    icon: Radio,
    title: "Positive Content",
    body: "Adding balance to the airwaves — releasing content that counters the negativity dominating radio, TV, and social media.",
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

      {/* Origin teaser */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <Reveal>
            <div className="relative">
              <div
                aria-hidden
                className="absolute inset-0 -rotate-3 rounded-3xl bg-gold-gradient opacity-20 blur-2xl"
              />
              <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-card p-8 sm:p-10">
                <p className="text-xs uppercase tracking-[0.3em] text-gold">Chicago, 2014</p>
                <p className="mt-6 font-display text-5xl uppercase leading-none text-ivory sm:text-6xl">
                  A charge<br />from the<br /><span className="text-gold-gradient">Minister</span>.
                </p>
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                  The Honorable Minister Louis Farrakhan urged Hip Hop&rsquo;s
                  leaders to bring more consciousness into their music, end
                  senseless beefs, and build examples the community could
                  benefit from.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-gold">The Origin</p>
              <h2 className="mt-3 font-display text-4xl uppercase text-ivory sm:text-5xl md:text-6xl">
                The movement that started in a room —
                <span className="text-gold-gradient"> and never sat down.</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-ivory/80 sm:text-lg">
                Dr. Abdul Haleem Muhammad brought the charge back to Houston
                and called on K-Rino to gather the city&rsquo;s music people.
                Shortly after, the first A.R.C. meeting was held — pioneered
                by veteran artists, producers, label owners, and DJs.
              </p>
              <Link
                to="/about"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-gold"
              >
                Read the full story
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pillars */}
      <section className="relative border-y border-border bg-ink/60 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="mb-14 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-gold">Four Pillars</p>
                <h2 className="mt-3 font-display text-4xl uppercase text-ivory sm:text-5xl md:text-6xl">
                  What we <span className="text-gold-gradient">stand on</span>.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                Twelve years in, the mission hasn&rsquo;t changed: educate,
                own, uplift, and act.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p, i) => (
              <PillarCard key={p.title} {...p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Albums rail */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <AlbumRail />
        </div>
      </section>

      {/* Stats */}
      <section className="relative overflow-hidden border-y border-border bg-card/60 py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, var(--gold) 0%, transparent 40%), radial-gradient(circle at 80% 70%, var(--gold-dark) 0%, transparent 40%)",
            filter: "blur(80px)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="mb-14 text-center">
              <p className="text-xs uppercase tracking-[0.4em] text-gold">Impact</p>
              <h2 className="mt-3 font-display text-4xl uppercase text-ivory sm:text-5xl">
                Twelve years. One movement.
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            <StatCounter value={12} suffix="+" label="Years Active" />
            <StatCounter value={2} label="Albums Released" />
            <StatCounter value={100} suffix="+" label="Artists Reached" />
            <StatCounter value={1000} suffix="+" label="Community Served" />
          </div>
        </div>
      </section>

      {/* Pioneers strip */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.4em] text-gold">The Pioneers</p>
            <h2 className="mt-3 font-display text-4xl uppercase text-ivory sm:text-5xl md:text-6xl">
              The names that built <span className="text-gold-gradient">the room</span>.
            </h2>
          </Reveal>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            {PIONEERS.map((name, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Link
                  to="/pioneers"
                  className="story-link font-display text-3xl uppercase text-ivory/70 hover:text-ivory sm:text-4xl"
                >
                  {name}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center sm:py-32">
          <div
            aria-hidden
            className="absolute inset-x-0 top-1/2 -z-10 h-64 -translate-y-1/2 opacity-20 blur-3xl"
            style={{ background: "var(--gradient-gold)" }}
          />
          <Reveal>
            <p className="text-xs uppercase tracking-[0.4em] text-gold">The Anchor</p>
            <blockquote className="mt-6 font-display text-4xl uppercase leading-tight text-ivory sm:text-6xl md:text-7xl">
              &ldquo;The community<br />won&rsquo;t respect <span className="text-gold-gradient">US</span><br />
              unless <span className="text-gold-gradient">WE</span> respect<br />the community.&rdquo;
            </blockquote>
            <Link
              to="/contact"
              className="mt-12 inline-flex items-center gap-2 rounded-full bg-gold-gradient px-8 py-4 text-sm font-bold uppercase tracking-widest text-ink hover:scale-105 transition-transform"
            >
              Join the movement
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
