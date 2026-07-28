import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const reduce = useReducedMotion();

  // `mode="wait"` is not a style choice — the two pages are in normal flow, so
  // overlapping them would stack the outgoing page above the incoming one and
  // double the document height mid-transition. The cost is that exit and enter
  // run back to back, so the durations are not symmetric: leave fast, arrive at
  // a readable pace. The old even 0.22/0.22 spent 440ms with the screen faded
  // out. The incoming rise is small on purpose; a big slide reads as a carousel,
  // and the tab bar can move you between any two sections in any direction.
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: reduce ? 0 : 8 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] } }}
        exit={{ opacity: 0, transition: { duration: 0.1, ease: "easeIn" } }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
