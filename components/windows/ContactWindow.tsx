'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const WEB3FORMS_KEY = 'fbd51208-71e3-41fb-b707-4ffd98caa496';

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={14} height={14} aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" width={14} height={14} aria-hidden="true">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

export default function ContactWindow() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...formData, access_key: WEB3FORMS_KEY }),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  return (
    <div className="contact-window">
      {/* Mail compose header */}
      <div className="contact-compose-header">
        <div className="contact-field-row">
          <span className="contact-field-label">To:</span>
          <span className="contact-field-value contact-field-value--to">
            Pinaki Auddy &lt;pinakiauddy49@gmail.com&gt;
          </span>
        </div>
        <div className="contact-field-row">
          <span className="contact-field-label">Subject:</span>
          <span className="contact-field-value">Opportunity / Collaboration</span>
        </div>
      </div>

      <div className="contact-divider" aria-hidden="true" />

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            className="contact-success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            role="status"
            aria-live="polite"
          >
            <span className="contact-success-icon" aria-hidden="true">✓</span>
            <span className="contact-success-text">$ message sent — I'll respond within 24h</span>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            className="contact-form"
            onSubmit={handleSubmit}
            aria-label="Contact form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="contact-form-fields">
              <div className="contact-form-group">
                <label className="contact-label" htmlFor="contact-name">
                  From — Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  className="contact-input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  autoComplete="name"
                  disabled={status === 'sending'}
                />
              </div>

              <div className="contact-form-group">
                <label className="contact-label" htmlFor="contact-email">
                  From — Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  className="contact-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  autoComplete="email"
                  disabled={status === 'sending'}
                />
              </div>

              <div className="contact-form-group contact-form-group--grow">
                <label className="contact-label" htmlFor="contact-message">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="contact-textarea"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="What's on your mind..."
                  disabled={status === 'sending'}
                  rows={6}
                />
              </div>

              {status === 'error' && (
                <p className="contact-error" role="alert">
                  Something went wrong. Try emailing directly below.
                </p>
              )}
            </div>

            <div className="contact-footer">
              <button
                type="submit"
                className="btn btn--primary btn--send"
                disabled={status === 'sending'}
                aria-label="Send message"
              >
                {status === 'sending' ? 'Sending...' : (
                  <><SendIcon /> Send Message</>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Alternate contact methods */}
      <div className="contact-alternates">
        <span className="contact-alternates-label">Or reach out directly:</span>
        <a
          href="mailto:pinakiauddy49@gmail.com"
          className="contact-alt-link"
          aria-label="Send email directly"
        >
          pinakiauddy49@gmail.com
        </a>
        <span className="contact-alternates-sep" aria-hidden="true">·</span>
        <a
          href="https://www.linkedin.com/in/pinaki-auddy/"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-alt-link"
          aria-label="LinkedIn profile"
        >
          <LinkedInIcon /> LinkedIn
        </a>
      </div>
    </div>
  );
}
