const stats = [
  { n: '6+', l: 'Years in QA' },
  { n: '15+', l: 'Products tested' },
  { n: '2K+', l: 'Defects tracked' },
  { n: '∞', l: 'Cups of tea' },
];

const About = () => (
  <section className="section wrap" id="about" data-testid="section-about">
    <div className="about-grid">
      <div className="about-body">
        <span className="eyebrow reveal" style={{ marginBottom: 30, display: 'inline-flex' }}>
          About
        </span>
        <p className="reveal" data-d="1">
          I&apos;m an ISTQB-certified QA engineer who cares most about the <em>last 10%</em>: the edge case,
          the flaky test made stable, the release that ships with confidence.
        </p>
        <p className="reveal" data-d="2">
          Over 6+ years I&apos;ve tested web and mobile products end-to-end — manual and automated — across
          Agile teams, building Playwright, WebdriverIO and Appium frameworks, validating APIs, and chasing
          defects through Kibana logs.
        </p>
        <p className="reveal" data-d="3">
          I see QA as a mindset, not a phase: curiosity, clarity and collaboration applied to every stage of
          the development lifecycle.
        </p>
        <div className="about-stats reveal" data-d="3" data-testid="about-stats">
          {stats.map((s) => (
            <div className="stat" key={s.l}>
              <div className="n">{s.n}</div>
              <div className="l">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="portrait-wrap reveal" data-d="2">
        <div className="portrait-card">
          <div className="portrait-meta">
            <span>
              ISTQB® CTFL 4.0<b>Certified Tester</b>
            </span>
            <span style={{ marginTop: 14 }}>
              Currently<b>QA Engineer · Portonics</b>
            </span>
          </div>
          <div className="portrait-mono">A</div>
        </div>
        <span className="portrait-tag">That&apos;s me</span>
      </div>
    </div>
  </section>
);

export default About;
