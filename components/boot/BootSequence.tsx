'use client';

import { useState, useEffect, useRef, useReducer } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBootStore } from '@/lib/store/bootStore';

const BOOT_LINES = [
  'PinakaOS [build 2026]',
  'mounting /projects ...',
  'loading skills.json ...',
  'initializing renderer ...',
  '$ status: ready',
];

// Progress milestones: percentage after each line completes
const PROGRESS_MILESTONES = [20, 45, 65, 90, 100];

interface LineState {
  text: string;
  displayText: string;
  isDone: boolean;
}

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mql.matches);
    const h = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener('change', h);
    return () => mql.removeEventListener('change', h);
  }, []);
  return reduced;
}

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [lines, setLines] = useState<LineState[]>(
    BOOT_LINES.map((t) => ({ text: t, displayText: '', isDone: false }))
  );
  const [progress, setProgress] = useState(0);
  const [showSkip, setShowSkip] = useState(false);
  const [exiting, setExiting] = useState(false);
  const reducedMotion = useReducedMotion();
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Show skip affordance after 1s
  useEffect(() => {
    const t = setTimeout(() => setShowSkip(true), 1000);
    return () => clearTimeout(t);
  }, []);

  // Skip if reduced motion
  useEffect(() => {
    if (reducedMotion) {
      onCompleteRef.current();
    }
  }, [reducedMotion]);

  // Typewriter for current line
  useEffect(() => {
    if (reducedMotion) return;
    if (currentLine >= BOOT_LINES.length) return;

    const text = BOOT_LINES[currentLine];
    let i = 0;
    const speed = 10;

    const tick = () => {
      i++;
      setLines((prev) => {
        const next = [...prev];
        next[currentLine] = { ...next[currentLine], displayText: text.slice(0, i) };
        return next;
      });

      if (i < text.length) {
        timeoutRef.current = setTimeout(tick, speed);
      } else {
        // line complete
        setLines((prev) => {
          const next = [...prev];
          next[currentLine] = { ...next[currentLine], isDone: true };
          return next;
        });
        setProgress(PROGRESS_MILESTONES[currentLine]);

        if (currentLine < BOOT_LINES.length - 1) {
          timeoutRef.current = setTimeout(() => {
            setCurrentLine((c) => c + 1);
          }, 50);
        } else {
          // all done — wait briefly then exit
          timeoutRef.current = setTimeout(() => triggerExit(), 200);
        }
      }
    };

    timeoutRef.current = setTimeout(tick, currentLine === 0 ? 100 : 0);

    return () => clearTimeout(timeoutRef.current!);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLine, reducedMotion]);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerExit = () => {
    setExiting(true);
    setTimeout(() => {
      onCompleteRef.current();
    }, 500);
  };

  const handleSkip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    triggerExit();
  };

  if (reducedMotion) return null;

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="boot"
          className="boot-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {/* Glitch effect on exit handled via CSS class */}
          <div className="boot-inner">
            {/* Terminal lines */}
            <div className="boot-lines" role="log" aria-live="polite">
              {lines.slice(0, currentLine + 1).map((line, i) => (
                <div key={i} className="boot-line">
                  <span className="boot-prompt" aria-hidden="true">
                    {i < 4 ? '›' : ''}
                  </span>
                  <span className={line.isDone ? 'boot-line-text done' : 'boot-line-text'}>
                    {line.displayText}
                    {!line.isDone && <span className="boot-cursor" aria-hidden="true">▋</span>}
                  </span>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="boot-progress-track" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="System loading">
              <motion.div
                className="boot-progress-fill"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
            <div className="boot-progress-label">{progress}%</div>
          </div>

          {/* Skip affordance */}
          <AnimatePresence>
            {showSkip && (
              <motion.button
                key="skip"
                className="boot-skip"
                onClick={handleSkip}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                aria-label="Skip boot sequence"
              >
                [skip →]
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          key="glitch"
          className="boot-glitch-exit"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.08, delay: 0.3 }}
        />
      )}
    </AnimatePresence>
  );
}
