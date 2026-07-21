import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Info, Music, Users, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useTapRipple } from "@/hooks/use-tap-ripple";

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
            <TabItem
              key={to}
              to={to}
              label={label}
              Icon={Icon}
              active={active}
            />
          );
        })}
      </ul>
    </nav>
  );
}

function TabItem({
  to,
  label,
  Icon,
  active,
}: {
  to: (typeof TABS)[number]["to"];
  label: string;
  Icon: (typeof TABS)[number]["icon"];
  active: boolean;
}) {
  const { handlers, rippleLayer } = useTapRipple({
    color: "var(--gold)",
    haptic: active ? 6 : [4, 20, 4],
  });

  return (
    <li>
      <Link
        to={to}
        {...handlers}
        className="relative flex flex-col items-center justify-center gap-1 overflow-hidden py-2.5 transition-transform duration-150 active:scale-[0.92]"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        {active && (
          <motion.span
            layoutId="tab-indicator"
            className="absolute inset-x-6 top-0 h-0.5 rounded-full bg-blood-gradient shadow-[0_0_10px_var(--blood)]"
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
        )}
        <motion.span
          whileTap={{ scale: 0.82, y: -2 }}
          transition={{ type: "spring", stiffness: 600, damping: 20 }}
          className="relative"
        >
          <Icon
            className={`h-5 w-5 transition-colors ${
              active ? "text-gold" : "text-ivory/60"
            }`}
            strokeWidth={active ? 2.4 : 1.8}
          />
        </motion.span>
        <span
          className={`text-[10px] uppercase tracking-wider transition-colors ${
            active ? "text-gold" : "text-ivory/60"
          }`}
        >
          {label}
        </span>
        {rippleLayer}
      </Link>
    </li>
  );
}
