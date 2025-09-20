import React from 'react';

const domains = [
  {
    title: 'Telco',
  },
  {
    title: 'E-commerce & Retail',
  },
  {
    title: 'Healthcare & Medical',
  },
  {
    title: 'Education & E-learning',
  },
  {
    title: 'Logistics & Supply Chain',
  },
  {
    title: 'Enterprise & SaaS',
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
          {domains.map((domain, index) => (
            <article 
              key={index}
              className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-300"
            >
              <header className="flex items-center justify-center">
                <h3 className="text-xl font-bold text-gray-900">{domain.title}</h3>
              </header>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Domains;
