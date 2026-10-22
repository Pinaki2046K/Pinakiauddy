import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import SmoothScroll from '@/components/site/SmoothScroll';

const generalSans = localFont({
  src: [
    { path: './fonts/GeneralSans-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/GeneralSans-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/GeneralSans-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-sans',
  display: 'swap',
});

const description =
  'Pinaki Auddy, product designer and engineer in the final year of a computer science degree. Designing AI-powered interfaces and building them until they ship.';

export const metadata: Metadata = {
  metadataBase: new URL('https://pinakiauddy.vercel.app'),
  title: 'Pinaki Auddy · Product design and AI',
  description,
  keywords: ['Pinaki Auddy', 'portfolio', 'UI/UX design', 'product design', 'AI design', 'AI generalist', 'interface design', 'Next.js'],
  authors: [{ name: 'Pinaki Auddy' }],
  openGraph: {
    title: 'Pinaki Auddy · Product design and AI',
    description,
    type: 'website',
    images: ['/portrait.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pinaki Auddy · Product design and AI',
    description,
  },
};

const RELOAD_TO_TOP = "(function(){document.documentElement.classList.add('js');var n=performance.getEntriesByType('navigation')[0];if(!n||n.type!=='reload')return;if('scrollRestoration' in history)history.scrollRestoration='manual';if(location.hash)history.replaceState(history.state,'',location.pathname+location.search);window.scrollTo(0,0);addEventListener('load',function(){window.scrollTo(0,0);requestAnimationFrame(function(){history.scrollRestoration='auto';});});})();";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={generalSans.variable} suppressHydrationWarning>
      <body>
        {/* Before anything renders: mark that scripting works (motion states only hide content then), and on a
            reload start at the top instead of where the browser left off. Only reloads: normal visits and the
            Back button keep their usual scroll position. */}
        <script dangerouslySetInnerHTML={{ __html: RELOAD_TO_TOP }} />
        {children}
        <SmoothScroll />
      </body>
    </html>
  );
}
