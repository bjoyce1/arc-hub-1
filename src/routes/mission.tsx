import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Crown, Radio, HandHeart } from "lucide-react";
import { PageHeader } from "@/components/arc/PageHeader";
import { PillarCard } from "@/components/arc/PillarCard";
import { Reveal } from "@/components/arc/Reveal";
import { ChapterLabel } from "@/components/arc/ChapterLabel";

export const Route = createFileRoute("/mission")({
  head: () => ({
    meta: [
      { title: "Mission A.R.C. Artists Respecting Community" },
      {
        name: "description",
        content:
          "The A.R.C. mission. Educate artists on the business of music, encourage ownership, release positive content, and serve the community.",
      },
      { property: "og:title", content: "The A.R.C. Mission" },
      {
        property: "og:description",
        content:
          "Business education, ownership, positive content, and community action. The four pillars of A.R.C.",
      },
    ],
  }),
  component: Mission,
});

const PILLARS = [
  {
    icon: Briefcase,
    title: "Business of Music",
    body: "The initial goal, and still the foundation. Educate artists on the business of music and how to protect their art from a record industry that only intends to enrich itself, not its artists.",
  },
  {
    icon: Crown,
    title: "Ownership",
    body: "Ownership is freedom. We encourage artists to own their masters, publishing, and the platforms they build careers on. You can&rsquo;t control what you don&rsquo;t own.",
  },
  {
    icon: Radio,
    title: "Positive Content",
    body: "We ask artists to release more positive content to add balance and combat the high quantity of negative music that dominates radio, TV, and social media.",
  },
  {
    icon: HandHeart,
    title: "Community Action",
    body: "Consistent efforts on the ground. Feeding the homeless and less fortunate, clothing drives, neighborhood clean-ups, conflict resolution, speaking at schools, and more.",
  },
];

function Mission() {
  return (
    <>
      <PageHeader
        eyebrow="Our Mission"
        title="What we're building"
        intro="A.R.C. exists to educate, elevate, and organize. Building an organization people can reach out to for the music industry and for the community."
        image="forum-audience"
        imageAlt="A packed room at SHAPE Community Center for the Bridging the Gap forum"
      />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <ChapterLabel>The Four Pillars</ChapterLabel>
        </div>
        <div className="mx-auto mt-14 grid max-w-7xl gap-px border border-hairline bg-hairline sm:mx-auto sm:grid-cols-2">
          {PILLARS.map((p, i) => (
            <PillarCard key={p.title} {...p} index={i} />
          ))}
        </div>
      </section>

      <section className="border-t border-hairline bg-ink-2 py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <ChapterLabel>A Resource</ChapterLabel>
            <h2 className="mt-8 text-4xl font-extrabold tracking-[-0.03em] text-ivory sm:text-6xl">
              A place to reach out.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-mute sm:text-lg">
              A.R.C. is also geared toward becoming an organization that people
              can reach out to when they have questions or need information
              about aspects of the music industry, and community issues as well.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
