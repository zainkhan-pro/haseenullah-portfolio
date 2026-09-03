import { profile } from "../data/profile";

export function PortfolioSections() {
  return (
    <>
      <section id="about" className="border-t border-slate-200 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Professional Snapshot</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-950">HSE Officer focused on practical risk control</h2>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-600">{profile.summary} My work focuses on hazard identification, risk assessment, field inspections, safe systems of work, emergency preparedness and clear HSE communication.</p>
        </div>
      </section>

      <section id="expertise" className="border-t border-slate-200 bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">HSE Expertise</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-950">Safety and HSE capabilities</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {profile.expertise.map((skill) => <span key={skill} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">{skill}</span>)}
          </div>
        </div>
      </section>

      <section id="experience" className="border-t border-slate-200 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Professional Experience</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-950">HSE experience in Saudi Arabia and Pakistan</h2>
          <div className="mt-10 space-y-8">
            {profile.experience.map((job) => (
              <article key={`${job.company}-${job.period}`} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-950">{job.role}</h3>
                <p className="mt-1 font-semibold text-slate-700">{job.company}</p>
                <p className="mt-2 text-sm text-slate-500">{job.period} · {job.location}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="certifications" className="border-t border-slate-200 bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Certifications</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-950">Professional safety certifications</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {profile.certifications.map((cert) => <div key={cert} className="rounded-xl border border-slate-200 bg-white p-5 font-semibold text-slate-800">{cert}</div>)}
          </div>
        </div>
      </section>

      <section id="education" className="border-t border-slate-200 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Education</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-950">Academic background</h2>
          <ul className="mt-8 space-y-4 text-slate-700">{profile.education.map((item) => <li key={item} className="rounded-xl border border-slate-200 p-5">{item}</li>)}</ul>
        </div>
      </section>

      <section id="contact" className="border-t border-slate-200 bg-slate-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">Contact</p>
          <h2 className="mt-2 text-3xl font-bold">Discuss an HSE opportunity</h2>
          <div className="mt-6 flex flex-col gap-3 text-slate-300">
            <a className="hover:text-white" href={`mailto:${profile.email}`}>{profile.email}</a>
            <a className="hover:text-white" href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a>
            <a className="hover:text-white" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn profile</a>
            <span>{profile.location}</span>
          </div>
        </div>
      </section>
    </>
  );
}
