import { Award, Calendar, CheckCircle2, Linkedin, MapPin } from 'lucide-react';

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
    companyLinkedIn: 'https://www.linkedin.com/company/portonics/',
    location: 'Dhaka, Bangladesh',
    duration: '2024 - Present',
    responsibilities: [
      'Executed requirement analysis and story reviews to define feature scope and ensure comprehensive test coverage before case design.',
      'Designed and optimized well-structured test cases, partnering with product owners to refine acceptance criteria and improve sprint test planning.',
      'Executed API testing to validate backend services and ensure seamless integration.',
      'Delivered Functional, Integration, Regression, UI/UX, and UAT testing across multiple releases to maintain high-quality standards.',
      'Diagnosed and resolved issues via Kibana log analysis, boosting test accuracy and system reliability.',
      'Partnered with developers and DevOps teams to investigate and remediate production and test environment defects using log-based insights.',
      'Produced comprehensive technical documentation, including User Stories and User Manuals, to support cross-team understanding.',
      'Mentored team members by sharing QA best practices, fostering continuous learning, and collaboration.',
      'Contributed to Agile ceremonies, actively providing QA insights during Sprint Planning, Reviews, and Retrospectives.',
    ],
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
      'Participated in Agile ceremonies including Sprint Planning, Standups, Reviews, Retrospectives, and Backlog Refinement.',
    ],
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
      'Validated client expectations during the design phase using tools like Figma and Adobe XD.',
    ],
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
      'Logged and tracked bugs using JIRA.',
    ],
  },
];

const Experience = () => (
  <section id="experience" data-testid="section-experience" className="bg-white py-24">
    <div className="section-shell">
      <header className="mx-auto mb-16 max-w-3xl text-center">
        <span className="section-kicker">Delivery Record</span>
        <h2 className="section-title">Work Experience</h2>
        <p className="section-copy">
          Highlighting my professional journey, key roles and significant contributions in the software
          quality assurance landscape.
        </p>
      </header>

      <div className="relative space-y-8 lg:before:absolute lg:before:left-6 lg:before:top-3 lg:before:h-[calc(100%-1.5rem)] lg:before:w-px lg:before:bg-gradient-to-b lg:before:from-cyan-300 lg:before:via-slate-200 lg:before:to-emerald-300">
        {experiences.map((exp, index) => (
          <article key={index} data-testid={`experience-card-${index + 1}`} className="relative lg:pl-16">
            <div className="absolute left-0 top-6 hidden h-12 w-12 items-center justify-center rounded-2xl border border-cyan-200 bg-white text-cyan-700 shadow-lg shadow-cyan-900/10 lg:flex">
              <CheckCircle2 size={22} />
            </div>

            <div className="premium-card premium-card-hover p-6 sm:p-7">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-950">{exp.title}</h3>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Award size={16} />
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`experience-company-link-${index + 1}`}
                        className="font-bold text-cyan-700 hover:text-cyan-900"
                      >
                        {exp.company}
                      </a>
                      {exp.companyLinkedIn && (
                        <a
                          href={exp.companyLinkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${exp.company} LinkedIn`}
                          data-testid={`experience-linkedin-${index + 1}`}
                          className="text-slate-400 hover:text-blue-600"
                        >
                          <Linkedin size={16} />
                        </a>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-slate-500">
                      <MapPin size={16} />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex w-fit items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
                  <Calendar size={16} className="mr-2" />
                  {exp.duration}
                </div>
              </div>

              <ul className="mt-6 grid gap-3 text-sm text-slate-700 md:grid-cols-2">
                {exp.responsibilities.map((task, idx) => (
                  <li
                    key={idx}
                    data-testid={`experience-responsibility-${toTestId(exp.title)}-${idx + 1}`}
                    className="flex gap-3 rounded-2xl bg-slate-50 p-3 leading-6"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-500" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Experience;
