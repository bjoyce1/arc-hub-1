import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import skylineAsset from "@/assets/skyline-hero-gold.png.asset.json";
import logoAsset from "@/assets/arc-logo.png.asset.json";
import { Typewriter } from "@/components/arc/Typewriter";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const skyY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-6%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink"
    >
      {/* Monochrome skyline backdrop, restrained parallax */}
      <motion.div
        style={{ y: skyY }}
        className="pointer-events-none absolute inset-0"
      >
        <img
          src={skyline}
          alt=""
          aria-hidden
          className="h-full w-full object-cover opacity-25"
          style={{ filter: "grayscale(1) contrast(1.05)" }}
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-ink/60" />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-2/3"
          style={{ background: "linear-gradient(to bottom, transparent, var(--ink) 85%)" }}
        />
      </motion.div>

      {/* Gold building outlines — subtle hairline overlay tracing the skyline, brightens on hover */}
      <svg
        aria-hidden
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMax slice"
        className="pointer-events-none absolute inset-0 z-[1] h-full w-full [&_path]:pointer-events-auto"
      >
        <g
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1"
          strokeLinejoin="miter"
          strokeLinecap="square"
          vectorEffect="non-scaling-stroke"
          className="[&>path]:opacity-25 [&>path]:transition-all [&>path]:duration-500 [&>path:hover]:opacity-100 [&>path:hover]:[stroke-width:1.5] [&>path:hover]:[filter:drop-shadow(0_0_6px_rgba(201,169,106,0.55))]"
        >
          {/* left short block */}
          <path d="M30 1080 V712 H130 V1080" />
          {/* angled-top tower */}
          <path d="M140 1080 V660 L240 610 V1080" />
          {/* small block */}
          <path d="M248 1080 V790 H322 V1080" />
          {/* spired tower w/ antenna */}
          <path d="M340 1080 V545 H430 V1080 M385 545 V470" />
          {/* peaked (angled roof) high-rise */}
          <path d="M490 1080 V520 L560 470 L630 520 V1080" />
          {/* stepped twin */}
          <path d="M640 1080 V560 H700 V510 H755 V1080" />
          {/* central cylinder mega-tower */}
          <path d="M770 1080 V345 H895 V1080 M810 345 V270 M855 345 V270" />
          {/* mid-right block */}
          <path d="M905 1080 V545 H1000 V1080" />
          {/* second cylinder tower */}
          <path d="M1010 1080 V440 H1140 V1080 M1075 440 V370" />
          {/* thin tall */}
          <path d="M1155 1080 V510 H1240 V1080 M1197 510 V455" />
          {/* mid cluster */}
          <path d="M1250 1080 V575 H1345 V1080" />
          {/* pointed tower */}
          <path d="M1360 1080 V495 L1415 455 L1470 495 V1080" />
          {/* wide right block */}
          <path d="M1480 1080 V580 H1620 V1080" />
          {/* right stack */}
          <path d="M1630 1080 V645 H1735 V1080" />
          {/* observation tower (right) */}
          <path d="M1795 1080 V460 M1795 460 A25 18 0 1 0 1795.01 460 M1795 442 V400" />
        </g>
      </svg>

      {/* Hairline column guides */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute inset-y-0 left-[16%] w-px bg-gold/10" />
        <div className="absolute inset-y-0 right-[16%] w-px bg-gold/10" />
      </div>


      {/* Corner HUD hairline brackets — gold on hover */}
      <div className="pointer-events-none absolute inset-6 z-[2] hidden sm:block">
        <span className="pointer-events-auto absolute left-0 top-0 h-6 w-6 border-l border-t border-hairline-strong transition-colors duration-500 hover:border-gold" />
        <span className="pointer-events-auto absolute right-0 top-0 h-6 w-6 border-r border-t border-hairline-strong transition-colors duration-500 hover:border-gold" />
        <span className="pointer-events-auto absolute left-0 bottom-0 h-6 w-6 border-l border-b border-hairline-strong transition-colors duration-500 hover:border-gold" />
        <span className="pointer-events-auto absolute right-0 bottom-0 h-6 w-6 border-r border-b border-hairline-strong transition-colors duration-500 hover:border-gold" />
      </div>

      {/* Mono telemetry rail */}
      <div className="pointer-events-none absolute inset-x-6 top-24 z-10 hidden items-center justify-between font-mono-tech text-[10px] uppercase tracking-[0.28em] text-mute sm:flex">
        <span className="inline-flex items-center gap-2">
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-red" />
          SYS_ARC · 29.76°N / 95.37°W
        </span>
        <span className="inline-flex items-center gap-2">
          <span aria-hidden className="h-px w-6 bg-gold/60" />
          REV_2014 // ONLINE
        </span>
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto max-w-5xl px-6 pt-32 pb-24 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <span className="chapter-pill">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-red" />
            <Typewriter text="EST_2014 · HOUSTON_TX" delay={300} speed={38} />
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-8 max-w-xs sm:max-w-sm"
        >
          <img
            src={logoAsset.url}
            alt="A.R.C. Artists Respecting Community"
            className="mx-auto w-full"
            width={520}
            height={320}
          />
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } } }}
          className="mx-auto max-w-4xl text-5xl font-extrabold leading-[0.95] tracking-[-0.035em] text-ivory sm:text-7xl md:text-[5.5rem]"
        >
          {["Artists", "Respecting", "Community"].map((w, i) => (
            <span key={w} className="inline-block overflow-hidden align-baseline pb-1 pr-4">
              <motion.span
                variants={{
                  hidden: { y: "108%" },
                  show: { y: "0%", transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
                }}
                className={`inline-block ${i === 1 ? "text-ivory" : "text-ivory"}`}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mx-auto mt-8 max-w-xl text-balance text-base leading-relaxed text-mute sm:text-lg"
        >
          A Houston born movement of artists, producers, and DJs building
          consciousness, ownership, and community since 2014.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link to="/mission" className="btn-red w-full sm:w-auto">
            Our Mission
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/music" className="btn-ghost w-full sm:w-auto">
            The Music
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 font-mono-tech text-[10px] uppercase tracking-[0.35em] text-dim"
      >
        <span>SCROLL</span>
        <span className="relative block h-8 w-px overflow-hidden bg-hairline-strong">
          <motion.span
            className="absolute inset-x-0 top-0 block h-3 bg-red"
            animate={{ y: ["-100%", "300%"] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
          />
        </span>
      </motion.div>
    </section>
  );
}
