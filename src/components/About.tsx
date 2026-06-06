const stats = [
  { n: '6+', l: 'Years in QA' },
  { n: '20+', l: 'Products tested' },
  { n: '2K+', l: 'Defects tracked' },
  { n: '4', l: 'Automation stacks' },
];

const principles = [
  'Risk-first test planning',
  'Stable automation over flaky coverage',
  'Clear defect evidence',
  'Release-focused collaboration',
];

const profileFacts = [
  ['Certification', 'ISTQB® CTFL 4.0'],
  ['Current role', 'QA Engineer · Portonics'],
  ['Core stack', 'Playwright · WebdriverIO · Appium'],
  ['Strength', 'Manual + automation QA'],
];

const About = () => (
  <section className="section wrap" id="about" data-testid="section-about">
    <div className="about-grid">
      <div className="about-body">
        <span className="eyebrow reveal" style={{ marginBottom: 30, display: 'inline-flex' }}>
          About
        </span>
        <h2 className="about-title reveal" data-d="1">
          Quality work is won in the details before release day.
        </h2>
        <p className="about-lead reveal" data-d="2">
          I&apos;m an ISTQB-certified QA engineer focused on the <em>last 10%</em>: the edge case, the
          unstable test made reliable, and the release that reaches users with confidence.
        </p>
        <div className="about-principles reveal" data-d="3">
          {principles.map((principle) => (
            <span key={principle}>{principle}</span>
          ))}
        </div>
        <p className="about-note reveal" data-d="3">
          Over 6+ years I&apos;ve tested web and mobile products end-to-end across Agile teams, building
          Playwright, WebdriverIO and Appium frameworks, validating APIs, and investigating defects through
          Kibana logs.
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

      <aside className="profile-card reveal" data-d="2" aria-label="QA profile summary">
        <div className="profile-card-top">
          <span className="profile-status">Available for QA & automation work</span>
          <span className="profile-code">ISTQB® CTFL 4.0</span>
        </div>

        <div className="profile-main">
          <div className="profile-mark" aria-hidden="true">
            QA
          </div>
          <h3>Test strategy, automation, and release confidence.</h3>
          <p>
            I combine exploratory testing, automation architecture, API validation, and log-level debugging to
            make product risk visible before it becomes user impact.
          </p>
        </div>

        <dl className="profile-facts">
          {profileFacts.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <div className="profile-footer">
          <span>Manual QA</span>
          <span>Automation</span>
          <span>API</span>
          <span>Performance</span>
        </div>
      </aside>
    </div>
  </section>
);

export default About;
