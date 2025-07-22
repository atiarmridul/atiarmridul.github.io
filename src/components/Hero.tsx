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
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center pt-32 sm:pt-44
 pb-20 sm:pb-28"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Precision. <span className="text-blue-800"> Quality. </span> Collaboration.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-2xl text-gray-600 mb-10 sm:mb-12 leading-relaxed">
            Passion for Clean Releases. Focused on Automation. Trusted for Reliability.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-5 md:gap-8 mb-14 sm:mb-16">
            <div className="flex items-center space-x-2 bg-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-md">
              <Shield className="text-green-600" size={18} />
              <span className="text-sm sm:text-base text-gray-700 font-medium">
                Quality Assurance
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-md">
              <Target className="text-blue-600" size={18} />
              <span className="text-sm sm:text-base text-gray-700 font-medium">
                Test Automation
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-md">
              <CheckCircle className="text-emerald-600" size={18} />
              <span className="text-sm sm:text-base text-gray-700 font-medium">
                Performance Testing
              </span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-16 sm:mb-20">
            <button
              onClick={() =>
                document
                  .getElementById("skills")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-blue-800 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg hover:bg-blue-900 transition-all duration-200 transform hover:scale-105 font-medium text-sm sm:text-base"
            >
              Technical Expertise
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="border-2 border-blue-800 text-blue-800 px-6 py-3 sm:px-8 sm:py-4 rounded-lg hover:bg-blue-800 hover:text-white transition-all duration-200 transform hover:scale-105 font-medium text-sm sm:text-base"
            >
              Get In Touch
            </button>
          </div>

          {/* Scroll Down Icon */}
          <button
            onClick={scrollToNext}
            className="animate-bounce text-blue-800 hover:text-blue-900 transition-colors duration-200"
          >
            <ChevronDown size={28} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
