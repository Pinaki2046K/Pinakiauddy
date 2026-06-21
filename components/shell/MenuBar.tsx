'use client';

import { useState, useEffect } from 'react';
import { useWindowStore, WindowId } from '@/lib/store/windowStore';

function useLiveClock() {
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
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return { time, date };
}

export default function MenuBar() {
  const { time, date } = useLiveClock();

  return (
    <header className="menubar" role="banner">
      <div className="menubar-left">
        <span className="menubar-logo">PinakaOS</span>
      </div>
      <div className="menubar-right">
        <span className="menubar-status">
          <span className="status-dot" aria-hidden="true" />
          Available for opportunities
        </span>
        <div className="menubar-clock" aria-label={`Current time: ${time}, ${date}`}>
          <span className="clock-date">{date}</span>
          <span className="clock-time">{time}</span>
        </div>
      </div>
    </header>
  );
}
