import "./lib/error-capture";
import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import aboutHtml from "../public/site/about.html?raw";
import experienceHtml from "../public/site/experience.html?raw";
import certificationsHtml from "../public/site/certifications.html?raw";
import contactHtml from "../public/site/contact.html?raw";

type ServerEntry = { fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response };
let serverEntryPromise: Promise<ServerEntry> | undefined;
async function getServerEntry(): Promise<ServerEntry> { if (!serverEntryPromise) serverEntryPromise = import("@tanstack/react-start/server-entry").then((m) => (m.default ?? m) as ServerEntry); return serverEntryPromise; }
function normalizeResponse(response: Response): Response | Promise<Response> {
  if (response.status < 500) return response;
  const type = response.headers.get("content-type") ?? "";
  if (!type.includes("application/json")) return response;
  return response.clone().text().then((body) => { try { const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown }; if (payload.unhandled === true && payload.message === "HTTPError") { console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`)); return new Response(renderErrorPage(), { status: 500, headers: { "content-type": "text/html; charset=utf-8" } }); } } catch {} return response; });
}
function injectHomepageSeo(html: string): string {
  const title = "Haseen Ullah | HSE Officer | Saudi Arabia";
  const description = "Haseen Ullah is an HSE Officer and safety professional in Saudi Arabia with experience in construction, infrastructure and site safety.";
  const fixes = `
<style id="portfolio-final-fixes-v11">
html,body{overflow-x:hidden}
@media (min-width:1024px){
/* Exact original-style navbar proportions: keep the same fonts, only correct spacing and alignment. */
header nav{display:flex!important;align-items:center!important;gap:0!important}
header nav>a:first-child{flex:0 0 auto!important;display:flex!important;align-items:center!important}
header nav>div:nth-of-type(1){display:flex!important;align-items:center!important;justify-content:center!important;gap:38px!important;flex:1 1 auto!important;min-width:0!important;margin:0 26px!important}
header nav>div:nth-of-type(1) a{position:relative!important;display:inline-flex!important;align-items:center!important;white-space:nowrap!important;flex:0 0 auto!important;padding-bottom:0!important;line-height:1.2!important}
header nav>div:nth-of-type(1) a:hover,header nav>div:nth-of-type(1) a.is-active{color:#facc15!important;text-shadow:0 0 14px rgba(250,204,21,.28)!important}
header nav>div:nth-of-type(1) a.is-active:after{content:''!important;position:absolute!important;left:0!important;right:0!important;bottom:-10px!important;top:auto!important;height:2px!important;border-radius:999px!important;background:#facc15!important;box-shadow:0 0 10px rgba(250,204,21,.4)!important}
header nav>div:last-child{flex:0 0 auto!important;display:flex!important;align-items:center!important}
header nav>div:last-child>a{white-space:nowrap!important}
main section[id]{scroll-margin-top:88px!important}
main section#contact{min-height:auto!important;box-sizing:border-box!important;padding-top:28px!important;padding-bottom:72px!important;display:block!important}
main section#contact>.relative{width:100%!important}
main section#contact>.relative>.grid{display:grid!important;grid-template-columns:1fr!important;align-items:start!important;gap:50px!important}
main section#contact>.relative>.grid>div:first-child{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:20px!important;align-items:stretch!important}
main section#contact>.relative>.grid>div:first-child>.reveal{width:100%!important;min-width:0!important;order:initial!important}
main section#contact>.relative>.grid>div:last-child{width:100%!important;max-width:none!important;align-self:stretch!important}
main section#contact>.relative>.grid>div:last-child>*{width:100%!important;max-width:none!important}
main section#contact a[href^='mailto:'],main section#contact a[href^='mailto:'] *{white-space:nowrap!important;word-break:normal!important;overflow-wrap:normal!important}
}
@media(max-width:1300px) and (min-width:1024px){header nav>div:nth-of-type(1){gap:28px!important;margin:0 18px!important}header nav>div:nth-of-type(1) a{font-size:clamp(11px,1vw,14px)!important}header nav>a:first-child{transform:scale(.94);transform-origin:left center}header nav>div:last-child>a{padding-left:20px!important;padding-right:20px!important}}
@media(max-width:1023px){
main section#contact{padding-top:24px!important;padding-bottom:48px!important}
main section#contact>.relative>.grid{display:grid!important;grid-template-columns:1fr!important;gap:28px!important}
main section#contact>.relative>.grid>div:first-child{display:grid!important;grid-template-columns:1fr!important;gap:14px!important}
header nav>div:nth-of-type(1){display:none!important}
header nav>div:last-child>a{display:none!important}
header nav>div:last-child>button{display:flex!important;align-items:center!important;justify-content:center!important;width:44px!important;height:44px!important;flex:0 0 44px!important}
main{width:100%!important;max-width:100%!important;overflow-x:hidden!important}
}
@media(max-width:767px){header nav{min-height:68px!important;padding-left:12px!important;padding-right:12px!important}header nav>div:last-child>button{width:42px!important;height:42px!important;flex-basis:42px!important}main section#contact>.relative>.grid{gap:22px!important}body>div.fixed.inset-0,body>div[class*='fixed'][class*='inset-0']{padding:72px 10px 16px!important}}
body>div.fixed.inset-0,body>div[class*='fixed'][class*='inset-0']{overflow:auto!important;box-sizing:border-box!important;padding:78px 16px 24px!important}
body>div.fixed.inset-0 img,body>div[class*='fixed'][class*='inset-0'] img{max-width:min(100%,1100px)!important;max-height:calc(100vh - 110px)!important;width:auto!important;height:auto!important;object-fit:contain!important;margin:auto!important}
</style>
<script>
(function(){var ids=['profile','certification','certificates','competencies','fieldkit','education'],started=false;function links(){var n=document.querySelector('header nav');if(!n)return[];return Array.prototype.slice.call(n.querySelectorAll('a[href^="#"]')).filter(function(a){return ids.indexOf((a.getAttribute('href')||'').slice(1))!==-1})}function activate(id){links().forEach(function(a){var on=(a.getAttribute('href')||'').slice(1)===id;a.classList.toggle('is-active',on);if(on)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')})}function scrollTo(id,smooth){var t=document.getElementById(id);if(!t)return false;activate(id);window.scrollTo({top:Math.max(0,t.getBoundingClientRect().top+window.pageYOffset-88),behavior:smooth?'smooth':'auto'});return true}function update(){var best='profile',distance=Infinity;ids.forEach(function(id){var s=document.getElementById(id);if(!s)return;var top=s.getBoundingClientRect().top;if(top<=180){var d=Math.abs(top-100);if(d<distance){distance=d;best=id}}});activate(best)}function setup(){if(started||!document.querySelector('header nav'))return;started=true;document.addEventListener('click',function(e){var el=e.target;if(!el||!el.closest)return;var a=el.closest('header nav a[href^="#"]');if(!a)return;var id=(a.getAttribute('href')||'').slice(1);if(ids.indexOf(id)===-1||!document.getElementById(id))return;e.preventDefault();scrollTo(id,true);try{history.replaceState(null,'','#'+id)}catch(_e){}},true);var hash=(window.location.hash||'').slice(1);if(ids.indexOf(hash)!==-1&&document.getElementById(hash))scrollTo(hash,false);else activate('profile');window.addEventListener('scroll',update,{passive:true});window.addEventListener('hashchange',function(){var id=(window.location.hash||'').slice(1);if(ids.indexOf(id)!==-1)scrollTo(id,true)});update()}function boot(){setup();if(!started)setTimeout(boot,100)}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();window.addEventListener('load',boot)})();
</script>`;
  const seo = '<link rel="canonical" href="https://haseenullah.vercel.app/"/><meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"/><meta property="og:url" content="https://haseenullah.vercel.app/"/><meta property="og:site_name" content="Haseen Ullah"/><meta property="og:type" content="profile"/><meta name="twitter:url" content="https://haseenullah.vercel.app/"/>' + fixes;
  const jsonLd = '<script type="application/ld+json">' + JSON.stringify({"@context":"https://schema.org","@type":"ProfilePage","@id":"https://haseenullah.vercel.app/#profilepage","url":"https://haseenullah.vercel.app/","name":title,"mainEntity":{"@type":"Person","@id":"https://haseenullah.vercel.app/#person","name":"Haseen Ullah","jobTitle":"HSE Officer","url":"https://haseenullah.vercel.app/","email":"malikhaseen456@gmail.com","telephone":"+966 534 023 691","address":{"@type":"PostalAddress","addressLocality":"Al Wajh","addressRegion":"Tabuk","addressCountry":"SA"},"sameAs":["https://www.linkedin.com/in/haseen-ullah-hse"]}}) + '</script>';
  return html.replace("<head>", `<head>${seo}${jsonLd}`).replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`).replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${description}">`).replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${title}">`).replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${description}">`).replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${title}">`).replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${description}">`);
}
const landingPages: Record<string,string> = {"/about":aboutHtml,"/about/":aboutHtml,"/experience":experienceHtml,"/experience/":experienceHtml,"/certifications":certificationsHtml,"/certifications/":certificationsHtml,"/contact":contactHtml,"/contact/":contactHtml};
export default { async fetch(request: Request, env: unknown, ctx: unknown) { try { const url = new URL(request.url); if (url.pathname === "/" || url.pathname === "/index.html") { const siteHtml = await import("../public/site/index.html?raw"); const favicon = '<link rel="icon" type="image/svg+xml" href="/hse-favicon.svg?v=5"/><link rel="shortcut icon" type="image/svg+xml" href="/hse-favicon.svg?v=5"/><link rel="apple-touch-icon" href="/hse-favicon.svg?v=5"/>'; const html = injectHomepageSeo(siteHtml.default.replace("<head>", `<head>${favicon}`)); return new Response(html,{headers:{"content-type":"text/html; charset=utf-8","cache-control":"no-store, max-age=0"}}); } if (landingPages[url.pathname]) return new Response(landingPages[url.pathname],{headers:{"content-type":"text/html; charset=utf-8"}}); const handler = await getServerEntry(); return await normalizeResponse(await handler.fetch(request,env,ctx)); } catch (error) { console.error(error); return new Response(renderErrorPage(),{status:500,headers:{"content-type":"text/html; charset=utf-8"}}); } }};