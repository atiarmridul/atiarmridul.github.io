const toTestId = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const educationData = [
  {
    degree: 'Master of Business Administration (MBA)',
    institution: 'University of Dhaka',
    location: 'Bangladesh',
    duration: '2018 — 2020',
  },
  {
    degree: 'BSc in Information Technology',
    institution: 'University of Information Technology & Sciences',
    location: 'Bangladesh',
    duration: '2010 — 2015',
  },
];

const Education = () => (
  <section className="section wrap" id="education" data-testid="section-education">
    <div className="section-head">
      <span className="eyebrow reveal">Academic foundation</span>
      <h2 className="section-title reveal" data-d="1">
        Education.
      </h2>
    </div>

    <div className="card-grid education-grid reveal" data-d="1">
      {educationData.map((edu, i) => (
        <article className="edu-card" key={i} data-testid={`education-card-${i + 1}`}>
          <span className="tick">{edu.duration}</span>
          <h3 data-testid={`education-degree-${toTestId(edu.degree)}`}>{edu.degree}</h3>
          <p data-testid={`education-institution-${toTestId(edu.institution)}`}>
            {edu.institution} · {edu.location}
          </p>
        </article>
      ))}
    </div>
  </section>
);

export default Education;
