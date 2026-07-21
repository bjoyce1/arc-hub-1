import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Play } from "lucide-react";
import skyline from "@/assets/skyline-hero.jpg";
import logoAsset from "@/assets/arc-logo.png.asset.json";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* Skyline backdrop */}
      <motion.div style={{ y }} className="pointer-events-none absolute inset-0">
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

      {/* Radial gold glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[80vw] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl animate-glow-pulse"
        style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 60%)" }}
      />

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto max-w-5xl px-6 pt-32 pb-24 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 flex justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-ink/60 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-gold backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
            Est. 2014 · Houston, TX
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-6 max-w-md"
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
          <span className="text-ivory">Respecting</span>{" "}
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
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-gradient px-8 py-4 text-sm font-bold uppercase tracking-widest text-ink transition-all hover:scale-105 hover:shadow-[0_10px_40px_-5px_rgba(212,175,55,0.6)] sm:w-auto"
          >
            Our Mission
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/music"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/50 bg-ink/40 px-8 py-4 text-sm font-bold uppercase tracking-widest text-ivory backdrop-blur transition-all hover:border-gold hover:bg-ink/60 sm:w-auto"
          >
            <Play className="h-4 w-4 fill-gold text-gold" />
            The Music
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-ivory/50"
      >
        Scroll ↓
      </motion.div>
    </section>
  );
}
