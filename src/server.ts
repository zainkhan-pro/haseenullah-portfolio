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

/* Desktop/tablet-wide: keep the complete original navigation visible. */
@media (min-width: 1024px) {
  header nav {
    min-height: 88px !important;
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
    gap: clamp(8px, 1.05vw, 18px) !important;
    flex: 1 1 auto !important;
    min-width: 0 !important;
    white-space: nowrap !important;
  }
  header nav > div:nth-of-type(1) a {
    display: inline-flex !important;
    align-items: center !important;
    white-space: nowrap !important;
    flex: 0 0 auto !important;
    font-size: clamp(11px, .82vw, 14px) !important;
    font-weight: 600 !important;
    letter-spacing: .065em !important;
    line-height: 1 !important;
    padding-top: 2px !important;
    padding-bottom: 2px !important;
    transition: color .2s ease, text-shadow .2s ease !important;
  }
  header nav > div:nth-of-type(1) a:hover,
  header nav > div:nth-of-type(1) a.is-active {
    color: #facc15 !important;
    text-shadow: 0 0 18px rgba(250, 204, 21, .18) !important;
  }
  header nav > div:last-child {
    display: flex !important;
    align-items: center !important;
    flex: 0 0 auto !important;
    gap: 8px !important;
  }
  header nav > div:last-child > a {
    display: inline-flex !important;
    align-items: center !important;
    padding-left: 13px !important;
    padding-right: 13px !important;
    white-space: nowrap !important;
  }
  header nav > div:last-child > button {
    display: none !important;
  }

  /* Desktop contact composition: move the cards down into the visual center and remove the large empty lower area. */
  main section#contact {
    padding-top: 132px !important;
    padding-bottom: 72px !important;
  }
  main section#contact > div {
    transform: translateY(24px) !important;
  }
  main section#contact .grid {
    align-items: start !important;
  }

  /* Keep anchored sections clear of the fixed desktop header. */
  main section[id] {
    scroll-margin-top: 92px !important;
  }
}

/* Mobile/narrow: hide the desktop links and show the original hamburger button. */
@media (max-width: 1023px) {
  header nav {
    min-height: 72px !important;
    padding-left: 16px !important;
    padding-right: 16px !important;
    gap: 12px !important;
    flex-wrap: nowrap !important;
    overflow: visible !important;
  }
  header nav > a {
    flex: 0 0 auto !important;
    min-width: 0 !important;
  }
  header nav > a > span:last-child {
    white-space: nowrap !important;
  }
  header nav > div:nth-of-type(1) {
    display: none !important;
  }
  header nav > div:last-child {
    display: flex !important;
    align-items: center !important;
    margin-left: auto !important;
    flex: 0 0 auto !important;
    gap: 8px !important;
  }
  header nav > div:last-child > a {
    display: none !important;
  }
  header nav > div:last-child > button {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 44px !important;
    height: 44px !important;
    flex: 0 0 44px !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  /* Prevent the hero grid from keeping desktop-sized offsets on phones. */
  main {
    width: 100% !important;
    max-width: 100% !important;
    overflow-x: hidden !important;
  }
  main section {
    max-width: 100% !important;
  }
}

@media (max-width: 767px) {
  header nav {
    min-height: 68px !important;
    padding-left: 12px !important;
    padding-right: 12px !important;
  }
  header nav > a > span:last-child {
    font-size: 13px !important;
  }
  header nav > div:last-child > button {
    width: 42px !important;
    height: 42px !important;
    flex-basis: 42px !important;
  }
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
</style>
<script>
(function () {
  function initPortfolioNav() {
    var links = Array.prototype.slice.call(document.querySelectorAll('header nav > div:nth-of-type(1) a[href^="#"]'));
    if (!links.length) return;

    var setActive = function (id) {
      links.forEach(function (link) {
        var active = link.getAttribute('href') === '#' + id;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      });
    };

    links.forEach(function (link) {
      link.addEventListener('click', function () {
        var target = link.getAttribute('href');
        if (target && target.charAt(0) === '#') setActive(target.slice(1));
      });
    });

    if ('IntersectionObserver' in window) {
      var sections = links.map(function (link) {
        return document.getElementById(link.getAttribute('href').slice(1));
      }).filter(Boolean);

      var observer = new IntersectionObserver(function (entries) {
        var visible = entries.filter(function (entry) { return entry.isIntersecting; });
        if (!visible.length) return;
        visible.sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; });
        setActive(visible[0].target.id);
      }, { rootMargin: '-28% 0px -58% 0px', threshold: [0.05, 0.2, 0.5] });

      sections.forEach(function (section) { observer.observe(section); });
    }

    var initial = window.location.hash ? window.location.hash.slice(1) : 'profile';
    setActive(initial || 'profile');
    window.addEventListener('hashchange', function () {
      setActive(window.location.hash.slice(1) || 'profile');
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initPortfolioNav);
  else initPortfolioNav();
})();
</script>`;
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
