'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/lib/data/projects';
import Image from 'next/image';
import { getTechCategory, TECH_CAT_CLASS } from '@/lib/data/techCategories';

interface Props {
  project: Project;
  onClose: () => void;
}

const ExternalLinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={13} height={13} aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={14} height={14} aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={16} height={16}><polyline points="15 18 9 12 15 6" /></svg>
);
const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={16} height={16}><polyline points="9 18 15 12 9 6" /></svg>
);
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={16} height={16}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
);

function ScreenshotGallery({ screenshots, title }: { screenshots: string[]; title: string }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (screenshots.length === 0) {
    return (
      <div className="screenshot-placeholder" aria-label={`No screenshots available for ${title}`}>
        <span className="screenshot-placeholder-text">// screenshots to be added</span>
      </div>
    );
  }

  const lightboxContent = lightboxIndex !== null ? (
    <motion.div
      className="lightbox-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setLightboxIndex(null)}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} screenshot lightbox`}
    >
      <button className="lightbox-close" aria-label="Close lightbox" onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}>
        <CloseIcon />
      </button>
      <div className="lightbox-img-wrap" onClick={(e) => e.stopPropagation()}>
        <Image
          src={screenshots[lightboxIndex]}
          alt={`${title} screenshot ${lightboxIndex + 1} (expanded)`}
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
    </motion.div>
  ) : null;

  return (
    <>
      <div className="screenshot-gallery" aria-label={`Screenshots of ${title}`}>
        {screenshots.map((src, idx) => (
          <div key={src} className="gallery-img-wrap" onClick={() => setLightboxIndex(idx)}>
            <Image
              src={src}
              alt={`${title} screenshot ${idx + 1}`}
              fill
              className="gallery-img"
              style={{ cursor: 'zoom-in', objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>

      {/* Lightbox rendered at document root to break out of window transform bounds */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {lightboxContent}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

function ArchitectureNotes({ notes }: { notes: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="arch-notes">
      <button
        className="arch-notes-toggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="arch-notes-body"
      >
        <span>Architecture Notes</span>
        <span className="arch-notes-chevron" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id="arch-notes-body"
            className="arch-notes-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <pre className="arch-notes-content">{notes}</pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProjectDetailWindow({ project, onClose }: Props) {
  const isDeployed = project.status === 'deployed';
  const isInProgress = project.status === 'in-progress';

  return (
    <div className="project-detail" role="dialog" aria-modal="true" aria-label={`${project.title} project details`}>
      <div className="project-detail-header">
        <button className="project-detail-back" onClick={onClose} aria-label="Back to projects">
          <ChevronLeft /> Back
        </button>
        <h2 className="project-detail-title">{project.title}</h2>
        {isInProgress && (
          <span className="badge badge--progress">In Progress</span>
        )}
        {!isDeployed && !isInProgress && (
          <span className="badge badge--undeployed" title={project.notDeployedReason}>
            Not deployed
          </span>
        )}
        {isDeployed && (
          <span className="badge badge--deployed">Live</span>
        )}
      </div>

      <div className="project-detail-body">
        {/* Mode A: Deployed */}
        {isDeployed && project.liveUrl && (
          <div className="project-preview">
            <iframe
              src={project.liveUrl}
              title={`${project.title} live preview`}
              className="project-iframe"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
            <div className="project-preview-overlay">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="preview-open-btn"
                aria-label={`Open ${project.title} live site`}
              >
                Open in new tab <ExternalLinkIcon />
              </a>
            </div>
          </div>
        )}

        {/* Mode B: Not deployed, in-progress, or deployed without a liveUrl */}
        {(!isDeployed || !project.liveUrl) && (
          <>
            {(project.notDeployedReason || isInProgress) && (
              <div className="project-undeployed-badge" role="status">
                <span className="undeployed-icon" aria-hidden="true">⚠</span>
                {isInProgress
                  ? 'Active development — not yet deployed'
                  : `Not deployed — ${project.notDeployedReason}`}
              </div>
            )}
            <ScreenshotGallery screenshots={project.screenshots} title={project.title} />
          </>
        )}

        {/* Description */}
        <p className="project-description">{project.description}</p>

        {/* Stack tags */}
        <div className="project-stack" aria-label="Technology stack">
          {project.stack.map((tech) => {
            const cat = getTechCategory(tech);
            const catClass = cat ? TECH_CAT_CLASS[cat] : '';
            return (
              <span key={tech} className={`tag tag--mono ${catClass}`}>{tech}</span>
            );
          })}
        </div>

        {/* Action buttons */}
        <div className="project-actions">
          {isDeployed && project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
              aria-label={`Visit ${project.title} live site`}
            >
              Live Site <ExternalLinkIcon />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--secondary"
              aria-label={`View ${project.title} on GitHub`}
            >
              <GithubIcon /> GitHub
            </a>
          )}
        </div>

        {/* Architecture notes (Mode B only) */}
        {!isDeployed && project.architectureNotes && (
          <ArchitectureNotes notes={project.architectureNotes} />
        )}
      </div>
    </div>
  );
}
