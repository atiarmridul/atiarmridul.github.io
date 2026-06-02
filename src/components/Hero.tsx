import { motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronDown,
  CheckCircle,
  Gauge,
  GitBranch,
  Shield,
  Target,
  Terminal,
} from 'lucide-react';
import { scrollToSection } from '../utils/scrollToSection';

const heroTags = [
  { Icon: Shield, color: 'text-emerald-300', label: 'Quality Assurance' },
  { Icon: Target, color: 'text-cyan-300', label: 'Test Automation' },
  { Icon: CheckCircle, color: 'text-blue-300', label: 'Performance Testing' },
];

const metrics = [
  { value: '6+', label: 'Years in QA' },
  { value: '15+', label: 'Products Tested' },
  { value: '2K+', label: 'Defects Tracked' },
  { value: '99.9%', label: 'Quality Mindset' },
];

const stack = ['Playwright', 'WebdriverIO', 'Appium', 'Postman', 'JMeter', 'GitHub Actions'];

const pipelineSteps = [
  { Icon: GitBranch, label: 'Plan' },
  { Icon: Terminal, label: 'Automate' },
  { Icon: Gauge, label: 'Measure' },
  { Icon: CheckCircle, label: 'Release' },
];

const toTestId = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const Hero = () => {
  const scrollToNext = () => {
    scrollToSection('about');
  };

  return (
    <section
      id="hero"
      data-testid="section-hero"
      className="dark-band relative flex min-h-screen items-center overflow-hidden pt-32 pb-20 sm:pt-36 lg:pt-28"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-50 to-transparent"
      />

      <div className="section-shell relative z-10 w-full">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200 shadow-lg shadow-cyan-950/20 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.95)]" />
              Manual + Automation QA Engineer
            </div>

            <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Building release confidence through precise QA engineering.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              ISTQB-certified Senior Software QA Engineer with 6+ years across manual testing, automation
              frameworks, API validation, performance checks, and CI/CD quality workflows.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {heroTags.map(({ Icon, color, label }) => (
                <div
                  key={label}
                  data-testid={`hero-tag-${toTestId(label)}`}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 shadow-lg shadow-slate-950/10 backdrop-blur"
                >
                  <Icon className={color} size={18} />
                  <span className="text-sm font-semibold text-slate-100">{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1.5 text-xs font-bold text-slate-300"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => scrollToSection('skills')}
                aria-label="View technical expertise"
                data-testid="hero-technical-expertise-button"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-7 py-4 text-sm font-black text-slate-950 shadow-xl shadow-cyan-500/25 transition duration-200 hover:-translate-y-0.5 hover:bg-cyan-300"
              >
                Technical Expertise
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                aria-label="Go to contact section"
                data-testid="hero-contact-button"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-7 py-4 text-sm font-black text-white shadow-xl shadow-slate-950/10 backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:bg-white/20"
              >
                Get In Touch
              </button>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="relative"
            aria-label="QA engineering dashboard preview"
          >
            <div className="rounded-3xl border border-white/10 bg-white/10 p-4 shadow-2xl shadow-slate-950/40 ring-1 ring-white/10 backdrop-blur-xl">
              <div className="rounded-2xl border border-white/10 bg-slate-950/90 p-5">
                <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">
                      QA Command Center
                    </p>
                    <h2 className="mt-1 text-xl font-black text-white">Release Readiness</h2>
                  </div>
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                    Stable
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                    >
                      <div className="text-2xl font-black text-white">{metric.value}</div>
                      <div className="mt-1 text-xs font-semibold text-slate-400">{metric.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-bold text-white">Pipeline Quality Flow</span>
                    <span className="text-xs font-semibold text-cyan-200">CI monitored</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {pipelineSteps.map(({ Icon, label }, index) => (
                      <div key={label} className="relative flex flex-col items-center gap-2">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                          <Icon size={18} />
                        </div>
                        <span className="text-[11px] font-bold text-slate-300">{label}</span>
                        {index < pipelineSteps.length - 1 && (
                          <div className="absolute left-[64%] top-5 hidden h-px w-[62%] bg-cyan-300/30 sm:block" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 font-mono text-xs">
                  <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 text-slate-400">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    <span className="ml-2">quality-gate.sh</span>
                  </div>
                  <div className="space-y-2 p-4 text-slate-300">
                    <p>
                      <span className="text-cyan-300">$</span> npm run test:regression
                    </p>
                    <p className="text-emerald-300">{'>'} 248 checks passed</p>
                    <p className="text-blue-300">{'>'} api, ui, visual, a11y gates complete</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>

          <button
            onClick={scrollToNext}
            aria-label="Scroll to about section"
            data-testid="hero-scroll-down-button"
            className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-bounce rounded-full border border-slate-300 bg-white p-2 text-slate-700 shadow-lg transition-colors duration-200 hover:text-cyan-700 lg:inline-flex"
          >
            <ChevronDown size={28} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
