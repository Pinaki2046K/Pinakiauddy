'use client';

import { useState, useEffect } from 'react';

export default function DesktopClock() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      );
      setDate(
        now.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'short',
          day: 'numeric',
        })
      );
    };
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null; // Avoid hydration mismatch on initial render

  return (
    <div className="desktop-clock">
      <div className="desktop-clock-time">{time}</div>
      <div className="desktop-clock-date">{date}</div>
      <div className="desktop-clock-status">
        <span className="status-dot clock-status-dot" aria-hidden="true" />
        Open to Freelance Projects
      </div>
    </div>
  );
}
