import { createFileRoute } from "@tanstack/react-router";
import { Utensils, Shirt, Trash2, Users, School, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/arc/PageHeader";
import { Reveal } from "@/components/arc/Reveal";
import { ChapterLabel } from "@/components/arc/ChapterLabel";
import heroCommunity from "@/assets/hero-community.jpg";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community On the Ground Work with A.R.C." },
      {
        name: "description",
        content:
          "A.R.C. community programs. Feeding the homeless, clothing drives, neighborhood clean-ups, conflict resolution, and speaking at schools.",
      },
      { property: "og:title", content: "A.R.C. Community" },
      {
        property: "og:description",
        content:
          "On the ground work. Feeding, clothing drives, clean-ups, conflict resolution, and school talks.",
      },
    ],
  }),
  component: Community,
});

const PROGRAMS = [
  {
    icon: Utensils,
    title: "Feeding the Community",
    body: "Feeding the homeless and less fortunate. Showing up consistently for the people the industry forgets.",
  },
  {
    icon: Shirt,
    title: "Clothing Drives",
    body: "Collecting and distributing clothing where it&rsquo;s needed most, year-round.",
  },
  {
    icon: Trash2,
    title: "Neighborhood Clean-Ups",
    body: "Boots on the block. Cleaning the neighborhoods that raised us.",
  },
  {
    icon: MessageCircle,
    title: "Conflict Resolution",
    body: "Sitting with people, not around them. Helping resolve beefs before they turn into headlines.",
  },
  {
    icon: School,
    title: "Speaking at Schools",
    body: "Talking directly with young people about music, business, ownership, and the choices in front of them.",
  },
  {
    icon: Users,
    title: "A Resource",
    body: "A place to reach out to with questions about the music industry, and community issues as well.",
  },
];

function Community() {
  return (
    <>
      <PageHeader
        eyebrow="Community"
        title="On the ground"
        intro="The mission is accompanied by consistent community efforts. Respect is earned in the neighborhood, not in the studio."
        image={heroCommunity}
        imageAlt="Houston neighborhood street at dusk"
      />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <ChapterLabel>Programs</ChapterLabel>
        </div>
        <div className="mx-auto mt-14 grid max-w-7xl gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <article className="group flex h-full flex-col justify-between bg-surface p-8 transition-colors duration-200 hover:bg-surface-2">
                <div>
                  <div className="flex items-center justify-between font-mono-tech text-[10px] uppercase tracking-[0.3em] text-dim">
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <span>PROGRAM</span>
                  </div>
                  <div className="mt-8 inline-grid h-11 w-11 place-items-center border border-hairline-strong bg-ink-2 transition-colors duration-200 group-hover:border-red/70">
                    <p.icon className="h-5 w-5 text-ivory transition-colors duration-200 group-hover:text-red" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-6 text-2xl font-extrabold tracking-[-0.02em] text-ivory">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mute" dangerouslySetInnerHTML={{ __html: p.body }} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
