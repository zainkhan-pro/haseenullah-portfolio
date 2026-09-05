const siteUrl = import.meta.env.VITE_SITE_URL || "https://haseenullah.vercel.app";

export function StructuredData() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: "Haseen Ullah",
    jobTitle: "HSE Officer / Safety Professional",
    description:
      "HSE Officer and Safety Professional with 5+ years of field experience across construction, infrastructure and energy projects in Saudi Arabia and Pakistan.",
    url: siteUrl,
    image: `${siteUrl}/og-image.svg`,
    email: "mailto:malikhaseen456@gmail.com",
    telephone: "+966 534 023 691",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Al Wajh",
      addressRegion: "Tabuk",
      addressCountry: "SA",
    },
    knowsAbout: [
      "Occupational Health and Safety",
      "HSE Compliance",
      "Risk Assessment",
      "Hazard Identification",
      "HIRA",
      "Permit to Work",
      "Toolbox Talks",
      "Workplace Safety",
      "Incident Investigation",
    ],
    sameAs: ["https://www.linkedin.com/in/haseen-ullah-hse"],
  };

  const profilePage = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteUrl}/#profilepage`,
    name: "Haseen Ullah | HSE Officer in Saudi Arabia",
    description:
      "Professional HSE portfolio of Haseen Ullah, an HSE Officer and Safety Professional in Saudi Arabia.",
    url: siteUrl,
    mainEntity: { "@id": `${siteUrl}/#person` },
    inLanguage: "en",
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "Haseen Ullah | HSE Officer in Saudi Arabia",
    url: siteUrl,
    description: "Professional HSE and Safety Officer portfolio for Haseen Ullah.",
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
