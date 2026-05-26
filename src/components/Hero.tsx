import { ChevronDown, Shield, Target, CheckCircle } from 'lucide-react';

const heroTags = [
  { Icon: Shield, color: 'text-green-600', label: 'Quality Assurance' },
  { Icon: Target, color: 'text-blue-600', label: 'Test Automation' },
  { Icon: CheckCircle, color: 'text-emerald-600', label: 'Performance Testing' },
];

const toTestId = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const Hero = () => {
  // Smoothly navigates users to the next content section
  const scrollToNext = () => {
    const element = document.getElementById('about');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    // Main landing section designed for strong first impression and branding
    <section
      id="hero"
      data-testid="section-hero"
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center pt-32 sm:pt-44
 pb-20 sm:pb-28"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Primary headline communicating engineering and QA mindset */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Precision. <span className="text-blue-800"> Quality. </span> Collaboration.
          </h1>

          {/* Supporting statement highlighting professional specialization */}
          <p className="text-base sm:text-lg md:text-2xl text-gray-600 mb-10 sm:mb-12 leading-relaxed">
            Passion for Clean Releases. Focused on Automation. Trusted for Reliability.
          </p>

          {/* Quick skill highlights for recruiter-friendly scanning */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-5 md:gap-8 mb-14 sm:mb-16">
            {heroTags.map(({ Icon, color, label }) => (
              <div
                key={label}
                data-testid={`hero-tag-${toTestId(label)}`}
                className="flex items-center space-x-2 bg-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-md"
              >
                <Icon className={color} size={18} />
                <span className="text-sm sm:text-base text-gray-700 font-medium">{label}</span>
              </div>
            ))}
          </div>

          {/* Main recruiter interaction buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-16 sm:mb-20">
            <button
              onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
              aria-label="View technical expertise"
              data-testid="hero-technical-expertise-button"
              className="bg-blue-800 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg hover:bg-blue-900 transition-all duration-200 transform hover:scale-105 font-medium text-sm sm:text-base"
            >
              Technical Expertise
            </button>

            {/* Secondary CTA encouraging direct communication */}
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              aria-label="Go to contact section"
              data-testid="hero-contact-button"
              className="border-2 border-blue-800 text-blue-800 px-6 py-3 sm:px-8 sm:py-4 rounded-lg hover:bg-blue-800 hover:text-white transition-all duration-200 transform hover:scale-105 font-medium text-sm sm:text-base"
            >
              Get In Touch
            </button>
          </div>

          {/* Visual scroll indicator encouraging deeper page exploration */}
          <button
            onClick={scrollToNext}
            aria-label="Scroll to about section"
            data-testid="hero-scroll-down-button"
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
