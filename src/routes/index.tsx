import { createFileRoute } from "@tanstack/react-router";
import { StructuredData } from "../components/StructuredData";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Haseen Ullah | HSE Officer in Saudi Arabia | Safety & HSE Professional" },
      {
        name: "description",
        content:
          "Haseen Ullah is an HSE Officer in Saudi Arabia with 5+ years of field experience across construction, infrastructure and energy projects, specializing in workplace safety, risk assessment, HIRA, Permit to Work and HSE compliance.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <StructuredData />
      <main id="top" className="min-h-screen">
        <section className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-24">
          <div className="max-w-4xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
              HSE Officer • Saudi Arabia
            </p>
            <h1 className="text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl">
              Haseen Ullah
            </h1>
            <p className="mt-5 text-2xl font-semibold text-slate-700 sm:text-3xl">
              HSE Officer / Safety Professional
            </p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Safety professional with 5+ years of field experience across construction,
              infrastructure and energy projects in Saudi Arabia and Pakistan, focused on
              practical risk control, HSE compliance and safer worksites.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#experience" className="rounded-md bg-slate-950 px-5 py-3 font-semibold text-white">View Experience</a>
              <a href="#certifications" className="rounded-md border border-slate-300 px-5 py-3 font-semibold text-slate-900">Certifications</a>
              <a href="https://www.linkedin.com/in/haseen-ullah-hse" target="_blank" rel="noreferrer" className="rounded-md border border-slate-300 px-5 py-3 font-semibold text-slate-900">LinkedIn</a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
