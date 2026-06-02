import { Bug, Code, Database, Globe, Users, Zap } from 'lucide-react';

const toTestId = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

type SkillColor = 'blue' | 'yellow' | 'red' | 'green' | 'purple' | 'indigo';

const skillCategories: Array<{
  title: string;
  icon: JSX.Element;
  skills: string[];
  color: SkillColor;
}> = [
  {
    title: 'Testing Frameworks',
    icon: <Code className="text-blue-600" size={24} />,
    skills: ['WebdriverIO', 'Playwright', 'Appium', 'Selenium WebDriver', 'TestNG', 'JUnit', 'Mocha'],
    color: 'blue',
  },
  {
    title: 'Programming Languages',
    icon: <Zap className="text-yellow-600" size={24} />,
    skills: ['Java', 'JavaScript', 'TypeScript', 'MySQL'],
    color: 'yellow',
  },
  {
    title: 'Testing Types',
    icon: <Bug className="text-red-600" size={24} />,
    skills: [
      'Automation Testing',
      'Manual Testing',
      'API Testing',
      'Performance Testing',
      'Technical Documentation',
      'Project Management',
    ],
    color: 'red',
  },
  {
    title: 'Tools & Technologies',
    icon: <Database className="text-green-600" size={24} />,
    skills: [
      'JIRA',
      'TestRail',
      'VS Code',
      'IntelliJ IDEA',
      'Kibana',
      'Postman',
      'Newman',
      'RestAssured',
      'JMeter',
      'OWASP ZAP',
      'TablePlus',
      'Git',
      'GitHub',
      'GitHub Actions',
    ],
    color: 'green',
  },
  {
    title: 'Methodologies',
    icon: <Users className="text-purple-600" size={24} />,
    skills: ['Agile', 'Scrum', 'CI/CD', 'Test-Driven Development'],
    color: 'purple',
  },
  {
    title: 'Platforms',
    icon: <Globe className="text-indigo-600" size={24} />,
    skills: ['Web Applications', 'Mobile Apps', 'REST APIs', 'Cross-browser Testing', 'Database Testing'],
    color: 'indigo',
  },
];

const colorMap: Record<SkillColor, string> = {
  blue: 'bg-blue-50 text-blue-700 border border-blue-200',
  yellow: 'bg-amber-50 text-amber-700 border border-amber-200',
  red: 'bg-rose-50 text-rose-700 border border-rose-200',
  green: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  purple: 'bg-purple-50 text-purple-700 border border-purple-200',
  indigo: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
};

const Skills = () => {
  return (
    <section id="skills" data-testid="section-skills" className="bg-white py-24">
      <div className="section-shell">
        <header className="mx-auto mb-16 max-w-3xl text-center">
          <span className="section-kicker">Capability Matrix</span>
          <h2 className="section-title">Technical Expertise</h2>
          <p className="section-copy">
            Comprehensive skill set spanning manual and automated testing, with expertise in modern frameworks
            and methodologies
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map(({ title, icon, skills, color }) => (
            <article
              key={title}
              data-testid={`skill-category-${toTestId(title)}`}
              className="premium-card premium-card-hover flex h-full flex-col p-6"
            >
              <header className="flex items-center mb-4">
                <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100">{icon}</div>
                <div className="ml-3">
                  <h3 className="text-xl font-black text-slate-950">{title}</h3>
                </div>
              </header>

              <ul className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <li
                    key={skill}
                    data-testid={`skill-item-${toTestId(skill)}`}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-transform duration-200 hover:-translate-y-0.5 ${colorMap[color]}`}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
