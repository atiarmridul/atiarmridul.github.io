import { useState } from 'react';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import { navLinks } from '../constants';
import { scrollToSection } from '../utils/scrollToSection';
import { useTheme } from '../utils/useTheme';

const RESUME_URL = 'https://flowcv.com/resume/vwl1uu59wg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();

  const go = (id: string) => {
    scrollToSection(id);
    setIsMenuOpen(false);
  };

  return (
    <nav className="nav" id="nav" data-testid="site-header">
      <button className="nav-brand" data-mag onClick={() => go('top')} aria-label="Back to top">
        <span className="nav-mono">A</span>
        <span style={{ whiteSpace: 'nowrap' }}>Atiar R. Chowdhury</span>
      </button>

      <div className="nav-links">
        {navLinks.map((link, i) => (
          <button
            key={link.id}
            className="nav-page"
            data-testid={`nav-link-${link.id}`}
            onClick={() => go(link.id)}
          >
            <span className="idx">{String(i + 1).padStart(2, '0')}</span>
            {link.title}
          </button>
        ))}

        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary nav-cta-desktop"
          data-mag
          data-testid="resume-button-desktop"
          style={{ padding: '10px 18px' }}
        >
          Resume <ArrowUpRight size={15} />
        </a>

        <button
          className="icon-btn"
          onClick={toggle}
          aria-label="Toggle theme"
          data-mag
          data-testid="theme-toggle"
        >
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        <button
          className="icon-btn nav-menu-btn"
          onClick={() => setIsMenuOpen((v) => !v)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          data-testid="mobile-menu-toggle"
        >
          {isMenuOpen ? <X size={17} /> : <Menu size={17} />}
        </button>
      </div>

      {isMenuOpen && (
        <div
          data-testid="mobile-navigation"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 'var(--gutter)',
            left: 'var(--gutter)',
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 18,
            padding: 14,
            display: 'grid',
            gap: 6,
            backdropFilter: 'blur(14px)',
          }}
        >
          {navLinks.map((link, i) => (
            <button
              key={link.id}
              className="nav-page"
              data-testid={`mobile-nav-link-${link.id}`}
              onClick={() => go(link.id)}
              style={{ textAlign: 'left' }}
            >
              <span className="idx">{String(i + 1).padStart(2, '0')}</span>
              {link.title}
            </button>
          ))}
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            data-testid="resume-button-mobile"
            style={{ justifyContent: 'center', marginTop: 4 }}
          >
            Resume <ArrowUpRight size={15} />
          </a>
        </div>
      )}
    </nav>
  );
};

export default Header;
