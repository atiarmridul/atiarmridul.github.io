import React from 'react';
import { Calendar, MapPin, Award } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: "Software QA Engineer (Automation)",
      company: "Portonics Limited",
      location: "Dhaka, Bangladesh",
      duration: "2024 - Present",
      description: "Lead quality assurance initiatives for enterprise software products serving 1M+ users. Manage testing team of 5 engineers and establish QA best practices.",
      achievements: [
        "Conducted detailed requirement analysis and story reviews to understand feature scope before test case design.",
        "Develop and maintain well-structured test cases,collaborating with product managers and developers to refine them and improve test planning",
        "Conducted functional, integration, regression, UI/UX, and UAT testing",
        "Perform API testing to validate backend services",
        "Debugged and identified issues using Kibana logs, improving test accuracy and system reliability.",
        "Collaborated with developers and DevOps teams to investigate and resolve production and testing environment issues using log analysis.",
        "Authored technical documentation (User Manual).",
        "Participated in Agile ceremonies, including Sprint Planning, Standups, Reviews, Retrospectives, and Backlog Refinement."     
      ]
    },
    {
      title: "SQA Engineer",
      company: "Audacity IT Solutions Limited",
      location: "Dhaka, Bangladesh",
      duration: "2021 - 2024",
      description: "Designed and executed comprehensive testing strategies for web and mobile applications in fast-paced startup environment.",
      achievements: [
     "Working on multiple projects in parallel from requirement analysis to product release phase.",
        "Conducted UI automation testing for web and mobile apps with Playwright, WebdriverIO, and Appium.",
        "Used Git, GitHub, and GitHub Actions for version control and CI.",
        "Performed API testing and automation with Postman, Newman, and RestAssured.",
        "Executed performance testing using JMeter.",
        "Verified front-end data with databases using TablePlus.",
        "Conducted security testing and reporting with OWASP ZAP.",
        "Participated in Agile ceremonies, including Sprint Planning, Standups, Reviews, Retrospectives, and Backlog Refinement."   
      ]
    },
    {
      title: "Junior QA Analyst",
      company: "Audacity IT Solutions Limited",
      location: "Dhaka, Bangladesh",
      duration: "2020 - 2021",
      description: "Performed manual and automated testing for various client projects, focusing on functional and regression testing.",
      achievements: [
        "• Regularly communicate with stakeholders about requirements and discuss doubts/queries.",
        "Authored technical documentation (SRS).",
        "Work under the supervision of a Project manager on Small-scale product design.",
        "Validating that client expectations are achieved during the design phase. Worked with Figma and Adobe XD."
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Work Experience
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Progressive career growth in quality assurance with proven track record 
            of delivering high-quality software solutions
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-blue-200"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col md:space-x-8`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>

                {/* Content */}
                <div className={`w-full md:w-1/2 ml-12 md:ml-0 ${
                  index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                }`}>
                  <div className="bg-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">
                        {exp.title}
                      </h3>
                      <div className="flex items-center text-blue-600 text-sm font-medium">
                        <Calendar size={16} className="mr-1" />
                        {exp.duration}
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-4">
                      <div className="flex items-center mr-4">
                        <Award size={16} className="mr-1" />
                        <span className="font-medium">{exp.company}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-1" />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Achievements:</h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700 text-sm">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block w-1/2"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Career Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold mb-2">6+</div>
                <div className="text-sm opacity-90">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-sm opacity-90">Projects Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">2000+</div>
                <div className="text-sm opacity-90">Bugs Found & Fixed</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">99.9%</div>
                <div className="text-sm opacity-90">Quality Standard</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;