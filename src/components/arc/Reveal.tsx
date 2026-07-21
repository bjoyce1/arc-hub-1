import { motion, useInView, useReducedMotion } from "framer-motion";
import { Children, type ReactNode, useRef } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer";
  stagger?: boolean;
  staggerDelay?: number;
}

/**
 * Scroll-triggered reveal. Short opacity + translateY, no blur.
 */
export function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
  as = "div",
  stagger = false,
  staggerDelay = 0.07,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const Comp = motion[as];

  if (!stagger) {
    return (
      <Comp
        ref={ref}
        initial={reduce ? false : { opacity: 0, y }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {children}
      </Comp>
    );
  }

  return (
    <Comp
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: staggerDelay, delayChildren: delay } },
      }}
      className={className}
    >
      {Children.map(children, (child, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: reduce ? { opacity: 1 } : { opacity: 0, y },
            show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          {child}
        </motion.div>
      ))}
    </Comp>
  );
}
