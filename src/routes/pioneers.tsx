import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/arc/PageHeader";
import heroPioneers from "@/assets/hero-pioneers.jpg";

export const Route = createFileRoute("/pioneers")({
  head: () => ({
    meta: [
      { title: "Pioneers of A.R.C.  -  The Founding Members" },
      {
        name: "description",
        content:
          "The veteran artists, producers, label owners, and DJs who founded A.R.C. in Houston  -  including K-Rino, O.G. Wickett Crickett, Ganxsta Nip, Cl'Che, Fiya, Zin, Murder One, and Mr. Cap.",
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
  { name: "O.G. Wickett Crickett", role: "Legendary DJ · Radio", tag: "Pioneer" },
  { name: "Ganxsta Nip", role: "Artist · South Park Coalition", tag: "Artist" },
  { name: "Cl'Che", role: "Artist", tag: "Artist" },
  { name: "Fiya the Media Mogul", role: "Media · Culture", tag: "Media" },
  { name: "Zin", role: "Artist · Producer", tag: "Artist" },
  { name: "Murder One", role: "Artist", tag: "Artist" },
  { name: "Mr. Cap", role: "Label · Executive", tag: "Executive" },
  { name: "K-Rino", role: "Founder · Artist · SPC", tag: "Founder" },
];

function Pioneers() {
  return (
    <>
      <PageHeader
        eyebrow="The Pioneers"
        title={<>The <span className="text-gold-gradient">founders</span></>}
        intro="Veteran artists, producers, label owners, and DJs who built the first room and set the standard for the movement."
        image={heroPioneers}
        imageAlt="Silhouettes of eight figures standing under warm gold spotlights on a dark stage"
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PIONEERS.map((p, i) => (
              <motion.article
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-gold/50"
              >
                <div
                  aria-hidden
                  className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity group-hover:opacity-30"
                  style={{ background: "var(--gradient-gold)" }}
                />
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <span className="text-xs uppercase tracking-[0.3em] text-gold">
                      {p.tag}
                    </span>
                    <span className="font-display text-2xl text-gold/30">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-3xl uppercase leading-tight text-ivory sm:text-4xl">
                    {p.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">{p.role}</p>
                </div>
                <div
                  aria-hidden
                  className="absolute inset-x-6 bottom-0 h-px bg-gold-gradient opacity-0 transition-opacity group-hover:opacity-100"
                />
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
