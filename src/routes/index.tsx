import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

const experiences = [
  {
    role: "HSE Officer",
    company: "FCC Saudi Arabia — Fatayerji Contracting Co. Ltd.",
    period: "May 2024 – May 2026",
    location: "Amaala, Red Sea, Saudi Arabia",
    points: ["Supported 120+ workers across 6+ high-risk activities.", "Conducted hazard identification, risk assessment, inspections and corrective-action follow-up.", "Reviewed RAMS and JSA, managed PTW requirements, toolbox talks and inductions.", "Supported incident and near-miss investigations, root-cause analysis and CAPA."]
  },
  {
    role: "Safety Officer",
    company: "SGEC–MAQBOOL–CALSONS (JV)",
    period: "March 2022 – April 2024",
    location: "Pakistan urban infrastructure megaproject",
    points: ["Maintained a zero-LTI record over 24 consecutive months.", "Trained 500+ workers through inductions, toolbox talks and safety briefings.", "Managed HIRA and controls for confined space, work at height, heavy plant and manual handling.", "Supported PTW, hot work, electrical isolation and emergency planning, including quarterly drills."]
  },
  {
    role: "Fire Safety Officer — HSE Department",
    company: "Daman Engineering & Services",
    period: "January 2021 – February 2022",
    location: "Islamabad, Pakistan",
    points: ["Performed fire hazard inspections and fire risk assessments.", "Supported emergency plans, drills, firefighting equipment checks and safety training.", "Investigated incidents and near misses and supported RCA and CAPA.", "Maintained fire-safety records and supported NFPA and OSHA fire-safety practices."]
  }
];

const skills = ["HSE Management Systems", "HSE Compliance", "Hazard Identification", "Risk Assessment & HIRA", "JSA & RAMS Review", "Permit to Work", "Work at Height", "Lifting & Excavation", "Hot Work", "Electrical Safety", "Confined Space", "Manual Handling", "Heavy Plant", "Safety Inspections", "Corrective Actions", "Emergency Response", "Incident & Near-Miss Investigation", "Root Cause & CAPA", "Fire Safety", "Toolbox Talks & Inductions"];
const certifications = ["NEBOSH IGC", "IOSH Managing Safely", "OSHA 48 Hours", "First Aid", "Fire Safety", "Risk Assessment"];
const focus = ["Work at Height", "Lifting Operations", "Excavation", "Hot Work", "Electrical Safety", "Confined Space", "Emergency Response", "Fire Safety"];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Haseen Ullah | HSE Officer in Saudi Arabia | Safety & HSE Professional" },
      { name: "description", content: "Haseen Ullah is an HSE Officer in Saudi Arabia with 5+ years of field experience across construction, infrastructure and energy projects." },
      { property: "og:title", content: "Haseen Ullah | HSE Officer in Saudi Arabia" },
      { property: "og:description", content: "Safety and HSE professional specializing in risk assessment, HIRA, Permit to Work and workplace safety." },
    ],
  }),
  component: Index,
});

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return <div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-600">{eyebrow}</p><h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">{title}</h2>{text && <p className="mt-4 leading-7 text-slate-600">{text}</p>}</div>;
}

function Index() {
  const [menu, setMenu] = useState(false);
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8" aria-label="Primary navigation">
          <a href="#top" className="font-bold tracking-tight text-slate-950">HASEEN <span className="text-amber-600">ULLAH</span></a>
          <button className="rounded-md border px-3 py-2 text-sm md:hidden" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label="Toggle navigation">Menu</button>
          <div className={`${menu ? "flex" : "hidden"} absolute left-0 top-full w-full flex-col border-b bg-white p-5 md:static md:flex md:w-auto md:flex-row md:border-0 md:bg-transparent md:p-0`}>
            {[["About", "about"], ["Expertise", "expertise"], ["Experience", "experience"], ["Certifications", "certifications"], ["Contact", "contact"]].map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)} className="px-3 py-2 text-sm font-semibold text-slate-600 hover:text-slate-950">{label}</a>)}
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="bg-slate-950 text-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1.3fr_.7fr] lg:px-8 lg:py-28">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">HSE Officer · Saudi Arabia</p>
              <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-tight md:text-7xl">Haseen Ullah</h1>
              <p className="mt-5 max-w-3xl text-xl font-semibold text-slate-200 md:text-2xl">Safety-focused HSE professional supporting safer people, stronger compliance and controlled high-risk work.</p>
              <p className="mt-6 max-w-2xl leading-7 text-slate-400">5+ years of field experience across construction, infrastructure and energy project environments in Saudi Arabia and Pakistan.</p>
              <div className="mt-9 flex flex-wrap gap-3"><a href="#experience" className="rounded-md bg-amber-500 px-6 py-3 font-bold text-slate-950 hover:bg-amber-400">View experience</a><a href="mailto:malikhaseen456@gmail.com" className="rounded-md border border-slate-600 px-6 py-3 font-bold text-white hover:bg-slate-900">Contact me</a><a href="https://www.linkedin.com/in/haseen-ullah-hse" target="_blank" rel="noreferrer" className="rounded-md border border-slate-600 px-6 py-3 font-bold text-white hover:bg-slate-900">LinkedIn</a></div>
            </div>
            <aside className="self-end rounded-2xl border border-slate-800 bg-slate-900 p-7"><p className="text-sm font-bold uppercase tracking-widest text-slate-400">Professional snapshot</p><div className="mt-7 grid grid-cols-2 gap-6"><div><strong className="text-4xl text-white">5+</strong><p className="mt-1 text-sm text-slate-400">Years field experience</p></div><div><strong className="text-4xl text-white">120+</strong><p className="mt-1 text-sm text-slate-400">Workers supported</p></div><div><strong className="text-4xl text-white">500+</strong><p className="mt-1 text-sm text-slate-400">Workers trained</p></div><div><strong className="text-4xl text-white">24</strong><p className="mt-1 text-sm text-slate-400">Months zero-LTI record</p></div></div></aside>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><SectionTitle eyebrow="About" title="Practical HSE leadership in the field" text="Haseen Ullah is an HSE Officer based in Al Wajh, Tabuk, Saudi Arabia. His experience includes field inspections, hazard identification, risk assessment, Permit to Work, safety training, emergency preparedness and incident investigation across demanding project environments."/><div className="mt-10 grid gap-5 md:grid-cols-3"><div className="rounded-xl border bg-white p-6"><h3 className="font-bold">Compliance</h3><p className="mt-2 text-sm leading-6 text-slate-600">HSE inspections, documentation, corrective actions and safe-work controls.</p></div><div className="rounded-xl border bg-white p-6"><h3 className="font-bold">Risk control</h3><p className="mt-2 text-sm leading-6 text-slate-600">HIRA, JSA, RAMS review and control of high-risk activities.</p></div><div className="rounded-xl border bg-white p-6"><h3 className="font-bold">People</h3><p className="mt-2 text-sm leading-6 text-slate-600">Inductions, toolbox talks, multilingual communication and safety culture.</p></div></div></section>

        <section id="expertise" className="border-y bg-white"><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><SectionTitle eyebrow="HSE Expertise" title="Core safety competencies" text="Focused on practical risk reduction, field compliance and workforce engagement."/><div className="mt-10 flex flex-wrap gap-3">{skills.map(skill => <span key={skill} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">{skill}</span>)}</div></div></section>

        <section id="experience" className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><SectionTitle eyebrow="Professional Experience" title="Field experience across Saudi Arabia and Pakistan"/><div className="mt-10 space-y-6">{experiences.map((job, i) => <article key={job.company} className="rounded-2xl border bg-white p-7 shadow-sm"><div className="flex flex-col justify-between gap-3 md:flex-row"><div><p className="text-sm font-bold uppercase tracking-wider text-amber-600">0{i + 1}</p><h3 className="mt-1 text-2xl font-bold">{job.role}</h3><p className="mt-1 font-semibold text-slate-700">{job.company}</p></div><div className="text-sm text-slate-500 md:text-right"><p className="font-semibold text-slate-700">{job.period}</p><p className="mt-1">{job.location}</p></div></div><ul className="mt-6 grid gap-3 md:grid-cols-2">{job.points.map(point => <li key={point} className="flex gap-3 text-sm leading-6 text-slate-600"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />{point}</li>)}</ul></article>)}</div></section>

        <section className="border-y bg-slate-950 text-white"><div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8"><div><SectionTitle eyebrow="Safety Focus Areas" title="High-risk work demands disciplined controls" text="Experience includes work at height, lifting, excavation, hot work, electrical safety, confined space, manual handling, heavy plant and emergency response."/></div><div className="grid grid-cols-2 gap-3">{focus.map(item => <div key={item} className="rounded-xl border border-slate-800 bg-slate-900 p-5 font-semibold">{item}</div>)}</div></div></section>

        <section id="certifications" className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><SectionTitle eyebrow="Credentials" title="Certifications & education"/><div className="mt-10 grid gap-6 md:grid-cols-2"><div className="rounded-2xl border bg-white p-7"><h3 className="text-xl font-bold">Certifications</h3><div className="mt-5 grid gap-3">{certifications.map(c => <div key={c} className="rounded-lg bg-slate-50 p-4 font-semibold">{c}</div>)}</div></div><div className="rounded-2xl border bg-white p-7"><h3 className="text-xl font-bold">Education</h3><div className="mt-5 space-y-5"><div><p className="font-bold">BS English Literature and Linguistics</p><p className="text-sm text-slate-600">University of Peshawar · 2018–January 2022 · CGPA 3.49 / 79.46%</p></div><div><p className="font-bold">FSc Pre-Medical</p><p className="text-sm text-slate-600">Peshawar Model Degree College · 2016–April 2018 · 905/1100 · A1</p></div><div><p className="font-bold">Matric</p><p className="text-sm text-slate-600">Government Higher Secondary School Urmar Payan · 2014–March 2016 · 917/1100 · A1</p></div></div></div></div></section>

        <section id="contact" className="bg-slate-100"><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><SectionTitle eyebrow="Contact" title="Discuss an HSE opportunity" text="Available for Safety Officer and HSE opportunities in Saudi Arabia."/><div className="mt-8 grid gap-4 sm:grid-cols-3"><a className="rounded-xl border bg-white p-5 font-semibold hover:border-amber-400" href="mailto:malikhaseen456@gmail.com">malikhaseen456@gmail.com</a><a className="rounded-xl border bg-white p-5 font-semibold hover:border-amber-400" href="tel:+966534023691">+966 534 023 691</a><a className="rounded-xl border bg-white p-5 font-semibold hover:border-amber-400" href="https://www.linkedin.com/in/haseen-ullah-hse" target="_blank" rel="noreferrer">LinkedIn profile</a></div><p className="mt-5 text-sm text-slate-500">Location: Al Wajh, Tabuk, Saudi Arabia</p></div></section>
      </main>

      <footer className="border-t bg-white"><div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between lg:px-8"><p>© {new Date().getFullYear()} Haseen Ullah. HSE Officer & Safety Professional.</p><p>Saudi Arabia · HSE · Workplace Safety</p></div></footer>
    </div>
  );
}
