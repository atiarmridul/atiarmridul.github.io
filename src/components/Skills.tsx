import React from 'react';
import { Code, Bug, Zap, Users, Database, Globe } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Testing Frameworks",
      icon: <Code className="text-blue-600" size={24} />,
      skills: ["Selenium WebDriver", "TestNG", "JUnit", "Webdriver IO", "Playwright"]
    },
    {
      title: "Programming Languages",
      icon: <Zap className="text-yellow-600" size={24} />,
      skills: ["Java", "JavaScript", "TypeScript", "MySQL"]
    },
    {
      title: "Testing Types",
      icon: <Bug className="text-red-600" size={24} />,
      skills: ["Functional Testing", "API Testing", "Performance Testing", "Security Testing", "Mobile Testing", "Accessibility Testing"]
    },
    {
      title: "Tools & Technologies",
      icon: <Database className="text-green-600" size={24} />,
      skills: ["JIRA", "Jenkins", "Git", "Docker", "Postman", "SonarQube"]
    },
    {
      title: "Methodologies",
      icon: <Users className="text-purple-600" size={24} />,
      skills: ["Agile", "Scrum", "CI/CD", "Test-Driven Development", "Behavior-Driven Development"]
    },
    {
      title: "Platforms",
      icon: <Globe className="text-indigo-600" size={24} />,
      skills: ["Web Applications", "Mobile Apps", "REST APIs", "Cross-browser Testing", "Database Testing"]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Technical Expertise
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive skill set spanning manual and automated testing, 
            with expertise in modern frameworks and methodologies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-center mb-4">
                {category.icon}
                <h3 className="text-xl font-semibold text-gray-900 ml-3">
                  {category.title}
                </h3>
              </div>
              <div className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className="inline-block bg-white px-3 py-1 rounded-full text-sm text-gray-700 mr-2 mb-2 border border-gray-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h4 className="font-semibold">ISTQB Certified</h4>
              <p className="text-sm opacity-90">Advanced Level Test Analyst</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h4 className="font-semibold">Selenium WebDriver</h4>
              <p className="text-sm opacity-90">Professional Certification</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h4 className="font-semibold">AWS Testing</h4>
              <p className="text-sm opacity-90">Cloud Testing Specialist</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;