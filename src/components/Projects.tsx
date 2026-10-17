import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Github, X } from 'lucide-react';

type Project = {
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  type: string;
  language: string;
  preview: {
    structure: string[];
    workflow: string;
    execution: string;
    report: string;
  };
};

const projects: Project[] = [
  {
    title: 'Singer BD Automation Framework',
    description:
      'Playwright and TypeScript automation for Singer Bangladesh, using Page Object Model, API-assisted test data, visual and accessibility checks, CI workflows, and reporting.',
    tech: ['Playwright', 'TypeScript', 'Allure', 'GitHub Actions'],
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
      report: 'TypeScript Strict Mode | Allure Reporting | CI Workflows',
    },
  },
  {
    title: 'Telco OTP Relay',
    description:
      'Android QA utility that detects incoming SMS on a dedicated test device, filters OTP messages, and relays selected messages to Google Chat. Includes privacy-aware delivery history, retry handling, automated tests, and GitHub Actions verification.',
    tech: ['Android', 'Kotlin', 'SMS', 'Google Chat Webhook', 'JUnit', 'GitHub Actions'],
    github: 'https://github.com/atiarmridul/TelcoOtpRelay',
    demo: 'https://github.com/atiarmridul/TelcoOtpRelay',
    type: 'Telecom QA Utility',
    language: 'Kotlin',
    preview: {
      structure: [
        'TelcoOtpRelay/',
        '  ├── SmsReceiver & SmsBroadcastParser',
        '  ├── RelayProcessor & OtpParser',
        '  ├── ChatSender & RelayHistoryStore',
        '  └── JVM and Android instrumentation tests',
      ],
      workflow: 'Test Trigger → SMS Received → OTP Filter → Google Chat Relay',
      execution: '$ ./gradlew check',
      report: 'Privacy-Aware History | Bounded Retries | CI Verification',
    },
  },
  {
    title: 'PortRobi-Work-Life',
    description:
      'Private MCP-enabled QA workspace for organizing project knowledge, requirements, test coverage, and repeatable QA workflows. Internal project details are not shown on this public portfolio.',
    tech: ['MCP', 'QA Knowledge Base', 'AI-Assisted Workflows', 'Test Coverage'],
    github: '',
    demo: '',
    type: 'Private QA Workspace',
    language: 'Documentation & Tooling',
    preview: {
      structure: [
        'Private QA Workspace',
        '  ├── Project requirements and QA guidance',
        '  ├── Test knowledge and coverage references',
        '  └── MCP-connected workflow support',
      ],
      workflow: 'Project Knowledge → QA Rules → Test Design → Review',
      execution: 'Internal workflow — repository is private',
      report: 'Private Project | Internal Details Omitted',
    },
  },
  {
    title: 'AI-Assisted Playwright Automation',
    description:
      'Playwright and TypeScript end-to-end test suite for Swag Labs. Demonstrates reusable test structure and browser-based validation of key e-commerce user journeys.',
    tech: ['Playwright', 'TypeScript', 'E2E Testing', 'GitHub Actions'],
    github: 'https://github.com/atiarmridul/Swag-Labs-E2E-Test-Suite-Playwright',
    demo: 'https://github.com/atiarmridul/Swag-Labs-E2E-Test-Suite-Playwright',
    type: 'AI-Assisted QA & Automation',
    language: 'TypeScript',
    preview: {
      structure: [
        'Swag-Labs-E2E-Test-Suite-Playwright/',
        '  ├── tests/ (End-to-end scenarios)',
        '  ├── pages/ (Page objects)',
        '  ├── playwright.config.js',
        '  └── GitHub Actions workflow',
      ],
      workflow: 'Test Setup → Page Object → User Journey → Assertions',
      execution: 'See repository README for setup and test commands',
      report: 'Playwright | TypeScript | End-to-End Coverage',
    },
  },
  {
    title: 'AI Playwright Test Generator',
    description:
      'Proof of concept that crawls a live webpage, extracts rendered UI elements, and uses an OpenAI model to draft Playwright tests for human review.',
    tech: ['OpenAI', 'Playwright', 'Cheerio', 'Node.js'],
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
      report: 'Generated Test Draft | Validation Checks | Human Review Needed',
    },
  },
  {
    title: 'Chaldal Android Automation',
    description:
      'End-to-end UI automation for the Chaldal mobile app using a scalable Page Object Model architecture. Validates critical user journeys on Android devices.',
    tech: ['Appium 2', 'WebdriverIO', 'Mocha', 'Allure'],
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

const monoBox: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 12.5,
  lineHeight: 1.7,
  color: 'var(--text-dim)',
  background: 'var(--bg)',
  border: '1px solid var(--line)',
  borderRadius: 12,
  padding: 16,
  whiteSpace: 'pre',
  overflowX: 'auto',
};

const sectionLabel: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 11,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--accent)',
  marginBottom: 10,
  display: 'block',
};

const ArchitecturePreview = ({ project, onClose }: { project: Project; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    onClick={onClose}
    data-testid="project-preview-backdrop"
    style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      background: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(8px)',
    }}
  >
    <motion.div
      initial={{ scale: 0.96, y: 12 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.96, y: 12 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-preview-title"
      data-testid="project-preview-dialog"
      style={{
        width: '100%',
        maxWidth: 880,
        maxHeight: '88vh',
        overflowY: 'auto',
        background: 'var(--surface)',
        border: '1px solid var(--line-strong)',
        borderRadius: 'var(--radius)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          padding: '22px 26px',
          borderBottom: '1px solid var(--line)',
          position: 'sticky',
          top: 0,
          background: 'var(--surface)',
        }}
      >
        <div>
          <span style={sectionLabel}>{project.type}</span>
          <h3
            id="project-preview-title"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(24px, 4vw, 34px)',
              lineHeight: 1.05,
            }}
          >
            {project.title}
          </h3>
        </div>
        <button
          className="icon-btn"
          onClick={onClose}
          aria-label="Close preview"
          data-testid="project-preview-close-button"
        >
          <X size={17} />
        </button>
      </div>

      <div style={{ padding: 26, display: 'grid', gap: 26 }}>
        <div>
          <span style={sectionLabel}>Project Structure</span>
          <div style={monoBox}>{project.preview.structure.join('\n')}</div>
        </div>

        <div>
          <span style={sectionLabel}>Logic Workflow</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {project.preview.workflow.split(' → ').map((step, i, arr) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    color: 'var(--text-dim)',
                    border: '1px solid var(--line)',
                    padding: '6px 12px',
                    borderRadius: 999,
                  }}
                >
                  {step}
                </span>
                {i < arr.length - 1 && <span style={{ color: 'var(--accent)' }}>→</span>}
              </span>
            ))}
          </div>
        </div>

        <div>
          <span style={sectionLabel}>Execution</span>
          <div style={{ ...monoBox, color: '#46d17e' }}>{project.preview.execution}</div>
        </div>

        <div>
          <span style={sectionLabel}>Report</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {project.preview.report.split(' | ').map((item) => (
              <span
                key={item}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11.5,
                  color: 'var(--accent)',
                  border: '1px solid var(--line-strong)',
                  padding: '6px 12px',
                  borderRadius: 999,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ alignSelf: 'flex-start' }}
            data-testid="project-preview-github-link"
          >
            <Github size={16} /> GitHub Repository
          </a>
        ) : (
          <p style={{ color: 'var(--text-dim)', fontSize: 13 }}>
            Private repository — internal details are not published.
          </p>
        )}
      </div>
    </motion.div>
  </motion.div>
);

const Projects = () => {
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelected(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  return (
    <section className="section wrap" id="projects" data-testid="section-projects">
      <AnimatePresence>
        {selected && <ArchitecturePreview project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>

      <div className="section-head">
        <span className="eyebrow reveal">Selected work</span>
        <h2 className="section-title reveal" data-d="1">
          Frameworks &amp; tools
          <br />
          I&apos;ve built recently.
        </h2>
      </div>

      <div className="work-list">
        {projects.map((p, i) => (
          <button
            key={p.title}
            className="work-item reveal"
            data-testid={`project-card-${i + 1}`}
            aria-label={`Open project preview for ${p.title}`}
            onClick={() => setSelected(p)}
          >
            <span className="work-idx">{String(i + 1).padStart(2, '0')}</span>
            <div className="work-main">
              <h3 className="work-title">{p.title}</h3>
              <p className="work-desc">{p.description}</p>
              <div className="work-tags">
                {p.tech.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
            <span className="work-go">
              View <span className="arr">↗</span>
            </span>
          </button>
        ))}
      </div>

      <div className="reveal" style={{ marginTop: 'clamp(40px, 6vw, 64px)' }}>
        <a
          href="https://github.com/atiarmridul"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
          data-testid="projects-github-link"
          data-mag
        >
          <Github size={16} /> Explore more on GitHub
        </a>
      </div>
    </section>
  );
};

export default Projects;
