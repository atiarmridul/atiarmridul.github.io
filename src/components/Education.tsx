import React from 'react';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';

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
    ]
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
    ]
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
    ]
  }
];

const Education = () => {
  return (
    <section id="education" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Education
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Strong academic foundation in computer science and engineering, complemented by continuous professional development.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-blue-200" />

          <div className="space-y-12">
            {educationData.map((edu, index) => (
              <div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col md:space-x-8`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg" />

                {/* Content */}
                <div className={`w-full md:w-1/2 ml-12 md:ml-0 ${
                  index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                }`}>
                  <div className="bg-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <GraduationCap className="text-blue-600 mr-3" size={24} />
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 leading-tight">
                            {edu.degree}
                          </h3>
                          <p className="text-blue-600 font-semibold mt-1">
                            {edu.institution}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Calendar size={16} className="mr-1" />
                        {edu.duration}
                      </span>
                      <span className="flex items-center">
                        <MapPin size={16} className="mr-1" />
                        {edu.location}
                      </span>
                      <span className="flex items-center">
                        <Award size={16} className="mr-1" />
                        {edu.gpa}
                      </span>
                    </div>

                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {edu.description}
                    </p>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Areas:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {edu.highlights.map((highlight, highlightIndex) => (
                          <div key={highlightIndex} className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block w-1/2" />
              </div>
            ))}
          </div>
        </div>

        {/* Academic Excellence Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Academic Excellence</h3>
            <p className="text-lg mb-6 opacity-90">
              Consistent high performance throughout academic career, demonstrating dedication to learning and excellence.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold mb-2">3.42/4.00</div>
                <p className="text-sm opacity-90">University CGPA</p>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">4.42/5.00</div>
                <p className="text-sm opacity-90">HSC GPA</p>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">5.00/5.00</div>
                <p className="text-sm opacity-90">SSC GPA (Perfect Score)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;