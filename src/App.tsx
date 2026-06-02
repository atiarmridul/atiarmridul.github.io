import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Domains from './components/Domains';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div
      className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 selection:bg-cyan-200"
      data-testid="portfolio-app"
    >
      <Header />

      <main data-testid="portfolio-main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Domains />
        <Experience />
        <Education />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
