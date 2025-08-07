import React from 'react';
import { 
  Building2, 
  ShoppingCart, 
  Smartphone, 
  // CreditCard, 
  GraduationCap, 
  Heart,
  Truck,
  Users
} from 'lucide-react';

const domains = [
  {
    icon: <Smartphone className="text-blue-600" size={32} />,
    title: 'Telco',
    description: 'Mobile banking applications, payment gateways, and financial transaction systems with focus on security and compliance testing.',
    projects: ['Mobile Banking App', 'Payment Processing System', 'Digital Wallet Platform'],
    // keyAspects: ['Security Testing', 'PCI DSS Compliance', 'Transaction Validation', 'Multi-factor Authentication']
  },
  {
    icon: <ShoppingCart className="text-green-600" size={32} />,
    title: 'E-commerce & Retail',
    description: 'Online shopping platforms, inventory management systems, and customer-facing retail applications.',
    projects: ['E-commerce Platform', 'Inventory Management', 'Customer Portal'],
    // keyAspects: ['Payment Integration', 'Cart Functionality', 'Order Management', 'User Experience Testing']
  },
  {
    icon: <Heart className="text-red-600" size={32} />,
    title: 'Healthcare & Medical',
    description: 'Healthcare management systems, patient portals, and medical device software with HIPAA compliance focus.',
    projects: ['Patient Management System', 'Medical Records Platform', 'Telemedicine App'],
    // keyAspects: ['HIPAA Compliance', 'Data Privacy', 'Patient Safety', 'Medical Device Testing']
  },
  {
    icon: <GraduationCap className="text-purple-600" size={32} />,
    title: 'Education & E-learning',
    description: 'Learning management systems, online course platforms, and educational mobile applications.',
    projects: ['LMS Platform', 'Online Course System', 'Student Portal'],
    // keyAspects: ['User Accessibility', 'Content Management', 'Assessment Tools', 'Multi-device Support']
  },
  {
    icon: <Truck className="text-orange-600" size={32} />,
    title: 'Logistics & Supply Chain',
    description: 'Transportation management, warehouse systems, and supply chain optimization platforms.',
    projects: ['Fleet Management', 'Warehouse System', 'Delivery Tracking'],
    // keyAspects: ['Real-time Tracking', 'Route Optimization', 'Inventory Control', 'GPS Integration']
  },
  {
    icon: <Building2 className="text-indigo-600" size={32} />,
    title: 'Enterprise & SaaS',
    description: 'Business management software, CRM systems, and enterprise-level SaaS applications.',
    projects: ['CRM Platform', 'Project Management Tool', 'Business Analytics'],
    // keyAspects: ['Scalability Testing', 'API Integration', 'Multi-tenant Architecture', 'Performance Optimization']
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
              className="bg-gray-50 rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <header className="flex items-center mb-4">
                <div className="bg-white p-3 rounded-full shadow-md mr-4">
                  {domain.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{domain.title}</h3>
              </header>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {domain.description}
              </p>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Users size={16} className="mr-2 text-blue-600" />
                  Project Types:
                </h4>
                <ul className="space-y-1">
                  {domain.projects.map((project, projectIndex) => (
                    <li key={projectIndex} className="flex items-center text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
                      {project}
                    </li>
                  ))}
                </ul>
              </div>

              {/* <div>
                <h4 className="font-semibold text-gray-900 mb-3">Key Testing Focus:</h4>
                <div className="flex flex-wrap gap-2">
                  {domain.keyAspects.map((aspect, aspectIndex) => (
                    <span 
                      key={aspectIndex}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {aspect}
                    </span>
                  ))}
                </div>
              </div> */}
            </article>
          ))}
        </div>

        {/* Summary Stats */}
        {/* <section className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Cross-Domain Impact</h3>
            <p className="text-blue-100">
              Delivering quality assurance across multiple industries with specialized domain knowledge
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Industries Served', value: '6+' },
              { label: 'Domain Projects', value: '20+' },
              { label: 'Compliance Standards', value: '10+' },
              { label: 'Business Verticals', value: '15+' }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <p className="text-sm text-blue-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </section> */}
      </div>
    </section>
  );
};

export default Domains;