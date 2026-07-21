import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/arc/PageHeader";
import { Reveal } from "@/components/arc/Reveal";
import heroAbout from "@/assets/hero-about.jpg";

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

const CHAPTERS = [
  {
    year: "2014 / CHICAGO",
    title: "The meeting.",
    body: "The Honorable Minister Louis Farrakhan met in Chicago with prominent members of the Hip Hop community from across the country. He urged rappers to bring more consciousness into their music, end senseless beefs, and be an example the community could benefit from.",
  },
  {
    year: "THE CHARGE",
    title: "Take it home.",
    body: "Dr. Abdul Haleem Muhammad, Southwest Student Regional Minister of the Nation of Islam, and other student Ministers in attendance were instructed by Min. Farrakhan to take what they had witnessed back to their respective cities and do the same.",
  },
  {
    year: "HOUSTON",
    title: "K-Rino answers the call.",
    body: "Houston rapper K-Rino was called upon by Dr. Abdul Haleem Muhammad to assist by reaching out to local music people in Houston. Shortly after, the first A.R.C. meeting was held.",
  },
  {
    year: "THE FOUNDERS",
    title: "The room takes shape.",
    body: "Pioneers of the movement consisted of veteran artists, producers, label owners, and DJs. The Legendary O.G. Wickett Crickett, Ganxsta Nip, Cl'Che, Fiya the Media Mogul, Zin, Murder One, Mr. Cap, and K-Rino.",
  },
  {
    year: "TODAY",
    title: "Twelve years, still moving.",
    body: "Two albums released, Time to Rise and Ready for the Revolution, with a third, Sieze the Time, expected near the end of 2026. Twelve years of educating, organizing, and serving the city we love.",
  },
];

function About() {
  return (
    <>
      <PageHeader
        eyebrow="Our Origin"
        title="The story of A.R.C."
        intro="From a room in Chicago to a movement in Houston. How Artists Respecting Community was born and why it still matters."
        image={heroAbout}
        imageAlt="Silhouettes of Hip Hop figures gathered in a dim room"
      />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <ol className="border-t border-hairline">
            {CHAPTERS.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.05}>
                <li className="grid gap-3 border-b border-hairline py-10 sm:grid-cols-[160px_1fr] sm:gap-10 sm:py-14">
                  <div className="flex items-center gap-3 font-mono-tech text-[10px] uppercase tracking-[0.3em] text-dim">
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <span className="h-px w-8 bg-hairline-strong" />
                    <span>{c.year}</span>
                  </div>
                  <div>
                    <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-ivory sm:text-5xl">
                      {c.title}
                    </h2>
                    <p className="mt-5 max-w-2xl text-base leading-relaxed text-mute">
                      {c.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-hairline bg-ink-2 py-24 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <blockquote className="text-3xl font-extrabold leading-[0.95] tracking-[-0.03em] text-ivory sm:text-5xl">
              &ldquo;With knowledge comes <span className="text-red">great responsibility</span>.&rdquo;
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
