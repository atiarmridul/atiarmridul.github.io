import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
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
      report: '✅ 100% Type Safe | 🛡️ Self-Healing Active | 📊 Allure Integrated',
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
      report: 'Confidence Score: 0.95 | Valid Scaffolding | Ready to Run',
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
      report: '✅ Tests Passed | 📱 Android Verified | 📊 Allure Ready',
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
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-6 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        layoutId={`card-${project.title}`}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl md:rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden max-h-[95vh] md:max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="p-2 bg-white rounded-xl shadow-sm">{project.icon}</div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-tight">{project.title}</h3>
              <p className="text-xs md:text-sm text-slate-500">Architecture Preview</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Left Column: Structure & Workflow */}
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

            {/* Right Column: Execution & Report */}
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
                <div className="bg-white border-2 border-slate-50 rounded-2xl p-4 md:p-6 shadow-lg flex items-center justify-between">
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
                  <div className="text-right">
                    <div className="text-[9px] md:text-xs font-bold text-slate-400 uppercase tracking-tighter">
                      Status
                    </div>
                    <div className="text-[10px] md:text-sm font-mono font-bold text-slate-700">
                      {project.preview.report}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Footer */}
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

  return (
    <section id="projects" className="py-24 bg-slate-50 relative overflow-hidden">
      <AnimatePresence>
        {selectedProject && (
          <ArchitecturePreview project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-200 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-3 bg-blue-100 text-blue-700 px-6 py-2.5 rounded-full text-base md:text-lg font-bold mb-6 shadow-md"
          >
            <Zap size={20} />
            <span>AI Automation Showcase</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight"
          >
            Featured Projects
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            A collection of production-grade automation frameworks and AI-driven testing tools designed for
            scalability and precision.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              layoutId={`card-${project.title}`}
              whileHover={{ y: -8 }}
              className="group bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col h-full"
            >
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
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2 block">
                  {project.type}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">{project.description}</p>

                <button
                  onClick={() => setSelectedProject(project)}
                  className="w-full py-3 border-2 border-blue-50 bg-blue-50/30 text-blue-600 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all mb-6 flex items-center justify-center space-x-2"
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
            </motion.div>
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
            className="inline-flex items-center space-x-3 bg-slate-900 text-white px-8 py-4 rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-slate-200"
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
