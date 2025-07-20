import React from 'react';
import { User, Target, Award, Heart } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Target className="text-blue-600" size={24} />,
      title: 'Precision & Quality',
      description: 'Every bug caught is a user experience saved. I believe in meticulous attention to detail and comprehensive testing strategies.'
    },
    {
      icon: <Award className="text-green-600" size={24} />,
      title: 'Continuous Learning',
      description: 'Technology evolves rapidly, and so do I. I stay updated with the latest testing frameworks, tools, and industry best practices.'
    },
    {
      icon: <Heart className="text-red-600" size={24} />,
      title: 'Team Collaboration',
      description: 'Quality is a team effort. I work closely with developers, product managers, and stakeholders to ensure seamless delivery.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Me
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Passionate about delivering exceptional software quality through innovative testing strategies and automation expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Profile Content */}
          <div>
            <div className="flex items-center mb-6">
              <User className="text-blue-600 mr-3" size={32} />
              <h3 className="text-2xl font-bold text-gray-900">My Journey</h3>
            </div>
            
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                With over 6 years of experience in software quality assurance, I've evolved from manual testing to specializing in test automation, API testing, and performance optimization across diverse projects from e-commerce platforms to mobile banking applications.
              </p>
              
              <p>
                What drives me is the satisfaction of delivering bug-free, high-performance software that users can rely on. I believe that quality assurance is not just about finding defects—it's about understanding user needs, collaborating with development teams, and implementing robust testing strategies that prevent issues before they occur.
              </p>
            </div>
          </div>

          {/* Values & Principles */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Core Values</h3>
            <div className="space-y-6">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-3 rounded-full mr-4 flex-shrink-0">
                      {value.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {value.title}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">6+</div>
              <p className="text-sm opacity-90">Years of Experience</p>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">20+</div>
              <p className="text-sm opacity-90">Projects Delivered</p>
            </div>
            <div className="text-3xl font-bold mb-2">2000+</div>
            <p className="text-sm opacity-90">Bugs Identified & Resolved</p>
            <div>
              <div className="text-3xl font-bold mb-2">99.9%</div>
              <p className="text-sm opacity-90">Quality Standard</p>
            </div>
          </div>
        </div>

};

export default About;