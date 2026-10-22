import SiteBar from '@/components/site/SiteBar';
import Footer from '@/components/site/Footer';
import Reveal from '@/components/site/Reveal';

// The bar lives in the layout so each case study page starts at its own content,
// which lets navigation scroll it into view from the top.
export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteBar />
      {children}
      <Footer />
      <Reveal />
    </>
  );
}
