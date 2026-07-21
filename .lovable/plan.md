
# A.R.C. — Artists Respecting Community Hub

A single-page (multi-route) responsive web app that acts as the main hub for the ARC movement. Desktop = cinematic scrolling site. Mobile = native-app feel (bottom tab bar, safe-area padding, momentum scroll, swipeable sections, tap-first interactions).

## Visual Direction (locked from the logo)

- **Palette**: Deep black `#0B0B0B`, ink `#141414`, ivory `#F5F1E8`, signature gold `#D4AF37` → `#F5D77A` gradient, accent burnt gold `#8B6F1F`.
- **Type**: Bold condensed display for headings (Anton / Oswald / Bebas Neue vibe — evokes the ARC letter block); clean humanist sans for body (Inter / Manrope).
- **Motifs**: Gold hairline borders, banner ribbons (echoing "Artists Respecting Community" scroll in the logo), skyline silhouette accents, vintage-mic iconography, subtle grain/paper texture, embossed-3D headlines with gold edge.
- **Energy**: Streetwise + institutional. Bold and civic, not luxury-soft.

## Pages / Routes

```text
/               Home — hero, mission tagline, movement stats, featured sections
/about          Origin story (2014 meeting, Farrakhan, Dr. Abdul Haleem Muhammad, K-Rino)
/pioneers       Founding members grid (Wickett Crickett, Ganxsta Nip, Cl'Che, Fiya, Zin, Murder One, Mr. Cap, K-Rino)
/mission        Pillars: Business education, Ownership, Positive content, Community action
/community      Programs: feeding, clothing drives, clean-ups, conflict resolution, schools
/music          Albums: Time to Rise, Ready for the Revolution, Sieze the Time (2026)
/contact        Reach-out form for artists / community questions
```

Mobile gets a fixed bottom tab bar (Home / About / Music / Community / Contact) with active-state gold underline; desktop gets a top nav with gold hairline and scroll-shrink behavior.

## Home Page Composition

1. **Hero** — Full-viewport black backdrop with faint skyline silhouette + grain. Large embossed "A.R.C." headline with gold edge, tagline "Artists Respecting Community," and the anchor quote *"The community won't respect US unless WE respect the community."* Two CTAs: *Our Mission* / *Join the Movement*. Subtle parallax on skyline; letters do a staggered reveal.
2. **Since 2014 marquee** — Gold ribbon marquee (auto-scroll) with pillars: Education · Ownership · Consciousness · Community.
3. **Origin teaser** — Split section: portrait-style card + condensed origin copy → link to /about.
4. **Pillars grid** — 4 cards (Business of Music, Ownership, Positive Content, Community Action) with icon, hover lift, gold border reveal.
5. **Discography rail** — Horizontal snap-scroll of album cards (Time to Rise, Ready for the Revolution, Sieze the Time — "Coming 2026" ribbon).
6. **Community impact** — Stat counters (years active, artists reached, events held, meals served) animating on scroll.
7. **Pioneers strip** — Names as bold typographic list with hover gold underline; link to /pioneers.
8. **Closing CTA** — Quote block on gold, contact CTA.
9. **Footer** — Logo lockup, nav, socials, "Est. 2014 · Houston, TX".

## Motion & Interaction

- **Framer Motion** for entrance, stagger, and shared-element transitions between routes.
- Scroll-linked parallax on hero skyline and section headings (IntersectionObserver + transform).
- Marquee ribbons via CSS keyframes with `prefers-reduced-motion` fallback.
- Hover: gold underline sweep on links (story-link pattern), scale-105 on cards, 3D tilt on album covers.
- Number counters animate once in view.
- Route transitions: fade + slight rise (respects reduced motion).

## Native-App Feel (Mobile)

- Bottom tab bar with 5 icons, safe-area inset padding, active gold indicator.
- Sticky compact top bar with logo + hamburger sheet for secondary links.
- Page transitions feel like push/pop (slide + fade).
- Tap targets ≥44px; `touch-action: manipulation`; no hover-only affordances.
- Horizontal snap carousels for discography and pioneers.
- Pull-feel via overscroll-behavior; smooth momentum scroll.
- Web app manifest + theme-color (`#0B0B0B`) + apple-touch-icon so "Add to Home Screen" launches full-screen (manifest-only PWA, no service worker).

## Technical Details

- Stack: TanStack Start + React 19 + Tailwind v4 (already installed).
- Dependencies to add: `framer-motion`, `lucide-react` (already present via shadcn), `embla-carousel-react` for snap rails.
- Design tokens added to `src/styles.css` under `:root` and `@theme inline`: `--arc-gold`, `--arc-gold-light`, `--arc-gold-dark`, `--arc-ink`, `--arc-ivory`, plus `--gradient-gold` and `--shadow-gold`. All component styling uses semantic tokens — no hardcoded hex in JSX.
- Fonts loaded via `<link>` in `__root.tsx` head (Bebas Neue + Inter). Never `@import` remote URLs in `styles.css`.
- Per-route `head()` with unique title, description, og:title/description. Root gets ARC-specific defaults (replace "Lovable App").
- Logo: use the uploaded PNG via lovable-assets pointer; render at appropriate sizes in nav and footer with proper `alt`.
- Hero background: generate a stylized Houston skyline silhouette image (matches logo's skyline motif) via imagegen and place behind hero with grain overlay.
- Album covers: generate 3 placeholder album artworks in ARC style until real art is provided.
- Components split: `SiteNav`, `MobileTabBar`, `Hero`, `Ribbon`, `PillarCard`, `AlbumRail`, `StatCounter`, `PioneersList`, `QuoteBlock`, `Footer`.
- Accessibility: semantic landmarks, focus rings using `--arc-gold`, alt text, `prefers-reduced-motion` honored on all animations, 4.5:1 contrast on ivory-on-black.
- SEO: single H1 per page, descriptive titles like "A.R.C. — Artists Respecting Community | Houston Movement Since 2014", JSON-LD `Organization` on home with founding date, location, sameAs (empty until socials provided).

## Content Mapping (from the writeup)

- Home hero quote → verbatim closing line.
- /about → full origin narrative (2014 Chicago meeting → Minister Farrakhan's charge → Dr. Abdul Haleem Muhammad → K-Rino → first Houston meeting).
- /pioneers → the 8 named founders as cards.
- /mission → the four goals (business education, ownership, positive content, community efforts).
- /community → the concrete programs listed (feeding homeless, clothing drives, clean-ups, conflict resolution, school talks, industry Q&A).
- /music → the three albums with "Sieze the Time" as 2026 upcoming.

## Out of scope (this pass)

- Backend, auth, CMS, donations, event ticketing, newsletter capture wiring — the Contact page is a static form UI with a `mailto:` fallback until you decide on backend (Lovable Cloud) and a destination email.
- Real album art, real photos of pioneers, and social links — generated placeholders / omitted until you supply assets.

Ready to build on your approval.
