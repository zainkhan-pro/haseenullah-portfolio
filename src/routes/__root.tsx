import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import appCss from "../styles.css?url";

const siteUrl = import.meta.env.VITE_SITE_URL || "https://haseenullah.hse.vercel.app";
const title = "Haseen Ullah | HSE Officer in Saudi Arabia | Safety & HSE Professional";
const description =
  "Haseen Ullah is an HSE Officer in Saudi Arabia with 5+ years of field experience across construction, infrastructure and energy projects, specializing in workplace safety, risk assessment, HIRA, Permit to Work and HSE compliance.";

function NotFoundComponent() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">404</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">Page not found</h1>
        <p className="mt-3 text-muted-foreground">The requested page does not exist.</p>
        <Link to="/" className="mt-7 inline-flex rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground">
          Return to Haseen Ullah’s portfolio
        </Link>
      </div>
    </main>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => reset, [reset]);
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold">This page didn’t load</h1>
        <p className="mt-3 text-muted-foreground">Something went wrong. Please refresh and try again.</p>
        <div className="mt-7 flex justify-center gap-3">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground">Try again</button>
          <Link to="/" className="rounded-md border px-5 py-3 font-semibold">Go home</Link>
        </div>
      </div>
    </main>
  );
}

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
      { property: "og:image", content: `${siteUrl}/og-image.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: `${siteUrl}/og-image.jpg` },
    ],
    links: [
      { rel: "canonical", href: siteUrl },
      { rel: "stylesheet", href: appCss },
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
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return <QueryClientProvider client={queryClient}><Outlet /></QueryClientProvider>;
}
