import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  image?: string;
  imageAlt?: string;
}

export function PageHeader({ eyebrow, title, intro, image, imageAlt = "" }: PageHeaderProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);

  return (
    <header
      ref={ref}
      className="relative overflow-hidden border-b border-hairline pt-40 pb-20 sm:pt-48 sm:pb-28"
    >
      {image && (
        <motion.div
          aria-hidden
          style={{ y }}
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <img
            src={image}
            alt={imageAlt}
            width={1920}
            height={1080}
            loading="eager"
            className="h-full w-full object-cover opacity-25"
            style={{ filter: "grayscale(1) contrast(1.05)" }}
          />
          <div className="absolute inset-0 bg-ink/60" />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/2"
            style={{ background: "linear-gradient(to bottom, transparent, var(--ink))" }}
          />
        </motion.div>
      )}

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <span className="chapter-pill">{eyebrow}</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-5xl font-extrabold tracking-[-0.035em] text-ivory sm:text-7xl md:text-[5rem]"
        >
          {title}
        </motion.h1>
        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-balance text-base leading-relaxed text-mute sm:text-lg"
          >
            {intro}
          </motion.p>
        )}
      </div>
    </header>
  );
}
