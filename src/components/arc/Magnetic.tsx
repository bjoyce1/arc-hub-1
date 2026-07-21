import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ButtonHTMLAttributes, type ReactNode } from "react";

interface MagneticProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  strength?: number;
  as?: "button" | "div";
}

/**
 * Wraps an interactive element with a subtle cursor-following translation.
 * Falls back to no motion on touch devices (pointerdown from touch resets to 0).
 */
export function Magnetic({ children, strength = 14, className, ...rest }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 180, damping: 18, mass: 0.5 });
  const tx = useTransform(sx, (v) => `${v}px`);
  const ty = useTransform(sy, (v) => `${v}px`);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const relX = (e.clientX - r.left) / r.width - 0.5;
    const relY = (e.clientY - r.top) / r.height - 0.5;
    x.set(relX * strength);
    y.set(relY * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      style={{ x: tx, y: ty }}
      className={className}
      {...(rest as Record<string, unknown>)}
    >
      {children}
    </motion.div>
  );
}
