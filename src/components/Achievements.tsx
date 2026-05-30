import { useState } from 'react';

const toTestId = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

type Achievement = {
  type: 'Certification' | 'Training & Course';
  title: string;
  subtitle?: string;
  link: string;
};

const combinedAchievements: Achievement[] = [
  {
    type: 'Certification',
    title: 'ISTQB® Certified Tester - Foundation Level 4.0',
    link: 'https://zertdb.isqi.org/en/download/index/token/jAPq8%24J2y%24X%21Xy_39p84',
  },
  {
    type: 'Training & Course',
    title: 'Certified Expert SQA Automation Program',
    link: 'https://www.dropbox.com/scl/fi/16gkyzv9doj1iqmo2tds0/Md.-Atiar-Rahman-Chowdhury.jpg?rlkey=lpnx939z4qoh7vlt1p3eghx92&st=ewkble9w&dl=0',
  },
  {
    type: 'Training & Course',
    title: 'Mobile Automation with Appium and WebdriverIO',
    link: 'https://www.udemy.com/certificate/UC-994ba132-37ad-4a38-a6a1-0106e7796a2a/',
  },
  {
    type: 'Training & Course',
    title: 'Selenium WebDriver: Selenium Automation Testing with Java',
    link: 'https://www.udemy.com/certificate/UC-39d384a5-7977-4307-aca7-a3b164253ab1/',
  },
  {
    type: 'Training & Course',
    title: 'LambdaTest Software Testing Professional',
    link: 'https://www.linkedin.com/learning/certificates/60a20f529e5bb109fe85d7250e340c03dcddd81f115d8ce588890d41b1d25985?trk=share_certificate',
  },
  {
    type: 'Training & Course',
    title: 'LambdaTest Test Automation Professional',
    link: 'https://www.linkedin.com/learning/certificates/127fae46800047159138f6efaf951cbbaf36cebe88510ca3bd536e369bbdfcd9?trk=share_certificate',
  },
];

const Achievements = () => {
  const [filter, setFilter] = useState<'All' | Achievement['type']>('All');
  const filters: Array<'All' | Achievement['type']> = ['All', 'Certification', 'Training & Course'];

  const filteredAchievements =
    filter === 'All' ? combinedAchievements : combinedAchievements.filter((item) => item.type === filter);

  return (
    <section id="achievements" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="rounded-3xl p-8 md:p-12 border border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-100 shadow-sm text-center"
          data-testid="learning-milestones"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Learning Milestones</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            A showcase of my professional certifications and commitment to continuous learning in the SQA
            field.
          </p>

          <div className="mb-10 flex justify-center gap-4">
            {filters.map((option) => (
              <button
                key={option}
                data-testid={`achievement-filter-${toTestId(option)}`}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  filter === option
                    ? 'bg-blue-800 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setFilter(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map(({ type, title, subtitle, link }) => (
              <div
                key={title}
                data-testid={`achievement-card-${toTestId(title)}`}
                className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-6 text-left shadow-sm transition-all duration-300 transform hover:shadow-xl hover:-translate-y-2 group"
              >
                <span
                  className="text-xs uppercase font-bold tracking-wider text-blue-700 mb-2 block"
                  data-testid={`achievement-type-${toTestId(title)}`}
                >
                  {type}
                </span>
                <h4
                  className="font-bold text-gray-900 text-lg leading-tight group-hover:text-blue-800 transition-colors"
                  data-testid={`achievement-title-${toTestId(title)}`}
                >
                  {title}
                </h4>
                {subtitle && <p className="text-sm text-gray-600 mt-2">{subtitle}</p>}
                {link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`achievement-link-${toTestId(title)}`}
                    className="inline-flex items-center mt-4 text-sm font-bold text-blue-800 hover:text-blue-900 group"
                  >
                    View Certificate
                    <svg
                      className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
