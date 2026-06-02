import React from 'react';
import { GraduationCap, MapPin } from 'lucide-react';

const toTestId = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

type ColorKey = 'blue' | 'purple';

type EducationType = {
  degree: string;
  institution: string;
  location: string;
  duration: string;
  color: ColorKey;
};

const colorStyles: Record<ColorKey, Record<string, string>> = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: 'text-blue-600',
    accent: 'bg-blue-600',
    text: 'text-blue-700',
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    icon: 'text-purple-600',
    accent: 'bg-purple-600',
    text: 'text-purple-700',
  },
};

const educationData: EducationType[] = [
  {
    degree: 'Master of Business Administration (MBA)',
    institution: 'University of Dhaka',
    location: 'Bangladesh',
    duration: '2018 - 2020',
    color: 'purple',
  },
  {
    degree: 'BSc in Information Technology',
    institution: 'University of Information Technology & Sciences',
    location: 'Bangladesh',
    duration: '2010 - 2015',
    color: 'blue',
  },
];

const EducationCard: React.FC<{ edu: EducationType; index: number }> = ({ edu, index }) => {
  const colors = colorStyles[edu.color];

  return (
    <div
      data-testid={`education-card-${index + 1}`}
      className="premium-card premium-card-hover relative w-full flex-1 overflow-hidden p-8 md:max-w-[450px]"
    >
      <div aria-hidden="true" className={`absolute right-0 top-0 h-1.5 w-full ${colors.accent}`} />

      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 ring-1 ring-slate-100">
        <GraduationCap className={colors.icon} size={28} />
      </div>

      <h3
        className="text-center text-2xl font-black text-slate-950 mb-2"
        data-testid={`education-degree-${toTestId(edu.degree)}`}
      >
        {edu.degree}
      </h3>

      <p
        className={`text-lg ${colors.text} font-bold mb-3 text-center`}
        data-testid={`education-institution-${toTestId(edu.institution)}`}
      >
        {edu.institution}
      </p>

      <div className="flex flex-col items-center gap-2 text-base font-semibold text-slate-600 mb-2">
        <span className="flex items-center" data-testid={`education-location-${toTestId(edu.degree)}`}>
          <MapPin size={20} className="mr-2" />
          {edu.location}
        </span>
      </div>
    </div>
  );
};

const Education: React.FC = () => (
  <section id="education" data-testid="section-education" className="bg-slate-50 py-24">
    <div className="section-shell">
      <header className="mx-auto mb-16 max-w-3xl text-center">
        <span className="section-kicker">Academic Foundation</span>
        <h2 className="section-title">Education</h2>
        <p className="section-copy">
          Strong academic foundation in computer science and engineering, complemented by continuous
          professional development.
        </p>
      </header>

      <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-start gap-8">
        {educationData.map((edu, i) => (
          <EducationCard key={i} edu={edu} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Education;
