import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  caret?: boolean;
}

/**
 * Terminal-style type-in effect. Respects prefers-reduced-motion.
 */
export function Typewriter({
  text,
  delay = 0,
  speed = 45,
  className,
  caret = true,
}: TypewriterProps) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(reduce ? text.length : 0);

  useEffect(() => {
    if (reduce) return;
    let mounted = true;
    const start = window.setTimeout(function tick() {
      if (!mounted) return;
      setI((prev) => {
        if (prev >= text.length) return prev;
        window.setTimeout(tick, speed);
        return prev + 1;
      });
    }, delay);
    return () => {
      mounted = false;
      window.clearTimeout(start);
    };
  }, [text, delay, speed, reduce]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden>{text.slice(0, i)}</span>
      {caret && (
        <motion.span
          aria-hidden
          className="ml-[2px] inline-block h-[0.9em] w-[2px] translate-y-[2px] bg-gold align-middle"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      )}
    </span>
  );
}
