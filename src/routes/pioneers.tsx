import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Maximize2 } from "lucide-react";
import { useState } from "react";
import { ChapterLabel } from "@/components/arc/ChapterLabel";
import { Img } from "@/components/arc/Img";
import { Lightbox } from "@/components/arc/Lightbox";
import { PageHeader } from "@/components/arc/PageHeader";
import { Reveal } from "@/components/arc/Reveal";
import { MEMORIAL, flyer, type ArchiveEntry } from "@/data/archive";
import { PIONEERS, type Pioneer } from "@/data/pioneers";

export const Route = createFileRoute("/pioneers")({
  head: () => ({
    meta: [
      { title: "Pioneers of A.R.C. The Founding Members" },
      {
        name: "description",
        content:
          "The veteran artists, producers, label owners, and DJs who founded A.R.C. in Houston. K-Rino, O.G. Wickett Crickett, Ganxsta Nip, Cl'Che, Fiya, Zin, Murder One, and Mr. Cap.",
      },
      { property: "og:title", content: "The Pioneers of A.R.C." },
      {
        property: "og:description",
        content:
          "The veteran artists, producers, and DJs who founded Artists Respecting Community.",
      },
    ],
  }),
  component: Pioneers,
});

// Two documents the collective produced about its own founders, kept together
// so the roster is followed by evidence rather than more copy.
const ARTIFACTS: ArchiveEntry[] = [flyer("conscious-bash"), MEMORIAL];

const CARD_SIZES = "(max-width: 1023px) 46vw, 23vw";

function Pioneers() {
  const [artifact, setArtifact] = useState<number | null>(null);

  return (
    <>
      <PageHeader
        eyebrow="The Pioneers"
        title="The founders"
        intro="Veteran artists, producers, label owners, and DJs who built the first room and set the standard for the movement."
        image="spc-performance"
        imageAlt="A.R.C. pioneers performing under the Wickett Crickett banner"
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between border-b border-hairline pb-4 font-mono-tech text-[10px] uppercase tracking-[0.3em] text-dim">
            <span>Roster · {PIONEERS.length} pioneers</span>
            <span>REV_2014</span>
          </div>

          {/* Two-up on a phone. One-up would give each pioneer a 450px-tall
              plate and turn eight names into a 7000px scroll. */}
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {PIONEERS.map((p, i) => (
              <li key={p.slug}>
                <Reveal delay={Math.min(i, 7) * 0.05} className="h-full">
                  <PioneerCard pioneer={p} index={i} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-hairline bg-ink-2 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <ChapterLabel>From the archive</ChapterLabel>
          <h2 className="mt-8 text-4xl font-extrabold tracking-[-0.03em] text-ivory sm:text-5xl">
            On the record
          </h2>
          <p className="mt-5 text-base leading-relaxed text-mute">
            A.R.C. has always documented its own. Two pieces from the collective's paper trail,
            reproduced exactly as they were printed.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-8 px-6 sm:grid-cols-2 sm:gap-10">
          {ARTIFACTS.map((a, i) => (
            <Reveal key={a.name} delay={i * 0.08}>
              <button
                type="button"
                onClick={() => setArtifact(i)}
                aria-label={`View the ${a.title} flyer`}
                className="group block w-full touch-manipulation text-left transition-transform duration-200 active:scale-[0.985]"
              >
                <div className="relative overflow-hidden border border-hairline bg-surface transition-colors duration-200 group-hover:border-gold/50">
                  <Img
                    name={a.name}
                    alt={`Flyer for ${a.title}`}
                    sizes="(max-width: 639px) 88vw, 44vw"
                    className="transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/35" />
                  <span className="pointer-events-none absolute bottom-3 left-3 hidden items-center gap-2 font-mono-tech text-[10px] uppercase tracking-[0.28em] text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:inline-flex">
                    <Maximize2 className="h-3 w-3" strokeWidth={1.5} /> View
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-extrabold leading-snug tracking-[-0.02em] text-ivory">
                  {a.title}
                </h3>
                <p className="mt-1.5 font-mono-tech text-[10px] uppercase leading-relaxed tracking-[0.2em] text-gold">
                  {a.meta}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-mute">{a.blurb}</p>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <Lightbox
        items={ARTIFACTS}
        index={artifact}
        onClose={() => setArtifact(null)}
        onIndexChange={setArtifact}
      />
    </>
  );
}

function PioneerCard({ pioneer: p, index }: { pioneer: Pioneer; index: number }) {
  return (
    <Link
      to="/pioneers/$slug"
      params={{ slug: p.slug }}
      className="group flex h-full touch-manipulation flex-col border border-hairline bg-surface transition-colors duration-200 hover:border-hairline-strong hover:bg-surface-2"
    >
      {/* Portrait slot. Until photography lands this is a monogram plate —
            deliberately typographic rather than a grey "missing image" box. */}
      <div className="relative aspect-[3/4] overflow-hidden bg-ink-2">
        {p.portrait ? (
          <Img
            name={p.portrait}
            alt={p.name}
            sizes={CARD_SIZES}
            aspect="aspect-[3/4]"
            className="transition-transform duration-[600ms] ease-out group-hover:scale-105"
          />
        ) : (
          <>
            <span
              aria-hidden
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(135deg, transparent 0 14px, rgba(255,255,255,0.028) 14px 28px)",
              }}
            />
            <span
              aria-hidden
              className="text-gold-gradient absolute inset-0 grid select-none place-items-center text-[2.75rem] font-extrabold leading-none tracking-[-0.05em] transition-transform duration-500 group-hover:scale-105 sm:text-[4rem] lg:text-[3.5rem]"
            >
              {p.initials}
            </span>
          </>
        )}

        <span className="absolute left-2.5 top-2.5 font-mono-tech text-[9px] uppercase tracking-[0.28em] text-dim sm:left-3 sm:top-3 sm:text-[10px]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="absolute right-2.5 top-2.5 font-mono-tech text-[9px] uppercase tracking-[0.18em] text-dim sm:right-3 sm:top-3 sm:text-[10px] sm:tracking-[0.26em]">
          {p.tag}
        </span>
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink-2 to-transparent" />
      </div>

      <div className="flex flex-1 items-end justify-between gap-2 border-t border-hairline p-3 sm:gap-3 sm:p-4">
        <div className="min-w-0">
          <h3 className="text-base font-extrabold leading-tight tracking-[-0.02em] text-ivory transition-colors duration-200 group-hover:text-gold sm:text-xl">
            {p.name}
          </h3>
          <p className="mt-1 text-[11px] leading-relaxed text-mute sm:text-xs">{p.role}</p>
        </div>
        <ArrowUpRight
          className="h-4 w-4 shrink-0 text-dim transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold"
          strokeWidth={1.5}
        />
      </div>
    </Link>
  );
}
