import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/arc-logo.png.asset.json";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/mission", label: "Mission" },
  { to: "/pioneers", label: "Pioneers" },
  { to: "/music", label: "Music" },
  { to: "/community", label: "Community" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 pt-safe transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-xl bg-background/80 border-b border-border"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-blood-gradient opacity-70" />
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" className="group flex items-center gap-3">
            <img
              src={logoAsset.url}
              alt="A.R.C.  -  Artists Respecting Community"
              className="h-10 w-auto transition-transform duration-500 group-hover:scale-105 sm:h-12"
              width={80}
              height={48}
            />
            <span className="hidden font-display text-xl tracking-wider text-ivory sm:block">
              A.R.C.
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) => {
              const active =
                item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`story-link text-sm uppercase tracking-[0.2em] transition-colors ${
                    active
                      ? "text-gold"
                      : "text-ivory/80 hover:text-ivory"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link
            to="/contact"
            className="hidden rounded-full bg-gold-gradient px-5 py-2 text-sm font-semibold uppercase tracking-wider text-ink transition-transform hover:scale-105 lg:inline-flex"
          >
            Join the Movement
          </Link>

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card/60 text-ivory backdrop-blur lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex h-full flex-col pt-safe pb-safe">
              <div className="flex items-center justify-between px-4 py-3">
                <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
                  <img src={logoAsset.url} alt="A.R.C." className="h-10 w-auto" />
                </Link>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card/60 text-ivory"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
                {NAV.map((item, i) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.4 }}
                  >
                    <Link
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="block border-b border-border/50 py-4 font-display text-4xl uppercase tracking-wider text-ivory hover:text-gold"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="px-6 pb-6">
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="block w-full rounded-full bg-gold-gradient py-4 text-center text-sm font-bold uppercase tracking-widest text-ink"
                >
                  Join the Movement
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
