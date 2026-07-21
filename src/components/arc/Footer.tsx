import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/arc-logo.png.asset.json";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-ink pb-24 pt-16 lg:pb-16">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-blood-gradient opacity-80" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[80%] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--gradient-gold)" }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <img src={logoAsset.url} alt="A.R.C." className="h-16 w-auto" />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              A movement of artists, producers, DJs, and label owners committed to
              consciousness, ownership, and community  -  Houston, since 2014.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs uppercase tracking-[0.3em] text-gold">
              Movement
            </h4>
            <ul className="space-y-3 text-sm text-ivory/80">
              <li><Link to="/about" className="story-link">Origin</Link></li>
              <li><Link to="/mission" className="story-link">Mission</Link></li>
              <li><Link to="/pioneers" className="story-link">Pioneers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs uppercase tracking-[0.3em] text-gold">
              Connect
            </h4>
            <ul className="space-y-3 text-sm text-ivory/80">
              <li><Link to="/music" className="story-link">Music</Link></li>
              <li><Link to="/community" className="story-link">Community</Link></li>
              <li><Link to="/contact" className="story-link">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs uppercase tracking-widest text-ivory/50 sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} A.R.C.  -  Artists Respecting Community</p>
          <p>Est. 2014 · Houston, TX</p>
        </div>
      </div>
    </footer>
  );
}
