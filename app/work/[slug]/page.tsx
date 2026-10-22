import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PROJECTS, STATUS_LABEL } from '@/lib/data/projects';
import Discipline from '@/components/site/Discipline';

// Only the projects listed in the data exist; anything else is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.id }));
}

export async function generateMetadata(props: PageProps<'/work/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params;
  const project = PROJECTS.find((p) => p.id === slug);
  if (!project) return {};
  const cover = project.screens[project.cover ?? 0];
  return {
    title: `${project.name} · Pinaki Auddy`,
    description: project.summary,
    openGraph: { title: `${project.name} · Pinaki Auddy`, description: project.summary, images: [cover.src] },
  };
}

export default async function CaseStudyPage(props: PageProps<'/work/[slug]'>) {
  const { slug } = await props.params;
  const index = PROJECTS.findIndex((p) => p.id === slug);
  if (index === -1) notFound();
  const project = PROJECTS[index];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const { story } = project;

  return (
    <main className="case" id="top">
        <Link className="link-arrow case__back" href="/#work">
          <span aria-hidden="true">←</span> All work
        </Link>

        <header className="case__head">
          <h1 className="case__title">{project.name}</h1>
          <p className="feature__meta">
            <Discipline text={project.discipline} />
            <span className={`status status--${project.status}`}>{STATUS_LABEL[project.status]}</span>
          </p>
        </header>

        <div className="case__body">
          <div className="case__text">
            {project.description.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>

          <dl className="case__facts">
            <div>
              <dt>What I did</dt>
              <dd>{project.contribution.join(', ')}</dd>
            </div>
            <div>
              <dt>Built with</dt>
              <dd>{project.stack.join(', ')}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>
                {STATUS_LABEL[project.status]}
                {project.statusNote ? `. ${project.statusNote}` : ''}
              </dd>
            </div>
            <div className="case__links">
              {project.liveUrl && (
                <a className="button" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  Visit the live site
                </a>
              )}
              {project.githubUrl && (
                <a className="link-arrow" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  Source on GitHub <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </dl>
        </div>

        {story && (
          <section className="story" aria-label="The brief">
            <div className="story__row" data-reveal>
              <h2 className="story__heading">The problem</h2>
              <p className="story__lead">{story.problem}</p>
            </div>
            <div className="story__row" data-reveal>
              <h2 className="story__heading">Who it’s for</h2>
              <p className="story__lead">{story.audience}</p>
            </div>
          </section>
        )}

        <ul className="case__screens" aria-label={`Screens from ${project.name}`}>
          {project.screens.map((screen, i) => (
            <li key={screen.src} data-reveal>
              <figure>
                <Image
                  src={screen.src}
                  alt={screen.alt}
                  width={screen.width}
                  height={screen.height}
                  sizes="(max-width: 1100px) 100vw, 1024px"
                  quality={90}
                  priority={i === 0}
                />
                <figcaption>{screen.alt}</figcaption>
              </figure>
            </li>
          ))}
        </ul>

        {story && (
          <section className="story" aria-label="Decisions and outcome">
            <div className="story__row" data-reveal>
              <h2 className="story__heading">Decisions I made</h2>
              <ul className="story__decisions">
                {story.decisions.map((decision) => (
                  <li key={decision.title} data-reveal>
                    <h3 className="story__title">{decision.title}</h3>
                    <p>{decision.why}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="story__row" data-reveal>
              <h2 className="story__heading">Outcome</h2>
              <ul className="story__outcome">
                {story.outcome.map((line) => (
                  <li key={line.slice(0, 24)}>{line}</li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <nav className="case__next" aria-label="More work">
          <Link className="link-arrow" href="/#work">
            <span aria-hidden="true">←</span> All work
          </Link>
          <Link className="case__next-link" href={`/work/${next.id}`}>
            <span className="case__next-label">Next project</span>
            <span className="case__next-title">
              {next.title} <span aria-hidden="true">→</span>
            </span>
          </Link>
        </nav>
    </main>
  );
}
