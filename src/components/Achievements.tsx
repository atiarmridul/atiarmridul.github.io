import { useState } from 'react';
import { ExternalLink } from 'lucide-react';

const toTestId = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

type Achievement = {
  type: 'Certification' | 'Training & Course';
  title: string;
  link: string;
};

const combinedAchievements: Achievement[] = [
  {
    type: 'Certification',
    title: 'ISTQB® Certified Tester — Foundation Level 4.0',
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
    title: 'Selenium WebDriver: Automation Testing with Java',
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

  const filtered =
    filter === 'All' ? combinedAchievements : combinedAchievements.filter((item) => item.type === filter);

  return (
    <section className="section wrap" id="achievements" data-testid="section-achievements">
      <div className="section-head">
        <span className="eyebrow reveal">Verified growth</span>
        <h2 className="section-title reveal" data-d="1">
          Learning
          <br />
          milestones.
        </h2>
      </div>

      <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 40 }}>
        {filters.map((option) => (
          <button
            key={option}
            className={`pill${filter === option ? ' active' : ''}`}
            data-testid={`achievement-filter-${toTestId(option)}`}
            onClick={() => setFilter(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="card-grid reveal" data-d="1">
        {filtered.map(({ type, title, link }) => (
          <article className="edu-card" key={title} data-testid={`achievement-card-${toTestId(title)}`}>
            <span className="tick" data-testid={`achievement-type-${toTestId(title)}`}>
              {type}
            </span>
            <h3
              style={{ fontSize: 'clamp(18px, 2vw, 22px)' }}
              data-testid={`achievement-title-${toTestId(title)}`}
            >
              {title}
            </h3>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="edu-link"
              data-testid={`achievement-link-${toTestId(title)}`}
            >
              View certificate <ExternalLink size={13} />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
