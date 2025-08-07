import React from "react";
import { Heart } from "lucide-react";
import { navLinks } from "../constants";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Md. Atiar Rahman Chowdhury
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Dedicated to delivering exceptional software quality through
              comprehensive testing strategies and automation expertise.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() =>
                      document
                        .getElementById(link.id)
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Specializations</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Automation Testing</li>
              <li>Manual Testing</li>
              <li>API Testing</li>
              <li>Performance Testing</li>
              <li>Technical Documentation</li>
              <li>Project Management</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center">
            Made with <Heart className="text-red-500 mx-2" size={16} /> by a
            passionate SQA Engineer
          </p>
          <p className="text-gray-500 text-sm mt-2">
            © 2025 All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
