'use client';

import { useRef, useState } from 'react';
import { PROFILE } from '@/lib/data/profile';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const WEB3FORMS_KEY = 'fbd51208-71e3-41fb-b707-4ffd98caa496';

export default function Contact() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const [user, domain] = PROFILE.email.split('@');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...formData, subject: 'Portfolio: new message', access_key: WEB3FORMS_KEY }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact__head">
        <h2 id="contact-title" className="section-title" data-reveal>
          Get in touch
        </h2>
        <p className="contact__intro" data-reveal style={{ '--i': 1 } as React.CSSProperties}>
          Hiring for design, AI or product roles? I’d love to hear about the work. I reply within a day.
        </p>
      </div>

      <a className="contact__email" href={`mailto:${PROFILE.email}?subject=Hello%20Pinaki`} data-reveal>
        <span>{user}@</span>
        <span>{domain}</span>
      </a>

      <div className="contact__foot">
        <div className="contact__left">
          <p>{PROFILE.city}</p>
          <button type="button" className="button button--light" onClick={() => dialogRef.current?.showModal()}>
            Send a message
          </button>
        </div>
        <ul className="contact__social">
          <li>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </li>
          <li>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          </li>
          <li>
            <a href={PROFILE.resume} target="_blank" rel="noopener noreferrer">Résumé</a>
          </li>
        </ul>
      </div>

      <dialog ref={dialogRef} className="message" aria-labelledby="message-title">
        <div className="message__head">
          <h2 id="message-title" className="message__title">Send a message</h2>
          <button type="button" className="case__close" onClick={() => dialogRef.current?.close()}>
            Close
          </button>
        </div>

        {status === 'success' ? (
          <p className="message__done" role="status">
            Thank you, your message is on its way. I’ll reply within a day.
          </p>
        ) : (
          <form className="message__form" onSubmit={handleSubmit}>
            <label>
              <span>Your name</span>
              <input name="name" type="text" className="field" value={formData.name} onChange={handleChange} required autoComplete="name" disabled={status === 'sending'} />
            </label>
            <label>
              <span>Your email</span>
              <input name="email" type="email" className="field" value={formData.email} onChange={handleChange} required autoComplete="email" disabled={status === 'sending'} />
            </label>
            <label>
              <span>Message</span>
              <textarea name="message" className="field" rows={6} value={formData.message} onChange={handleChange} required disabled={status === 'sending'} />
            </label>
            {status === 'error' && (
              <p className="message__error" role="alert">
                Something went wrong. Please email me at {PROFILE.email} instead.
              </p>
            )}
            <button type="submit" className="button" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
          </form>
        )}
      </dialog>
    </section>
  );
}
