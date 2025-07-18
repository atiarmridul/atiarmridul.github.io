import React from 'react';
import { ExternalLink, Github, TestTube, Shield, Zap } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "E-commerce Testing Framework",
      description: "Comprehensive automation framework for testing an e-commerce platform with 500+ test cases covering functional, API, and performance testing.",
      technologies: ["Selenium", "TestNG", "Java", "Maven", "Jenkins"],
      features: [
        "Cross-browser compatibility testing",
        "API testing with REST Assured",
        "Performance testing with JMeter",
        "Continuous integration with Jenkins"
      ],
      icon: <TestTube className="text-blue-600" size={24} />,
      github: "#",
      demo: "#"
    },
    {
      title: "Mobile Banking App Testing",
      description: "End-to-end testing strategy for a mobile banking application, including security testing and accessibility compliance.",
      technologies: ["Appium", "Python", "Pytest", "BrowserStack"],
      features: [
        "Multi-device testing strategy",
        "Security vulnerability assessment",
        "WCAG 2.1 accessibility testing",
        "Load testing for peak traffic"
      ],
      icon: <Shield className="text-green-600" size={24} />,
      github: "#",
      demo: "#"
    },
    {
      title: "API Testing Suite",
      description: "Robust API testing framework with automated test generation, data-driven testing, and comprehensive reporting.",
      technologies: ["Postman", "Newman", "JavaScript", "Docker"],
      features: [
        "Automated API documentation testing",
        "Contract testing implementation",
        "Performance benchmarking",
        "Detailed HTML reporting"
      ],
      icon: <Zap className="text-yellow-600" size={24} />,
      github: "#",
      demo: "#"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-world testing projects demonstrating expertise in automation, 
            performance testing, and quality assurance best practices
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {project.icon}
                  <h3 className="text-xl font-bold text-gray-900 ml-3">
                    {project.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {project.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <a 
                    href={project.github}
                    className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    <Github size={18} className="mr-2" />
                    <span className="text-sm">Code</span>
                  </a>
                  <a 
                    href={project.demo}
                    className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    <ExternalLink size={18} className="mr-2" />
                    <span className="text-sm">Demo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;