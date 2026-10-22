'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** Reveals [data-reveal] elements once as they enter the viewport. Content is never left hidden. */
export default function Reveal() {
  // Re-run on every route change: layouts stay mounted while the page inside them changes
  const pathname = usePathname();

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );
    targets.forEach((el) => io.observe(el));

    // Safety net: anything on screen that the observer missed is shown after a moment
    const timer = window.setTimeout(() => {
      targets.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('is-in');
      });
    }, 2500);

    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
