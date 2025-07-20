import React from 'react';
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Star } from 'lucide-react';

const educationData = [
  {
    degree: 'Bachelor of Science in Computer Science and Engineering',
    institution: 'Daffodil International University',
    location: 'Dhaka, Bangladesh',
    duration: '2016 - 2020',
    gpa: 'CGPA: 3.42/4.00',
    description: 'Comprehensive study of computer science fundamentals including software engineering, algorithms, data structures, and database management systems.',
    highlights: [
      'Software Engineering & Testing Methodologies',
      'Database Design & Management',
      'Web Development & Programming',
      'Project Management & Team Leadership'
    ],
    color: 'blue'
  },
  {
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Govt. Shaheed Bulbul College',
    location: 'Pabna, Bangladesh',
    duration: '2013 - 2015',
    gpa: 'GPA: 4.42/5.00',
    description: 'Science background with focus on Mathematics, Physics, and Chemistry, building strong analytical and problem-solving foundations.',
    highlights: [
      'Mathematics & Analytical Thinking',
      'Physics & Logical Reasoning',
      'Chemistry & Scientific Method',
      'Research & Documentation Skills'
    ],
    color: 'green'
  },
  {
    degree: 'Secondary School Certificate (SSC)',
    institution: 'Pabna Zilla School',
    location: 'Pabna, Bangladesh',
    duration: '2011 - 2013',
    gpa: 'GPA: 5.00/5.00',
    description: 'Excellent academic performance with perfect GPA, demonstrating strong foundational knowledge and dedication to learning.',
    highlights: [
      'Perfect Academic Record',
      'Strong Foundation in Sciences',
      'Leadership & Communication Skills',
      'Time Management & Discipline'
    ],
    color: 'purple'
  }
];

const getColorClasses = (color: string) => {
  const colors = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: 'text-blue-600',
      accent: 'bg-blue-600',
      text: 'text-blue-700'
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: 'text-green-600',
      accent: 'bg-green-600',
      text: 'text-green-700'
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      icon: 'text-purple-600',
      accent: 'bg-purple-600',
      text: 'text-purple-700'
    }
  };
  return colors[color as keyof typeof colors];
};

const Education = () => {
  return (
    <section id="education" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Education
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Strong academic foundation in computer science and engineering, complemented by continuous professional development.
          </p>
        </div>

        {/* Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {educationData.map((edu, index) => {
            const colors = getColorClasses(edu.color);
            return (
              <div
                key={index}
                className={`${colors.bg} ${colors.border} border-2 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden`}
              >
                {/* Decorative element */}
                <div className={`absolute top-0 right-0 w-20 h-20 ${colors.accent} opacity-10 rounded-full -mr-10 -mt-10`}></div>
                
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`${colors.accent} p-3 rounded-xl`}>
                    <GraduationCap className="text-white" size={24} />
                  </div>
                  <div className={`${colors.accent} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                    {edu.gpa.split(': ')[1]}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                  {edu.degree}
                </h3>
                
                <p className={`${colors.text} font-semibold mb-3`}>
                  {edu.institution}
                </p>

                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {edu.duration}
                  </span>
                  <span className="flex items-center">
                    <MapPin size={14} className="mr-1" />
                    {edu.location.split(', ')[0]}
                  </span>
                </div>

                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  {edu.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2">
                  {edu.highlights.slice(0, 2).map((highlight, highlightIndex) => (
                    <div key={highlightIndex} className="flex items-center">
                      <Star size={12} className={`${colors.icon} mr-2 flex-shrink-0`} />
                      <span className="text-gray-700 text-xs">{highlight}</span>
                    </div>
                  ))}
                  {edu.highlights.length > 2 && (
                    <div className="text-xs text-gray-500 mt-2">
                      +{edu.highlights.length - 2} more areas
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Education;