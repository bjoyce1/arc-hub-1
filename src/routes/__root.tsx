import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteNav } from "@/components/arc/SiteNav";
import { MobileTabBar } from "@/components/arc/MobileTabBar";
import { Footer } from "@/components/arc/Footer";
import { ScrollProgress } from "@/components/arc/ScrollProgress";
import { PageTransition } from "@/components/arc/PageTransition";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-gold">404</p>
        <h1 className="mt-4 font-display text-6xl uppercase text-ivory">Off the map</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          That page isn&rsquo;t part of the movement yet. Head back to the hub.
        </p>
        <a
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-gold-gradient px-6 py-3 text-sm font-bold uppercase tracking-widest text-ink"
        >
          Return home
        </a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-gold">Static</p>
        <h1 className="mt-4 font-display text-5xl uppercase text-ivory">
          This page didn&rsquo;t load
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Something went sideways. Try again or head back to home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-gold-gradient px-6 py-3 text-sm font-bold uppercase tracking-widest text-ink"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-full border border-border bg-card px-6 py-3 text-sm font-bold uppercase tracking-widest text-ivory"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#0B0B0B" },
      { title: "A.R.C.  -  Artists Respecting Community | Houston Movement Since 2014" },
      {
        name: "description",
        content:
          "The main hub for A.R.C.  -  Artists Respecting Community. A Houston-born movement of artists uniting for consciousness, ownership, and community action since 2014.",
      },
      { name: "author", content: "A.R.C.  -  Artists Respecting Community" },
      { property: "og:title", content: "A.R.C.  -  Artists Respecting Community | Houston Movement Since 2014" },
      {
        property: "og:description",
        content:
          "The main hub for A.R.C.  -  Artists Respecting Community. A Houston-born movement of artists uniting for consciousness, ownership, and community action since 2014.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "A.R.C.  -  Artists Respecting Community | Houston Movement Since 2014" },
      { name: "twitter:description", content: "The main hub for A.R.C.  -  Artists Respecting Community. A Houston-born movement of artists uniting for consciousness, ownership, and community action since 2014." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4b2c5ce9-6bab-4283-8ca9-7c90bfc67dca/id-preview-ab452f44--c96fdbc9-986b-4714-b465-3e83511ca2ef.lovable.app-1784620734996.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4b2c5ce9-6bab-4283-8ca9-7c90bfc67dca/id-preview-ab452f44--c96fdbc9-986b-4714-b465-3e83511ca2ef.lovable.app-1784620734996.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative min-h-screen bg-background">
        <ScrollProgress />
        <SiteNav />
        <main className="pb-20 lg:pb-0">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
        <Footer />
        <MobileTabBar />
      </div>
    </QueryClientProvider>
  );
}
