import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Domains from './components/Domains';
// import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    // Root container for the entire portfolio application
    <div className="min-h-screen bg-white">
      {/* Sticky top navigation for quick section access */}
      <Header />

      <main>
        {/* Main landing section introducing profile and role */}
        <Hero />

        {/* Professional summary and personal background */}
        <About />

        {/* Technical skills and tooling overview */}
        <Skills />

        {/* QA specialization and engineering domains */}
        <Domains />

        {/* Reserved for future project showcase expansion */}
        {/* <Projects /> */}

        {/* Work history and practical industry experience */}
        <Experience />

        {/* Academic background and certifications */}
        <Education />

        {/* Recruiter-friendly communication section */}
        <Contact />
      </main>

      {/* Footer containing external links and closing information */}
      <Footer />
    </div>
  );
}

export default App;