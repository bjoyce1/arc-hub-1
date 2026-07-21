import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin gold scroll-progress bar pinned to the very top of the viewport.
 * Uses transform-only animation via scaleX for 60fps.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] bg-gold-gradient"
    />
  );
}
