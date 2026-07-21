import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  accent?: "none" | "red" | "green";
}

export function StatCounter({ value, suffix = "", label, accent = "none" }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  const numColor = accent === "red" ? "text-red" : accent === "green" ? "text-green" : "text-ivory";

  return (
    <div ref={ref} className="flex flex-col gap-3">
      <span className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-dim">
        {label}
      </span>
      <div className={`font-mono-tech text-5xl font-medium tabular-nums leading-none tracking-[-0.02em] sm:text-6xl md:text-7xl ${numColor}`}>
        {display.toLocaleString()}
        <span className="text-mute">{suffix}</span>
      </div>
    </div>
  );
}
