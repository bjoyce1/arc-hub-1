import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { media } from "@/lib/media";

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Media manifest slug for the backdrop photograph. */
  image?: string;
  imageAlt?: string;
}

export function PageHeader({ eyebrow, title, intro, image, imageAlt = "" }: PageHeaderProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const asset = image ? media(image) : null;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);

  return (
    <header
      ref={ref}
      className="relative overflow-hidden border-b border-hairline pt-40 pb-20 sm:pt-48 sm:pb-28"
    >
      {/* No negative z-index on the backdrop. `-z-10` sent it behind the app
          shell's opaque background — the header sets up no stacking context of
          its own, so the backdrop escaped it and every hero photo rendered as
          solid black. Plain DOM order does the layering instead: this paints
          first, the positioned content block below paints over it. */}
      {asset && (
        <motion.div aria-hidden style={{ y }} className="pointer-events-none absolute inset-0">
          <img
            src={asset.src}
            srcSet={asset.srcSet}
            sizes="100vw"
            alt={imageAlt}
            width={asset.width}
            height={asset.height}
            loading="eager"
            fetchPriority="high"
            className="h-full w-full object-cover opacity-40"
            style={{ filter: "grayscale(1) contrast(1.12)" }}
          />
          {/* Three scrims, painted in this order so each one lands on top of the
              last: a flat veil to knock the whole photograph back, then a scrim
              under the fixed nav so the logo and hamburger always sit on
              something quiet, then a bottom fade under the intro copy. */}
          <div className="absolute inset-0 bg-ink/45" />
          <div
            className="absolute inset-x-0 top-0 h-40"
            style={{ background: "linear-gradient(to bottom, var(--ink), transparent)" }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-3/5"
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
          {/* Over photography the pill needs its own ground — the mono type is
              10px and washes out against a busy frame otherwise. */}
          <span
            className={
              asset ? "chapter-pill bg-ink/70 text-ivory backdrop-blur-sm" : "chapter-pill"
            }
          >
            {eyebrow}
          </span>
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
