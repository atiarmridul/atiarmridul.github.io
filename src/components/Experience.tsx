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
    when: 'Dec 2024 — Present',
    points: [
      'Analyze requirements, user stories, and acceptance criteria for My Robi and My Airtel, products serving 22.5M+ active users.',
      'Design, review, and refine test cases with Product Owners across 30+ Agile sprints; use project-grounded AI to identify scenarios and coverage gaps.',
      'Apply AI-DLC practices by checking AI-generated analysis and test cases against confirmed requirements before use.',
      'Use MCP-connected AI workflows to check duplicate Jira/Karmo items, create or update tasks and bugs, and verify saved fields.',
      'Validate backend APIs, investigate application issues in Kibana, and maintain QA knowledge for requirements, API journeys, and test coverage.',
    ],
  },
  {
    title: 'SQA Engineer',
    company: 'Audacity IT Solutions Limited',
    companyUrl: 'https://audacityit.com',
    when: '2021 — 2024',
    points: [
      'Built and maintained web and mobile automation using Playwright, WebdriverIO, and Appium with Page Object Model patterns.',
      'Validated APIs with Postman, Newman, and REST Assured; used JMeter for performance checks.',
      'Integrated automated tests into GitHub Actions and used OWASP ZAP for security testing where required.',
      'Prepared test cases, defect reports, and QA documentation for Agile projects.',
    ],
  },
  {
    title: 'Junior SQA Engineer',
    company: 'Audacity IT Solutions Limited',
    companyUrl: 'https://audacityit.com',
    when: '2020 — 2021',
    points: [
      'Clarified requirements with stakeholders and prepared SRS documentation, test cases, and defect reports.',
      'Reviewed designs in Figma and Adobe XD to identify UI/UX gaps before implementation.',
      'Supported functional, regression, integration, and acceptance testing across assigned projects.',
    ],
  },
  {
    title: 'Intern SQA Engineer',
    company: 'Audacity IT Solutions Limited',
    companyUrl: 'https://audacityit.com',
    when: '2019 — 2020',
    points: [
      'Executed functional, integration, regression, exploratory, UI/UX, cross-browser, and UAT testing.',
      'Recorded clear defect steps and tracked issues in Jira.',
      'Supported test documentation and learned the team’s QA process across project work.',
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
