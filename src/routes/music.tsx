import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/arc/PageHeader";
import { AlbumCard, ALBUMS } from "@/components/arc/AlbumRail";
import { Reveal } from "@/components/arc/Reveal";

export const Route = createFileRoute("/music")({
  head: () => ({
    meta: [
      { title: "Music — A.R.C. Collective Albums" },
      {
        name: "description",
        content:
          "The A.R.C. discography — Time to Rise, Ready for the Revolution, and the upcoming Sieze the Time, expected near the end of 2026.",
      },
      { property: "og:title", content: "A.R.C. Music" },
      {
        property: "og:description",
        content:
          "Two albums released and a third on the way — the collective records of Artists Respecting Community.",
      },
    ],
  }),
  component: Music,
});

function Music() {
  return (
    <>
      <PageHeader
        eyebrow="Discography"
        title={<>The <span className="text-gold-gradient">Records</span></>}
        intro="Two full-length collective projects released. A third — Sieze the Time — expected near the end of 2026."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ALBUMS.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.08}>
                <AlbumCard {...a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card/40 py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.4em] text-gold">Coming 2026</p>
            <h2 className="mt-3 font-display text-4xl uppercase text-ivory sm:text-5xl">
              Sieze the Time
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ivory/80">
              The third A.R.C. project — twelve years after the first meeting,
              the collective returns with a record built for this moment.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
