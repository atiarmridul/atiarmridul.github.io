import { User, Target, Award, Heart, Gem } from "lucide-react";

const values = [
  {
    Icon: Target,
    color: "text-blue-600",
    title: "Precision & Quality",
    description:
      "Every bug caught is a user experience saved. I believe in meticulous attention to detail and comprehensive testing strategies.",
  },
  {
    Icon: Award,
    color: "text-green-600",
    title: "Continuous Learning",
    description:
      "Technology evolves rapidly, and so do I. I stay updated with the latest testing frameworks, tools, and industry best practices.",
  },
  {
    Icon: Heart,
    color: "text-red-600",
    title: "Team Collaboration",
    description:
      "Quality is a team effort. I work closely with developers, product managers, and stakeholders to ensure seamless delivery.",
  },
];

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <header className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Me
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Passionate about delivering exceptional software quality through
            innovative testing strategies and automation expertise.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Profile Section */}
          <article>
            <div className="flex items-center mb-6">
              <User
                className="text-blue-600 mr-3"
                size={32}
                aria-label="User Icon"
              />
              <h3 className="text-2xl font-bold text-gray-900">My Journey</h3>
            </div>

            <p className="text-gray-700 leading-relaxed text-justify tracking-wide mb-4">
              I am an ISTQB® Certified Senior Software QA Engineer with 6+ years of
              experience testing web and mobile applications. I specialize in
              both manual and automated testing, with a focus on early bug
              detection, API validation, and full-cycle test coverage.
            </p>

            <p className="text-gray-700 leading-relaxed text-justify tracking-wide mb-4">
              I collaborate closely with cross-functional Agile teams —
              including developers, designers, DevOps, and product managers — to
              design and implement testing strategies that ensure high-quality,
              timely releases. 
            </p>

            <p className="text-gray-700 leading-relaxed text-justify tracking-wide">
              I see QA as a mindset, not just a phase — combining curiosity,
              clarity, and collaboration to improve every stage of the
              development lifecycle. From test design to automation and
              mentoring, I bring a user-first approach and a commitment to
              continuous learning.
            </p>
          </article>

          {/* Core Values Section */}
          <aside>
            <div className="flex items-center mb-8">
              <Gem
                size={28}
                className="text-yellow-500 mr-3"
                aria-label="Core Values Icon"
              />
              <h3 className="text-2xl font-bold text-gray-900">Core Values</h3>
            </div>
            <ul className="space-y-6">
              {values.map(({ Icon, color, title, description }, idx) => (
                <li
                  key={idx}
                  className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-3 rounded-full mr-4 flex-shrink-0">
                      <Icon
                        className={`${color}`}
                        size={24}
                        aria-label={title}
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {title}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        {/* Stats Section */}
        <section className="mt-16 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 border border-gray-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Years of Experience", value: "6+" },
              { label: "Projects Delivered", value: "15+" },
              { label: "Bugs Identified & Resolved", value: "2000+" },
              { label: "Quality Standard", value: "99.9%" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold mb-2 text-blue-800">{stat.value}</div>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default About;
