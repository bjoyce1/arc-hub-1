import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/arc/Reveal";
import { ChapterLabel } from "@/components/arc/ChapterLabel";
import { getPioneer, PIONEERS } from "@/data/pioneers";

export const Route = createFileRoute("/pioneers/$slug")({
  loader: ({ params }) => {
    const pioneer = getPioneer(params.slug);
    if (!pioneer) throw notFound();
    return { pioneer };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Pioneer not found · A.R.C." }, { name: "robots", content: "noindex" }] };
    }
    const { pioneer } = loaderData;
    return {
      meta: [
        { title: `${pioneer.name} · A.R.C. Pioneer` },
        { name: "description", content: pioneer.bio.slice(0, 155) },
        { property: "og:title", content: `${pioneer.name} · A.R.C.` },
        { property: "og:description", content: pioneer.bio.slice(0, 200) },
      ],
    };
  },
  component: PioneerDetail,
  notFoundComponent: PioneerNotFound,
});

function PioneerDetail() {
  const { pioneer } = Route.useLoaderData();
  const index = PIONEERS.findIndex((p) => p.slug === pioneer.slug);
  const prev = PIONEERS[(index - 1 + PIONEERS.length) % PIONEERS.length];
  const next = PIONEERS[(index + 1) % PIONEERS.length];

  return (
    <>
      <section className="pt-28 sm:pt-36">
        <div className="mx-auto max-w-5xl px-6">
          <Link
            to="/pioneers"
            className="inline-flex items-center gap-2 font-mono-tech text-[10px] uppercase tracking-[0.3em] text-dim transition-colors hover:text-ivory"
          >
            <ArrowLeft className="h-3 w-3" strokeWidth={1.5} /> Roster
          </Link>

          <Reveal>
            <div className="mt-10 flex items-center gap-3 font-mono-tech text-[10px] uppercase tracking-[0.3em] text-dim">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span className="h-px w-8 bg-hairline-strong" />
              <span>{pioneer.tag}</span>
            </div>
            <h1 className="mt-6 text-5xl font-extrabold leading-[0.95] tracking-[-0.04em] text-ivory sm:text-7xl lg:text-[7rem]">
              {pioneer.name}
            </h1>
            <p className="mt-6 text-lg text-mute">{pioneer.role}</p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <Reveal>
            <div className="space-y-8">
              <Meta label="Origin" value={pioneer.origin} />
              <Meta label="Active" value={pioneer.years} />
              <Meta label="Role" value={pioneer.tag} />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <ChapterLabel>Bio</ChapterLabel>
              <p className="mt-8 text-lg leading-relaxed text-ivory/90 sm:text-xl">
                {pioneer.bio}
              </p>

              <div className="mt-14">
                <ChapterLabel>Listen</ChapterLabel>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <StreamingBtn label="Spotify" />
                  <StreamingBtn label="Apple Music" />
                  <StreamingBtn label="Bandcamp" />
                </div>
                <p className="mt-6 font-mono-tech text-[10px] uppercase tracking-[0.3em] text-dim">
                  Links pending · Coming soon
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-hairline bg-ink-2 py-14">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6">
          <Link
            to="/pioneers/$slug"
            params={{ slug: prev.slug }}
            className="group flex-1"
          >
            <span className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-dim">
              ← Previous
            </span>
            <p className="mt-2 text-lg font-extrabold tracking-[-0.02em] text-ivory transition-colors group-hover:text-gold sm:text-2xl">
              {prev.name}
            </p>
          </Link>
          <Link
            to="/pioneers/$slug"
            params={{ slug: next.slug }}
            className="group flex-1 text-right"
          >
            <span className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-dim">
              Next →
            </span>
            <p className="mt-2 text-lg font-extrabold tracking-[-0.02em] text-ivory transition-colors group-hover:text-gold sm:text-2xl">
              {next.name}
            </p>
          </Link>
        </div>
      </section>
    </>
  );
}

function StreamingBtn({ label }: { label: string }) {
  return (
    <button
      type="button"
      disabled
      className="flex items-center justify-between border border-hairline-strong bg-surface px-4 py-4 text-left font-mono-tech text-[11px] uppercase tracking-[0.28em] text-mute opacity-60 transition-colors"
    >
      <span>{label}</span>
      <span className="text-dim">TBD</span>
    </button>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-dim">{label}</p>
      <p className="mt-3 text-xl font-extrabold tracking-[-0.02em] text-ivory">{value}</p>
    </div>
  );
}

function PioneerNotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center px-6 pt-24">
      <div className="text-center">
        <p className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-dim">404</p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.03em] text-ivory sm:text-6xl">
          Pioneer not found
        </h1>
        <Link to="/pioneers" className="btn-gold mt-10 inline-flex">
          Back to roster
        </Link>
      </div>
    </section>
  );
}
