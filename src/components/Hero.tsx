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
        <strong>Senior Software QA Engineer</strong> — ISTQB-certified, 6+ years building release confidence
        through manual testing, automation frameworks, API validation, performance checks and CI/CD quality
        workflows.
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
