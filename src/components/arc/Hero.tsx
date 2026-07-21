import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowRight, Play } from "lucide-react";
import skyline from "@/assets/skyline-hero.jpg";
import logoAsset from "@/assets/arc-logo.png.asset.json";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Scroll-driven skyline parallax + subtle zoom
  const skyY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const skyScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const logoY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  // Mouse-tracked spotlight
  const mx = useMotionValue(50);
  const my = useMotionValue(35);
  const smx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 });
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${smx}% ${smy}%, oklch(0.78 0.14 85 / 0.28), transparent 55%)`;

  // Magnetic tilt on logo (mouse-driven)
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotX = useSpring(useTransform(tiltY, [-1, 1], [8, -8]), { stiffness: 120, damping: 15 });
  const rotY = useSpring(useTransform(tiltX, [-1, 1], [-8, 8]), { stiffness: 120, damping: 15 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      mx.set(x * 100);
      my.set(y * 100);
      tiltX.set(x * 2 - 1);
      tiltY.set(y * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, tiltX, tiltY]);

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

      {/* Rotating aurora conic — replaces the old breathing glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[95vw] w-[95vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl mix-blend-screen"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, var(--gold) 60deg, transparent 130deg, var(--blood) 200deg, transparent 280deg, var(--gold-light) 340deg, transparent 360deg)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      />

      {/* Mouse-tracked spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0"
        style={{ background: spotlight }}
      />

      {/* Tech grid overlay — sits over the background, under the content */}
      <motion.div
        aria-hidden
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 80]) }}
        className="pointer-events-none absolute inset-0 z-0 tech-grid tech-grid-drift"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 tech-grid-fine" />

      {/* Corner HUD brackets */}
      <div aria-hidden className="pointer-events-none absolute inset-4 z-0 hidden sm:block">
        <span className="absolute left-0 top-0 h-6 w-6 border-l border-t border-gold/40" />
        <span className="absolute right-0 top-0 h-6 w-6 border-r border-t border-gold/40" />
        <span className="absolute left-0 bottom-0 h-6 w-6 border-l border-b border-gold/40" />
        <span className="absolute right-0 bottom-0 h-6 w-6 border-r border-b border-gold/40" />
      </div>

      {/* Mono telemetry — corners (positioned below the sticky nav) */}
      <div aria-hidden className="pointer-events-none absolute inset-x-6 top-24 z-10 hidden items-center justify-between text-[10px] uppercase tracking-[0.35em] text-ivory/50 sm:flex font-mono-tech">
        <span className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-blood-light shadow-[0_0_10px_var(--blood-light)]" />
          SYS_ARC // 29.7604°N · 95.3698°W
        </span>
        <span className="text-gold/70">REV_2014 — ONLINE</span>
      </div>

      {/* Fine scan line */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 z-0 h-24 opacity-[0.07]"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--gold-light), transparent)",
        }}
        initial={{ y: "-20%" }}
        animate={{ y: "120vh" }}
        transition={{ duration: 9, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
      />

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-auto max-w-5xl px-6 pt-32 pb-24 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 flex justify-center"
        >
          <span className="group inline-flex items-center gap-2 rounded-sm border border-gold/40 bg-ink/60 px-4 py-1.5 text-[10px] uppercase tracking-[0.35em] text-gold backdrop-blur transition-colors hover:border-gold font-mono-tech">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blood-light opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blood-light shadow-[0_0_10px_var(--blood-light)]" />
            </span>
            [ EST_2014 · HOUSTON_TX ]
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
            alt="A.R.C. — Artists Respecting Community"
            className="mx-auto w-full drop-shadow-[0_20px_60px_rgba(212,175,55,0.35)]"
            width={520}
            height={320}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto max-w-3xl font-display text-4xl uppercase tracking-wide sm:text-6xl md:text-7xl"
        >
          <span className="text-gold-gradient">Artists</span>{" "}
          <span className="text-blood-gradient">Respecting</span>{" "}
          <span className="text-gold-gradient">Community</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto mt-8 max-w-2xl text-balance text-lg italic text-ivory/80 sm:text-xl"
        >
          &ldquo;The community won&rsquo;t respect <span className="not-italic font-bold text-gold">US</span> unless <span className="not-italic font-bold text-gold">WE</span> respect the community.&rdquo;
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <Link
            to="/mission"
            className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gold-gradient px-8 py-4 text-sm font-bold uppercase tracking-widest text-ink transition-all hover:scale-105 hover:shadow-[0_10px_40px_-5px_rgba(212,175,55,0.6)] sm:w-auto"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-ivory/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">Our Mission</span>
            <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/music"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/50 bg-ink/40 px-8 py-4 text-sm font-bold uppercase tracking-widest text-ivory backdrop-blur transition-all hover:border-gold hover:bg-ink/60 hover:shadow-[0_10px_40px_-15px_var(--blood)] sm:w-auto"
          >
            <Play className="h-4 w-4 fill-gold text-gold transition-transform group-hover:scale-110" />
            The Music
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll cue with animated line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
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
