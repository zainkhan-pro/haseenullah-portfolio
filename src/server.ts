import "./lib/error-capture";
import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import aboutHtml from "../public/site/about.html?raw";
import experienceHtml from "../public/site/experience.html?raw";
import certificationsHtml from "../public/site/certifications.html?raw";
import contactHtml from "../public/site/contact.html?raw";

type ServerEntry = { fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response };
let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then((m) => (m.default ?? m) as ServerEntry);
  }
  return serverEntryPromise;
}

function normalizeResponse(response: Response): Response | Promise<Response> {
  if (response.status < 500) return response;
  const type = response.headers.get("content-type") ?? "";
  if (!type.includes("application/json")) return response;
  return response.clone().text().then((body) => {
    try {
      const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
      if (payload.unhandled === true && payload.message === "HTTPError") {
        console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
        return new Response(renderErrorPage(), { status: 500, headers: { "content-type": "text/html; charset=utf-8" } });
      }
    } catch {}
    return response;
  });
}

function injectHomepageSeo(html: string): string {
  const title = "Haseen Ullah | HSE Officer | Saudi Arabia";
  const description = "Haseen Ullah is an HSE Officer and safety professional in Saudi Arabia with experience in construction, infrastructure and site safety.";
  const fixes = `
<style id="portfolio-final-fixes-v8">
html,body{overflow-x:hidden}
@media (min-width:1024px){
header nav{min-height:88px!important;padding-left:18px!important;padding-right:18px!important;gap:10px!important;flex-wrap:nowrap!important;overflow:visible!important}
header nav>div:nth-of-type(1){display:flex!important;align-items:center!important;justify-content:center!important;gap:clamp(8px,1.05vw,18px)!important;flex:1 1 auto!important;min-width:0!important;white-space:nowrap!important}
header nav>div:nth-of-type(1) a{position:relative!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;white-space:nowrap!important;flex:0 0 auto!important;font-family:'IBM Plex Mono',monospace!important;font-size:clamp(11px,.82vw,14px)!important;font-weight:700!important;letter-spacing:.075em!important;line-height:1!important;padding:12px 2px!important;color:#b8b4aa!important}
header nav>div:nth-of-type(1) a:hover,header nav>div:nth-of-type(1) a.is-active{color:#facc15!important;text-shadow:0 0 14px rgba(250,204,21,.28)!important}
header nav>div:nth-of-type(1) a.is-active:after{content:''!important;position:absolute!important;left:0!important;right:0!important;bottom:3px!important;height:2px!important;border-radius:999px!important;background:#facc15!important;box-shadow:0 0 10px rgba(250,204,21,.4)!important}
header nav>div:last-child{display:flex!important;align-items:center!important;flex:0 0 auto!important;gap:8px!important}
header nav>div:last-child>a{display:inline-flex!important;align-items:center!important;padding-left:13px!important;padding-right:13px!important;white-space:nowrap!important}
header nav>div:last-child>button{display:none!important}
main section[id]{scroll-margin-top:96px!important}
main section#contact{min-height:calc(100vh - 88px)!important;box-sizing:border-box!important;padding-top:96px!important;padding-bottom:96px!important;display:flex!important;align-items:center!important}
main section#contact>.relative{width:100%!important}
main section#contact>.relative>.grid{align-items:center!important}
main section#contact>.relative>.grid>div:first-child{display:flex!important;flex-direction:column!important;gap:16px!important;align-items:stretch!important;justify-content:center!important}
main section#contact>.relative>.grid>div:first-child>.reveal{width:100%!important;min-width:0!important;order:2!important}
main section#contact>.relative>.grid>div:first-child>.reveal:nth-child(2){order:1!important}
main section#contact a[href^='mailto:'],main section#contact a[href^='mailto:'] *{white-space:nowrap!important;word-break:normal!important;overflow-wrap:normal!important}
main section#contact>.relative>.grid>div:last-child{align-self:center!important}
body>div.fixed.inset-0,body>div[class*='fixed'][class*='inset-0']{overflow:auto!important;box-sizing:border-box!important;padding:78px 16px 24px!important}
body>div.fixed.inset-0 img,body>div[class*='fixed'][class*='inset-0'] img{max-width:min(100%,1100px)!important;max-height:calc(100vh - 110px)!important;width:auto!important;height:auto!important;object-fit:contain!important;margin:auto!important}
}
@media(max-width:1023px){header nav>div:nth-of-type(1){display:none!important}header nav>div:last-child>a{display:none!important}header nav>div:last-child>button{display:flex!important;align-items:center!important;justify-content:center!important;width:44px!important;height:44px!important;flex:0 0 44px!important}main{width:100%!important;max-width:100%!important;overflow-x:hidden!important}}
@media(max-width:767px){header nav{min-height:68px!important;padding-left:12px!important;padding-right:12px!important}header nav>div:last-child>button{width:42px!important;height:42px!important;flex-basis:42px!important}body>div.fixed.inset-0,body>div[class*='fixed'][class*='inset-0']{padding:72px 10px 16px!important}}
</style>`;
  const seo = '<link rel="canonical" href="https://haseenullah.vercel.app/"/><meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"/><meta property="og:url" content="https://haseenullah.vercel.app/"/><meta property="og:site_name" content="Haseen Ullah"/><meta property="og:type" content="profile"/><meta name="twitter:url" content="https://haseenullah.vercel.app/"/>' + fixes;
  const jsonLd = '<script type="application/ld+json">' + JSON.stringify({"@context":"https://schema.org","@type":"ProfilePage","@id":"https://haseenullah.vercel.app/#profilepage","url":"https://haseenullah.vercel.app/","name":title,"mainEntity":{"@type":"Person","@id":"https://haseenullah.vercel.app/#person","name":"Haseen Ullah","jobTitle":"HSE Officer","url":"https://haseenullah.vercel.app/","email":"malikhaseen456@gmail.com","telephone":"+966 534 023 691","address":{"@type":"PostalAddress","addressLocality":"Al Wajh","addressRegion":"Tabuk","addressCountry":"SA"},"sameAs":["https://www.linkedin.com/in/haseen-ullah-hse"]}}) + '</script>';
  return html.replace("<head>", `<head>${seo}${jsonLd}`).replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`).replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${description}">`).replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${title}">`).replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${description}">`).replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${title}">`).replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${description}">`);
}

const landingPages: Record<string,string> = {"/about":aboutHtml,"/about/":aboutHtml,"/experience":experienceHtml,"/experience/":experienceHtml,"/certifications":certificationsHtml,"/certifications/":certificationsHtml,"/contact":contactHtml,"/contact/":contactHtml};

export default { async fetch(request: Request, env: unknown, ctx: unknown) {
  try {
    const url = new URL(request.url);
    if (url.pathname === "/" || url.pathname === "/index.html") {
      const siteHtml = await import("../public/site/index.html?raw");
      const favicon = '<link rel="icon" type="image/svg+xml" href="/hse-favicon.svg?v=5"/><link rel="shortcut icon" type="image/svg+xml" href="/hse-favicon.svg?v=5"/><link rel="apple-touch-icon" href="/hse-favicon.svg?v=5"/>';
      const html = injectHomepageSeo(siteHtml.default.replace("<head>", `<head>${favicon}`));
      return new Response(html,{headers:{"content-type":"text/html; charset=utf-8","cache-control":"no-store, max-age=0"}});
    }
    if (landingPages[url.pathname]) return new Response(landingPages[url.pathname],{headers:{"content-type":"text/html; charset=utf-8"}});
    const handler = await getServerEntry();
    return await normalizeResponse(await handler.fetch(request,env,ctx));
  } catch (error) {
    console.error(error);
    return new Response(renderErrorPage(),{status:500,headers:{"content-type":"text/html; charset=utf-8"}});
  }
}};
