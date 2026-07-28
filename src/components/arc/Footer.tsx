import { Link } from "@tanstack/react-router";
import logoUrl from "@/assets/arc-logo-640.webp";

const GROUPS = [
  {
    heading: "Movement",
    links: [
      { to: "/about", label: "Origin" },
      { to: "/mission", label: "Mission" },
      { to: "/pioneers", label: "Pioneers" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { to: "/music", label: "Music" },
      { to: "/community", label: "Community" },
      { to: "/contact", label: "Contact" },
    ],
  },
] as const;

// The bottom tab bar floats over this on phones. Its box is 65px plus whatever
// the home indicator claims, so the clearance has to be measured rather than
// guessed — a flat pb-24 left the copyright line under the bar on any device
// with an inset.
export function Footer() {
  return (
    <footer className="relative border-t border-hairline bg-ink pb-[calc(env(safe-area-inset-bottom)+5.5rem)] pt-16 lg:pb-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <img
              src={logoUrl}
              alt="A.R.C."
              className="h-14 w-auto"
              width={196}
              height={140}
              loading="lazy"
              decoding="async"
            />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-mute">
              A movement of artists, producers, DJs, and label owners committed to
              consciousness, ownership, and community. Houston, since 2014.
            </p>
            <p className="mt-6 font-mono-tech text-[10px] uppercase tracking-[0.28em] text-gold/70">
              EST_2014 · HOUSTON_TX · REV.03
            </p>
          </div>

          {/* One wrapped row on a phone, two labelled columns from md up. Stacked
              at 24px apart these six links ran 600px — a full screen of sitemap
              directly above a tab bar that already reaches five of them. The
              `contents` display collapses the group wrappers so the links become
              direct flex children, which keeps every link in the DOM at every
              breakpoint rather than hiding a duplicate set. */}
          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-x-6 gap-y-6 md:col-span-2 md:grid md:grid-cols-2 md:gap-10"
          >
            {GROUPS.map((group) => (
              <div key={group.heading} className="contents md:block">
                <h4 className="hidden font-mono-tech text-[10px] uppercase tracking-[0.3em] text-dim md:mb-4 md:block">
                  {group.heading}
                </h4>
                <ul className="contents text-sm md:block md:space-y-6">
                  {group.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="story-link tap-44 text-mute hover:text-ivory"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-hairline pt-6 font-mono-tech text-[10px] uppercase tracking-[0.28em] text-dim sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} A.R.C. Artists Respecting Community</p>
          <p>Houston, TX</p>
        </div>
      </div>
    </footer>
  );
}
