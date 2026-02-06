import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';
import Hero from './sections/Hero';

import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Education from './sections/Education';
import Roadmap from './sections/Roadmap';
import Certifications from './sections/Certifications';
import Contact from './sections/Contact';
import Footer from './components/Footer';


function App() {
  return (
    <main className="bg-slate-950 min-h-screen text-slate-100 selection:bg-sky-500/30">
      <ParticleBackground />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Roadmap />
      <Certifications />
      <Contact />
      <Footer />

    </main>
  );
}

export default App;
