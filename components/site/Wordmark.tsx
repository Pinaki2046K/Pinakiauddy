'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { scrollToTop } from '@/lib/smooth-scroll';

/** The name in the top bar. On the home page it scrolls back to the top; elsewhere it opens the home page. */
export default function Wordmark() {
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== '/') return;
    e.preventDefault();
    // Drop any #section from the address so a later reload also starts at the top
    if (window.location.hash) history.replaceState(history.state, '', window.location.pathname + window.location.search);
    scrollToTop();
  };

  return (
    <Link className="bar__mark" href="/" onClick={handleClick}>
      Pinaki Auddy
    </Link>
  );
}
