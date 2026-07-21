import { motion } from "framer-motion";

interface ChapterLabelProps {
  children: React.ReactNode;
  align?: "center" | "left";
  index?: string;
}

/**
 * Small centered pill label acting as a chapter marker before section headings.
 * Thin 1px border, mono uppercase text, gray. Optional index (e.g. "01 / 04").
 */
export function ChapterLabel({ children, align = "center", index }: ChapterLabelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={align === "center" ? "flex justify-center" : "flex"}
    >
      <span className="chapter-pill">
        {index && <span className="text-dim">{index}</span>}
        {index && <span aria-hidden className="h-3 w-px bg-hairline-strong" />}
        <span>{children}</span>
      </span>
    </motion.div>
  );
}
