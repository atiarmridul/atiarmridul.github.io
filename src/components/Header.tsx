import { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { navLinks } from '../constants';
import { scrollToSection } from '../utils/scrollToSection';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => Boolean(section));

    // Track the section centered in the viewport so nav state changes before the next section fully lands.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0.01 },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleDownloadResume = () => {
    window.open('https://flowcv.com/resume/vwl1uu59wg', '_blank');
  };

  const handleSectionNavigation = (sectionId: string) => {
    scrollToSection(sectionId);

    setIsMenuOpen(false);
  };

  // The header needs two contrast modes because it sits over both dark hero and light content sections.
  const isDarkHeader = activeSection === 'hero';
  const headerSurface = !isScrolled
    ? 'bg-transparent'
    : isDarkHeader
      ? 'border-b border-white/10 bg-slate-950/90 shadow-xl shadow-slate-950/15 backdrop-blur-md'
      : 'border-b border-slate-200/80 bg-white/95 shadow-lg shadow-slate-900/10 backdrop-blur-md';
  const brandPrimary = isDarkHeader ? 'text-white' : 'text-slate-950';
  const brandSecondary = isDarkHeader ? 'text-cyan-200' : 'text-cyan-700';
  const navSurface = isDarkHeader
    ? 'border-white/10 bg-white/10 text-slate-200 shadow-white/5'
    : 'border-slate-200 bg-slate-950/[0.04] text-slate-700 shadow-slate-900/5';
  const menuButtonClass = isDarkHeader
    ? 'border-white/15 bg-white/10 text-white hover:bg-white/20'
    : 'border-slate-200 bg-white/90 text-slate-900 shadow-lg shadow-slate-900/10 hover:bg-slate-100';

  return (
    <header
      data-testid="site-header"
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${headerSurface}`}
    >
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-none" data-testid="site-brand">
            <div className={`text-sm font-black tracking-tight sm:text-base ${brandPrimary}`}>
              Md. Atiar Rahman Chowdhury
            </div>
            <div
              className={`hidden text-[11px] font-semibold uppercase tracking-[0.22em] sm:block ${brandSecondary}`}
            >
              Senior Software QA Engineer
            </div>
          </div>

          <nav
            className={`hidden items-center gap-0.5 rounded-full border p-1 text-xs font-semibold shadow-inner backdrop-blur-md lg:flex ${navSurface}`}
            data-testid="desktop-navigation"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleSectionNavigation(link.id)}
                aria-label={`Navigate to ${link.title}`}
                aria-current={activeSection === link.id ? 'page' : undefined}
                data-testid={`nav-link-${link.id}`}
                className={`rounded-full px-2.5 py-2 transition-all duration-200 ${
                  activeSection === link.id
                    ? isDarkHeader
                      ? 'bg-white text-slate-950 shadow-sm'
                      : 'bg-slate-950 text-white shadow-sm'
                    : isDarkHeader
                      ? 'text-slate-300 hover:bg-white/10 hover:text-white'
                      : 'text-slate-700 hover:bg-slate-950/5 hover:text-slate-950'
                }`}
              >
                {link.title}
              </button>
            ))}

            <button
              onClick={handleDownloadResume}
              aria-label="Open resume"
              data-testid="resume-button-desktop"
              className="ml-1 inline-flex items-center gap-2 rounded-full bg-cyan-400 px-4 py-2 font-bold text-slate-950 shadow-lg shadow-cyan-500/25 transition duration-200 hover:bg-cyan-300"
            >
              <span>Resume</span>
              <ArrowUpRight size={16} />
            </button>
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            data-testid="mobile-menu-toggle"
            className={`rounded-full border p-2 backdrop-blur transition-colors duration-200 lg:hidden ${menuButtonClass}`}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <nav
            className="mt-4 rounded-3xl border border-white/10 bg-slate-950/95 p-4 shadow-xl shadow-slate-950/25 backdrop-blur-md lg:hidden"
            data-testid="mobile-navigation"
          >
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleSectionNavigation(link.id)}
                  aria-label={`Navigate to ${link.title}`}
                  data-testid={`mobile-nav-link-${link.id}`}
                  className={`rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-colors duration-200 ${
                    activeSection === link.id
                      ? 'bg-white text-slate-950'
                      : 'bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {link.title}
                </button>
              ))}

              <button
                onClick={handleDownloadResume}
                aria-label="Open resume"
                data-testid="resume-button-mobile"
                className="col-span-2 mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-4 py-3 font-bold text-slate-950 transition-colors duration-200 hover:bg-cyan-300"
              >
                <span>Resume</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
