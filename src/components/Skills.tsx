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
    skills: ['WebdriverIO', 'Playwright', 'Appium', 'Selenium WebDriver', 'TestNG', 'JUnit', 'Mocha']
  },
  {
    title: 'Programming Languages',
    icon: <Zap className="text-yellow-600" size={24} />,
    skills: ['Java', 'JavaScript', 'TypeScript', 'MySQL']
  },
  {
    title: 'Testing Types',
    icon: <Bug className="text-red-600" size={24} />,
    skills: ['Automation Testing', 'Manual Testing', 'API Testing', 'Performance Testing', 'Technical Documentation', 'Project Management']
  },
  {
    title: 'Tools & Technologies',
    icon: <Database className="text-green-600" size={24} />,
    skills: ['JIRA', 'TestRail', 'VS Code', 'IntelliJ IDEA', 'Kibana', 'Postman', 'Newman', 'RestAssured', 'JMeter', 'OWASP ZAP', 'TablePlus', 'Git', 'GitHub', 'GitHub Actions']
  },
  {
    title: 'Methodologies',
    icon: <Users className="text-purple-600" size={24} />,
    skills: ['Agile', 'Scrum', 'CI/CD', 'Test-Driven Development', 'Behavior-Driven Development']
  },
  {
    title: 'Platforms',
    icon: <Globe className="text-indigo-600" size={24} />,
    skills: ['Web Applications', 'Mobile Apps', 'REST APIs', 'Cross-browser Testing', 'Database Testing']
  }
];

const combinedAchievements = [
  {
    type: 'Certification',
    title: 'ISTQB Certified',
    //subtitle: 'Certified Tester Foundation Level v4.0',
    link: 'https://zertdb.isqi.org/en/download/index/token/jAPq8%24J2y%24X%21Xy_39p84'
  },
  {
    type: 'Training & Course',
    title: 'Certified Expert SQA Automation Program',
    //subtitle: 'Comprehensive Agile QA Practices',
    link: 'https://www.dropbox.com/scl/fi/1pk9d3jjma7rq5a664toy/Md.-Atiar-Rahman-Chowdhury.jpg?rlkey=04svf4ou2wm16tns7myba8vog&st=0xcllz3v&dl=0'
  },
  {
    type: 'Training & Course',
    title: 'Mobile Automation with Appium and WebdriverIO',
    //subtitle: 'GitHub Actions & Jenkins Pipelines',
    link: 'https://www.udemy.com/certificate/UC-994ba132-37ad-4a38-a6a1-0106e7796a2a/'
  },
    {
    type: 'Training & Course',
    title: 'Selenium WebDriver: Selenium Automation Testing with Java',
    //subtitle: 'Comprehensive Agile QA Practices',
    link: 'https://www.udemy.com/certificate/UC-39d384a5-7977-4307-aca7-a3b164253ab1/'
  },
  {
    type: 'Training & Course',
    title: 'LambdaTest Software Testing Professional',
    //subtitle: 'GitHub Actions & Jenkins Pipelines',
    link: 'https://www.linkedin.com/learning/certificates/60a20f529e5bb109fe85d7250e340c03dcddd81f115d8ce588890d41b1d25985?trk=share_certificate'
  },
  {
    type: 'Training & Course',
    title: 'LambdaTest Test Automation Professional',
    //subtitle: 'Hands-on Load & Stress Testing',
    link: 'https://www.linkedin.com/learning/certificates/127fae46800047159138f6efaf951cbbaf36cebe88510ca3bd536e369bbdfcd9?trk=share_certificate'
  }
];

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
          {skillCategories.map(({ title, icon, skills }) => (
            <article
              key={title}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
            >
              <header className="flex items-center mb-4">
                {icon}
                <h3 className="text-xl font-semibold text-gray-900 ml-3">{title}</h3>
              </header>
              <ul className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <li
                    key={skill}
                    className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-gray-200"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <section className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-6">Achivements</h3>

          <div className="mb-6 flex justify-center gap-4">
            {filters.map((option) => (
              <button
                key={option}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  filter === option ? 'bg-white text-blue-700' : 'bg-white/20 text-white hover:bg-white/30'
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
                className="bg-white bg-opacity-20 rounded-lg p-4 text-left"
              >
                <span className="text-xs uppercase font-medium text-white/70">{type}</span>
                <h4 className="font-semibold text-white mt-1">{title}</h4>
                <p className="text-sm text-white/90 mb-2">{subtitle}</p>
                {link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-sm font-medium text-white underline hover:text-blue-200"
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
