import { Calendar, MapPin, Award, Linkedin } from 'lucide-react';

const experiences = [
  {
    title: 'Software QA Engineer (Automation)',
    company: 'Portonics Limited',
    companyUrl: 'https://portonics.com',
    companyLinkedIn: 'https://www.linkedin.com/company/portonics/',
    location: 'Dhaka, Bangladesh',
    duration: '2024 - Present',
     responsibilities: [
      "Executed requirement analysis and story reviews to define feature scope and ensure comprehensive test coverage before case design.",
      "Designed and optimized well-structured test cases, partnering with product owners to refine acceptance criteria and improve sprint test planning.",
      "Executed API testing to validate backend services and ensure seamless integration.",
      "Delivered Functional, Integration, Regression, UI/UX, and UAT testing across multiple releases to maintain high-quality standards.",
      "Diagnosed and resolved issues via Kibana log analysis, boosting test accuracy and system reliability.",
      "Partnered with developers and DevOps teams to investigate and remediate production and test environment defects using log-based insights.",
      "Produced comprehensive technical documentation, including User Stories and User Manuals, to support cross-team understanding.",
      "Mentored team members by sharing QA best practices, fostering continuous learning, and collaboration.",
      "Contributed to Agile ceremonies, actively providing QA insights during Sprint Planning, Reviews, and Retrospectives."
    ]
  },
  {
    title: 'SQA Engineer',
    company: 'Audacity IT Solutions Limited',
    companyUrl: 'https://audacityit.com',
    companyLinkedIn: 'https://www.linkedin.com/company/audacity-it-solutions-limited/',
    location: 'Dhaka, Bangladesh',
    duration: '2021 - 2024',
   responsibilities: [
      'Worked on multiple projects in parallel from requirement analysis to product release phase.',
      'Conducted UI automation testing for web and mobile apps with Playwright, WebdriverIO, and Appium.',
      'Used Git, GitHub, and GitHub Actions for version control and CI.',
      'Performed API testing and automation with Postman, Newman, and RestAssured.',
      'Executed performance testing using JMeter.',
      'Verified front-end data with databases using TablePlus.',
      'Conducted security testing and reporting with OWASP ZAP.',
      'Participated in Agile ceremonies including Sprint Planning, Standups, Reviews, Retrospectives, and Backlog Refinement.'
    ]
  },
  {
    title: 'Junior SQA Engineer',
    company: 'Audacity IT Solutions Limited',
    companyUrl: 'https://audacityit.com',
    companyLinkedIn: 'https://www.linkedin.com/company/audacity-it-solutions-limited/',
    location: 'Dhaka, Bangladesh',
    duration: '2020 - 2021',
   responsibilities: [
      'Communicated regularly with stakeholders to clarify requirements and resolve queries.',
      'Authored technical documentation (SRS).',
      'Worked under the supervision of a Project Manager on small-scale product design.',
      'Validated client expectations during the design phase using tools like Figma and Adobe XD.'
    ]
  },
  {
    title: 'Intern SQA Engineer',
    company: 'Audacity IT Solutions Limited',
    companyUrl: 'https://audacityit.com',
    companyLinkedIn: 'https://www.linkedin.com/company/audacity-it-solutions-limited/',
    location: 'Dhaka, Bangladesh',
    duration: '2019 - 2020',
   responsibilities: [
      'Collected and analyzed software requirements.',
      'Conducted Functional, Integration, Regression, Exploratory, UI/UX, Cross-Browser, and UAT testing.',
      'Logged and tracked bugs using JIRA.'
    ]
  }
];

const Experience = () => (
  <section id="experience" className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-6">
      <header className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Work Experience
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Highlighting my professional journey, key roles and significant contributions in the software quality assurance landscape.
        </p>
      </header>

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-200"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
              <h3 className="text-xl font-semibold text-gray-800">{exp.title}</h3>
              <div className="flex items-center text-sm text-blue-600 mt-2 md:mt-0">
                <Calendar size={16} className="mr-1" />
                {exp.duration}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600 mb-4 gap-2">
              <div className="flex items-center gap-2">
                <Award size={16} />
                <a
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-medium"
                >
                  {exp.company}
                </a>
                {exp.companyLinkedIn && (
                  <a
                    href={exp.companyLinkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="text-gray-400 hover:text-blue-600"
                  >
                    <Linkedin size={16} />
                  </a>
                )}
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <MapPin size={16} />
                <span>{exp.location}</span>
              </div>
            </div>

            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              {exp.responsibilities.map((task, idx) => (
                <li key={idx}>{task}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Experience;
