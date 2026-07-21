import { createFileRoute } from "@tanstack/react-router";
import { Utensils, Shirt, Trash2, Users, School, MessageCircle, Calendar } from "lucide-react";
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

const EVENTS = [
  {
    date: "TBD",
    month: "SOON",
    title: "Next Community Feeding",
    location: "Houston, TX",
    tag: "OUTREACH",
  },
  {
    date: "TBD",
    month: "SOON",
    title: "Neighborhood Clean-Up",
    location: "Houston, TX",
    tag: "BOOTS ON",
  },
  {
    date: "TBD",
    month: "2026",
    title: "Sieze the Time Listening Session",
    location: "Houston, TX",
    tag: "MUSIC",
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

      <section className="border-t border-hairline py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <ChapterLabel>Archive</ChapterLabel>
          <h2 className="mt-8 text-4xl font-extrabold tracking-[-0.03em] text-ivory sm:text-5xl">
            Twelve years, documented
          </h2>
          <p className="mt-5 text-base leading-relaxed text-mute">
            A monochrome photo archive of feeding events, clean-ups, school visits, and meetings. Photos pending.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-7xl grid-cols-2 gap-px border border-hairline bg-hairline px-0 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Reveal key={i} delay={i * 0.03}>
              <div className="group relative flex aspect-square items-end justify-between bg-surface p-4 transition-colors duration-200 hover:bg-surface-2">
                <span
                  className="pointer-events-none absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent 0 12px, rgba(255,255,255,0.03) 12px 24px)",
                  }}
                />
                <span className="relative font-mono-tech text-[10px] uppercase tracking-[0.3em] text-dim">
                  IMG_{String(i + 1).padStart(3, "0")}
                </span>
                <span className="relative font-mono-tech text-[10px] uppercase tracking-[0.3em] text-dim">
                  TBD
                </span>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-7xl px-6 font-mono-tech text-[10px] uppercase tracking-[0.3em] text-dim">
          Photo archive placeholders · Upload pending
        </p>
      </section>

      <section className="border-t border-hairline bg-ink-2 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <ChapterLabel>Upcoming</ChapterLabel>
          <h2 className="mt-8 text-4xl font-extrabold tracking-[-0.03em] text-ivory sm:text-5xl">
            Events
          </h2>
          <p className="mt-5 text-base leading-relaxed text-mute">
            Feedings, clean-ups, listening sessions. Dates being locked in - check back or reach out to RSVP.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-5xl px-6">
          <ul className="border-t border-hairline">
            {EVENTS.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.05}>
                <li className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 border-b border-hairline py-6 transition-colors duration-150 hover:bg-surface sm:grid-cols-[120px_1fr_auto_auto] sm:gap-10 sm:py-8">
                  <div className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-dim">
                    <div className="text-2xl font-extrabold tracking-[-0.02em] text-ivory">{e.date}</div>
                    <div className="mt-1">{e.month}</div>
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-xl font-extrabold tracking-[-0.02em] text-ivory sm:text-2xl">
                      {e.title}
                    </h3>
                    <p className="mt-1 text-sm text-mute">{e.location}</p>
                  </div>
                  <span className="hidden font-mono-tech text-[10px] uppercase tracking-[0.28em] text-dim sm:block">
                    {e.tag}
                  </span>
                  <button
                    type="button"
                    disabled
                    className="inline-flex items-center gap-2 border border-hairline-strong bg-surface px-4 py-2 font-mono-tech text-[10px] uppercase tracking-[0.28em] text-mute opacity-70"
                  >
                    <Calendar className="h-3 w-3" strokeWidth={1.5} /> RSVP
                  </button>
                </li>
              </Reveal>
            ))}
          </ul>
          <p className="mt-6 font-mono-tech text-[10px] uppercase tracking-[0.3em] text-dim">
            RSVP wiring pending
          </p>
        </div>
      </section>
    </>
  );
}
