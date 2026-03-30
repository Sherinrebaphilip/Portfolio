import { useEffect } from 'react';
import Lenis from 'lenis';
import { Hero } from './components/Hero';
import { Identity } from './components/Identity';
import { ProjectGallery } from './components/ProjectGallery';
import { SkillsGrid } from './components/SkillsGrid';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main>
      <Hero />
      <Identity />
      <ProjectGallery />
      <SkillsGrid />
    </main>
  );
}

export default App;
