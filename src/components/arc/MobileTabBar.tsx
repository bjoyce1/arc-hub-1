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
  // Opaque on purpose: the hook already sets opacity 0.35 on the ripple node, so
  // an alpha here would compound with it. The previous rgba(228,50,43,0.35) was
  // both the destructive red — the one hue this brand never uses — and
  // double-faded to roughly 0.12, so the tab you pressed flashed a colour from
  // outside the palette, faintly. Gold matches the indicator and active label
  // this same bar already renders.
  const { handlers, rippleLayer } = useTapRipple({ color: "var(--gold)", haptic: 6 });
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
            className="absolute inset-x-8 top-0 h-px bg-gold"
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
        )}
        <Icon
          className={`h-5 w-5 transition-colors ${active ? "text-gold" : "text-mute"}`}
          strokeWidth={active ? 2.2 : 1.7}
        />
        {/* "Community" is nine mono characters carrying 0.2em of tracking, which
            needs 72px — more than the 64px column a 320px phone gives it. The
            Link clips rather than overflows (it has to, for the ripple), so this
            showed up as a label reading ":OMMUNITY" instead of as page overflow,
            and no amount of scrollWidth checking would have found it. Tracking is
            in em, so clamping the size alone pulls the whole label in. */}
        <span
          className={`font-mono-tech text-[clamp(0.5rem,2.6vw,0.625rem)] uppercase tracking-[0.2em] transition-colors ${
            active ? "text-gold" : "text-mute"
          }`}
        >
          {label}
        </span>
        {rippleLayer}
      </Link>
    </li>
  );
}
