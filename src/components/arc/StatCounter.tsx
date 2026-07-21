import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
}

export function StatCounter({ value, suffix = "", label }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-5xl leading-none text-gold-gradient sm:text-6xl md:text-7xl">
        {display.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-3 text-xs uppercase tracking-[0.3em] text-ivory/60 sm:text-sm">
        {label}
      </div>
    </div>
  );
}
