'use client';

import Image from 'next/image';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16} aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16} aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width={16} height={16} aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <polyline points="2 7 12 13 22 7" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width={16} height={16} aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export default function AboutWindow() {
  return (
    <div className="about-window">
      <div className="about-hero">
        <div className="about-avatar-wrap">
          <div className="about-avatar">
            {/* Real photo for About window */}
            <Image
              src="/about_me_photo.png"
              alt="Pinaki Auddy"
              fill
              className="about-avatar-img"
              priority
            />
          </div>
        </div>
        <div className="about-header">
          <h1 className="about-name">Pinaki Auddy</h1>
          <p className="about-role">
            <span className="accent-text">CSE Student</span>
          </p>
          <p className="about-location">📍 India · Open to remote</p>
        </div>
      </div>

      <div className="about-section">
        <h2 className="about-section-label">Current Focus</h2>
        <p className="about-bio">
          I'm Pinaki Auddy, a Computer Science student specializing in Big Data Analytics at SRMIST Ramapuram. I enjoy building full-stack web applications that combine intuitive user experiences with scalable backend systems. My experience spans developing ERP platforms, CRM systems, event management applications, and organizational websites using modern technologies such as Next.js, TypeScript, Node.js, PostgreSQL, and MongoDB.
        </p>
      </div>

      <div className="about-section">
        <h2 className="about-section-label">Interests</h2>
        <div className="about-tags">
          {['Full-Stack Engineering', 'AI/ML Pipelines', 'System Design', 'Developer Tooling', 'Edge Computing'].map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>

      <div className="about-availability">
        <span className="availability-dot" aria-hidden="true" />
        <span className="availability-text">
          Currently available for <strong>freelance projects</strong> and <strong>consulting</strong>
        </span>
      </div>

      <div className="about-links">
        <a
          href="https://github.com/Pinaki2046K"
          target="_blank"
          rel="noopener noreferrer"
          className="about-link-btn"
          aria-label="GitHub profile"
        >
          <GithubIcon /> GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/pinaki-auddy/"
          target="_blank"
          rel="noopener noreferrer"
          className="about-link-btn"
          aria-label="LinkedIn profile"
        >
          <LinkedInIcon /> LinkedIn
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="about-link-btn about-link-btn--primary"
          aria-label="Open resume PDF"
        >
          <ExternalLinkIcon /> Resume.pdf
        </a>
        <a
          href="mailto:pinakiauddy49@gmail.com"
          className="about-link-btn"
          aria-label="Send email"
        >
          <MailIcon /> Email
        </a>
      </div>
    </div>
  );
}
