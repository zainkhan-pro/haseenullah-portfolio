import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import aboutHtml from "../public/site/about.html?raw";
import experienceHtml from "../public/site/experience.html?raw";
import certificationsHtml from "../public/site/certifications.html?raw";
import contactHtml from "../public/site/contact.html?raw";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

function injectHomepageSeo(html: string): string {
  const title = "Haseen Ullah | HSE Officer | Saudi Arabia";
  const description =
    "Haseen Ullah is an HSE Officer and safety professional in Saudi Arabia with experience in construction, infrastructure and site safety.";
  const responsiveFixes = `
<style id="portfolio-responsive-fixes">
html { overflow-x: hidden; }
body { overflow-x: hidden; }

/* Keep the complete original desktop navigation visible at 100% zoom.
   Nothing is replaced by the hamburger menu on desktop. */
@media (min-width: 900px) {
  header nav {
    padding-left: 18px !important;
    padding-right: 18px !important;
    gap: 10px !important;
    flex-wrap: nowrap !important;
    overflow: visible !important;
  }
  header nav > a { flex: 0 0 auto !important; }
  header nav > a > span:last-child {
    white-space: nowrap !important;
    font-size: 14px !important;
  }
  header nav > div:nth-of-type(1) {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: clamp(10px, 1.25vw, 20px) !important;
    flex: 1 1 auto !important;
    min-width: 0 !important;
    white-space: nowrap !important;
  }
  header nav > div:nth-of-type(1) a {
    display: inline-flex !important;
    white-space: nowrap !important;
    flex: 0 0 auto !important;
    font-size: clamp(10px, .82vw, 13px) !important;
    letter-spacing: .07em !important;
  }
  header nav > div:last-child {
    display: flex !important;
    align-items: center !important;
    flex: 0 0 auto !important;
    gap: 8px !important;
  }
  header nav > div:last-child > a {
    display: inline-flex !important;
    padding-left: 13px !important;
    padding-right: 13px !important;
    white-space: nowrap !important;
  }
  header nav > div:last-child > button {
    display: none !important;
  }
}

/* On narrower screens, keep the full navigation instead of showing the three-line menu.
   The bar can scroll horizontally when necessary. */
@media (max-width: 899px) {
  header nav {
    padding-left: 12px !important;
    padding-right: 12px !important;
    gap: 12px !important;
    overflow-x: auto !important;
    overflow-y: hidden !important;
    justify-content: flex-start !important;
    scrollbar-width: none !important;
  }
  header nav::-webkit-scrollbar { display: none !important; }
  header nav > a { flex: 0 0 auto !important; }
  header nav > div:nth-of-type(1) {
    display: flex !important;
    flex: 0 0 auto !important;
    gap: 14px !important;
    white-space: nowrap !important;
  }
  header nav > div:nth-of-type(1) a {
    display: inline-flex !important;
    flex: 0 0 auto !important;
    white-space: nowrap !important;
  }
  header nav > div:last-child { flex: 0 0 auto !important; }
  header nav > div:last-child > button { display: none !important; }
  header nav > div:last-child > a { display: inline-flex !important; white-space: nowrap !important; }
}

/* Certificate viewer: fit the complete certificate inside the viewport. */
body > div.fixed.inset-0,
body > div[class*="fixed"][class*="inset-0"] {
  overflow: auto !important;
  box-sizing: border-box !important;
  padding: 78px 16px 24px !important;
}
body > div.fixed.inset-0 img,
body > div[class*="fixed"][class*="inset-0"] img {
  max-width: min(100%, 1100px) !important;
  max-height: calc(100vh - 110px) !important;
  width: auto !important;
  height: auto !important;
  object-fit: contain !important;
  margin: auto !important;
}

@media (max-width: 767px) {
  body > div.fixed.inset-0,
  body > div[class*="fixed"][class*="inset-0"] {
    padding: 72px 10px 16px !important;
  }
  body > div.fixed.inset-0 img,
  body > div[class*="fixed"][class*="inset-0"] img {
    max-height: calc(100vh - 90px) !important;
  }
}
</style>`;
  const seoHead =
    '<link rel="canonical" href="https://haseenullah.vercel.app/" />' +
    '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />' +
    '<meta property="og:url" content="https://haseenullah.vercel.app/" />' +
    '<meta property="og:site_name" content="Haseen Ullah" />' +
    '<meta property="og:type" content="profile" />' +
    '<meta name="twitter:url" content="https://haseenullah.vercel.app/" />' +
    responsiveFixes +
    '<script type="application/ld+json">' +
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": "https://haseenullah.vercel.app/#profilepage",
      "url": "https://haseenullah.vercel.app/",
      "name": title,
      "mainEntity": {
        "@type": "Person",
        "@id": "https://haseenullah.vercel.app/#person",
        "name": "Haseen Ullah",
        "jobTitle": "HSE Officer",
        "url": "https://haseenullah.vercel.app/",
        "email": "malikhaseen456@gmail.com",
        "telephone": "+966 534 023 691",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Al Wajh",
          "addressRegion": "Tabuk",
          "addressCountry": "SA"
        },
        "sameAs": ["https://www.linkedin.com/in/haseen-ullah-hse"],
        "knowsAbout": [
          "Health and Safety",
          "HSE Compliance",
          "Risk Assessment",
          "Hazard Identification",
          "Incident Investigation",
          "Safety Audits",
          "Toolbox Talks",
          "Emergency Response",
          "PPE and Hazard Control"
        ]
      }
    }) +
    '</script>';

  let result = html
    .replace("<head>", `<head>${seoHead}`)
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${description}">`)
    .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${title}">`)
    .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${description}">`)
    .replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${title}">`)
    .replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${description}">`);

  result = result.replace(/<img(?![^>]*\bwidth=)([^>]*aspect-square[^>]*)>/g, '<img width="800" height="800"$1>');
  result = result.replace(/<img(?![^>]*\bwidth=)([^>]*aspect-\[4\/3\][^>]*)>/g, '<img width="800" height="600"$1>');
  result = result.replace(/<img(?![^>]*\bwidth=)([^>]*)>/g, '<img width="1200" height="800"$1>');

  return result;
}

const landingPages: Record<string, string> = {
  "/about": aboutHtml,
  "/about/": aboutHtml,
  "/experience": experienceHtml,
  "/experience/": experienceHtml,
  "/certifications": certificationsHtml,
  "/certifications/": certificationsHtml,
  "/contact": contactHtml,
  "/contact/": contactHtml,
};

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);
      if (url.pathname === "/" || url.pathname === "/index.html") {
        const siteHtml = await import("../public/site/index.html?raw");
        const faviconLinks =
          '<link rel="icon" type="image/svg+xml" href="/hse-favicon.svg?v=4" />' +
          '<link rel="shortcut icon" type="image/svg+xml" href="/hse-favicon.svg?v=4" />' +
          '<link rel="apple-touch-icon" href="/hse-favicon.svg?v=4" />';
        const html = injectHomepageSeo(siteHtml.default.replace("<head>", `<head>${faviconLinks}`));
        return new Response(html, {
          headers: { "content-type": "text/html; charset=utf-8" },
        });
      }

      const landingPage = landingPages[url.pathname];
      if (landingPage) {
        return new Response(landingPage, {
          headers: { "content-type": "text/html; charset=utf-8" },
        });
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
