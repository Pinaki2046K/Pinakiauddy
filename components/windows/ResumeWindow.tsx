'use client';

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width={14} height={14} aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width={14} height={14} aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export const ResumeWindowActions = () => (
  <a
    href="https://docs.google.com/document/d/1JTa1goajpWRm3b11CjbD61chisGQK29S_PcknXqsLCQ/export?format=pdf"
    download="Pinaki_Auddy_Resume.pdf"
    className="titlebar-action-btn"
    aria-label="Download resume PDF"
    title="Download PDF"
  >
    <DownloadIcon /> Download
  </a>
);

export default function ResumeWindow() {
  return (
    <div className="resume-window">
      <iframe
        src="https://docs.google.com/document/d/1JTa1goajpWRm3b11CjbD61chisGQK29S_PcknXqsLCQ/preview"
        title="Pinaki Auddy's Resume"
        className="resume-iframe"
        aria-label="Resume PDF viewer"
      />
      {/* Fallback for browsers that block PDF embeds */}
      <noscript>
        <div className="resume-fallback">
          <p>PDF viewer unavailable.</p>
          <a href="https://docs.google.com/document/d/1JTa1goajpWRm3b11CjbD61chisGQK29S_PcknXqsLCQ/preview" target="_blank" rel="noopener noreferrer" className="btn btn--primary">
            Open PDF <ExternalIcon />
          </a>
        </div>
      </noscript>
    </div>
  );
}
