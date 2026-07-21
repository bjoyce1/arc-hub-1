import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/arc/PageHeader";
import { AlbumCard, ALBUMS } from "@/components/arc/AlbumRail";
import { Reveal } from "@/components/arc/Reveal";
import { ChapterLabel } from "@/components/arc/ChapterLabel";
import heroMusic from "@/assets/hero-music.jpg";

export const Route = createFileRoute("/music")({
  head: () => ({
    meta: [
      { title: "Music A.R.C. Collective Albums" },
      {
        name: "description",
        content:
          "The A.R.C. discography. Time to Rise, Ready for the Revolution, and the upcoming Sieze the Time, expected near the end of 2026.",
      },
      { property: "og:title", content: "A.R.C. Music" },
      {
        property: "og:description",
        content:
          "Two albums released and a third on the way. The collective records of Artists Respecting Community.",
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
        title="The Records"
        intro="Two full length collective projects released. A third, Sieze the Time, expected near the end of 2026."
        image={heroMusic}
        imageAlt="Vintage microphone against a dark backdrop"
      />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <ChapterLabel>Collective Records</ChapterLabel>
        </div>
        <div className="mx-auto mt-14 max-w-7xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ALBUMS.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.08}>
                <AlbumCard {...a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-hairline bg-ink-2 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <ChapterLabel>Coming 2026</ChapterLabel>
            <h2 className="mt-8 text-4xl font-extrabold tracking-[-0.03em] text-ivory sm:text-6xl">
              Sieze the Time
            </h2>
            <p className="mt-6 text-base leading-relaxed text-mute">
              The third A.R.C. project. Twelve years after the first meeting,
              the collective returns with a record built for this moment.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
