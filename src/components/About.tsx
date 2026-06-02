import { motion } from 'framer-motion';
import { Award, CheckCircle2, Gem, Heart, Target, User } from 'lucide-react';

const toTestId = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const values = [
  {
    Icon: Target,
    color: 'text-blue-600',
    title: 'Precision & Quality',
    description:
      'Every bug caught is a user experience saved. I believe in meticulous attention to detail and comprehensive testing strategies.',
  },
  {
    Icon: Award,
    color: 'text-green-600',
    title: 'Continuous Learning',
    description:
      'Technology evolves rapidly, and so do I. I stay updated with the latest testing frameworks, tools, and industry best practices.',
  },
  {
    Icon: Heart,
    color: 'text-red-600',
    title: 'Team Collaboration',
    description:
      'Quality is a team effort. I work closely with developers, product managers, and stakeholders to ensure seamless delivery.',
  },
];

const About = () => {
  return (
    <section id="about" data-testid="section-about" className="relative bg-slate-50 py-24">
      <div className="section-shell">
        <header className="mx-auto mb-16 max-w-3xl text-center">
          <span className="section-kicker">Quality Mindset</span>
          <h2 className="section-title">About Me</h2>
          <p className="section-copy">
            Passionate about delivering exceptional software quality through innovative testing strategies and
            automation expertise.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            className="premium-card premium-card-hover p-7 sm:p-8"
          >
            <div className="flex items-center mb-6">
              <div className="mr-4 rounded-2xl bg-cyan-50 p-3 ring-1 ring-cyan-100">
                <User className="text-cyan-700" size={28} aria-label="User Icon" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">Career Profile</p>
                <h3 className="text-2xl font-black text-slate-950">My Journey</h3>
              </div>
            </div>

            <p className="text-slate-700 leading-8 mb-4">
              I am an ISTQB® Certified Senior Software QA Engineer with 6+ years of experience testing web and
              mobile applications. I specialize in both manual and automated testing, with a focus on early
              bug detection, API validation, and full-cycle test coverage.
            </p>

            <p className="text-slate-700 leading-8 mb-4">
              I collaborate closely with cross-functional Agile teams — including developers, designers,
              DevOps, and product managers — to design and implement testing strategies that ensure
              high-quality, timely releases.
            </p>

            <p className="text-slate-700 leading-8">
              I see QA as a mindset, not just a phase — combining curiosity, clarity, and collaboration to
              improve every stage of the development lifecycle. From test design to automation and mentoring,
              I bring a user-first approach and a commitment to continuous learning.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {['ISTQB CTFL 4.0', 'Agile Delivery', 'Release Quality'].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-3">
                  <CheckCircle2 className="text-emerald-500" size={18} />
                  <span className="text-sm font-bold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </motion.article>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.08 }}
          >
            <div className="flex items-center mb-8">
              <div className="mr-4 rounded-2xl bg-amber-50 p-3 ring-1 ring-amber-100">
                <Gem size={26} className="text-amber-500" aria-label="Core Values Icon" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
                  Operating Principles
                </p>
                <h3 className="text-2xl font-black text-slate-950">Core Values</h3>
              </div>
            </div>
            <ul className="space-y-6">
              {values.map(({ Icon, color, title, description }, idx) => (
                <li
                  key={idx}
                  data-testid={`core-value-${toTestId(title)}`}
                  className="premium-card premium-card-hover p-6"
                >
                  <div className="flex items-start">
                    <div className="bg-slate-50 p-3 rounded-2xl mr-4 flex-shrink-0 ring-1 ring-slate-100">
                      <Icon className={`${color}`} size={24} aria-label={title} />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-slate-950 mb-2">{title}</h4>
                      <p className="text-slate-600 text-sm leading-7">{description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </motion.aside>
        </div>

        {/* Dark metric band creates a dashboard-style break between narrative and capability sections. */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          className="mt-16 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-2xl shadow-slate-950/10 sm:p-8"
          data-testid="about-stats"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Years of Experience', value: '6+' },
              { label: 'Projects Delivered', value: '15+' },
              { label: 'Bugs Identified & Resolved', value: '2000+' },
              { label: 'Quality Standard', value: '99.9%' },
            ].map((stat, index) => (
              <div key={index} data-testid={`about-stat-${toTestId(stat.label)}`}>
                <div
                  className="text-4xl font-black mb-2 text-white"
                  data-testid={`about-stat-value-${toTestId(stat.label)}`}
                >
                  {stat.value}
                </div>
                <p
                  className="text-sm font-semibold text-slate-400"
                  data-testid={`about-stat-label-${toTestId(stat.label)}`}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </section>
  );
};

export default About;
