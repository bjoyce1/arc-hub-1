import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Crown, Radio, HandHeart } from "lucide-react";
import { PageHeader } from "@/components/arc/PageHeader";
import { PillarCard } from "@/components/arc/PillarCard";
import { Reveal } from "@/components/arc/Reveal";

export const Route = createFileRoute("/mission")({
  head: () => ({
    meta: [
      { title: "Mission — A.R.C. Artists Respecting Community" },
      {
        name: "description",
        content:
          "The A.R.C. mission: educate artists on the business of music, encourage ownership, release positive content, and serve the community.",
      },
      { property: "og:title", content: "The A.R.C. Mission" },
      {
        property: "og:description",
        content:
          "Business education, ownership, positive content, and community action — the four pillars of A.R.C.",
      },
    ],
  }),
  component: Mission,
});

const PILLARS = [
  {
    icon: Briefcase,
    title: "Business of Music",
    body: "The initial goal — and still the foundation. Educate artists on the BUSINESS of music and how to protect their art from a record industry that only intends to enrich itself, not its artists.",
  },
  {
    icon: Crown,
    title: "Ownership",
    body: "Ownership is freedom. We encourage artists to own their masters, publishing, and the platforms they build careers on — because you can&rsquo;t control what you don&rsquo;t own.",
  },
  {
    icon: Radio,
    title: "Positive Content",
    body: "We ask artists to release more positive content to add balance and combat the high quantity of negative music that dominates radio, TV, and social media.",
  },
  {
    icon: HandHeart,
    title: "Community Action",
    body: "Consistent efforts on the ground — feeding the homeless and less fortunate, clothing drives, neighborhood clean-ups, conflict resolution, speaking at schools, and more.",
  },
];

function Mission() {
  return (
    <>
      <PageHeader
        eyebrow="Our Mission"
        title={<>What we&rsquo;re <span className="text-gold-gradient">building</span></>}
        intro="A.R.C. exists to educate, elevate, and organize — building an organization people can reach out to for the music industry and for the community."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {PILLARS.map((p, i) => (
              <PillarCard key={p.title} {...p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card/40 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.4em] text-gold">A resource</p>
            <h2 className="mt-3 font-display text-4xl uppercase text-ivory sm:text-5xl">
              A place to <span className="text-gold-gradient">reach out</span>.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ivory/80 sm:text-lg">
              A.R.C. is also geared toward becoming an organization that people
              can reach out to when they have questions or need information
              about aspects of the music industry — and community issues as
              well.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
