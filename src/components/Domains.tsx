import React from 'react';

type ColorKey = "blue" | "green" | "red" | "purple" | "orange" | "indigo";

const colorStyles: Record<ColorKey, Record<string, string>> = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
  },
  red: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-700",
  },
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-700",
  },
  indigo: {
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    text: "text-indigo-700",
  },
};

const domains = [
  {
    title: 'Telco',
    color: 'blue',
  },
  {
    title: 'E-commerce & Retail',
    color: 'green',
  },
  {
    title: 'Healthcare & Medical',
    color: 'red',
  },
  {
    title: 'Education & E-learning',
    color: 'purple',
  },
  {
    title: 'Logistics & Supply Chain',
    color: 'orange',
  },
  {
    title: 'Enterprise & SaaS',
    color: 'indigo',
  }
];

const Domains = () => {
  return (
    <section id="domains" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Domain Expertise
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Extensive experience across diverse industries, bringing domain-specific testing knowledge 
            and understanding of business-critical requirements to ensure quality delivery.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {domains.map((domain, index) => {
            const colors = colorStyles[domain.color];
            return (
              <article 
                key={index}
                className={`
                  ${colors.bg} 
                  ${colors.border} 
                  rounded-xl p-6 shadow-lg hover:shadow-xl 
                  transition-all duration-300 transform hover:-translate-y-2 border
                `}
              >
                <header className="flex items-center justify-center">
                  <h3 className={`text-xl font-bold ${colors.text}`}>{domain.title}</h3>
                </header>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Domains;