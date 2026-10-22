import type Lenis from 'lenis';

// The running Lenis instance, set by <SmoothScroll />. Null before it starts, or if it never does.
let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

/** Scroll the page back to the top, smoothly unless the visitor prefers reduced motion. */
export function scrollToTop() {
  if (lenis) {
    lenis.scrollTo(0);
    return;
  }
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
}
