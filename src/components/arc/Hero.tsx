import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowRight, Play } from "lucide-react";
import skyline from "@/assets/skyline-hero.jpg";
import logoAsset from "@/assets/arc-logo.png.asset.json";
import { Particles } from "@/components/arc/Particles";
import { Typewriter } from "@/components/arc/Typewriter";
import { Magnetic } from "@/components/arc/Magnetic";

const HEADLINE = [
  { text: "Artists", tone: "gold" as const },
  { text: "Respecting", tone: "blood" as const },
  { text: "Community", tone: "gold" as const },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Multi-plane parallax: skyline scales down while shifting; logo/headline drift at different speeds.
  const skyY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const skyScale = useTransform(scrollYProgress, [0, 1], [1.08, 0.94]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const logoY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Subtle magnetic tilt on logo (mouse-driven)
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotX = useSpring(useTransform(tiltY, [-1, 1], [5, -5]), { stiffness: 120, damping: 18 });
  const rotY = useSpring(useTransform(tiltX, [-1, 1], [-5, 5]), { stiffness: 120, damping: 18 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      tiltX.set(x * 2 - 1);
      tiltY.set(y * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [tiltX, tiltY, reduce]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* Skyline backdrop with parallax + slow zoom */}
      <motion.div
        style={{ y: skyY, scale: skyScale }}
        className="pointer-events-none absolute inset-0"
      >
        <img
          src={skyline}
          alt=""
          aria-hidden
          className="h-full w-full object-cover opacity-60"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/70 to-ink" />
      </motion.div>

      {/* Tech grid overlay */}
      <motion.div
        aria-hidden
        style={{
          y: gridY,
          backgroundImage:
            "linear-gradient(to right, rgba(212,175,55,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(212,175,55,0.10) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 95%)",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 95%)",
        }}
        className="pointer-events-none absolute inset-0 z-[1]"
      />
      <div
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(245,241,232,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,241,232,0.04) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 65% at 50% 50%, black 20%, transparent 85%)",
          maskImage:
            "radial-gradient(ellipse 75% 65% at 50% 50%, black 20%, transparent 85%)",
        }}
        className="pointer-events-none absolute inset-0 z-[1]"
      />

      {/* Ambient drifting particles */}
      <Particles count={26} className="z-[1]" />

      {/* Corner HUD brackets */}
      <div aria-hidden className="pointer-events-none absolute inset-6 z-[2] hidden sm:block">
        <span className="absolute left-0 top-0 h-8 w-8 border-l border-t border-gold/30" />
        <span className="absolute right-0 top-0 h-8 w-8 border-r border-t border-gold/30" />
        <span className="absolute left-0 bottom-0 h-8 w-8 border-l border-b border-gold/30" />
        <span className="absolute right-0 bottom-0 h-8 w-8 border-r border-b border-gold/30" />
      </div>

      {/* Mono telemetry */}
      <div aria-hidden className="pointer-events-none absolute inset-x-8 top-24 z-10 hidden items-center justify-between text-[10px] uppercase tracking-[0.35em] text-ivory/40 sm:flex font-mono-tech">
        <span className="flex items-center gap-2">
          <span className="inline-block h-1 w-1 rounded-full bg-blood-light" />
          SYS_ARC // 29.7604°N · 95.3698°W
        </span>
        <span className="text-gold/60">REV_2014 – ONLINE</span>
      </div>

      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 mx-auto max-w-5xl px-6 pt-32 pb-24 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 flex justify-center"
        >
          <span className="group inline-flex items-center gap-2.5 rounded-sm border border-gold/30 bg-ink/60 px-4 py-1.5 text-[10px] uppercase tracking-[0.35em] text-gold/90 backdrop-blur transition-colors hover:border-gold/60 font-mono-tech">
            <span className="inline-block h-1 w-1 rounded-full bg-blood-light" />
            <Typewriter text="[ EST_2014 · HOUSTON_TX ]" delay={400} speed={40} />
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            y: logoY,
            rotateX: rotX,
            rotateY: rotY,
            transformPerspective: 800,
          }}
          className="mx-auto mb-6 max-w-md [transform-style:preserve-3d]"
        >
          <img
            src={logoAsset.url}
            alt="A.R.C. – Artists Respecting Community"
            className="mx-auto w-full"
            width={520}
            height={320}
          />
        </motion.div>

        <motion.h1
          style={{ y: headlineY }}
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } } }}
          className="mx-auto max-w-3xl font-display text-4xl uppercase tracking-wide sm:text-6xl md:text-7xl"
        >
          {HEADLINE.map((w) => (
            <span key={w.text} className="inline-block overflow-hidden align-baseline pb-1 pr-2">
              <motion.span
                variants={{
                  hidden: { y: "110%", opacity: 0 },
                  show: { y: "0%", opacity: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
                }}
                className={`inline-block ${w.tone === "gold" ? "text-gold-gradient" : "text-blood-gradient"}`}
              >
                {w.text}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mx-auto mt-8 max-w-2xl text-balance text-lg italic text-ivory/80 sm:text-xl"
        >
          &ldquo;The community won&rsquo;t respect <span className="not-italic font-bold text-gold">US</span> unless <span className="not-italic font-bold text-gold">WE</span> respect the community.&rdquo;
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <Magnetic strength={10}>
            <Link
              to="/mission"
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gold-gradient px-8 py-4 text-sm font-bold uppercase tracking-widest text-ink transition-transform duration-300 active:scale-[0.97] sm:w-auto"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-ivory/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Our Mission</span>
              <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Magnetic>
          <Magnetic strength={10}>
            <Link
              to="/music"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-ivory/20 bg-ink/40 px-8 py-4 text-sm font-bold uppercase tracking-widest text-ivory backdrop-blur transition-colors duration-300 hover:border-gold/60 hover:bg-ink/60 active:scale-[0.97] sm:w-auto"
            >
              <Play className="h-4 w-4 fill-gold text-gold transition-transform group-hover:scale-110" />
              The Music
            </Link>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-ivory/50 font-mono-tech"
      >
        <span>{"// SCROLL"}</span>
        <span className="relative block h-8 w-px overflow-hidden bg-ivory/20">
          <motion.span
            className="absolute inset-x-0 top-0 block h-3 bg-gold"
            animate={{ y: ["-100%", "300%"] }}
            transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
          />
        </span>
      </motion.div>
    </section>
  );
}
