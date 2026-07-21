interface RibbonProps {
  items: string[];
}

export function Ribbon({ items }: RibbonProps) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-gold/40 bg-gold-gradient py-4">
      <div className="marquee flex whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-6 px-6 font-display text-2xl uppercase tracking-[0.15em] text-ink"
          >
            {item}
            <span aria-hidden className="text-ink/60">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
