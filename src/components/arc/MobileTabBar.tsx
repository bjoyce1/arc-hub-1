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
      className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-ink/95 pb-safe backdrop-blur-md lg:hidden"
    >
      <ul className="mx-auto grid max-w-md grid-cols-5">
        {TABS.map(({ to, label, icon: Icon }) => {
          const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
          return (
            <TabItem key={to} to={to} label={label} Icon={Icon} active={active} />
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
  const { handlers, rippleLayer } = useTapRipple({ color: "rgba(228,50,43,0.35)", haptic: 6 });
  return (
    <li>
      <Link
        to={to}
        {...handlers}
        className="relative flex min-h-[56px] flex-col items-center justify-center gap-1 overflow-hidden py-2 transition-transform duration-150 active:scale-[0.95]"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        {active && (
          <motion.span
            layoutId="tab-indicator"
            className="absolute inset-x-8 top-0 h-px bg-red"
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
        )}
        <Icon
          className={`h-5 w-5 transition-colors ${active ? "text-red" : "text-mute"}`}
          strokeWidth={active ? 2.2 : 1.7}
        />
        <span
          className={`font-mono-tech text-[10px] uppercase tracking-[0.2em] transition-colors ${
            active ? "text-red" : "text-mute"
          }`}
        >
          {label}
        </span>
        {rippleLayer}
      </Link>
    </li>
  );
}
