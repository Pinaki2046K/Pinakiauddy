import type { Metadata } from 'next';
import { JetBrains_Mono, Inter } from 'next/font/google';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PinakaOS — Pinaki Auddy',
  description:
    'Portfolio of Pinaki Auddy — final-year CSE student, full-stack engineer, and AI-native product builder. Themed as PinakaOS, a fictional desktop operating system.',
  keywords: ['Pinaki Auddy', 'portfolio', 'full-stack', 'Next.js', 'AI', 'CSE', 'developer'],
  authors: [{ name: 'Pinaki Auddy' }],
  openGraph: {
    title: 'PinakaOS — Pinaki Auddy',
    description: 'Portfolio of Pinaki Auddy — full-stack engineer and AI-native product builder.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PinakaOS — Pinaki Auddy',
    description: 'Portfolio of Pinaki Auddy — full-stack engineer and AI-native product builder.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${inter.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
