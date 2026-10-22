'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { setLenis } from '@/lib/smooth-scroll';

/**
 * Smooth wheel scrolling for the whole site. Touch scrolling stays native (it is already smooth),
 * and Lenis turns smoothing off by itself for visitors who prefer reduced motion.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      // In-page links such as #work glide there; each section's scroll-margin keeps it clear of the top bar
      anchors: true,
      stopInertiaOnNavigate: true,
      // The message form scrolls on its own; leave it native
      prevent: (node) => node.nodeName === 'DIALOG',
    });
    setLenis(lenis);
    return () => {
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
