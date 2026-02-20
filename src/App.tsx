import React, { useState, useMemo } from "react"
import SkillGraph from "./components/SkillGraph"
import {
  EXPERIENCES,
  CERTIFICATIONS,
  EDUCATIONS,
  SKILLS_LIST,
  GRAPH_DATA
} from "./constants"

const App = () => {
  const [activeNodeId, setActiveNodeId] = useState(null)

  const filteredExperiences = useMemo(() => {
    let list = EXPERIENCES
    if (activeNodeId) {
      if (SKILLS_LIST.includes(activeNodeId)) {
        list = list.filter(e => e.skills.includes(activeNodeId))
      } else {
        const expMatch = list.find(e => e.company === activeNodeId)
        list = expMatch ? [expMatch] : list
      }
    }
    return list
  }, [activeNodeId])

  const filteredCertifications = useMemo(() => {
    let list = CERTIFICATIONS
    if (activeNodeId) {
      if (SKILLS_LIST.includes(activeNodeId)) {
        list = list.filter(c => c.skills.includes(activeNodeId))
      } else {
        const certMatch = list.find(c => c.name === activeNodeId)
        list = certMatch ? [certMatch] : list
      }
    }
    return list
  }, [activeNodeId])

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                Adrian Peh
              </h1>
              <p className="text-slate-500 font-medium">
                Solutions Architect & Team Lead
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-slate-600">
              <a
                href="mailto:adrianpehzl@gmail.com"
                className="flex items-center gap-2 hover:text-blue-600 transition-colors"
              >
                <i className="fas fa-envelope text-blue-500"></i>{" "}
                adrianpehzl@gmail.com
              </a>
              <a
                href="tel:+6590117078"
                className="flex items-center gap-2 hover:text-blue-600 transition-colors"
              >
                <i className="fas fa-phone text-blue-500"></i> +65 9011 7078
              </a>
              <a
                href="https://linkedin.com/in/adrian-peh"
                target="_blank"
                className="flex items-center gap-2 hover:text-blue-600 transition-colors"
              >
                <i className="fab fa-linkedin text-blue-500"></i>{" "}
                linkedin.com/in/adrian-peh
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <i className="fas fa-user-circle text-blue-500"></i> Summary
          </h2>
          <p className="text-slate-600 leading-relaxed max-w-4xl">
            Experienced in client-facing operations and automation solutions
            across multiple industries. Skilled in Business Process
            Digitalization, Optimization, and Automation, with hands-on
            expertise in RPA, Power Platform, and software development. Proven
            ability to select and lead cross-functional teams, design end-to-end
            solutions, and support technical execution while driving stakeholder
            success.
          </p>
        </section>

        {/* Graph Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <i className="fas fa-project-diagram text-blue-500"></i> Career
              Ecosystem
            </h2>
            {activeNodeId && (
              <button
                onClick={() => setActiveNodeId(null)}
                className="text-xs font-bold text-red-500 hover:text-red-600 bg-red-50 px-3 py-2 rounded-full transition-all flex items-center gap-1"
              >
                <i className="fas fa-times-circle"></i> Clear Selection
              </button>
            )}
          </div>

          <SkillGraph
            activeNodeId={activeNodeId}
            onNodeClick={setActiveNodeId}
            data={GRAPH_DATA}
          />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 border-b pb-2 flex items-center justify-between">
                <span>Professional Experience</span>
                <span className="text-xs font-normal text-slate-400 uppercase tracking-widest">
                  {filteredExperiences.length} Roles
                </span>
              </h2>
              <div className="space-y-6">
                {filteredExperiences.map((exp, idx) => (
                  <div
                    key={idx}
                    className={`bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-all duration-300 ${
                      activeNodeId === exp.company
                        ? "ring-2 ring-blue-500 shadow-lg"
                        : ""
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          {exp.role}
                        </h3>
                        <p className="text-blue-600 font-semibold">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-sm text-slate-400 bg-slate-50 px-3 py-1 rounded-full font-medium">
                        {exp.period}
                      </span>
                    </div>
                    <ul className="space-y-3">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start gap-3 text-slate-600 text-sm"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {exp.skills.map(skill => (
                        <span
                          key={skill}
                          onClick={() => setActiveNodeId(skill)}
                          className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md transition-colors cursor-pointer ${
                            activeNodeId === skill
                              ? "bg-blue-600 text-white shadow-md"
                              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-b pb-2">
                Certifications
              </h2>
              <div className="space-y-3">
                {filteredCertifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className={`bg-white p-4 rounded-xl border border-slate-200 shadow-sm transition-all duration-300 ${
                      activeNodeId === cert.name
                        ? "ring-2 ring-emerald-500 shadow-md"
                        : ""
                    }`}
                  >
                    <h4 className="font-bold text-sm text-slate-900 leading-snug">
                      {cert.name}
                    </h4>
                    <p className="text-xs text-slate-500 mb-2">{cert.issuer}</p>
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.map(s => (
                        <span
                          key={s}
                          onClick={() => setActiveNodeId(s)}
                          className={`text-[9px] px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                            activeNodeId === s
                              ? "bg-blue-600 text-white"
                              : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                          }`}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-b pb-2">
                Education
              </h2>
              <div className="space-y-4">
                {EDUCATIONS.map((edu, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm"
                  >
                    <p className="text-xs text-blue-600 font-bold mb-1">
                      {edu.period}
                    </p>
                    <h4 className="font-bold text-sm text-slate-900">
                      {edu.degree}
                    </h4>
                    <p className="text-xs text-slate-500">{edu.school}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-slate-900/90 backdrop-blur-sm text-white text-xs px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-3 border border-slate-700">
          <i className="fas fa-info-circle text-blue-400"></i>
          Explore Adrian's expertise by interacting with the graph
        </div>
      </div>
    </div>
  )
}

export default App
