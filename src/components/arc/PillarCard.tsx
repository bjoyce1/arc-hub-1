import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface PillarCardProps {
  icon: LucideIcon;
  title: string;
  body: string;
  index: number;
}

export function PillarCard({ icon: Icon, title, body, index }: PillarCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="hover-lift group relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8"
    >
      {/* Gold sweep on hover */}
      <div
        aria-hidden
        className="absolute inset-x-0 -top-px h-px bg-gold-gradient opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div
        aria-hidden
        className="absolute -right-24 -top-24 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-40"
        style={{ background: "var(--gradient-gold)" }}
      />

      <div className="relative">
        <div className="mb-6 inline-grid h-14 w-14 place-items-center rounded-xl border border-gold/30 bg-ink/40">
          <Icon className="h-7 w-7 text-gold" strokeWidth={1.6} />
        </div>
        <h3 className="mb-3 font-display text-3xl uppercase tracking-wide text-ivory">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          {body}
        </p>
      </div>

      <span className="pointer-events-none absolute bottom-4 right-4 font-display text-6xl leading-none text-gold/10 transition-colors group-hover:text-gold/25">
        0{index + 1}
      </span>
    </motion.article>
  );
}
