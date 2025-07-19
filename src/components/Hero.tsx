import React from 'react';
import { ChevronDown, Shield, Target, CheckCircle } from 'lucide-react';

const Hero = () => {
  const scrollToNext = () => {
    const element = document.getElementById('skills');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center pt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Senior <span className="text-blue-800">SQA</span> Engineer
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            ISTQB® Certified Software QA Engineer with 6 years of experience ensuring the quality and reliability of web and mobile applications. I focus on thorough manual testing and have successfully reviewed requirements, created test strategies, and executed full testing cycles in Agile environments. I’ve worked closely with developers, designers, and product managers to catch bugs early, improve coverage, and support high-quality releases. Along the way, I’ve gained hands-on experience in automation and API testing and continuously look for ways to grow and add value to every project.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
              <Shield className="text-green-600" size={20} />
              <span className="text-gray-700 font-medium">Quality Assurance</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
              <Target className="text-blue-600" size={20} />
              <span className="text-gray-700 font-medium">Test Automation</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
              <CheckCircle className="text-emerald-600" size={20} />
              <span className="text-gray-700 font-medium">Performance Testing</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-blue-800 text-white px-8 py-4 rounded-lg hover:bg-blue-900 transition-all duration-200 transform hover:scale-105 font-medium"
            >
              View My Projects
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-blue-800 text-blue-800 px-8 py-4 rounded-lg hover:bg-blue-800 hover:text-white transition-all duration-200 transform hover:scale-105 font-medium"
            >
              Get In Touch
            </button>
          </div>

          <button 
            onClick={scrollToNext}
            className="animate-bounce text-blue-800 hover:text-blue-900 transition-colors duration-200"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;