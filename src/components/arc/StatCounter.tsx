import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  accent?: "none" | "gold" | "green";
}

export function StatCounter({ value, suffix = "", label, accent = "none" }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  // Seeded with the real figure so the server-rendered HTML — and anything that
  // never runs the animation (crawlers, no-JS, reduced-motion) — shows the true
  // number instead of a zero.
  const [display, setDisplay] = useState(value);
  const [armed, setArmed] = useState(false);

  // Drop to zero only once we know we're on a client that will animate. Runs
  // before the section is scrolled into view, so the reset is never seen.
  useEffect(() => {
    if (reduce) return;
    setDisplay(0);
    setArmed(true);
  }, [reduce]);

  useEffect(() => {
    if (!armed || !inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [armed, inView, value]);

  const numColor =
    accent === "gold" ? "text-gold" : accent === "green" ? "text-green" : "text-ivory";

  return (
    <div ref={ref} className="flex flex-col gap-3">
      <span className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-dim">
        {label}
      </span>
      {/* The live number is decorative while counting; assistive tech reads the
          settled figure from the label instead of every intermediate value. */}
      <div
        role="text"
        aria-label={`${value.toLocaleString()}${suffix} ${label}`}
        /* Sized against the narrowest column this ever sits in, not against the
           viewport. "1,000+" is six glyphs where every other stat has three, and
           mono type gives it no chance to condense — at a flat 48px it needed
           167px inside a 112px cell and pushed the whole document 31px wide on a
           320px phone. The clamp lets phones take the full 48px wherever the
           column can pay for it and backs off on small ones. */
        className={`font-mono-tech text-[clamp(2rem,8.5vw,3rem)] font-medium tabular-nums leading-none tracking-[-0.02em] sm:text-5xl xl:text-6xl ${numColor}`}
      >
        <span aria-hidden="true">
          {display.toLocaleString()}
          <span className="text-mute">{suffix}</span>
        </span>
      </div>
    </div>
  );
}
