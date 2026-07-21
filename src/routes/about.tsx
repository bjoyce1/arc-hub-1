import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/arc/PageHeader";
import { Reveal } from "@/components/arc/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About A.R.C. — The Origin of the Movement" },
      {
        name: "description",
        content:
          "How A.R.C. began in 2014 — from a Chicago meeting with Minister Farrakhan to the founding of the Houston chapter led by K-Rino and Dr. Abdul Haleem Muhammad.",
      },
      { property: "og:title", content: "About A.R.C. — The Origin" },
      {
        property: "og:description",
        content:
          "The story of Artists Respecting Community, born in Houston in 2014.",
      },
    ],
  }),
  component: About,
});

const CHAPTERS = [
  {
    year: "2014",
    title: "Chicago. The Meeting.",
    body: "The Honorable Minister Louis Farrakhan met in Chicago with prominent members of the Hip Hop community from across the country. In that meeting he urged rappers to bring more consciousness into their music, end senseless beefs, and be an example the community could benefit from.",
  },
  {
    year: "The Charge",
    title: "Take it home.",
    body: "Dr. Abdul Haleem Muhammad — the Southwest Student Regional Minister of the Nation of Islam — and other student Ministers in attendance were instructed by Min. Farrakhan to take what they had witnessed back to their respective cities and do the same.",
  },
  {
    year: "Houston",
    title: "K-Rino answers the call.",
    body: "Houston rapper K-Rino was called upon by Dr. Abdul Haleem Muhammad to assist by reaching out to local music people in Houston. Shortly after, the first A.R.C. meeting was held.",
  },
  {
    year: "The Founders",
    title: "The room takes shape.",
    body: "Pioneers of the movement consisted of veteran artists, producers, label owners, and DJs — the Legendary O.G. Wickett Crickett, Ganxsta Nip, Cl'Che, Fiya the Media Mogul, Zin, Murder One, Mr. Cap, and K-Rino.",
  },
  {
    year: "Today",
    title: "Twelve years, still moving.",
    body: "Two albums released — Time to Rise and Ready for the Revolution — with a third, Sieze the Time, expected near the end of 2026. Twelve years of educating, organizing, and serving the city we love.",
  },
];

function About() {
  return (
    <>
      <PageHeader
        eyebrow="Our Origin"
        title={<>The story of <span className="text-gold-gradient">A.R.C.</span></>}
        intro="From a room in Chicago to a movement in Houston — how Artists Respecting Community was born and why it still matters."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <ol className="relative border-l border-gold/30 pl-8 sm:pl-12">
            {CHAPTERS.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.05}>
                <li className="relative mb-14 last:mb-0">
                  <span
                    aria-hidden
                    className="absolute -left-[38px] top-1 grid h-6 w-6 place-items-center rounded-full border border-gold bg-ink sm:-left-[54px]"
                  >
                    <span className="h-2 w-2 rounded-full bg-gold-gradient" />
                  </span>
                  <p className="text-xs uppercase tracking-[0.3em] text-gold">{c.year}</p>
                  <h2 className="mt-2 font-display text-3xl uppercase text-ivory sm:text-4xl">
                    {c.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-ivory/80">
                    {c.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border bg-card/40 py-20 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <blockquote className="font-display text-3xl uppercase leading-tight text-ivory sm:text-5xl">
              &ldquo;With knowledge comes <span className="text-gold-gradient">great responsibility</span>.&rdquo;
            </blockquote>
            <p className="mt-6 text-sm uppercase tracking-widest text-gold">— A.R.C.</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
