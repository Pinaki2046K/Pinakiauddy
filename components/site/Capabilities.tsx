'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { CAPABILITIES } from '@/lib/data/profile';

// A resting pointer, not one sweeping across the list, chooses a row
const HOVER_INTENT_MS = 90;

export default function Capabilities() {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const activeRef = useRef(0);
  const pointerInList = useRef(false);
  const hoverTimer = useRef<number | undefined>(undefined);
  const listRef = useRef<HTMLUListElement>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activate = useCallback((index: number) => {
    if (index === activeRef.current) return;
    setPrevious(activeRef.current);
    setActive(index);
    activeRef.current = index;
  }, []);

  // While scrolling, rows take turns as the list passes a reading line just above the middle of the screen.
  // The turn is worked out from how far the list's top edge has passed that line, in steps of one row.
  // The top edge moves only when the page scrolls, never when a row opens or closes, so opening a row can
  // never select another one (that feedback loop is what made the section feel jumpy).
  useEffect(() => {
    let frame = 0;
    const pick = () => {
      frame = 0;
      const list = listRef.current;
      const first = triggerRefs.current[0];
      if (!list || !first || pointerInList.current) return;
      const box = list.getBoundingClientRect();
      if (box.bottom < 0 || box.top > window.innerHeight) return;

      // One closed row: its heading plus the row's padding (an open row is taller, so don't measure a whole row)
      const row = first.parentElement ? getComputedStyle(first.parentElement) : null;
      const step = first.offsetHeight + (row ? parseFloat(row.paddingTop) + parseFloat(row.paddingBottom) : 0);
      const passed = window.innerHeight * 0.45 - box.top;
      const exact = passed / step;
      const current = activeRef.current;
      // A small dead zone either side of each boundary, so a row doesn't flicker while the page rests on it
      if (Math.abs(exact - Math.round(exact)) < 0.15 && Math.abs(exact - current) < 1.15) return;
      const next = Math.min(CAPABILITIES.length - 1, Math.max(0, Math.floor(exact)));
      activate(next);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(pick);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [activate]);

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  const hoverRow = (index: number) => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => activate(index), HOVER_INTENT_MS);
  };

  return (
    <section className="caps" id="services" aria-labelledby="caps-title">
      <h2 id="caps-title" className="section-title caps__title" data-reveal>
        What I do
      </h2>

      <div className="caps__media" aria-hidden="true">
        <div className="caps__frame">
          {CAPABILITIES.map((cap, i) => (
            <Image
              key={cap.name}
              src={cap.image.src}
              alt=""
              fill
              sizes="(max-width: 960px) 100vw, 40vw"
              quality={90}
              className={i === active ? 'is-active' : i === previous ? 'is-previous' : undefined}
            />
          ))}
        </div>
      </div>

      <div className="caps__body">
        <ul
          className="caps__list"
          ref={listRef}
          onPointerEnter={(e) => {
            if (e.pointerType === 'mouse') pointerInList.current = true;
          }}
          onPointerLeave={() => {
            pointerInList.current = false;
            window.clearTimeout(hoverTimer.current);
          }}
        >
          {CAPABILITIES.map((cap, i) => (
            <li key={cap.name} className={`caps__row${i === active ? ' is-active' : ''}`}>
              <button
                type="button"
                className="caps__trigger"
                ref={(el) => {
                  triggerRefs.current[i] = el;
                }}
                aria-expanded={i === active}
                aria-controls={`cap-${i}`}
                onClick={() => activate(i)}
                onMouseEnter={() => hoverRow(i)}
                onMouseLeave={() => window.clearTimeout(hoverTimer.current)}
                onFocus={() => activate(i)}
              >
                <span className="caps__name">{cap.name}</span>
                <span className="caps__where">{cap.where}</span>
              </button>
              <div className="caps__detail" id={`cap-${i}`}>
                <div>
                  <p>{cap.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
