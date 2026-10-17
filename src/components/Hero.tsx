import { scrollToSection } from '../utils/scrollToSection';

const Hero = () => (
  <header className="hero wrap" id="hero" data-testid="section-hero">
    <span className="status reveal">
      <span className="pulse" /> Available for QA &amp; automation work · 2026
    </span>

    <h1>
      <span className="line reveal" data-d="1">
        <span>Md. Atiar</span>
      </span>
      <span className="line reveal" data-d="2">
        <span>
          Rahman <em>Chowdhury</em>
        </span>
      </span>
    </h1>

    <div className="hero-meta">
      <p className="hero-intro reveal" data-d="3">
        <strong>Software QA Engineer</strong> — ISTQB® certified, with 7 years of experience in manual, web, mobile,
        and API testing. I build automation with Playwright, WebdriverIO, and Appium, and use MCP-connected
        AI workflows to support test design and QA task management.
      </p>
      <div className="hero-cta reveal" data-d="4">
        <button
          className="btn btn-primary"
          data-testid="hero-view-work-button"
          data-mag
          onClick={() => scrollToSection('projects')}
        >
          View work <span className="arr">→</span>
        </button>
        <button
          className="btn btn-ghost"
          data-testid="hero-contact-button"
          data-mag
          onClick={() => scrollToSection('contact')}
        >
          Get in touch
        </button>
      </div>
    </div>

    <div className="hero-corner reveal" data-d="4" style={{ marginTop: 42 }}>
      <span>
        Based in<b>Dhaka, Bangladesh</b>
      </span>
      <span>
        Focus<b>QA · Test Automation</b>
      </span>
      <span>
        Open to<b>Full Time · Contractor · Hybrid · Remote</b>
      </span>
    </div>
  </header>
);

export default Hero;
