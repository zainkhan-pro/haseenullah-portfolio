import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import { type ReactNode } from "react";
import appCss from "../styles.css?url";

const siteUrl = import.meta.env.VITE_SITE_URL || "https://haseenullah.vercel.app";
const title = "Haseen Ullah | HSE Officer in Saudi Arabia | Safety & HSE Professional";
const description = "Haseen Ullah is an HSE Officer in Saudi Arabia with 5+ years of field experience across construction, infrastructure and energy projects, specializing in workplace safety, risk assessment, HIRA, Permit to Work and HSE compliance.";

const faviconDataUri = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='12' fill='%230f172a'/%3E%3Cpath d='M18 16h8v13h12V16h8v32h-8V37H26v11h-8z' fill='%23f59e0b'/%3E%3C/svg%3E";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title },
      { name: "description", content: description },
      { name: "author", content: "Haseen Ullah" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: siteUrl },
      { property: "og:site_name", content: "Haseen Ullah | HSE Officer" },
      { property: "og:image", content: `${siteUrl}/og-image.svg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: `${siteUrl}/og-image.svg` },
    ],
    links: [
      { rel: "canonical", href: siteUrl },
      { rel: "icon", type: "image/svg+xml", sizes: "any", href: faviconDataUri },
      { rel: "shortcut icon", type: "image/svg+xml", href: faviconDataUri },
      { rel: "apple-touch-icon", href: "/hse-favicon.svg?v=4" },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href={faviconDataUri} />
        <link rel="shortcut icon" type="image/svg+xml" href={faviconDataUri} />
        <HeadContent />
      </head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return <QueryClientProvider client={queryClient}><Outlet /></QueryClientProvider>;
}

function NotFoundComponent() {
  return <main className="flex min-h-screen items-center justify-center px-6"><div className="text-center"><p className="text-sm font-semibold uppercase tracking-widest">404</p><h1 className="mt-2 text-4xl font-bold">Page not found</h1><p className="mt-3 text-muted-foreground">The requested page does not exist.</p><Link to="/" className="mt-6 inline-flex rounded-md bg-primary px-5 py-3 text-primary-foreground">Return to Haseen Ullah’s portfolio</Link></div></main>;
}
