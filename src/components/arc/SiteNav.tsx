import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logoUrl from "@/assets/arc-logo-640.webp";

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

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 pt-safe transition-colors duration-200 ${
          scrolled ? "bg-ink/92 border-b border-hairline backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" className="-m-2 flex items-center gap-3 p-2">
            <img
              src={logoUrl}
              alt="A.R.C."
              className="h-9 w-auto sm:h-10"
              width={140}
              height={100}
            />
            <span className="hidden font-mono-tech text-[11px] uppercase tracking-[0.32em] text-mute sm:block">
              A.R.C.
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => {
              const active =
                item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`tap-44 font-mono-tech text-[11px] uppercase tracking-[0.28em] transition-colors duration-150 ${
                    active ? "text-gold" : "text-mute hover:text-ivory"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link to="/contact" className="btn-gold hidden lg:inline-flex">
            Join the movement
          </Link>

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="grid h-11 w-11 place-items-center border border-hairline-strong bg-ink/60 text-ivory backdrop-blur lg:hidden"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-ink lg:hidden"
          >
            <div className="flex h-full flex-col pt-safe pb-safe">
              <div className="flex items-center justify-between px-4 py-3">
                <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
                  <img src={logoUrl} alt="A.R.C." className="h-9 w-auto" />
                </Link>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="grid h-11 w-11 place-items-center border border-hairline-strong bg-surface text-ivory"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <nav className="flex flex-1 flex-col justify-center gap-1 px-6">
                {NAV.map((item, i) => {
                  const active =
                    item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
                  return (
                    <motion.div
                      key={item.to}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.03 * i, duration: 0.3 }}
                    >
                      <Link
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between border-b border-hairline py-5"
                      >
                        <span className={`text-3xl font-extrabold tracking-[-0.02em] ${active ? "text-gold" : "text-ivory"}`}>
                          {item.label}
                        </span>
                        <span className="font-mono-tech text-[10px] uppercase tracking-[0.3em] text-dim">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
              <div className="px-6 pb-6">
                <Link to="/contact" onClick={() => setOpen(false)} className="btn-gold w-full">
                  Join the movement
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
