'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '@/lib/data/projects';
import ProjectDetailWindow from '../windows/ProjectDetailWindow';
import { Project } from '@/lib/data/projects';

import Image from 'next/image';

type MobileTab = 'about' | 'projects' | 'resume' | 'readme' | 'contact';

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} width={20} height={20}><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>
);
const FolderIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} width={20} height={20}><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" /></svg>
);
const DocumentIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} width={20} height={20}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
);
const TerminalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} width={20} height={20}><polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" /></svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} width={20} height={20}><rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="2 7 12 13 22 7" /></svg>
);

const TAB_ITEMS = [
  { id: 'about' as MobileTab, label: 'About', icon: <UserIcon /> },
  { id: 'projects' as MobileTab, label: 'Projects', icon: <FolderIcon /> },
  { id: 'resume' as MobileTab, label: 'Resume', icon: <DocumentIcon /> },
  { id: 'readme' as MobileTab, label: 'README', icon: <TerminalIcon /> },
  { id: 'contact' as MobileTab, label: 'Contact', icon: <MailIcon /> },
];

function MobileAbout() {
  return (
    <div className="mobile-section">
      <div className="mobile-section-header">
        <span className="mono-label">about.json</span>
      </div>
      <div className="mobile-card">
        <div className="mobile-about-avatar">
          <Image
            src="/about_me_photo.png"
            alt="Pinaki Auddy"
            fill
            sizes="56px"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <h1 className="mobile-name">Pinaki Auddy</h1>
        <p className="mobile-role accent-text">CSE Student → Placement 2026</p>
        <p className="mobile-location">📍 India · Open to remote</p>
        <p className="mobile-bio">
          I'm Pinaki Auddy, a Computer Science student specializing in Big Data Analytics at SRMIST Ramapuram. I enjoy building full-stack web applications that combine intuitive user experiences with scalable backend systems. My experience spans developing ERP platforms, CRM systems, event management applications, and organizational websites using modern technologies such as Next.js, TypeScript, Node.js, PostgreSQL, and MongoDB.
        </p>
        <div className="mobile-links">
          <a href="https://github.com/Pinaki2046K" target="_blank" rel="noopener noreferrer" className="btn btn--secondary btn--sm">GitHub</a>
          <a href="https://www.linkedin.com/in/pinaki-auddy/" target="_blank" rel="noopener noreferrer" className="btn btn--secondary btn--sm">LinkedIn</a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--sm">Resume.pdf</a>
          <a href="mailto:pinakiauddy49@gmail.com" className="btn btn--secondary btn--sm">Email</a>
        </div>
      </div>
    </div>
  );
}

function MobileProjects() {
  const [selected, setSelected] = useState<Project | null>(null);

  if (selected) {
    return (
      <div className="mobile-section">
        <div className="mobile-section-header">
          <span className="mono-label">{selected.title}</span>
        </div>
        <div className="mobile-card" style={{ padding: 0 }}>
          <ProjectDetailWindow project={selected} onClose={() => setSelected(null)} />
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-section">
      <div className="mobile-section-header">
        <span className="mono-label">projects/</span>
      </div>
      {PROJECTS.map((p) => (
        <button
          key={p.id}
          className="mobile-project-card"
          onClick={() => setSelected(p)}
          aria-label={`View ${p.title} details`}
        >
          <div className="mobile-project-header">
            <span className="mobile-project-title">{p.title}</span>
            <span className={`badge ${p.status === 'deployed' ? 'badge--deployed' : p.status === 'in-progress' ? 'badge--progress' : 'badge--undeployed'}`}>
              {p.status === 'deployed' ? 'Live' : p.status === 'in-progress' ? 'In Progress' : 'Not deployed'}
            </span>
          </div>
          <div className="mobile-project-tags">
            {p.stack.slice(0, 3).map((s) => <span key={s} className="tag tag--sm">{s}</span>)}
          </div>
        </button>
      ))}
    </div>
  );
}

function MobileResume() {
  return (
    <div className="mobile-section">
      <div className="mobile-section-header">
        <span className="mono-label">Resume.pdf</span>
      </div>
      <div className="mobile-card mobile-card--centered">
        <p className="mobile-bio" style={{ textAlign: 'center', marginBottom: '1rem' }}>
          PDF embed is best viewed on desktop screens.
        </p>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn--primary">
          Open Resume.pdf
        </a>
      </div>
    </div>
  );
}

function MobileReadme() {
  return (
    <div className="mobile-section">
      <div className="mobile-section-header">
        <span className="mono-label">README.md</span>
      </div>
      <div className="mobile-card">
        <p className="readme-p">
          <em>"Pinaka" — Shiva's bow. Precision, pull, and the knowledge of when to release.</em>
        </p>
        <hr className="readme-hr" />
        <p className="readme-p">
          <strong>Who am I</strong><br/>
          I'm Pinaki Auddy, a final-year Computer Science student specializing in Big Data Analytics at SRM Institute of Science and Technology.
        </p>
        <p className="readme-p">
          I enjoy building software that solves real-world problems. Over the past few years, I've worked on ERP systems, CRM platforms, event management applications, and organizational websites, taking projects from idea to deployment while learning how products behave beyond the development environment.
        </p>
        <hr className="readme-hr" />
        <p className="readme-p">
          <strong>Why This Portfolio Looks Different</strong><br/>
          Most portfolio websites focus on showcasing finished projects. This one focuses on showcasing how I think.
        </p>
        <p className="readme-p">
          A project is more than a screenshot or a deployment link. The interesting part is often the architecture behind it—the tradeoffs, constraints, and decisions that shaped the final product. 
        </p>
        <hr className="readme-hr" />
        <p className="readme-p">
          <strong>Let's Connect</strong><br/>
          I'm currently seeking Software Engineering opportunities for the 2026 placement season.<br/><br/>
          Email: <a href="mailto:pinakiauddy49@gmail.com" className="readme-link">pinakiauddy49@gmail.com</a>
        </p>
      </div>
    </div>
  );
}

function MobileContact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const WEB3FORMS_KEY = 'fbd51208-71e3-41fb-b707-4ffd98caa496';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...formData, access_key: WEB3FORMS_KEY }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="mobile-section">
      <div className="mobile-section-header">
        <span className="mono-label">contact.form</span>
      </div>
      <div className="mobile-card">
        {status === 'success' ? (
          <p className="contact-success-text">✓ Message sent — I'll respond within 24h</p>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="contact-form-group">
              <label className="contact-label" htmlFor="m-name">Name</label>
              <input id="m-name" name="name" type="text" className="contact-input" value={formData.name} onChange={(e) => setFormData(f => ({ ...f, name: e.target.value }))} required placeholder="Your name" />
            </div>
            <div className="contact-form-group">
              <label className="contact-label" htmlFor="m-email">Email</label>
              <input id="m-email" name="email" type="email" className="contact-input" value={formData.email} onChange={(e) => setFormData(f => ({ ...f, email: e.target.value }))} required placeholder="your@email.com" />
            </div>
            <div className="contact-form-group">
              <label className="contact-label" htmlFor="m-message">Message</label>
              <textarea id="m-message" name="message" className="contact-textarea" value={formData.message} onChange={(e) => setFormData(f => ({ ...f, message: e.target.value }))} required rows={5} placeholder="What's on your mind..." />
            </div>
            {status === 'error' && <p className="contact-error" role="alert">Something went wrong. Email directly below.</p>}
            <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
        <div className="contact-alternates" style={{ marginTop: '1rem' }}>
          <a href="mailto:pinakiauddy49@gmail.com" className="contact-alt-link">pinakiauddy49@gmail.com</a>
          {' · '}
          <a href="https://www.linkedin.com/in/pinaki-auddy/" target="_blank" rel="noopener noreferrer" className="contact-alt-link">LinkedIn</a>
        </div>
      </div>
    </div>
  );
}

export default function MobileLayout() {
  const [activeTab, setActiveTab] = useState<MobileTab>('about');

  const renderContent = () => {
    switch (activeTab) {
      case 'about': return <MobileAbout />;
      case 'projects': return <MobileProjects />;
      case 'resume': return <MobileResume />;
      case 'readme': return <MobileReadme />;
      case 'contact': return <MobileContact />;
    }
  };

  return (
    <div className="mobile-layout">
      {/* Mobile menu bar */}
      <header className="mobile-menubar">
        <span className="mobile-menubar-logo">PinakaOS</span>
        <span className="mobile-status">
          <span className="status-dot" aria-hidden="true" />
          Available
        </span>
      </header>

      {/* Content area */}
      <main className="mobile-content" id="mobile-main">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
        >
          {renderContent()}
        </motion.div>
      </main>

      {/* Bottom tab bar */}
      <nav className="mobile-tabbar" aria-label="Main navigation">
        {TAB_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`mobile-tab ${activeTab === item.id ? 'mobile-tab--active' : ''}`}
            onClick={() => setActiveTab(item.id)}
            aria-label={item.label}
            aria-current={activeTab === item.id ? 'page' : undefined}
          >
            <span className="mobile-tab-icon" aria-hidden="true">{item.icon}</span>
            <span className="mobile-tab-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
