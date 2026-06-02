import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  Github,
  Sparkles,
  FolderTree,
  Workflow,
  PlayCircle,
  FileCheck,
  X,
  ChevronRight,
  Terminal,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Smartphone,
  Brain,
} from 'lucide-react';

const projects = [
  {
    title: 'Singer BD Automation Framework',
    description:
      'Production-grade Playwright & TypeScript framework for Singer Bangladesh. Features POM architecture, API-driven data factories, and automated A11y/Visual regression layers.',
    tech: ['Playwright', 'TypeScript', 'Allure', 'GitHub Actions'],
    icon: <ShieldCheck className="text-blue-600" size={24} />,
    github: 'https://github.com/atiarmridul/Singer-Bangladesh-Website-Automation',
    demo: 'https://www.singerbd.com/',
    type: 'Enterprise Framework',
    language: 'TypeScript',
    preview: {
      structure: [
        'Singer-BD-Automation/',
        '  ├── src/ (POM & API Agents)',
        '  ├── tests-ts/ (Sanity/Visual/A11y)',
        '  ├── ai/ (JSON Definitions)',
        '  └── docs/ (Architecture Standards)',
      ],
      workflow: 'API Data → POM Interaction → Multi-Layer Assert → Allure Report',
      execution: '$ npm run test:sanity && npm run test:visual',
      report: '100% Type Safe | Self-Healing Active | Allure Integrated',
    },
  },
  {
    title: 'AI Playwright Test Generator',
    description:
      'Automated crawling and DOM extraction engine that uses OpenAI to generate functional Playwright test scripts from live webpages.',
    tech: ['OpenAI', 'Playwright', 'Cheerio', 'Node.js'],
    icon: <Brain className="text-pink-500" size={24} />,
    github: 'https://github.com/atiarmridul/AI-PLAYWRIGHT-TEST-GENERATOR',
    demo: 'https://github.com/atiarmridul/AI-PLAYWRIGHT-TEST-GENERATOR',
    type: 'AI Generation',
    language: 'JavaScript',
    preview: {
      structure: [
        'AI-Test-Generator/',
        '  ├── generator/ (LLM Logic)',
        '  ├── tests/generated/ (Specs)',
        '  └── runGenerator.js (CLI)',
      ],
      workflow: 'URL → Crawl → DOM Extraction → OpenAI → Playwright Spec',
      execution: '$ node runGenerator.js --url "https://example.com"',
      report: 'Confidence Score 0.95 | Valid Scaffolding | Ready to Run',
    },
  },
  {
    title: 'Chaldal Android Automation',
    description:
      'End-to-end UI automation for the Chaldal mobile app using a scalable Page Object Model (POM) architecture. Validates critical user journeys on Android devices.',
    tech: ['Appium 2', 'WebdriverIO', 'Mocha', 'Allure'],
    icon: <Smartphone className="text-purple-500" size={24} />,
    github: 'https://github.com/atiarmridul/Chaldal-Android-Automation',
    demo: 'https://github.com/atiarmridul/Chaldal-Android-Automation',
    type: 'Mobile Automation',
    language: 'JavaScript',
    preview: {
      structure: [
        'Chaldal-Android-Automation/',
        '  ├── test/specs (Test Logic)',
        '  ├── test/screenobjects (POM)',
        '  └── allure-results/ (Artifacts)',
      ],
      workflow: 'Appium → Driver Init → POM Screen → User Flow → Allure',
      execution: '$ npm run wdio',
      report: 'Tests Passed | Android Verified | Allure Ready',
    },
  },
];

const ArchitecturePreview = ({
  project,
  onClose,
}: {
  project: (typeof projects)[0];
  onClose: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/75 p-2 backdrop-blur-md md:p-6"
      onClick={onClose}
    >
      <motion.div
        className="flex max-h-[95vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl md:max-h-[90vh] md:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 p-4 md:p-6">
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="p-2 bg-white rounded-xl shadow-sm">{project.icon}</div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-tight">{project.title}</h3>
              <p className="text-xs md:text-sm text-slate-500">Architecture Preview</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close architecture preview"
            className="rounded-full p-2 transition-colors hover:bg-slate-200"
          >
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        {/* Modal content can exceed mobile height, so only the body scrolls while actions stay reachable. */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-6 md:space-y-8">
              <section>
                <div className="flex items-center space-x-2 text-blue-600 mb-3 md:mb-4">
                  <FolderTree size={18} />
                  <h4 className="font-bold uppercase text-[10px] md:text-xs tracking-widest">
                    Project Structure
                  </h4>
                </div>
                <div className="bg-slate-900 rounded-xl p-3 md:p-4 font-mono text-[11px] md:text-sm text-blue-300 leading-relaxed shadow-inner overflow-x-auto whitespace-pre">
                  {project.preview.structure.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </section>

              <section>
                <div className="flex items-center space-x-2 text-purple-600 mb-3 md:mb-4">
                  <Workflow size={18} />
                  <h4 className="font-bold uppercase text-[10px] md:text-xs tracking-widest">
                    Logic Workflow
                  </h4>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 md:gap-2 text-[11px] md:text-sm text-slate-700 bg-slate-50 p-3 md:p-4 rounded-xl border border-slate-100">
                  {project.preview.workflow.split(' → ').map((step, i, arr) => (
                    <div key={i} className="flex items-center">
                      <span className="font-semibold bg-white px-1.5 md:px-2 py-0.5 md:py-1 rounded border shadow-sm whitespace-nowrap">
                        {step}
                      </span>
                      {i < arr.length - 1 && <ChevronRight size={14} className="mx-0.5 text-slate-400" />}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-6 md:space-y-8">
              <section>
                <div className="flex items-center space-x-2 text-emerald-600 mb-3 md:mb-4">
                  <PlayCircle size={18} />
                  <h4 className="font-bold uppercase text-[10px] md:text-xs tracking-widest">
                    Execution Log
                  </h4>
                </div>
                <div className="bg-slate-800 rounded-xl p-3 md:p-4 font-mono text-[11px] md:text-sm shadow-inner relative overflow-hidden group">
                  <div className="flex items-center space-x-2 text-slate-400 mb-2 border-b border-slate-700 pb-2">
                    <Terminal size={14} />
                    <span className="text-[9px] md:text-[10px]">bash — 80x24</span>
                  </div>
                  <div className="text-emerald-400 break-all">
                    <span className="text-slate-500 mr-2">$</span>
                    {project.preview.execution}
                  </div>
                  <div className="text-slate-300 mt-2 opacity-80">
                    {'>'} Loading test configuration...
                    <br />
                    {'>'} Launching instances...
                    <br />
                    <span className="text-emerald-500">{'>'} All suites executed successfully.</span>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center space-x-2 text-amber-600 mb-3 md:mb-4">
                  <FileCheck size={18} />
                  <h4 className="font-bold uppercase text-[10px] md:text-xs tracking-widest">
                    Real-time Report
                  </h4>
                </div>
                <div className="flex flex-col gap-5 rounded-2xl border border-slate-100 bg-white p-4 shadow-lg md:p-6">
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <div className="p-2 md:p-3 bg-emerald-50 rounded-full">
                      <CheckCircle2 className="text-emerald-500" size={24} />
                    </div>
                    <div>
                      <div className="text-lg md:text-2xl font-black text-slate-900 leading-none mb-1">
                        Pass Rate
                      </div>
                      <div className="text-[10px] md:text-sm font-bold text-emerald-600">
                        Enterprise Grade
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      Status
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.preview.report.split(' | ').map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] font-black text-emerald-700"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6 bg-slate-50 border-t border-slate-100 flex justify-end space-x-3 md:space-x-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-4 md:px-6 py-2 md:py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm md:text-base hover:bg-slate-800 transition-colors shadow-lg"
          >
            <Github size={18} />
            <span>GitHub Repository</span>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);

  useEffect(() => {
    if (!selectedProject) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedProject]);

  return (
    <section
      id="projects"
      data-testid="section-projects"
      className="relative overflow-hidden bg-slate-50 py-24"
    >
      <AnimatePresence>
        {selectedProject && (
          <ArchitecturePreview project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-kicker"
          >
            <Zap size={20} />
            <span>AI Automation Showcase</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Featured Projects
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-copy mx-auto max-w-2xl"
          >
            A collection of production-grade automation frameworks and AI-driven testing tools designed for
            scalability and precision.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <article key={index} className="premium-card premium-card-hover group flex h-full flex-col p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-blue-50 transition-colors duration-300">
                  {project.icon}
                </div>
                <div className="flex space-x-3 text-slate-400">
                  <a
                    href={project.github}
                    className="hover:text-slate-900 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>

              <div className="mb-4 flex-1">
                {/* Fixed content height aligns preview buttons across cards with uneven descriptions. */}
                <div className="lg:min-h-[190px]">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2 block">
                    {project.type}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{project.description}</p>
                </div>

                <button
                  onClick={() => setSelectedProject(project)}
                  className="mt-6 mb-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-cyan-100 bg-cyan-50/70 py-3 text-xs font-black uppercase tracking-widest text-cyan-700 transition-all hover:border-cyan-600 hover:bg-cyan-600 hover:text-white lg:mt-0"
                >
                  <Workflow size={14} />
                  <span>Architecture Preview</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-[10px] font-bold uppercase tracking-wide"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-auto">
                <div className="flex items-center space-x-4 text-slate-500 text-xs">
                  <div className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${
                        project.language === 'TypeScript' ? 'bg-blue-500' : 'bg-yellow-400'
                      }`}
                    />
                    <span>{project.language}</span>
                  </div>
                  <div className="flex items-center">
                    <Sparkles size={14} className="mr-1 text-amber-500" />
                    <span>Production Ready</span>
                  </div>
                </div>

                <motion.a
                  href={project.github}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  View Repo <Github size={14} className="ml-1" />
                </motion.a>
              </div>
            </article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <a
            href="https://github.com/atiarmridul"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 rounded-full bg-slate-950 px-8 py-4 text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-slate-200"
          >
            <Github size={20} />
            <span className="font-semibold">Explore More on GitHub</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
