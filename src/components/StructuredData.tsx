const siteUrl = import.meta.env.VITE_SITE_URL || "https://haseenullah.vercel.app";

export function StructuredData() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}#person`,
    name: "Haseen Ullah",
    jobTitle: "HSE Officer / Safety Professional",
    url: siteUrl,
    email: "mailto:malikhaseen456@gmail.com",
    telephone: "+966 534 023 691",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Al Wajh",
      addressRegion: "Tabuk",
      addressCountry: "SA",
    },
    sameAs: ["https://www.linkedin.com/in/haseen-ullah-hse"],
  };

  const profilePage = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "Haseen Ullah | HSE Officer in Saudi Arabia",
    url: siteUrl,
    mainEntity: { "@id": `${siteUrl}#person` },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    name: "Haseen Ullah | HSE Officer in Saudi Arabia",
    url: siteUrl,
    inLanguage: "en",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
    </>
  );
}
