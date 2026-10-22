import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={generalSans.variable} suppressHydrationWarning>
      <body>
        {/* Motion states only hide content once we know scripting works */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {children}
      </body>
    </html>
  );
}
