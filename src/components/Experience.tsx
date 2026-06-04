const toTestId = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const experiences = [
  {
    title: 'Software QA Engineer (Automation)',
    company: 'Portonics Limited',
    companyUrl: 'https://portonics.com',
    when: '2024 — Now',
    points: [
      'Requirement analysis and story reviews to define scope and ensure comprehensive test coverage.',
      'API testing to validate backend services and seamless integration.',
      'Functional, Integration, Regression, UI/UX and UAT testing across multiple releases.',
      'Diagnosed issues via Kibana log analysis with developers and DevOps.',
      'Mentored teammates and contributed QA insights across Agile ceremonies.',
    ],
  },
  {
    title: 'SQA Engineer',
    company: 'Audacity IT Solutions Limited',
    companyUrl: 'https://audacityit.com',
    when: '2021 — 2024',
    points: [
      'UI automation for web and mobile with Playwright, WebdriverIO and Appium.',
      'API testing and automation with Postman, Newman and RestAssured.',
      'Performance testing with JMeter; security testing with OWASP ZAP.',
      'Version control and CI with Git, GitHub and GitHub Actions.',
    ],
  },
  {
    title: 'Junior SQA Engineer',
    company: 'Audacity IT Solutions Limited',
    companyUrl: 'https://audacityit.com',
    when: '2020 — 2021',
    points: [
      'Clarified requirements with stakeholders and authored SRS documentation.',
      'Validated client expectations during design using Figma and Adobe XD.',
    ],
  },
  {
    title: 'Intern SQA Engineer',
    company: 'Audacity IT Solutions Limited',
    companyUrl: 'https://audacityit.com',
    when: '2019 — 2020',
    points: [
      'Functional, Integration, Regression, Exploratory, UI/UX, Cross-Browser and UAT testing.',
      'Logged and tracked bugs using JIRA.',
    ],
  },
];

const Experience = () => (
  <section className="section wrap" id="experience" data-testid="section-experience">
    <div className="section-head">
      <span className="eyebrow reveal">Path</span>
      <h2 className="section-title reveal" data-d="1">
        Where I&apos;ve
        <br />
        worked.
      </h2>
    </div>

    <div className="timeline">
      {experiences.map((e, i) => (
        <div
          className="tl-item reveal"
          data-d={`${(i % 3) + 1}`}
          key={`${e.title}-${e.when}`}
          data-testid={`experience-card-${i + 1}`}
        >
          <div className="tl-when">{e.when}</div>
          <div>
            <h3 className="tl-role">
              {e.title}{' '}
              <span className="tl-co">
                ·{' '}
                <a
                  href={e.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`experience-company-link-${i + 1}`}
                >
                  {e.company}
                </a>
              </span>
            </h3>
            <ul className="tl-list">
              {e.points.map((point, idx) => (
                <li key={idx} data-testid={`experience-responsibility-${toTestId(e.title)}-${idx + 1}`}>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Experience;
