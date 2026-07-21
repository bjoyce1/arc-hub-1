import * as React from "react";

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

/**
 * Touch-friendly tap ripple + haptic feedback.
 * Returns props to spread on the target element and a ripple layer to render inside it.
 * The target should be `position: relative` and `overflow: hidden`.
 */
export function useTapRipple(options?: {
  color?: string;
  duration?: number;
  haptic?: number | number[];
  disabled?: boolean;
}) {
  const {
    color = "currentColor",
    duration = 600,
    haptic = 8,
    disabled = false,
  } = options ?? {};
  const [ripples, setRipples] = React.useState<Ripple[]>([]);
  const idRef = React.useRef(0);

  const spawn = React.useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (disabled) return;
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const size =
        Math.max(
          Math.hypot(x, y),
          Math.hypot(rect.width - x, y),
          Math.hypot(x, rect.height - y),
          Math.hypot(rect.width - x, rect.height - y)
        ) * 2;
      const id = ++idRef.current;
      setRipples((r) => [...r, { id, x, y, size }]);
      window.setTimeout(() => {
        setRipples((r) => r.filter((rp) => rp.id !== id));
      }, duration);

      // Haptic-like feedback (Android + some browsers). Silently ignored elsewhere.
      if (e.pointerType === "touch" && typeof navigator !== "undefined" && navigator.vibrate) {
        try {
          navigator.vibrate(haptic);
        } catch {
          /* noop */
        }
      }
    },
    [disabled, duration, haptic]
  );

  const rippleLayer = (
    <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full"
          style={{
            left: r.x - r.size / 2,
            top: r.y - r.size / 2,
            width: r.size,
            height: r.size,
            background: color,
            opacity: 0.35,
            transform: "scale(0)",
            animation: `tap-ripple ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) forwards`,
          }}
        />
      ))}
    </span>
  );

  return {
    handlers: { onPointerDown: spawn },
    rippleLayer,
  };
}
