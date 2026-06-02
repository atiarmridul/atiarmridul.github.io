import { useState } from 'react';
import { Award, ExternalLink, GraduationCap, ShieldCheck } from 'lucide-react';

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
    <section id="achievements" className="bg-white py-24">
      <div className="section-shell">
        <div
          className="overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 text-center shadow-2xl shadow-slate-950/15 md:p-12"
          data-testid="learning-milestones"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">
            <ShieldCheck size={16} />
            Verified Growth
          </span>
          <h2 className="mt-5 text-4xl font-black tracking-tight text-white md:text-5xl">
            Learning Milestones
          </h2>
          <p className="mx-auto mt-5 mb-10 max-w-3xl text-lg leading-8 text-slate-300">
            A showcase of my professional certifications and commitment to continuous learning in the SQA
            field.
          </p>

          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {filters.map((option) => (
              <button
                key={option}
                data-testid={`achievement-filter-${toTestId(option)}`}
                className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 ${
                  filter === option
                    ? 'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/25'
                    : 'border border-white/10 bg-white/10 text-slate-200 hover:bg-white/20'
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
                className="group rounded-3xl border border-white/10 bg-white/[0.06] p-6 text-left shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-white/[0.09]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-200 ring-1 ring-cyan-300/20">
                  {type === 'Certification' ? <Award size={24} /> : <GraduationCap size={24} />}
                </div>
                <span
                  className="text-xs uppercase font-bold tracking-wider text-cyan-200 mb-2 block"
                  data-testid={`achievement-type-${toTestId(title)}`}
                >
                  {type}
                </span>
                <h4
                  className="font-black text-white text-lg leading-tight transition-colors group-hover:text-cyan-100"
                  data-testid={`achievement-title-${toTestId(title)}`}
                >
                  {title}
                </h4>
                {subtitle && <p className="text-sm text-slate-300 mt-2">{subtitle}</p>}
                {link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`achievement-link-${toTestId(title)}`}
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-slate-950 transition hover:bg-cyan-100"
                  >
                    View Certificate
                    <ExternalLink size={15} />
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
