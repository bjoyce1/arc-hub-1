import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/arc/PageHeader";
import heroPioneers from "@/assets/hero-pioneers.jpg";

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

const PIONEERS = [
  { name: "K-Rino", role: "Founder · Artist · SPC", tag: "FOUNDER" },
  { name: "O.G. Wickett Crickett", role: "Legendary DJ · Radio", tag: "PIONEER" },
  { name: "Ganxsta Nip", role: "Artist · South Park Coalition", tag: "ARTIST" },
  { name: "Cl'Che", role: "Artist", tag: "ARTIST" },
  { name: "Fiya the Media Mogul", role: "Media · Culture", tag: "MEDIA" },
  { name: "Zin", role: "Artist · Producer", tag: "ARTIST" },
  { name: "Murder One", role: "Artist", tag: "ARTIST" },
  { name: "Mr. Cap", role: "Label · Executive", tag: "EXECUTIVE" },
];

function Pioneers() {
  return (
    <>
      <PageHeader
        eyebrow="The Pioneers"
        title="The founders"
        intro="Veteran artists, producers, label owners, and DJs who built the first room and set the standard for the movement."
        image={heroPioneers}
        imageAlt="Silhouettes of figures under warm spotlights"
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex items-center justify-between border-b border-hairline pb-4 font-mono-tech text-[10px] uppercase tracking-[0.3em] text-dim">
            <span>Roster · {PIONEERS.length} pioneers</span>
            <span>REV_2014</span>
          </div>
          <ul>
            {PIONEERS.map((p, i) => (
              <motion.li
                key={p.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-hairline px-2 py-6 transition-colors duration-150 hover:bg-surface sm:grid-cols-[64px_1fr_140px_auto] sm:gap-8 sm:px-4 sm:py-8"
              >
                <span className="font-mono-tech text-[11px] uppercase tracking-[0.3em] text-dim">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 truncate text-2xl font-extrabold tracking-[-0.02em] text-ivory transition-colors group-hover:text-red sm:text-4xl">
                  {p.name}
                </span>
                <span className="hidden font-mono-tech text-[10px] uppercase tracking-[0.28em] text-dim sm:block">
                  {p.tag}
                </span>
                <span className="hidden text-right text-sm text-mute lg:block">
                  {p.role}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
