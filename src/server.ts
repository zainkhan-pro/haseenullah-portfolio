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

  const fixes = `
<style id="portfolio-final-fixes-v6">
html, body { overflow-x: hidden; }

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
  header nav > a > span:last-child { white-space: nowrap !important; font-size: 14px !important; }
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
    position: relative !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    white-space: nowrap !important;
    flex: 0 0 auto !important;
    font-family: 'IBM Plex Mono', monospace !important;
    font-size: clamp(11px, .82vw, 14px) !important;
    font-weight: 700 !important;
    letter-spacing: .075em !important;
    line-height: 1 !important;
    padding: 12px 2px !important;
    color: #b8b4aa !important;
    opacity: 1 !important;
    transition: color .2s ease, text-shadow .2s ease !important;
  }
  header nav > div:nth-of-type(1) a:hover,
  header nav > div:nth-of-type(1) a.is-active {
    color: #facc15 !important;
    text-shadow: 0 0 14px rgba(250,204,21,.28) !important;
  }
  header nav > div:nth-of-type(1) a.is-active::after {
    content: '' !important;
    position: absolute !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 3px !important;
    height: 2px !important;
    border-radius: 999px !important;
    background: #facc15 !important;
    box-shadow: 0 0 10px rgba(250,204,21,.4) !important;
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
  header nav > div:last-child > button { display: none !important; }
  main section[id] { scroll-margin-top: 96px !important; }

  /* Contact: use the full viewport instead of leaving the cards stuck at the top. */
  main section#contact {
    min-height: calc(100vh - 88px) !important;
    box-sizing: border-box !important;
    padding-top: 96px !important;
    padding-bottom: 96px !important;
    display: flex !important;
    align-items: center !important;
  }
  main section#contact > div {
    width: 100% !important;
    transform: none !important;
  }
  main section#contact > div > .reveal:first-child {
    margin-top: 0 !important;
  }
  main section#contact .grid {
    align-items: center !important;
  }
  main section#contact .grid > * {
    align-self: center !important;
  }
}

@media (max-width: 1023px) {
  header nav {
    min-height: 72px !important;
    padding-left: 16px !important;
    padding-right: 16px !important;
    gap: 12px !important;
    flex-wrap: nowrap !important;
    overflow: visible !important;
  }
  header nav > a { flex: 0 0 auto !important; min-width: 0 !important; }
  header nav > a > span:last-child { white-space: nowrap !important; }
  header nav > div:nth-of-type(1) { display: none !important; }
  header nav > div:last-child {
    display: flex !important;
    align-items: center !important;
    margin-left: auto !important;
    flex: 0 0 auto !important;
    gap: 8px !important;
  }
  header nav > div:last-child > a { display: none !important; }
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
  main { width: 100% !important; max-width: 100% !important; overflow-x: hidden !important; }
  main section { max-width: 100% !important; }
}

@media (max-width: 767px) {
  header nav { min-height: 68px !important; padding-left: 12px !important; padding-right: 12px !important; }
  header nav > a > span:last-child { font-size: 13px !important; }
  header nav > div:last-child > button { width: 42px !important; height: 42px !important; flex-basis: 42px !important; }
}

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
  body > div[class*="fixed"][class*="inset-0"] { padding: 72px 10px 16px !important; }
  body > div.fixed.inset-0 img,
  body > div[class*="fixed"][class*="inset-0"] img { max-height: calc(100vh - 90px) !important; }
}
</style>
<script>
(function () {
  var sectionIds = ['profile','certification','certificates','competencies','fieldkit','education'];
  var started = false;

  function getLinks() {
    var nav = document.querySelector('header nav');
    if (!nav) return [];
    return Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]')).filter(function (a) {
      return sectionIds.indexOf((a.getAttribute('href') || '').slice(1)) !== -1;
    });
  }

  function activate(id) {
    getLinks().forEach(function (link) {
      var active = (link.getAttribute('href') || '').slice(1) === id;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }

  function scrollToSection(id, smooth) {
    var target = document.getElementById(id);
    if (!target) return false;
    activate(id);
    var y = target.getBoundingClientRect().top + window.pageYOffset - 92;
    window.scrollTo({ top: Math.max(0, y), behavior: smooth ? 'smooth' : 'auto' });
    return true;
  }

  function updateFromScroll() {
    var bestId = 'profile';
    var bestDistance = Infinity;
    sectionIds.forEach(function (id) {
      var section = document.getElementById(id);
      if (!section) return;
      var top = section.getBoundingClientRect().top;
      if (top <= 180) {
        var distance = Math.abs(top - 105);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestId = id;
        }
      }
    });
    activate(bestId);
  }

  function setup() {
    if (started) return;
    if (!document.querySelector('header nav')) return;
    started = true;

    document.addEventListener('click', function (event) {
      var el = event.target;
      if (!el || !el.closest) return;
      var link = el.closest('header nav a[href^="#"]');
      if (!link) return;
      var id = (link.getAttribute('href') || '').slice(1);
      if (sectionIds.indexOf(id) === -1 || !document.getElementById(id)) return;
      event.preventDefault();
      scrollToSection(id, true);
      try { history.replaceState(null, '', '#' + id); } catch (e) {}
    }, true);

    var hash = (window.location.hash || '').slice(1);
    if (sectionIds.indexOf(hash) !== -1 && document.getElementById(hash)) scrollToSection(hash, false);
    else activate('profile');

    window.addEventListener('scroll', updateFromScroll, { passive: true });
    window.addEventListener('hashchange', function () {
      var id = (window.location.hash || '').slice(1);
      if (sectionIds.indexOf(id) !== -1) scrollToSection(id, true);
    });
    updateFromScroll();
  }

  function boot() {
    setup();
    if (!started) setTimeout(boot, 100);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
  window.addEventListener('load', boot);
})();
</script>`;

  const seoHead =
    '<link rel="canonical" href="https://haseenullah.vercel.app/" />' +
    '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />' +
    '<meta property="og:url" content="https://haseenullah.vercel.app/" />' +
    '<meta property="og:site_name" content="Haseen Ullah" />' +
    '<meta property="og:type" content="profile" />' +
    '<meta name="twitter:url" content="https://haseenullah.vercel.app/" />' +
    fixes +
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
        "address": { "@type": "PostalAddress", "addressLocality": "Al Wajh", "addressRegion": "Tabuk", "addressCountry": "SA" },
        "sameAs": ["https://www.linkedin.com/in/haseen-ullah-hse"],
        "knowsAbout": ["Health and Safety","HSE Compliance","Risk Assessment","Hazard Identification","Incident Investigation","Safety Audits","Toolbox Talks","Emergency Response","PPE and Hazard Control"]
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
          '<link rel="icon" type="image/svg+xml" href="/hse-favicon.svg?v=5" />' +
          '<link rel="shortcut icon" type="image/svg+xml" href="/hse-favicon.svg?v=5" />' +
          '<link rel="apple-touch-icon" href="/hse-favicon.svg?v=5" />';
        const html = injectHomepageSeo(siteHtml.default.replace("<head>", `<head>${faviconLinks}`));
        return new Response(html, {
          headers: {
            "content-type": "text/html; charset=utf-8",
            "cache-control": "no-store, max-age=0",
          },
        });
      }
      const landingPage = landingPages[url.pathname];
      if (landingPage) {
        return new Response(landingPage, { headers: { "content-type": "text/html; charset=utf-8" } });
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
