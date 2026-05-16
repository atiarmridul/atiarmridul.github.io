import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "../constants";

const Header = () => {
  // Controls mobile navigation visibility on smaller devices
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Tracks scroll position to apply dynamic header styling
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Adds background and shadow after user scrolls for better readability
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup prevents duplicate event listeners during rerenders
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Opens resume in a new tab for recruiter convenience
  const handleDownloadResume = () => {
    window.open("https://flowcv.com/resume/vwl1uu59wg", "_blank");
  };

  // Smoothly scrolls users to the selected portfolio section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });

    // Automatically closes mobile menu after navigation
    setIsMenuOpen(false);
  };

  return (
    // Fixed navigation improves accessibility on long scrolling pages
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Personal branding and quick identity recognition */}
          <div className="text-2xl font-bold text-blue-800">
            Md. Atiar Rahman Chowdhury
          </div>

          {/* Desktop navigation optimized for larger screens */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-gray-700 hover:text-blue-800 transition-colors duration-200"
              >
                {link.title}
              </button>
            ))}

            {/* Primary CTA for resume download */}
            <button
              onClick={handleDownloadResume}
              className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-200 flex items-center space-x-2"
            >
              <span>Resume</span>
            </button>
          </nav>

          {/* Mobile-friendly hamburger navigation toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-blue-800 transition-colors duration-200"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile navigation menu rendered conditionally */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-gray-700 hover:text-blue-800 transition-colors duration-200 text-left"
                >
                  {link.title}
                </button>
              ))}

              {/* Keeps resume access visible for mobile users */}
              <button
                onClick={handleDownloadResume}
                className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-200 flex items-center space-x-2 w-fit"
              >
                <span>Resume</span>
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
