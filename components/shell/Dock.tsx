'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useWindowStore, WindowId } from '@/lib/store/windowStore';

interface DockItem {
  id: WindowId;
  label: string;
  icon: React.ReactNode;
  ariaLabel: string;
  category: 'personal' | 'projects' | 'skills' | 'neutral';
}

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);

const FolderIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
  </svg>
);

const DocumentIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="8" y1="13" x2="16" y2="13" />
    <line x1="8" y1="17" x2="16" y2="17" />
  </svg>
);

const TerminalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <polyline points="2 7 12 13 22 7" />
  </svg>
);

const SkillsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
    <rect x="2" y="3" width="20" height="18" rx="2" fill="rgba(212,168,87,0.04)" />
    <polyline points="8 8 4 12 8 16" />
    <polyline points="16 8 20 12 16 16" />
    <line x1="11" y1="13" x2="13" y2="11" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const AvatarIcon = () => (
  <div style={{ width: '100%', height: '100%', borderRadius: 'inherit', overflow: 'hidden' }}>
    <Image src="/avatar.png" alt="About Me" width={40} height={40} style={{ objectFit: 'cover' }} />
  </div>
);

const DOCK_ITEMS: DockItem[] = [
  { id: 'about', label: 'About Me', icon: <AvatarIcon />, ariaLabel: 'Open About Me window', category: 'personal' },
  { id: 'experience', label: 'Experience', icon: <BriefcaseIcon />, ariaLabel: 'Open Experience window', category: 'personal' },
  { id: 'projects', label: 'Projects', icon: <FolderIcon />, ariaLabel: 'Open Projects window', category: 'projects' },
  { id: 'skills', label: 'Skills', icon: <SkillsIcon />, ariaLabel: 'Open Skills terminal', category: 'skills' },
  { id: 'resume', label: 'Resume', icon: <DocumentIcon />, ariaLabel: 'Open Resume window', category: 'neutral' },
  { id: 'readme', label: 'README', icon: <TerminalIcon />, ariaLabel: 'Open README window', category: 'neutral' },
  { id: 'contact', label: 'Contact', icon: <MailIcon />, ariaLabel: 'Open Contact window', category: 'neutral' },
];

export default function Dock() {
  const { openWindow, restoreWindow, windows } = useWindowStore();

  const handleClick = (id: WindowId) => {
    const w = windows[id];
    if (w?.isOpen && w?.isMinimized) {
      restoreWindow(id);
    } else {
      openWindow(id);
    }
  };

  return (
    <nav className="dock" role="navigation" aria-label="Application dock">
      <div className="dock-inner">
        {DOCK_ITEMS.map((item) => {
          const isOpen = !!windows[item.id]?.isOpen;
          const isMinimized = !!windows[item.id]?.isMinimized;
          const isActive = isOpen && !isMinimized;

          return (
            <motion.button
              key={item.id}
              className={`dock-item ${isActive ? 'dock-item--active' : ''}`}
              onClick={() => handleClick(item.id)}
              aria-label={item.ariaLabel}
              aria-pressed={isActive}
              data-category={item.category}
              whileHover={{ y: -8, scale: 1.09 }}
              whileTap={{ y: -2, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <div className="dock-icon" aria-hidden="true">
                {item.icon}
              </div>
              <span className="dock-label">{item.label}</span>
              {isOpen && (
                <motion.div
                  className="dock-dot"
                  layoutId={`dock-dot-${item.id}`}
                  aria-hidden="true"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
