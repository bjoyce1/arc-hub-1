import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/arc-logo.png.asset.json";

export function Footer() {
  return (
    <footer className="relative border-t border-hairline bg-ink pb-24 pt-16 lg:pb-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <img src={logoAsset.url} alt="A.R.C." className="h-14 w-auto" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-mute">
              A movement of artists, producers, DJs, and label owners committed to
              consciousness, ownership, and community. Houston, since 2014.
            </p>
            <p className="mt-6 font-mono-tech text-[10px] uppercase tracking-[0.28em] text-dim">
              EST_2014 · HOUSTON_TX · REV.03
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-mono-tech text-[10px] uppercase tracking-[0.3em] text-dim">
              Movement
            </h4>
            <ul className="space-y-3 text-sm text-ivory">
              <li><Link to="/about" className="story-link text-mute hover:text-ivory">Origin</Link></li>
              <li><Link to="/mission" className="story-link text-mute hover:text-ivory">Mission</Link></li>
              <li><Link to="/pioneers" className="story-link text-mute hover:text-ivory">Pioneers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-mono-tech text-[10px] uppercase tracking-[0.3em] text-dim">
              Connect
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/music" className="story-link text-mute hover:text-ivory">Music</Link></li>
              <li><Link to="/community" className="story-link text-mute hover:text-ivory">Community</Link></li>
              <li><Link to="/contact" className="story-link text-mute hover:text-ivory">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-hairline pt-6 font-mono-tech text-[10px] uppercase tracking-[0.28em] text-dim sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} A.R.C. Artists Respecting Community</p>
          <p>Houston, TX</p>
        </div>
      </div>
    </footer>
  );
}
