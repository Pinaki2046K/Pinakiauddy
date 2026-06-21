'use client';

import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import MenuBar from '@/components/shell/MenuBar';
import Dock from '@/components/shell/Dock';
import Window from '@/components/window/Window';
import AboutWindow from '@/components/windows/AboutWindow';
import ProjectsWindow from '@/components/windows/ProjectsWindow';
import ResumeWindow, { ResumeWindowActions } from '@/components/windows/ResumeWindow';
import ReadmeWindow from '@/components/windows/ReadmeWindow';
import ContactWindow from '@/components/windows/ContactWindow';
import SkillsTerminal from '@/components/windows/SkillsTerminal';
import ExperienceWindow from '@/components/windows/ExperienceWindow';
import DesktopClock from '@/components/shell/DesktopClock';
import DesktopCenterpiece from '@/components/shell/DesktopCenterpiece';
import { useWindowStore } from '@/lib/store/windowStore';

// ─── Desktop icon SVGs ───────────────────────────────────────────────────────
const DesktopUserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" width={26} height={26}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);
const DesktopFolderIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" width={26} height={26}>
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
  </svg>
);
const DesktopCodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" width={26} height={26}>
    <rect x="2" y="3" width="20" height="18" rx="2" />
    <polyline points="8 8 4 12 8 16" />
    <polyline points="16 8 20 12 16 16" />
    <line x1="11" y1="13" x2="13" y2="11" />
  </svg>
);
const DesktopDocIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" width={26} height={26}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="8" y1="13" x2="16" y2="13" />
    <line x1="8" y1="17" x2="13" y2="17" />
  </svg>
);
const DesktopTerminalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" width={26} height={26}>
    <rect x="2" y="3" width="20" height="18" rx="2" />
    <polyline points="8 9 12 13 8 17" />
    <line x1="14" y1="17" x2="20" y2="17" />
  </svg>
);
const DesktopMailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" width={26} height={26}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <polyline points="2 7 12 13 22 7" />
  </svg>
);

// ─── Desktop icons ────────────────────────────────────────────────────────────
const DesktopAvatarIcon = () => (
  <div style={{ width: '52px', height: '52px', borderRadius: '10px', overflow: 'hidden' }}>
    <Image src="/avatar.png" alt="About Me" width={52} height={52} style={{ objectFit: 'cover' }} />
  </div>
);

function DesktopIcons() {
  const { openWindow } = useWindowStore();

  const icons = [
    { id: 'about' as const, label: 'About Me', icon: <DesktopAvatarIcon />, category: 'personal' },
    { id: 'experience' as const, label: 'Experience', icon: <span className="desktop-icon-glyph-svg">💼</span>, category: 'personal' },
    { id: 'projects' as const, label: 'Projects', icon: <DesktopFolderIcon />, category: 'projects' },
    { id: 'skills' as const, label: 'skills.sh', icon: <DesktopCodeIcon />, category: 'skills' },
    { id: 'resume' as const, label: 'Resume.pdf', icon: <DesktopDocIcon />, category: 'neutral' },
    { id: 'readme' as const, label: 'README.md', icon: <DesktopTerminalIcon />, category: 'neutral' },
    { id: 'contact' as const, label: 'Contact', icon: <DesktopMailIcon />, category: 'neutral' },
  ];

  return (
    <div className="desktop-icons" role="list" aria-label="Desktop icons" style={{ left: 'auto', right: '24px' }}>
      {icons.map((icon) => (
        <button
          key={icon.id}
          className="desktop-icon"
          onDoubleClick={() => openWindow(icon.id)}
          role="listitem"
          aria-label={`Open ${icon.label} (double-click)`}
          title={`Double-click to open ${icon.label}`}
          data-category={icon.category}
        >
          <span className="desktop-icon-glyph" aria-hidden="true">{icon.icon}</span>
          <span className="desktop-icon-label">{icon.label}</span>
        </button>
      ))}
    </div>
  );
}

// Old DesktopHint removed since it's replaced by DesktopCenterpiece

// ─── Main desktop ─────────────────────────────────────────────────────────────
export default function Desktop() {
  const { windows } = useWindowStore();

  return (
    <div className="desktop" aria-label="PinakaOS desktop">
      <MenuBar />

      <div className="desktop-surface" aria-label="Desktop surface">
        <DesktopCenterpiece />
        <DesktopIcons />
        <DesktopClock />

        {/* Windows */}
        <AnimatePresence>
          {windows.about?.isOpen && !windows.about?.isMinimized && (
            <Window
              key="about"
              id="about"
              title="about.me"
              defaultWidth={600}
              defaultHeight={540}
              defaultX={120}
              defaultY={60}
            >
              <AboutWindow />
            </Window>
          )}

          {windows.experience?.isOpen && !windows.experience?.isMinimized && (
            <Window
              key="experience"
              id="experience"
              title="experience.log"
              defaultWidth={700}
              defaultHeight={500}
              defaultX={140}
              defaultY={70}
            >
              <ExperienceWindow />
            </Window>
          )}

          {windows.projects?.isOpen && !windows.projects?.isMinimized && (
            <Window
              key="projects"
              id="projects"
              title="projects/"
              defaultWidth={900}
              defaultHeight={580}
              defaultX={160}
              defaultY={80}
              minWidth={620}
              minHeight={420}
            >
              <ProjectsWindow />
            </Window>
          )}

          {windows.skills?.isOpen && !windows.skills?.isMinimized && (
            <Window
              key="skills"
              id="skills"
              title="Terminal — skills.sh"
              defaultWidth={660}
              defaultHeight={560}
              defaultX={200}
              defaultY={65}
            >
              <SkillsTerminal />
            </Window>
          )}

          {windows.resume?.isOpen && !windows.resume?.isMinimized && (
            <Window
              key="resume"
              id="resume"
              title="Resume.pdf"
              defaultWidth={680}
              defaultHeight={860}
              defaultX={240}
              defaultY={50}
              titleBarActions={<ResumeWindowActions />}
            >
              <ResumeWindow />
            </Window>
          )}

          {windows.readme?.isOpen && !windows.readme?.isMinimized && (
            <Window
              key="readme"
              id="readme"
              title="README.md"
              defaultWidth={660}
              defaultHeight={620}
              defaultX={280}
              defaultY={70}
            >
              <ReadmeWindow />
            </Window>
          )}

          {windows.contact?.isOpen && !windows.contact?.isMinimized && (
            <Window
              key="contact"
              id="contact"
              title="New Message"
              defaultWidth={560}
              defaultHeight={540}
              defaultX={320}
              defaultY={90}
            >
              <ContactWindow />
            </Window>
          )}
        </AnimatePresence>
      </div>

      <Dock />
    </div>
  );
}
