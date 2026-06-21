'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS, CATEGORY_LABELS, ProjectCategory, Project } from '@/lib/data/projects';
import { useWindowStore } from '@/lib/store/windowStore';
import ProjectDetailWindow from './ProjectDetailWindow';
import { getTechCategory, TECH_CAT_CLASS } from '@/lib/data/techCategories';

type Filter = 'all' | ProjectCategory;

const FILTERS: { key: Filter; label: string; iconKey: string }[] = [
  { key: 'all', label: 'All', iconKey: 'all' },
  { key: 'web-app', label: 'Web Apps', iconKey: 'web-app' },
  { key: 'ai-ml', label: 'AI · ML', iconKey: 'ai-ml' },
  { key: 'productivity', label: 'Productivity', iconKey: 'productivity' },
  { key: 'fullstack', label: 'Full Stack', iconKey: 'fullstack' },
];

const STATUS_CONFIG: Record<string, { label: string; dot: string }> = {
  deployed: { label: 'Deployed', dot: 'var(--status-live)' },
  'not-deployed': { label: 'Not deployed', dot: 'var(--status-amber)' },
  'in-progress': { label: 'In progress', dot: 'var(--status-muted)' },
};

function FolderIcon({ size = 32 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} width={size} height={size} aria-hidden="true">
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" fill="rgba(212,168,87,0.08)" stroke="rgba(212,168,87,0.5)" />
    </svg>
  );
}

function RobotIcon({ size = 32 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-key)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width={size} height={size} aria-hidden="true">
      <rect width="18" height="14" x="3" y="7" rx="2" ry="2"/>
      <path d="M12 7V3"/>
      <circle cx="12" cy="3" r="1"/>
      <circle cx="9" cy="13" r="1"/>
      <circle cx="15" cy="13" r="1"/>
      <path d="M10 17h4"/>
    </svg>
  );
}

function MediaIcon({ size = 32 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width={size} height={size} aria-hidden="true">
      <rect width="20" height="14" x="2" y="5" rx="2"/>
      <path d="M10 9l5 3-5 3v-6z"/>
    </svg>
  );
}

function PulseIcon({ size = 32 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--status-amber)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width={size} height={size} aria-hidden="true">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  );
}

function StreamIcon({ size = 32 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-str)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width={size} height={size} aria-hidden="true">
      <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/>
      <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/>
      <circle cx="12" cy="12" r="2"/>
      <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/>
      <path d="M19.1 4.9C23 8.8 23 15.2 19.1 19.1"/>
    </svg>
  );
}

function TaskIcon({ size = 32 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--status-live)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width={size} height={size} aria-hidden="true">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
      <line x1="16" x2="16" y1="2" y2="6"/>
      <line x1="8" x2="8" y1="2" y2="6"/>
      <line x1="3" x2="21" y1="10" y2="10"/>
      <path d="m9 16 2 2 4-4"/>
    </svg>
  );
}

function getIconForType(type?: string, size = 32) {
  switch (type) {
    case 'robot': return <RobotIcon size={size} />;
    case 'media': return <MediaIcon size={size} />;
    case 'pulse': return <PulseIcon size={size} />;
    case 'stream': return <StreamIcon size={size} />;
    case 'task': return <TaskIcon size={size} />;
    case 'web-app': return <MediaIcon size={size} />;
    case 'ai-ml': return <RobotIcon size={size} />;
    case 'productivity': return <TaskIcon size={size} />;
    case 'fullstack': return <PulseIcon size={size} />;
    default: return <FolderIcon size={size} />;
  }
}

export default function ProjectsWindow() {
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = PROJECTS.filter((p) =>
    activeFilter === 'all' ? true : p.category.includes(activeFilter as ProjectCategory)
  );

  return (
    <div className="projects-window">
      {/* Finder-style sidebar */}
      <aside className="projects-sidebar" aria-label="Project filters">
        <div className="projects-sidebar-header">FILTER</div>
        <nav>
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`projects-filter-btn ${activeFilter === f.key ? 'projects-filter-btn--active' : ''}`}
              onClick={() => setActiveFilter(f.key)}
              aria-pressed={activeFilter === f.key}
            >
              <span className="projects-filter-icon">{getIconForType(f.iconKey, 14)}</span>
              {f.label}
            </button>
          ))}
        </nav>

        <div className="projects-sidebar-section">
          <div className="projects-sidebar-header">LEGEND</div>
          {Object.entries(STATUS_CONFIG).map(([k, v]) => (
            <div key={k} className="projects-legend-item">
              <span className="projects-legend-dot" style={{ background: v.dot }} aria-hidden="true" />
              <span>{v.label}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* Main pane */}
      <main className="projects-main" aria-label="Projects list">
        <div className="projects-grid" role="list">
          {filtered.map((project) => {
            const status = STATUS_CONFIG[project.status];
            return (
              <motion.button
                key={project.id}
                className="project-file-card"
                onClick={() => setSelectedProject(project)}
                role="listitem"
                aria-label={`Open ${project.title} project details`}
                whileHover={{ backgroundColor: 'rgba(212,168,87,0.06)', y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
              >
                <div className="project-file-icon-wrap">
                  {getIconForType(project.iconType, 42)}
                </div>
                <div className="project-file-name">{project.title}</div>
                <div className="project-file-status">
                  <span
                    className="project-file-dot"
                    style={{ background: status.dot }}
                    aria-hidden="true"
                  />
                  <span className="project-file-status-text">{status.label}</span>
                </div>
                <div className="project-file-tags">
                  {project.stack.slice(0, 2).map((s) => {
                    const cat = getTechCategory(s);
                    const catClass = cat ? TECH_CAT_CLASS[cat] : '';
                    return (
                      <span key={s} className={`tag tag--sm ${catClass}`}>{s}</span>
                    );
                  })}
                </div>
              </motion.button>
            );
          })}
        </div>
      </main>

      {/* Detail panel (inline modal) */}
      {selectedProject && (
        <motion.div
          className="project-detail-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ProjectDetailWindow
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        </motion.div>
      )}
    </div>
  );
}
