'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { CAPABILITIES } from '@/lib/data/profile';

export default function Capabilities() {
  const [active, setActive] = useState(0);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);

  // The row crossing the middle of the viewport becomes the active one
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: '-48% 0px -48% 0px', threshold: 0 }
    );
    rowRefs.current.forEach((row) => row && io.observe(row));
    return () => io.disconnect();
  }, []);

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
              className={i === active ? 'is-active' : undefined}
            />
          ))}
        </div>
      </div>

      <div className="caps__body">
        <ul className="caps__list">
          {CAPABILITIES.map((cap, i) => (
            <li
              key={cap.name}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              data-index={i}
              className={`caps__row${i === active ? ' is-active' : ''}`}
            >
              <button
                type="button"
                className="caps__trigger"
                aria-expanded={i === active}
                aria-controls={`cap-${i}`}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
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
