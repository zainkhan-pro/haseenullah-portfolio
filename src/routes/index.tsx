import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Haseen Ullah — NEBOSH Certified Safety Officer" },
      {
        name: "description",
        content:
          "HSE professional committed to protecting people and strengthening operations — hazard identification, risk assessment and a safety-first culture on every site.",
      },
      { property: "og:title", content: "Haseen Ullah — NEBOSH Certified Safety Officer" },
      {
        property: "og:description",
        content:
          "Health, Safety & Environment professional available for Safety Officer and HSE compliance roles.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <iframe
      src="/site/index.html"
      title="Haseen Ullah — NEBOSH Certified Safety Officer"
      className="block h-screen w-screen border-0"
    />
  );
}
