import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import cover1Asset from "@/assets/album-time-to-rise.png.asset.json";
const cover1 = cover1Asset.url;
import cover2Asset from "@/assets/album-ready-revolution.png.asset.json";
const cover2 = cover2Asset.url;
import cover3 from "@/assets/album-sieze-the-time.jpg";

export const ALBUMS = [
  {
    title: "Time to Rise",
    year: "Vol. I",
    status: "Released",
    cover: cover1,
    description:
      "The debut collective project — a call to consciousness and craft from the founding pioneers.",
  },
  {
    title: "Ready for the Revolution",
    year: "Vol. II",
    status: "Released",
    cover: cover2,
    description:
      "The follow-up statement: ownership, education, and unapologetic art in service of the community.",
  },
  {
    title: "Sieze the Time",
    year: "Vol. III",
    status: "Coming 2026",
    cover: cover3,
    description:
      "The next chapter — twelve years in, the movement returns with a project built for the moment.",
  },
] as const;

export function AlbumRail() {
  const [emblaRef, embla] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: false,
    containScroll: "trimSnaps",
  });
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
      <div className="mb-6 flex items-end justify-between gap-4 px-4 sm:px-0">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Discography</p>
          <h2 className="mt-2 font-display text-4xl uppercase text-ivory sm:text-5xl">
            The Collective Records
          </h2>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            aria-label="Previous"
            onClick={scrollPrev}
            disabled={!canPrev}
            className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-ivory transition disabled:opacity-30 hover:border-gold hover:text-gold"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={scrollNext}
            disabled={!canNext}
            className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-ivory transition disabled:opacity-30 hover:border-gold hover:text-gold"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div ref={emblaRef} className="overflow-hidden">
        <div className="-ml-4 flex touch-pan-y">
          {ALBUMS.map((album, i) => (
            <motion.div
              key={album.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
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
    <article className="group relative overflow-hidden rounded-2xl border border-border bg-card">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={cover}
          alt={`${title} — album cover`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          width={1024}
          height={1024}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent opacity-70" />
        {upcoming && (
          <span className="absolute left-4 top-4 rounded-full bg-gold-gradient px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-ink">
            {status}
          </span>
        )}
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">{year}</p>
          <h3 className="mt-1 font-display text-3xl uppercase leading-none text-ivory">
            {title}
          </h3>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </article>
  );
}
