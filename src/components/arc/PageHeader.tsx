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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "25%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.1]);

  return (
    <header
      ref={ref}
      className="relative overflow-hidden border-b border-border pt-40 pb-16 sm:pt-48 sm:pb-24"
    >
      {image && (
        <motion.div
          aria-hidden
          style={{ y, scale }}
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <img
            src={image}
            alt={imageAlt}
            width={1920}
            height={1080}
            loading="eager"
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--ink)_85%)]" />
        </motion.div>
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-gold"
        >
          <span aria-hidden className="h-1 w-1 rounded-full bg-blood-light" />
          {eyebrow}
          <span aria-hidden className="h-1 w-1 rounded-full bg-blood-light" />
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 font-display text-5xl uppercase text-ivory sm:text-6xl md:text-7xl"
        >
          {title}
        </motion.h1>
        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mx-auto mt-6 max-w-2xl text-balance text-lg text-ivory/80"
          >
            {intro}
          </motion.p>
        )}
      </div>
    </header>
  );
}
