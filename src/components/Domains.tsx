import { Building2, GraduationCap, HeartPulse, Network, ShoppingCart, Truck } from 'lucide-react';

type ColorKey = 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'indigo';

const toTestId = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const colorStyles: Record<ColorKey, Record<string, string>> = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-700',
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-700',
  },
  red: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-700',
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-700',
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-700',
  },
  indigo: {
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    text: 'text-indigo-700',
  },
};

const domains: Array<{ title: string; color: ColorKey; icon: JSX.Element; caption: string }> = [
  {
    title: 'Telco',
    color: 'blue',
    icon: <Network size={24} />,
    caption: 'High-volume workflows, integrations, and uptime-sensitive validation.',
  },
  {
    title: 'E-commerce & Retail',
    color: 'green',
    icon: <ShoppingCart size={24} />,
    caption: 'Checkout, inventory, catalog, mobile, and payment-adjacent quality checks.',
  },
  {
    title: 'Healthcare & Medical',
    color: 'red',
    icon: <HeartPulse size={24} />,
    caption: 'Accuracy-focused testing for regulated and user-sensitive experiences.',
  },
  {
    title: 'Education & E-learning',
    color: 'purple',
    icon: <GraduationCap size={24} />,
    caption: 'Learning journeys, content flows, user roles, and cross-device coverage.',
  },
  {
    title: 'Logistics & Supply Chain',
    color: 'orange',
    icon: <Truck size={24} />,
    caption: 'Operational workflows, tracking, backend validation, and data consistency.',
  },
  {
    title: 'Enterprise & SaaS',
    color: 'indigo',
    icon: <Building2 size={24} />,
    caption: 'Role-based access, dashboards, API contracts, and release confidence.',
  },
];

const Domains = () => {
  return (
    <section id="domains" data-testid="section-domains" className="bg-slate-50 py-24">
      <div className="section-shell">
        <header className="mx-auto mb-16 max-w-3xl text-center">
          <span className="section-kicker">Industry Coverage</span>
          <h2 className="section-title">Domain Expertise</h2>
          <p className="section-copy">
            Extensive experience across diverse industries, bringing domain-specific testing knowledge and
            understanding of business-critical requirements to ensure quality delivery.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {domains.map((domain, index) => {
            const colors = colorStyles[domain.color];
            return (
              <article
                key={index}
                data-testid={`domain-card-${toTestId(domain.title)}`}
                className="premium-card premium-card-hover p-6"
              >
                <header className="flex items-start gap-4">
                  <div className={`${colors.bg} ${colors.border} ${colors.text} rounded-2xl border p-3`}>
                    {domain.icon}
                  </div>
                  <div>
                    <h3 className={`text-xl font-black ${colors.text}`}>{domain.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{domain.caption}</p>
                  </div>
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
