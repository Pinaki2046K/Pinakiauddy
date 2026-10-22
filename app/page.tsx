import Hero from '@/components/site/Hero';
import Work from '@/components/site/Work';
import About from '@/components/site/About';
import Capabilities from '@/components/site/Capabilities';
import Contact from '@/components/site/Contact';
import Footer from '@/components/site/Footer';
import Reveal from '@/components/site/Reveal';

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Work />
        <Capabilities />
        <About />
        <Contact />
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
