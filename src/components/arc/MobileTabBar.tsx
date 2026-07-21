import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Info, Music, Users, Mail } from "lucide-react";
import { motion } from "framer-motion";

const TABS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/about", label: "About", icon: Info },
  { to: "/music", label: "Music", icon: Music },
  { to: "/community", label: "Community", icon: Users },
  { to: "/contact", label: "Contact", icon: Mail },
] as const;

export function MobileTabBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/85 pb-safe backdrop-blur-xl lg:hidden"
    >
      <ul className="mx-auto grid max-w-md grid-cols-5">
        {TABS.map(({ to, label, icon: Icon }) => {
          const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
          return (
            <li key={to}>
              <Link
                to={to}
                className="relative flex flex-col items-center justify-center gap-1 py-2.5"
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                {active && (
                  <motion.span
                    layoutId="tab-indicator"
                    className="absolute inset-x-6 top-0 h-0.5 rounded-full bg-gold-gradient"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <Icon
                  className={`h-5 w-5 transition-colors ${
                    active ? "text-gold" : "text-ivory/60"
                  }`}
                  strokeWidth={active ? 2.4 : 1.8}
                />
                <span
                  className={`text-[10px] uppercase tracking-wider transition-colors ${
                    active ? "text-gold" : "text-ivory/60"
                  }`}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
