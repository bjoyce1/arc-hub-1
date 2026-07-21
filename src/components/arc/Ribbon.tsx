interface RibbonProps {
  items: string[];
}

export function Ribbon({ items }: RibbonProps) {
  const doubled = [...items, ...items];
  return (
    <div className="group relative overflow-hidden border-y border-hairline bg-ink-2 py-3">
      <div className="marquee flex whitespace-nowrap group-hover:[animation-play-state:paused]">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-6 px-6 font-mono-tech text-[11px] uppercase tracking-[0.32em] text-mute"
          >
            {item}
            <span aria-hidden className="text-dim">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
