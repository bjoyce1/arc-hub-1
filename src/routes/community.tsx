import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Maximize2,
  MessageCircle,
  School,
  Shirt,
  Trash2,
  Users,
  Utensils,
} from "lucide-react";
import { useState } from "react";
import { ChapterLabel } from "@/components/arc/ChapterLabel";
import { Img } from "@/components/arc/Img";
import { Lightbox } from "@/components/arc/Lightbox";
import { PageHeader } from "@/components/arc/PageHeader";
import { Reveal } from "@/components/arc/Reveal";
import { FLYERS, PHOTOS, TRACKS, type ArchiveEntry, type Track } from "@/data/archive";

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
    body: "Collecting and distributing clothing where it’s needed most, year-round.",
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

type Filter = Track | "all";

const FILTERS: { id: Filter; label: string }[] = [{ id: "all", label: "All" }, ...TRACKS];

// Flyer widths in the masonry: two columns on a phone, three at md, four at lg.
// Getting this wrong is the difference between a 400px file and a 1600px one.
const FLYER_SIZES = "(max-width: 639px) 46vw, (max-width: 1023px) 30vw, 22vw";
const PHOTO_SIZES = "(max-width: 639px) 48vw, (max-width: 1023px) 32vw, 19vw";

function Community() {
  const [filter, setFilter] = useState<Filter>("all");
  const [flyerIndex, setFlyerIndex] = useState<number | null>(null);
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);

  const flyers = filter === "all" ? FLYERS : FLYERS.filter((f) => f.track === filter);

  return (
    <>
      <PageHeader
        eyebrow="Community"
        title="On the ground"
        intro="The mission is accompanied by consistent community efforts. Respect is earned in the neighborhood, not in the studio."
        image="peace-ride-families"
        imageAlt="Families riding together on the Houston Peace Ride"
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
                  <div className="mt-8 inline-grid h-11 w-11 place-items-center border border-hairline-strong bg-ink-2 transition-colors duration-200 group-hover:border-gold/70">
                    <p.icon
                      className="h-5 w-5 text-ivory transition-colors duration-200 group-hover:text-gold"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="mt-6 text-2xl font-extrabold tracking-[-0.02em] text-ivory">
                    {p.title}
                  </h3>
                  <p
                    className="mt-3 text-sm leading-relaxed text-mute"
                    dangerouslySetInnerHTML={{ __html: p.body }}
                  />
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
            The flyer wall
          </h2>
          <p className="mt-5 text-base leading-relaxed text-mute">
            Every ride, forum, feeding and workshop A.R.C. has put its name on. Tap any flyer to
            read it full-screen.
          </p>
        </div>

        {/* Swipeable rail on a phone, centred row once there is width for it. */}
        <div
          role="group"
          aria-label="Filter flyers by track"
          className="scroll-rail mx-auto mt-10 max-w-7xl gap-2 px-4 sm:flex-wrap sm:justify-center sm:overflow-x-visible sm:px-6"
        >
          {FILTERS.map((f) => {
            const count =
              f.id === "all" ? FLYERS.length : FLYERS.filter((x) => x.track === f.id).length;
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setFilter(f.id);
                  setFlyerIndex(null);
                }}
                className={`inline-flex min-h-11 touch-manipulation items-center gap-2 border px-4 font-mono-tech text-[10px] uppercase tracking-[0.28em] transition-colors duration-200 ${
                  active
                    ? "border-gold/70 bg-surface-2 text-ivory"
                    : "border-hairline-strong text-mute hover:bg-surface hover:text-ivory"
                }`}
              >
                {f.label}
                <span className={active ? "text-gold" : "text-dim"}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* Keyed on the filter so the reveal animation re-runs for each new set. */}
        <div
          key={filter}
          className="mx-auto mt-12 max-w-7xl columns-2 gap-4 px-4 sm:px-6 md:columns-3 lg:columns-4"
        >
          {flyers.map((f, i) => (
            <Reveal key={f.name} delay={Math.min(i, 7) * 0.04} className="mb-4 break-inside-avoid">
              <FlyerCard entry={f} onOpen={() => setFlyerIndex(i)} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-hairline bg-ink-2 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <ChapterLabel>Photographs</ChapterLabel>
          <h2 className="mt-8 text-4xl font-extrabold tracking-[-0.03em] text-ivory sm:text-5xl">
            In the field
          </h2>
          <p className="mt-5 text-base leading-relaxed text-mute">
            Peace rides, packed forums, meals bagged by hand, turntables in the yard.
          </p>
        </div>

        {/* Ten photos divide evenly into two and five, so the wall ends on a
            full row at both the phone and desktop breakpoints. */}
        <div className="mx-auto mt-12 grid max-w-7xl grid-cols-2 gap-px border-y border-hairline bg-hairline sm:grid-cols-3 lg:grid-cols-5">
          {PHOTOS.map((p, i) => (
            <Reveal key={p.name} delay={Math.min(i, 7) * 0.03}>
              <button
                type="button"
                onClick={() => setPhotoIndex(i)}
                className="group relative block w-full touch-manipulation bg-surface text-left transition-transform duration-200 active:scale-[0.985]"
              >
                <Img
                  name={p.name}
                  alt={p.title}
                  sizes={PHOTO_SIZES}
                  aspect="aspect-square"
                  className="transition-transform duration-[600ms] ease-out group-hover:scale-105"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 p-3 sm:p-4">
                  <span className="block text-xs font-extrabold leading-snug tracking-[-0.01em] text-ivory sm:text-sm">
                    {p.title}
                  </span>
                  {p.meta && (
                    <span className="mt-1 block font-mono-tech text-[9px] uppercase leading-relaxed tracking-[0.2em] text-gold sm:text-[10px]">
                      {p.meta}
                    </span>
                  )}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-hairline py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <ChapterLabel>Get involved</ChapterLabel>
          <h2 className="mt-8 text-4xl font-extrabold tracking-[-0.03em] text-ivory sm:text-5xl">
            Bring it to your block
          </h2>
          <p className="mt-5 text-base leading-relaxed text-mute">
            Rides, roundtables, drives and workshops run on people who show up. Reach out to
            volunteer, donate supplies, or ask A.R.C. to come to your school or neighborhood.
          </p>
          <Link
            to="/contact"
            className="group mt-10 inline-flex min-h-11 touch-manipulation items-center gap-3 border border-hairline-strong bg-surface px-6 font-mono-tech text-[11px] uppercase tracking-[0.3em] text-ivory transition-colors duration-200 hover:border-gold/70 hover:bg-surface-2"
          >
            Reach out
            <ArrowRight
              className="h-3.5 w-3.5 text-gold transition-transform duration-200 group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>
        </div>
      </section>

      <Lightbox
        items={flyers}
        index={flyerIndex}
        onClose={() => setFlyerIndex(null)}
        onIndexChange={setFlyerIndex}
      />
      <Lightbox
        items={PHOTOS}
        index={photoIndex}
        onClose={() => setPhotoIndex(null)}
        onIndexChange={setPhotoIndex}
      />
    </>
  );
}

function FlyerCard({ entry, onOpen }: { entry: ArchiveEntry; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View the ${entry.title} flyer`}
      className="group block w-full touch-manipulation text-left transition-transform duration-200 active:scale-[0.985]"
    >
      <div className="relative overflow-hidden border border-hairline bg-surface transition-colors duration-200 group-hover:border-hairline-strong">
        <Img
          name={entry.name}
          alt={`Flyer for ${entry.title}`}
          sizes={FLYER_SIZES}
          className="transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
        />
        <span className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/35" />
        <span className="pointer-events-none absolute bottom-3 left-3 hidden items-center gap-2 font-mono-tech text-[10px] uppercase tracking-[0.28em] text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:inline-flex">
          <Maximize2 className="h-3 w-3" strokeWidth={1.5} /> View
        </span>
      </div>
      <p className="mt-3 text-sm font-extrabold leading-snug tracking-[-0.01em] text-ivory">
        {entry.title}
      </p>
      <p className="mt-1 font-mono-tech text-[9px] uppercase leading-relaxed tracking-[0.2em] text-gold sm:text-[10px]">
        {entry.meta}
      </p>
      <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-mute">{entry.blurb}</p>
    </button>
  );
}
