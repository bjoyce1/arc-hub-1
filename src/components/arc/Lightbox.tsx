import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { media } from "@/lib/media";

export interface LightboxItem {
  name: string;
  title: string;
  meta?: string;
}

interface LightboxProps {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}

// Past either of these, the gesture is treated as intentional rather than a
// stray finger. Velocity is checked too so a fast flick counts even if short.
const SWIPE_DISTANCE = 70;
const SWIPE_VELOCITY = 450;

// The incoming flyer enters from the side the swipe came from and the outgoing
// one leaves the opposite way, so the motion reads as a stack being paged.
// `custom` only reaches variant functions, which is why these aren't inline.
const slideVariants = (shift: number) => ({
  enter: (d: number) => ({ opacity: 0, x: d * shift }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d * -shift }),
});

export function Lightbox({ items, index, onClose, onIndexChange }: LightboxProps) {
  const open = index !== null;
  const reduce = useReducedMotion();
  const [dir, setDir] = useState(0);

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      const next = index + delta;
      if (next < 0 || next >= items.length) return;
      setDir(delta);
      onIndexChange(next);
    },
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info;
    // Vertical intent wins only when it clearly dominates, so a diagonal swipe
    // between flyers doesn't accidentally dismiss the whole viewer.
    if (offset.y > SWIPE_DISTANCE * 1.6 && Math.abs(offset.y) > Math.abs(offset.x)) {
      onClose();
      return;
    }
    if (offset.x < -SWIPE_DISTANCE || velocity.x < -SWIPE_VELOCITY) go(1);
    else if (offset.x > SWIPE_DISTANCE || velocity.x > SWIPE_VELOCITY) go(-1);
  };

  const item = index === null ? null : items[index];

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <AnimatePresence>
        {open && item && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-xl"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <motion.div
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-0 z-[101] flex flex-col pb-safe pt-safe outline-none"
              >
                <Dialog.Title className="sr-only">{item.title}</Dialog.Title>

                <header className="flex shrink-0 items-start justify-between gap-4 px-5 py-4">
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-lg font-extrabold leading-tight tracking-[-0.02em] text-ivory">
                      {item.title}
                    </p>
                    {item.meta && (
                      <p className="mt-1 line-clamp-2 font-mono-tech text-[10px] uppercase leading-relaxed tracking-[0.22em] text-gold">
                        {item.meta}
                      </p>
                    )}
                  </div>
                  <Dialog.Close
                    aria-label="Close"
                    className="grid h-11 w-11 shrink-0 place-items-center border border-hairline-strong text-ivory transition-colors hover:bg-surface"
                  >
                    <X className="h-4 w-4" />
                  </Dialog.Close>
                </header>

                <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4">
                  <AnimatePresence initial={false} custom={dir} mode="popLayout">
                    <motion.img
                      key={item.name}
                      custom={dir}
                      src={media(item.name).src}
                      srcSet={media(item.name).srcSet}
                      sizes="(max-width: 900px) 100vw, 900px"
                      alt={item.title}
                      draggable={false}
                      drag={items.length > 1 ? "x" : "y"}
                      dragElastic={0.18}
                      dragMomentum={false}
                      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                      onDragEnd={onDragEnd}
                      variants={slideVariants(reduce ? 0 : 60)}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className="max-h-full max-w-full cursor-grab touch-none object-contain shadow-2xl active:cursor-grabbing"
                    />
                  </AnimatePresence>

                  {items.length > 1 && (
                    <>
                      <Arrow side="left" disabled={index === 0} onClick={() => go(-1)} />
                      <Arrow
                        side="right"
                        disabled={index === items.length - 1}
                        onClick={() => go(1)}
                      />
                    </>
                  )}
                </div>

                {items.length > 1 && (
                  <footer className="shrink-0 px-5 pb-3 text-center font-mono-tech text-[10px] uppercase tracking-[0.3em] text-dim">
                    {index + 1} / {items.length}
                    <span className="ml-3 lg:hidden">Swipe to browse</span>
                  </footer>
                )}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

function Arrow({
  side,
  disabled,
  onClick,
}: {
  side: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={side === "left" ? "Previous" : "Next"}
      className={`absolute ${side === "left" ? "left-2" : "right-2"} top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center border border-hairline-strong bg-ink/70 text-ivory backdrop-blur transition-colors hover:bg-surface disabled:pointer-events-none disabled:opacity-25 lg:grid`}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
