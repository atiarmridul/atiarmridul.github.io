import React from "react";
import { ChevronDown, Shield, Target, CheckCircle } from "lucide-react";

const Hero = () => {
  const scrollToNext = () => {
    const element = document.getElementById("about");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="min-h-[110vh] bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center pt-32 pb-32"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight whitespace-nowrap">
            Precision. <span className="text-blue-800">Quality</span>.
            Collaboration
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
            Passion for Clean Releases. Focused on Automation. Trusted for
            Reliability.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
              <Shield className="text-green-600" size={20} />
              <span className="text-gray-700 font-medium">
                Quality Assurance
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
              <Target className="text-blue-600" size={20} />
              <span className="text-gray-700 font-medium">Test Automation</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
              <CheckCircle className="text-emerald-600" size={20} />
              <span className="text-gray-700 font-medium">
                Performance Testing
              </span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <button
              onClick={() =>
                document
                  .getElementById("experience")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-blue-800 text-white px-8 py-4 rounded-lg hover:bg-blue-900 transition-all duration-200 transform hover:scale-105 font-medium"
            >
              View My Work Experience
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="border-2 border-blue-800 text-blue-800 px-8 py-4 rounded-lg hover:bg-blue-800 hover:text-white transition-all duration-200 transform hover:scale-105 font-medium"
            >
              Get In Touch
            </button>
          </div>

          {/* Scroll Down Icon */}
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
