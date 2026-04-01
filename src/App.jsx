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
import { useEffect } from 'react';
import { doc, updateDoc, increment, setDoc, getDoc } from 'firebase/firestore';
import { db } from './config/firebase';


function App() {
  useEffect(() => {
    const trackVisit = async () => {
      // Only track unique visits per session to avoid spamming the counter on refreshes
      if (!sessionStorage.getItem('portfolio_visited')) {
        try {
            const ref = doc(db, 'analytics', 'visitors');
            const docSnap = await getDoc(ref);
            if(docSnap.exists()){
                await updateDoc(ref, { count: increment(1) });
            } else {
                await setDoc(ref, { count: 1 });
            }
            sessionStorage.setItem('portfolio_visited', 'true');
        } catch(e) { console.error('Error logging visit:', e); }
      }
    };
    trackVisit();
  }, []);

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
