import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import cover1Asset from "@/assets/album-time-to-rise.png.asset.json";
import cover2Asset from "@/assets/album-ready-revolution.png.asset.json";
import cover3Asset from "@/assets/album-sieze-the-time.png.asset.json";

export const ALBUMS = [
  {
    title: "Time to Rise",
    year: "VOL. I",
    status: "Released",
    cover: cover1Asset.url,
    description:
      "The debut collective project. A call to consciousness and craft from the founding pioneers.",
  },
  {
    title: "Ready for the Revolution",
    year: "VOL. II",
    status: "Released",
    cover: cover2Asset.url,
    description:
      "The follow-up statement. Ownership, education, and unapologetic art in service of the community.",
  },
  {
    title: "Sieze the Time",
    year: "VOL. III",
    status: "Coming 2026",
    cover: cover3Asset.url,
    description:
      "The next chapter. Twelve years in, the movement returns with a project built for the moment.",
  },
] as const;

export function AlbumRail() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: false, align: "start", containScroll: "trimSnaps" });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);

  useEffect(() => {
    if (!embla) return;
    const update = () => {
      setCanPrev(embla.canScrollPrev());
      setCanNext(embla.canScrollNext());
    };
    update();
    embla.on("select", update);
    embla.on("reInit", update);
    return () => {
      embla.off("select", update);
      embla.off("reInit", update);
    };
  }, [embla]);

  return (
    <div className="relative">
      <div className="mb-8 flex items-end justify-between gap-4 px-4 sm:px-0">
        <div>
          <span className="chapter-pill">Discography</span>
          <h2 className="mt-5 text-4xl font-extrabold tracking-[-0.03em] text-ivory sm:text-5xl">
            The Collective Records
          </h2>
        </div>
        <div className="hidden gap-2 sm:flex">
          <NavBtn onClick={scrollPrev} disabled={!canPrev} label="Previous">
            <ChevronLeft className="h-4 w-4" />
          </NavBtn>
          <NavBtn onClick={scrollNext} disabled={!canNext} label="Next">
            <ChevronRight className="h-4 w-4" />
          </NavBtn>
        </div>
      </div>

      <div ref={emblaRef} className="overflow-hidden">
        <div className="-ml-4 flex touch-pan-y">
          {ALBUMS.map((album, i) => (
            <motion.div
              key={album.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="min-w-0 flex-[0_0_82%] pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_34%]"
            >
              <AlbumCard {...album} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NavBtn({
  children,
  onClick,
  disabled,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="grid h-10 w-10 place-items-center border border-hairline-strong text-ivory transition-colors duration-150 disabled:opacity-30 hover:bg-surface-2"
    >
      {children}
    </button>
  );
}

export function AlbumCard({
  title,
  year,
  status,
  cover,
  description,
}: {
  title: string;
  year: string;
  status: string;
  cover: string;
  description: string;
}) {
  const upcoming = status.toLowerCase().includes("coming");
  return (
    <article className="group flex h-full flex-col overflow-hidden border border-hairline bg-surface transition-colors duration-200 hover:border-hairline-strong">
      <div className="relative aspect-square overflow-hidden bg-ink">
        <img
          src={cover}
          alt={`${title} album cover`}
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          loading="lazy"
          width={1024}
          height={1024}
        />
        {upcoming && (
          <span className="absolute left-3 top-3 border border-hairline-strong bg-ink/80 px-2.5 py-1 font-mono-tech text-[10px] uppercase tracking-[0.28em] text-red backdrop-blur">
            {status}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex items-center justify-between font-mono-tech text-[10px] uppercase tracking-[0.3em] text-dim">
            <span>{year}</span>
            <span>{status}</span>
          </div>
          <h3 className="mt-4 text-2xl font-extrabold tracking-[-0.02em] text-ivory sm:text-[1.6rem]">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-mute">{description}</p>
        </div>
        {!upcoming ? (
          <div className="mt-6 border-t border-hairline pt-5">
            <div className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-dim">
              Listen
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {["Spotify", "Apple", "Bandcamp"].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={`Listen to ${title} on ${s} (link pending)`}
                  className="border border-hairline-strong px-2 py-2 text-center font-mono-tech text-[9px] uppercase tracking-[0.25em] text-mute transition-colors duration-150 hover:border-red hover:text-ivory"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-6 border-t border-hairline pt-5">
            <div className="flex items-center gap-3 font-mono-tech text-[10px] uppercase tracking-[0.3em] text-dim">
              <span className="h-1.5 w-1.5 rounded-full bg-red" />
              Pre-save launching soon
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
