import Image from 'next/image';
import Link from 'next/link';
import { PROJECTS, STATUS_LABEL } from '@/lib/data/projects';
import Discipline from '@/components/site/Discipline';

export default function Work() {
  return (
    <section className="work" id="work" aria-labelledby="work-title">
      <div className="section-head">
        <h2 id="work-title" className="section-title" data-reveal>
          Selected work
        </h2>
        <p className="section-intro" data-reveal style={{ '--i': 1 } as React.CSSProperties}>
          Six products I designed and built end to end, from an AI campaign CRM to a non-profit’s website.
        </p>
      </div>

      <ul className="projects">
        {PROJECTS.map((project, i) => {
          const cover = project.screens[project.cover ?? 0];
          const href = `/work/${project.id}`;
          return (
            <li key={project.id} className={`feature${i % 2 ? ' feature--flip' : ''}`}>
              <Link
                href={href}
                className="feature__media"
                aria-label={`Read the case study: ${project.name}`}
                tabIndex={-1}
                data-reveal
              >
                <span className="feature__frame">
                  <Image
                    src={cover.src}
                    alt={cover.alt}
                    width={cover.width}
                    height={cover.height}
                    sizes="(max-width: 960px) 100vw, 56vw"
                    quality={90}
                  />
                </span>
              </Link>

              <div className="feature__text">
                <h3 className="feature__title" data-reveal>
                  {project.title}
                </h3>
                <p className="feature__meta" data-reveal style={{ '--i': 1 } as React.CSSProperties}>
                  <Discipline text={project.discipline} />
                  <span className={`status status--${project.status}`}>{STATUS_LABEL[project.status]}</span>
                </p>
                <p className="feature__summary" data-reveal style={{ '--i': 2 } as React.CSSProperties}>
                  {project.summary}
                </p>
                <p className="feature__stack" data-reveal style={{ '--i': 3 } as React.CSSProperties}>
                  {project.stack.slice(0, 4).join(' · ')}
                </p>
                <div className="feature__actions" data-reveal style={{ '--i': 4 } as React.CSSProperties}>
                  <Link className="button" href={href}>
                    Read the case study
                  </Link>
                  {project.liveUrl && (
                    <a className="link-arrow" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      Live site <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
