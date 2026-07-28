import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PageHeader } from "@/components/arc/PageHeader";
import { Reveal } from "@/components/arc/Reveal";
import { ChapterLabel } from "@/components/arc/ChapterLabel";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About A.R.C. The Origin of the Movement" },
      {
        name: "description",
        content:
          "How A.R.C. began in 2014. From a Chicago meeting with Minister Farrakhan to the founding of the Houston chapter led by K-Rino and Dr. Abdul Haleem Muhammad.",
      },
      { property: "og:title", content: "About A.R.C. The Origin" },
      {
        property: "og:description",
        content: "The story of Artists Respecting Community, born in Houston in 2014.",
      },
    ],
  }),
  component: About,
});

const TIMELINE = [
  {
    year: "2014",
    tag: "CHICAGO",
    title: "The meeting.",
    body: "The Honorable Minister Louis Farrakhan met in Chicago with prominent members of the Hip Hop community from across the country. He urged rappers to bring more consciousness into their music, end senseless beefs, and be an example the community could benefit from.",
  },
  {
    year: "2014",
    tag: "THE CHARGE",
    title: "Take it home.",
    body: "Dr. Abdul Haleem Muhammad, Southwest Student Regional Minister of the Nation of Islam, and other student Ministers in attendance were instructed by Min. Farrakhan to take what they had witnessed back to their respective cities.",
  },
  {
    year: "2014",
    tag: "HOUSTON",
    title: "K-Rino answers the call.",
    body: "Houston rapper K-Rino was called upon by Dr. Abdul Haleem Muhammad to assist by reaching out to local music people in Houston. Shortly after, the first A.R.C. meeting was held.",
  },
  {
    year: "2015",
    tag: "THE FOUNDERS",
    title: "The room takes shape.",
    body: "Pioneers of the movement consisted of veteran artists, producers, label owners, and DJs. The Legendary O.G. Wickett Crickett, Ganxsta Nip, Cl'Che, Fiya the Media Mogul, Zin, Murder One, Mr. Cap, and K-Rino.",
  },
  {
    year: "2016",
    tag: "BOOTS ON",
    title: "Community first.",
    body: "The collective's earliest ground work: feeding the homeless, clothing drives, and neighborhood clean-ups. Full milestone details pending.",
  },
  {
    year: "2017",
    tag: "VOL. I",
    title: "Time to Rise.",
    body: "The debut collective project. A call to consciousness and craft from the founding pioneers. Full release details pending.",
  },
  {
    year: "2019",
    tag: "IN SCHOOLS",
    title: "Speaking directly.",
    body: "A.R.C. members begin regularly speaking at Houston schools about music, business, ownership, and choice. Full milestone details pending.",
  },
  {
    year: "2021",
    tag: "VOL. II",
    title: "Ready for the Revolution.",
    body: "The follow-up statement. Ownership, education, and unapologetic art in service of the community. Full release details pending.",
  },
  {
    year: "2023",
    tag: "CONFLICT RESOLUTION",
    title: "Sitting with, not around.",
    body: "The collective steps in to help resolve tensions before they turn into headlines. Full milestone details pending.",
  },
  {
    year: "2026",
    tag: "VOL. III",
    title: "Seize the Time.",
    body: "Twelve years after the first meeting, the collective returns with a record built for this moment. Coming late 2026.",
  },
];

function About() {
  return (
    <>
      <PageHeader
        eyebrow="Our Origin"
        title="The story of A.R.C."
        intro="From a room in Chicago to a movement in Houston. How Artists Respecting Community was born and why it still matters."
        image="noi-headquarters"
        imageAlt="Southwest Regional headquarters on Old Spanish Trail, where the Houston charge was taken up"
      />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-14 text-center">
            <ChapterLabel>Timeline · 2014 to 2026</ChapterLabel>
          </div>

          <TimelineRail />
        </div>
      </section>

      <section className="border-t border-hairline bg-ink-2 py-24 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <blockquote className="text-3xl font-extrabold leading-[0.95] tracking-[-0.03em] text-ivory sm:text-5xl">
              &ldquo;With knowledge comes <span className="text-gold">great responsibility</span>.&rdquo;
            </blockquote>
            <p className="mt-8 font-mono-tech text-[10px] uppercase tracking-[0.32em] text-dim">
              A.R.C.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function TimelineRail() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative">
      <div className="absolute left-4 top-0 h-full w-px bg-hairline sm:left-[136px]" />
      <motion.div
        className="absolute left-4 top-0 w-px bg-gold sm:left-[136px]"
        style={{ height: lineHeight }}
      />

      <ol className="space-y-14 sm:space-y-20">
        {TIMELINE.map((c, i) => (
          <Reveal key={`${c.year}-${c.title}`} delay={i * 0.03}>
            <li className="relative grid gap-3 pl-12 sm:grid-cols-[136px_1fr] sm:gap-10 sm:pl-0">
              <span className="absolute left-[13px] top-2 h-2 w-2 rounded-full bg-gold sm:left-[131px]" />
              <div className="font-mono-tech text-[11px] uppercase tracking-[0.3em] text-dim sm:text-right">
                <div className="text-2xl font-extrabold tracking-[-0.02em] text-ivory sm:text-3xl">
                  {c.year}
                </div>
                <div className="mt-2">{c.tag}</div>
              </div>
              <div>
                <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-ivory sm:text-4xl">
                  {c.title}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-mute">
                  {c.body}
                </p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
