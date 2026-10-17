const toTestId = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const skillCategories: Array<{ title: string; skills: string[] }> = [
  {
    title: 'Test Automation',
    skills: ['Playwright', 'WebdriverIO', 'Appium', 'Selenium WebDriver', 'Page Object Model'],
  },
  {
    title: 'Programming & Data',
    skills: ['TypeScript', 'JavaScript', 'Java', 'MySQL', 'TablePlus'],
  },
  {
    title: 'Testing',
    skills: ['Functional', 'Integration', 'Regression', 'API', 'Mobile', 'UI/UX', 'UAT', 'Performance'],
  },
  {
    title: 'API & QA Tools',
    skills: ['Postman', 'REST Assured', 'Newman', 'JMeter', 'Jira', 'TestRail', 'BrowserStack'],
  },
  {
    title: 'AI-Assisted QA & CI/CD',
    skills: ['MCP', 'AI-Assisted Test Generation', 'Playwright Test Generation', 'Git', 'GitHub Actions'],
  },
  {
    title: 'Monitoring & Methods',
    skills: ['Kibana', 'OWASP ZAP', 'Agile', 'Scrum', 'CI/CD', 'Cross-browser Testing'],
  },
];

const Skills = () => (
  <section className="section wrap" id="skills" data-testid="section-skills">
    <div className="section-head">
      <span className="eyebrow reveal" data-testid="skills-eyebrow">
        Toolkit
      </span>
      <h2 className="section-title reveal" data-d="1">
        The stack I<br />
        reach for.
      </h2>
    </div>

    <div className="stack-grid reveal" data-d="1">
      {skillCategories.map(({ title, skills }) => (
        <div className="stack-col" key={title} data-testid={`skill-category-${toTestId(title)}`}>
          <h3>{title}</h3>
          <ul>
            {skills.map((skill) => (
              <li key={skill} data-testid={`skill-item-${toTestId(skill)}`}>
                {skill}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

export default Skills;
