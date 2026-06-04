const toTestId = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const domains: Array<{ title: string; caption: string }> = [
  {
    title: 'Telco',
    caption: 'High-volume workflows, integrations, and uptime-sensitive validation.',
  },
  {
    title: 'E-commerce & Retail',
    caption: 'Checkout, inventory, catalog, mobile, and payment-adjacent quality checks.',
  },
  {
    title: 'Healthcare & Medical',
    caption: 'Accuracy-focused testing for regulated and user-sensitive experiences.',
  },
  {
    title: 'Education & E-learning',
    caption: 'Learning journeys, content flows, user roles, and cross-device coverage.',
  },
  {
    title: 'Logistics & Supply Chain',
    caption: 'Operational workflows, tracking, backend validation, and data consistency.',
  },
  {
    title: 'Enterprise & SaaS',
    caption: 'Role-based access, dashboards, API contracts, and release confidence.',
  },
];

const Domains = () => (
  <section className="section wrap" id="domains" data-testid="section-domains">
    <div className="section-head">
      <span className="eyebrow reveal">Industry coverage</span>
      <h2 className="section-title reveal" data-d="1">
        Domains I&apos;ve
        <br />
        tested across.
      </h2>
    </div>

    <div className="card-grid reveal" data-d="1">
      {domains.map((d) => (
        <article className="edu-card" key={d.title} data-testid={`domain-card-${toTestId(d.title)}`}>
          <span className="tick">Sector</span>
          <h3>{d.title}</h3>
          <p>{d.caption}</p>
        </article>
      ))}
    </div>
  </section>
);

export default Domains;
