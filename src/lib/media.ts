import manifest from "@/assets/media/manifest.json";

// Vite resolves and fingerprints every variant at build time. Globbing rather
// than writing ~59 explicit imports keeps adding new source images to a single
// step: drop the file in, re-run scripts/optimize-images.py.
const urls = import.meta.glob("../assets/media/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const urlBySlugWidth = new Map<string, string>();
for (const [path, url] of Object.entries(urls)) {
  const name = path.slice(path.lastIndexOf("/") + 1, -".webp".length);
  urlBySlugWidth.set(name, url);
}

export interface MediaAsset {
  slug: string;
  /** Intrinsic dimensions of the largest variant — used to reserve layout space. */
  width: number;
  height: number;
  /** Largest variant, for `src` fallback and for opening in the lightbox. */
  src: string;
  srcSet: string;
  aspect: number;
}

function build(slug: string): MediaAsset {
  const entry = manifest.find((m) => m.slug === slug);
  if (!entry) throw new Error(`Unknown media slug "${slug}" — re-run scripts/optimize-images.py`);

  const srcSet = entry.variants
    .map((v) => {
      const url = urlBySlugWidth.get(`${slug}-${v.w}`);
      if (!url) throw new Error(`Missing built variant ${slug}-${v.w}.webp`);
      return `${url} ${v.w}w`;
    })
    .join(", ");

  const largest = entry.variants[entry.variants.length - 1];
  return {
    slug,
    width: largest.w,
    height: largest.h,
    src: urlBySlugWidth.get(`${slug}-${largest.w}`)!,
    srcSet,
    aspect: largest.w / largest.h,
  };
}

const cache = new Map<string, MediaAsset>();
export function media(slug: string): MediaAsset {
  let asset = cache.get(slug);
  if (!asset) {
    asset = build(slug);
    cache.set(slug, asset);
  }
  return asset;
}
