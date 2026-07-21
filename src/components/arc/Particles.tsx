import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

interface ParticlesProps {
  count?: number;
  className?: string;
  color?: string;
}

/**
 * Faint drifting ambient particles for hero / quote sections.
 * Fully decorative, pointer-events-none, respects reduced-motion.
 */
export function Particles({
  count = 22,
  className = "",
  color = "var(--gold)",
}: ParticlesProps) {
  const reduce = useReducedMotion();
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 2.2,
        dur: 14 + Math.random() * 18,
        delay: Math.random() * 8,
        driftX: (Math.random() - 0.5) * 40,
        driftY: -30 - Math.random() * 60,
        opacity: 0.15 + Math.random() * 0.35,
      })),
    [count],
  );

  if (reduce) return null;

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            background: color,
            opacity: d.opacity,
            willChange: "transform",
          }}
          animate={{
            x: [0, d.driftX, 0],
            y: [0, d.driftY, 0],
            opacity: [d.opacity, d.opacity * 1.6, d.opacity],
          }}
          transition={{
            duration: d.dur,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
