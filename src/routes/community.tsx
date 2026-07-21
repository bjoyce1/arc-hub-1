import { createFileRoute } from "@tanstack/react-router";
import { Utensils, Shirt, Trash2, Users, School, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/arc/PageHeader";
import { Reveal } from "@/components/arc/Reveal";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — On-the-Ground Work with A.R.C." },
      {
        name: "description",
        content:
          "A.R.C. community programs — feeding the homeless, clothing drives, neighborhood clean-ups, conflict resolution, and speaking at schools.",
      },
      { property: "og:title", content: "A.R.C. Community" },
      {
        property: "og:description",
        content:
          "On-the-ground work: feeding, clothing drives, clean-ups, conflict resolution, and school talks.",
      },
    ],
  }),
  component: Community,
});

const PROGRAMS = [
  {
    icon: Utensils,
    title: "Feeding the Community",
    body: "Feeding the homeless and less fortunate — showing up consistently for the people the industry forgets.",
  },
  {
    icon: Shirt,
    title: "Clothing Drives",
    body: "Collecting and distributing clothing where it&rsquo;s needed most, year-round.",
  },
  {
    icon: Trash2,
    title: "Neighborhood Clean-Ups",
    body: "Boots on the block — cleaning the neighborhoods that raised us.",
  },
  {
    icon: MessageCircle,
    title: "Conflict Resolution",
    body: "Sitting with people, not around them — helping resolve beefs before they turn into headlines.",
  },
  {
    icon: School,
    title: "Speaking at Schools",
    body: "Talking directly with young people about music, business, ownership, and the choices in front of them.",
  },
  {
    icon: Users,
    title: "A Resource",
    body: "A place to reach out to with questions about the music industry — and community issues as well.",
  },
];

function Community() {
  return (
    <>
      <PageHeader
        eyebrow="Community"
        title={<>On the <span className="text-gold-gradient">ground</span></>}
        intro="The mission is accompanied by consistent community efforts — because respect is earned in the neighborhood, not in the studio."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROGRAMS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <article className="hover-lift group h-full rounded-2xl border border-border bg-card p-6 sm:p-8">
                  <div className="mb-6 inline-grid h-14 w-14 place-items-center rounded-xl border border-gold/30 bg-ink/40">
                    <p.icon className="h-6 w-6 text-gold" strokeWidth={1.6} />
                  </div>
                  <h3 className="font-display text-2xl uppercase text-ivory sm:text-3xl">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
