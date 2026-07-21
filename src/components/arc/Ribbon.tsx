interface RibbonProps {
  items: string[];
}

export function Ribbon({ items }: RibbonProps) {
  // Duplicate the list so the -50% translate is seamless.
  const doubled = [...items, ...items];
  return (
    <div className="group relative overflow-hidden border-y border-gold/40 bg-gold-gradient py-4">
      <div className="marquee flex whitespace-nowrap group-hover:[animation-play-state:paused]">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-6 px-6 font-display text-2xl uppercase tracking-[0.15em] text-ink"
          >
            {item}
            <span aria-hidden style={{ color: "var(--blood-dark)" }}>◆</span>
          </span>
        ))}
      </div>
      {/* Edge fades */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-16"
        style={{ background: "linear-gradient(to right, var(--gold-dark), transparent)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-16"
        style={{ background: "linear-gradient(to left, var(--gold-dark), transparent)" }}
      />
    </div>
  );
}
