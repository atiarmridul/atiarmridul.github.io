import { scrollToSection } from '../utils/scrollToSection';

const Footer = () => (
  <footer className="footer wrap" data-testid="site-footer">
    <p>© 2026 Md. Atiar Rahman Chowdhury</p>
    <p>Designed &amp; built with care</p>
    <button className="top" onClick={() => scrollToSection('top')} data-mag>
      Back to top ↑
    </button>
  </footer>
);

export default Footer;
