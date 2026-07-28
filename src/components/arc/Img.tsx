import { useEffect, useRef, useState } from "react";
import { media } from "@/lib/media";
import { cn } from "@/lib/utils";

interface ImgProps {
  /** Manifest slug, e.g. "peace-ride-leaders". */
  name: string;
  alt: string;
  /**
   * Layout width hint for the browser's variant picker. Get this right — it is
   * the difference between a 400px file and a 1600px one on a phone.
   */
  sizes: string;
  className?: string;
  /** Fixed aspect box with object-cover. Omit to let the image keep its own shape. */
  aspect?: string;
  /** Above-the-fold images should set this so they are not lazy-loaded. */
  priority?: boolean;
}

export function Img({ name, alt, sizes, className, aspect, priority }: ImgProps) {
  const asset = media(name);
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  // A cached image can finish decoding before React attaches onLoad, which would
  // leave it stuck at opacity-0. Check the element directly on mount.
  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, []);

  return (
    <div
      className={cn("relative overflow-hidden bg-surface", aspect, className)}
      style={aspect ? undefined : { aspectRatio: `${asset.width} / ${asset.height}` }}
    >
      <img
        ref={ref}
        src={asset.src}
        srcSet={asset.srcSet}
        sizes={sizes}
        alt={alt}
        width={asset.width}
        height={asset.height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : undefined}
        onLoad={() => setLoaded(true)}
        className={cn(
          "h-full w-full object-cover transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}
