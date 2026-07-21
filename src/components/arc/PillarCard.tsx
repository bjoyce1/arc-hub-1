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
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 150, damping: 15 });
  const glowX = useTransform(mx, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(my, [-0.5, 0.5], ["0%", "100%"]);

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
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-shadow duration-500 [transform-style:preserve-3d] hover:shadow-[0_30px_80px_-30px_var(--blood)] sm:p-8"
    >
      {/* Gold sweep on hover */}
      <div
        aria-hidden
        className="absolute inset-x-0 -top-px h-px bg-gold-gradient opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      {/* Cursor-following radial highlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) =>
              `radial-gradient(280px circle at ${x} ${y}, oklch(0.78 0.14 85 / 0.18), transparent 60%)`
          ),
        }}
      />

      <div className="relative" style={{ transform: "translateZ(30px)" }}>
        <div className="mb-6 inline-grid h-14 w-14 place-items-center rounded-xl border border-gold/30 bg-ink/40 transition-all duration-500 group-hover:border-gold group-hover:shadow-[0_0_30px_-5px_var(--gold)]">
          <Icon className="h-7 w-7 text-gold transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" strokeWidth={1.6} />
        </div>
        <h3 className="mb-3 font-display text-3xl uppercase tracking-wide text-ivory">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          {body}
        </p>
      </div>

      <span className="pointer-events-none absolute bottom-4 right-4 font-display text-6xl leading-none text-gold/10 transition-all duration-500 group-hover:text-gold/30 group-hover:-translate-y-1">
        0{index + 1}
      </span>
      {rippleLayer}
    </motion.article>
  );
}
