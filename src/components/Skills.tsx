import {
  Code,
  Bug,
  Zap,
  Users,
  Database,
  Globe
} from 'lucide-react';
import { useState } from 'react';

const skillCategories = [
  {
    title: 'Testing Frameworks',
    icon: <Code className="text-blue-600" size={24} />,
    skills: ['WebdriverIO', 'Playwright', 'Appium', 'Selenium WebDriver', 'TestNG', 'JUnit', 'Mocha'],
    color: 'blue'
  },
  {
    title: 'Programming Languages',
    icon: <Zap className="text-yellow-600" size={24} />,
    skills: ['Java', 'JavaScript', 'TypeScript', 'MySQL'],
    color: 'yellow'
  },
  {
    title: 'Testing Types',
    icon: <Bug className="text-red-600" size={24} />,
    skills: ['Automation Testing', 'Manual Testing', 'API Testing', 'Performance Testing', 'Technical Documentation', 'Project Management'],
    color: 'red'
  },
  {
    title: 'Tools & Technologies',
    icon: <Database className="text-green-600" size={24} />,
    skills: ['JIRA', 'TestRail', 'VS Code', 'IntelliJ IDEA', 'Kibana', 'Postman', 'Newman', 'RestAssured', 'JMeter', 'OWASP ZAP', 'TablePlus', 'Git', 'GitHub', 'GitHub Actions'],
    color: 'green'
  },
  {
    title: 'Methodologies',
    icon: <Users className="text-purple-600" size={24} />,
    skills: ['Agile', 'Scrum', 'CI/CD', 'Test-Driven Development', 'Behavior-Driven Development'],
    color: 'purple'
  },
  {
    title: 'Platforms',
    icon: <Globe className="text-indigo-600" size={24} />,
    skills: ['Web Applications', 'Mobile Apps', 'REST APIs', 'Cross-browser Testing', 'Database Testing'],
    color: 'indigo'
  }
];

const combinedAchievements = [
  {
    type: 'Certification',
    title: 'ISTQB® Certified Tester - Foundation Level 4.0',
    link: 'https://zertdb.isqi.org/en/download/index/token/jAPq8%24J2y%24X%21Xy_39p84'
  },
  {
    type: 'Training & Course',
    title: 'Certified Expert SQA Automation Program',
    link: 'https://www.dropbox.com/scl/fi/16gkyzv9doj1iqmo2tds0/Md.-Atiar-Rahman-Chowdhury.jpg?rlkey=lpnx939z4qoh7vlt1p3eghx92&st=ewkble9w&dl=0'
  },
  {
    type: 'Training & Course',
    title: 'Mobile Automation with Appium and WebdriverIO',
    link: 'https://www.udemy.com/certificate/UC-994ba132-37ad-4a38-a6a1-0106e7796a2a/'
  },
  {
    type: 'Training & Course',
    title: 'Selenium WebDriver: Selenium Automation Testing with Java',
    link: 'https://www.udemy.com/certificate/UC-39d384a5-7977-4307-aca7-a3b164253ab1/'
  },
  {
    type: 'Training & Course',
    title: 'LambdaTest Software Testing Professional',
    link: 'https://www.linkedin.com/learning/certificates/60a20f529e5bb109fe85d7250e340c03dcddd81f115d8ce588890d41b1d25985?trk=share_certificate'
  },
  {
    type: 'Training & Course',
    title: 'LambdaTest Test Automation Professional',
    link: 'https://www.linkedin.com/learning/certificates/127fae46800047159138f6efaf951cbbaf36cebe88510ca3bd536e369bbdfcd9?trk=share_certificate'
  }

];

const colorMap = {
  blue: 'bg-blue-50 text-blue-700 border border-blue-200',
  yellow: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  red: 'bg-red-50 text-red-700 border border-red-200',
  green: 'bg-green-50 text-green-700 border border-green-200',
  purple: 'bg-purple-50 text-purple-700 border border-purple-200',
  indigo: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
};

const Skills = () => {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Certification', 'Training & Course'];

  const filteredAchievements =
    filter === 'All'
      ? combinedAchievements
      : combinedAchievements.filter((item) => item.type === filter);

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Technical Expertise</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive skill set spanning manual and automated testing, with expertise in modern frameworks and methodologies
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map(({ title, icon, skills, color }) => (
            <article
              key={title}
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
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-transform duration-200 transform hover:scale-110 ${colorMap[color]}`}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <section className="mt-16 rounded-2xl p-8 border border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-100 shadow-sm text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Learning Milestones</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            A showcase of my professional certifications and commitment to continuous learning in the SQA field.
          </p>

          <div className="mb-6 flex justify-center gap-4">
            {filters.map((option) => (
              <button
                key={option}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  filter === option ? 'bg-blue-800 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setFilter(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredAchievements.map(({ type, title, subtitle, link }) => (
              <div
                key={title}
                className="bg-white border border-gray-200 rounded-lg p-4 text-left shadow-sm transition-all duration-300 transform hover:shadow-md hover:-translate-y-2"
              >
                <span className="text-xs uppercase font-medium text-blue-700">{type}</span>
                <h4 className="font-semibold text-gray-900 mt-1">{title}</h4>
                <p className="text-sm text-gray-600 mb-2">{subtitle}</p>
                {link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-sm font-medium text-blue-800 underline hover:text-blue-900"
                  >
                    View Certificate
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Skills;
