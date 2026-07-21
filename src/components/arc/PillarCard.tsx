import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface PillarCardProps {
  icon: LucideIcon;
  title: string;
  body: string;
  index: number;
}

export function PillarCard({ icon: Icon, title, body, index }: PillarCardProps) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full flex-col justify-between overflow-hidden border border-hairline bg-surface p-6 transition-colors duration-200 hover:border-hairline-strong hover:bg-surface-2 sm:p-8"
    >
      {/* Top row: mono index + hairline count */}
      <div className="flex items-center justify-between font-mono-tech text-[10px] uppercase tracking-[0.3em] text-dim">
        <span>{num}</span>
        <span className="flex items-center gap-2">
          <span className="h-px w-8 bg-hairline-strong" />
          <span>PILLAR</span>
        </span>
      </div>

      <div className="mt-10">
        <div className="mb-6 inline-grid h-11 w-11 place-items-center border border-hairline-strong bg-ink-2 transition-colors duration-200 group-hover:border-red/70">
          <Icon className="h-5 w-5 text-ivory transition-colors duration-200 group-hover:text-red" strokeWidth={1.5} />
        </div>
        <h3 className="text-2xl font-bold tracking-[-0.02em] text-ivory sm:text-[1.75rem]">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-mute">
          {body}
        </p>
      </div>

      {/* Bottom hairline pulled from the red only on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-red transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
      />
    </motion.article>
  );
}
