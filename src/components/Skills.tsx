const toTestId = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const skillCategories: Array<{ title: string; skills: string[] }> = [
  {
    title: 'Frameworks',
    skills: ['WebdriverIO', 'Playwright', 'Appium', 'Selenium', 'TestNG', 'Mocha'],
  },
  {
    title: 'Languages',
    skills: ['Java', 'JavaScript', 'TypeScript', 'MySQL'],
  },
  {
    title: 'Testing Types',
    skills: ['Automation', 'Manual', 'API', 'Performance', 'Documentation'],
  },
  {
    title: 'Tools',
    skills: ['JIRA', 'TestRail', 'Postman', 'Newman', 'RestAssured', 'JMeter', 'OWASP ZAP', 'Kibana'],
  },
  {
    title: 'Methodologies',
    skills: ['Agile', 'Scrum', 'CI/CD', 'TDD'],
  },
  {
    title: 'Platforms',
    skills: ['Web Apps', 'Mobile Apps', 'REST APIs', 'Cross-browser', 'Database'],
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
