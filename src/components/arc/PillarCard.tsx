import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { PointerEvent } from "react";
import { useRef } from "react";
import { useTapRipple } from "@/hooks/use-tap-ripple";

interface PillarCardProps {
  icon: LucideIcon;
  title: string;
  body: string;
  index: number;
}

export function PillarCard({ icon: Icon, title, body, index }: PillarCardProps) {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), { stiffness: 150, damping: 18 });

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const { handlers: tapHandlers, rippleLayer } = useTapRipple({
    color: "var(--blood)",
    haptic: 12,
  });

  return (
    <motion.article
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onPointerDown={tapHandlers.onPointerDown}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors duration-500 [transform-style:preserve-3d] hover:border-gold/40 sm:p-8"
    >
      {/* Gold hairline reveal on hover */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gold-gradient transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
      />

      <div className="relative" style={{ transform: "translateZ(20px)" }}>
        <div className="mb-6 inline-grid h-14 w-14 place-items-center rounded-xl border border-gold/25 bg-ink/40 transition-colors duration-500 group-hover:border-gold/60">
          <Icon className="h-7 w-7 text-gold transition-transform duration-500 group-hover:scale-105" strokeWidth={1.4} />
        </div>
        <h3 className="mb-3 font-display text-3xl uppercase tracking-wide text-ivory">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          {body}
        </p>
      </div>

      <span className="pointer-events-none absolute bottom-4 right-5 font-display text-6xl leading-none text-gold/[0.08] transition-all duration-500 group-hover:text-gold/20 group-hover:-translate-y-1">
        0{index + 1}
      </span>
      {rippleLayer}
    </motion.article>
  );
}

