import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Projects from './components/Projects';
import About from './components/About';
import Skills from './components/Skills';
import Domains from './components/Domains';
import Experience from './components/Experience';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { initSiteInteractions } from './utils/siteInteractions';

function App() {
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    // Defer one frame so the full tree (reveal / magnetic nodes) is painted.
    const id = requestAnimationFrame(() => {
      cleanup = initSiteInteractions();
    });
    return () => {
      cancelAnimationFrame(id);
      cleanup?.();
    };
  }, []);

  return (
    <div data-testid="portfolio-app">
      {/* custom cursor */}
      <div className="cursor-ring" aria-hidden="true" />
      <div className="cursor-dot" aria-hidden="true" />

      <Header />

      <main id="top" data-testid="portfolio-main">
        <Hero />
        <Marquee />
        <Projects />
        <About />
        <Skills />
        <Domains />
        <Experience />
        <Education />
        <Achievements />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
