import { Calendar, MapPin, Award } from 'lucide-react';

const experiences = [
  {
    title: 'Software QA Engineer (Automation)',
    company: 'Portonics Limited',
    location: 'Dhaka, Bangladesh',
    duration: '2024 - Present',
    responsibilities: [
      'Conducted detailed requirement analysis and story reviews to understand feature scope before test case design.',
      'Develop and maintain well-structured test cases, collaborating with product managers and developers to refine them and improve test planning.',
      'Conducted functional, integration, regression, UI/UX, and UAT testing.',
      'Perform API testing to validate backend services.',
      'Debugged and identified issues using Kibana logs, improving test accuracy and system reliability.',
      'Collaborated with developers and DevOps teams to investigate and resolve production and testing environment issues using log analysis.',
      'Authored technical documentation (User Manual).',
      'Participated in Agile ceremonies including Sprint Planning, Standups, Reviews, Retrospectives, and Backlog Refinement.'
    ]
  },
  {
    title: 'SQA Engineer',
    company: 'Audacity IT Solutions Limited',
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
    location: 'Dhaka, Bangladesh',
    duration: '2019 - 2020',
    responsibilities: [
      'Collected and analyzed software requirements.',
      'Conducted Functional, Integration, Regression, Exploratory, UI/UX, Cross-Browser, and UAT testing.',
      'Logged and tracked bugs using JIRA.'
    ]
  }
];

const highlights = [
  { label: 'Years Experience', value: '6+' },
  { label: 'Projects Completed', value: '20+' },
  { label: 'Bugs Found & Fixed', value: '2000+' },
  { label: 'Quality Standard', value: '99.9%' }
];

const Experience = () => (
  <section id="experience" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <header className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Work Experience</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Progressive career growth in quality assurance with a proven track record of delivering high-quality software solutions.
        </p>
      </header>

      <div className="relative">
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-blue-200" />

        <ul className="space-y-12">
          {experiences.map((exp, idx) => (
            <li
              key={exp.title + idx}
              className={`relative flex items-center ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:space-x-8`}
            >
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg" />

              <div className={`w-full md:w-1/2 ml-12 md:ml-0 ${idx % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                <article className="bg-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300">
                  <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{exp.title}</h3>
                    <time className="flex items-center text-blue-600 text-sm font-medium">
                      <Calendar size={16} className="mr-1" />
                      {exp.duration}
                    </time>
                  </header>

                  <div className="flex items-center text-gray-600 mb-4 gap-x-6">
                    <span className="flex items-center">
                      <Award size={16} className="mr-1" />
                      {exp.company}
                    </span>
                    <span className="flex items-center">
                      <MapPin size={16} className="mr-1" />
                      {exp.location}
                    </span>
                  </div>

                  <h4 className="font-semibold text-gray-900 mb-2">Key Responsibilities:</h4>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
              <div className="hidden md:block w-1/2" />
            </li>
          ))}
        </ul>
      </div>

      <section className="mt-16 text-center">
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Career Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {highlights.map(({ label, value }) => (
              <div key={label}>
                <div className="text-3xl font-bold mb-2">{value}</div>
                <p className="text-sm opacity-90">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  </section>
);

export default Experience;