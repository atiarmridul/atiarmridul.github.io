import { Code, Bug, Zap, Users, Database, Globe } from 'lucide-react';

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
  yellow: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  red: 'bg-red-50 text-red-700 border border-red-200',
  green: 'bg-green-50 text-green-700 border border-green-200',
  purple: 'bg-purple-50 text-purple-700 border border-purple-200',
  indigo: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
};

const Skills = () => {
  return (
    <section id="skills" data-testid="section-skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Technical Expertise</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive skill set spanning manual and automated testing, with expertise in modern frameworks
            and methodologies
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map(({ title, icon, skills, color }) => (
            <article
              key={title}
              data-testid={`skill-category-${toTestId(title)}`}
              className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-2"
            >
              <header className="flex items-center mb-4">
                {icon}
                <h3 className="text-xl font-semibold text-gray-900 ml-3">{title}</h3>
              </header>
              <ul className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <li
                    key={skill}
                    data-testid={`skill-item-${toTestId(skill)}`}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-transform duration-200 transform hover:scale-110 ${colorMap[color]}`}
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
