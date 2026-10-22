import Link from 'next/link';
import { PROFILE } from '@/lib/data/profile';
import Wordmark from './Wordmark';

/** The top bar shared by the home page and every case study. Section links point at the home page. */
export default function SiteBar() {
  return (
    <header className="bar">
      <Wordmark />
      <nav className="bar__nav" aria-label="Main">
        <Link href="/#work">Work</Link>
        <Link href="/#services">What I do</Link>
        <Link href="/#about">About</Link>
        <Link href="/#contact">Contact</Link>
      </nav>
      <a className="button button--small" href={PROFILE.resume} target="_blank" rel="noopener noreferrer">
        Résumé
      </a>
    </header>
  );
}
