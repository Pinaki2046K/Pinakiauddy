import Image from 'next/image';
import { FACTS } from '@/lib/data/profile';
import SiteBar from './SiteBar';

export default function Hero() {
  return (
    <>
      <SiteBar />

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero__text">
          <h1 id="hero-title" className="hero__title" data-rise>
            Pinaki Auddy
          </h1>
          <p className="hero__lead" data-rise style={{ '--i': 1 } as React.CSSProperties}>
            Product designer and engineer. I design <span className="nowrap">AI-powered</span> interfaces and build them until they ship.
          </p>
          <div className="hero__actions" data-rise style={{ '--i': 2 } as React.CSSProperties}>
            <a className="button" href="#work">
              See selected work
            </a>
            <a className="link-arrow" href="#contact">
              Get in touch <span aria-hidden="true">→</span>
            </a>
          </div>

          <dl className="hero__facts" data-rise style={{ '--i': 3 } as React.CSSProperties}>
            {FACTS.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="hero__portrait" data-rise style={{ '--i': 1 } as React.CSSProperties}>
          <Image
            src="/portrait.jpg"
            alt="Portrait of Pinaki Auddy"
            fill
            priority
            sizes="(max-width: 800px) 100vw, 36vw"
          />
        </figure>
      </section>
    </>
  );
}
