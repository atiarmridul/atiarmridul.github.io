const ITEMS = [
  'Playwright',
  'WebdriverIO',
  'Appium',
  'Postman',
  'JMeter',
  'API Testing',
  'CI/CD',
  'Performance',
];

const Marquee = () => (
  <div className="marquee" aria-hidden="true">
    <div className="marquee-track">
      {[...ITEMS, ...ITEMS].map((item, i) => (
        <span key={`${item}-${i}`}>{item}</span>
      ))}
    </div>
  </div>
);

export default Marquee;
