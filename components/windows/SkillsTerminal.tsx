'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Session flag — resets on page reload, persists across rerenders ───────
let _sessionDone = false;

// ─── Skills data ────────────────────────────────────────────────────────────
const SKILLS = {
  languages: ['C++', 'JavaScript', 'TypeScript', 'Python', 'SQL'],
  frontend: ['React', 'Next.js', 'Tailwind CSS'],
  backend: ['Node.js', 'Express.js'],
  ai_ml: ['Claude API', 'Groq / Llama 3.3', 'Gemini API', 'pgvector'],
  databases: ['PostgreSQL', 'MongoDB', 'MySQL', 'Supabase'],
  tools: ['Git', 'GitHub', 'Prisma', 'Postman'],
  available: true,
} as const;

// ─── Line type system ────────────────────────────────────────────────────────
type SkillLine =
  | { kind: 'open-brace' }
  | { kind: 'array-open'; key: string }
  | { kind: 'array-item'; value: string; comma: boolean }
  | { kind: 'array-close'; comma: boolean }
  | { kind: 'bool'; key: string; value: boolean; comma: boolean }
  | { kind: 'close-brace' };

function buildLines(): SkillLine[] {
  const lines: SkillLine[] = [];
  lines.push({ kind: 'open-brace' });

  const entries = Object.entries(SKILLS);
  entries.forEach(([catKey, catValue], catIdx) => {
    const isLast = catIdx === entries.length - 1;

    if (Array.isArray(catValue)) {
      lines.push({ kind: 'array-open', key: catKey });
      (catValue as readonly string[]).forEach((item, i) => {
        lines.push({ kind: 'array-item', value: item, comma: i < catValue.length - 1 });
      });
      lines.push({ kind: 'array-close', comma: !isLast });
    } else if (typeof catValue === 'boolean') {
      lines.push({ kind: 'bool', key: catKey, value: catValue, comma: !isLast });
    }
  });

  lines.push({ kind: 'close-brace' });
  return lines;
}

const ALL_LINES = buildLines();
// The COMMAND constant is the full visible line; we separate prompt from command text
const PROMPT = 'pinaki@pinakaos:~$ ';
const COMMAND_TEXT = 'cat skills.json';
const COMMAND = PROMPT + COMMAND_TEXT; // kept for skip/session-done comparison
const ECHO_PROMPT = PROMPT;
const ECHO_TEXT = 'echo "status: ready to ship"';
const ECHO_CMD = PROMPT + ECHO_TEXT;
const ECHO_RESPONSE = 'status: ready to ship';

// ─── Syntax colors ───────────────────────────────────────────────────────────
const S = {
  key: '#6FB3D8',
  str: '#E8927F',
  num: '#F2A65A',
  bool: '#6FBE8C',
  punct: 'rgba(139,146,160,0.45)',
  prompt_user: '#6FBE8C',
  prompt_host: 'rgba(139,146,160,0.5)',
} as const;

// ─── Subcomponents ───────────────────────────────────────────────────────────
function Punct({ c }: { c: React.ReactNode }) {
  return <span style={{ color: S.punct }}>{c}</span>;
}

function renderSkillLine(line: SkillLine): React.ReactNode {
  const comma = (show: boolean) => show ? <Punct c="," /> : null;

  switch (line.kind) {
    case 'open-brace':
      return <Punct c="{" />;

    case 'array-open':
      return (
        <>
          {'  '}
          <span style={{ color: S.key }}>"{line.key}"</span>
          <Punct c=": [" />
        </>
      );

    case 'array-item':
      return (
        <>
          {'    '}
          <span style={{ color: S.str }}>"{line.value}"</span>
          {comma(line.comma)}
        </>
      );

    case 'array-close':
      return (
        <>
          {'  '}
          <Punct c="]" />
          {comma(line.comma)}
        </>
      );

    case 'bool':
      return (
        <>
          {'  '}
          <span style={{ color: S.key }}>"{line.key}"</span>
          <Punct c=": " />
          <span style={{ color: S.bool }}>{String(line.value)}</span>
          {comma(line.comma)}
        </>
      );

    case 'close-brace':
      return <Punct c="}" />;
  }
}

function TermPrompt() {
  return (
    <span className="term-prompt" aria-hidden="true">
      <span style={{ color: S.prompt_user }}>pinaki</span>
      <span style={{ color: S.prompt_host }}>@pinakaos:~$ </span>
    </span>
  );
}

// ─── useReducedMotion ────────────────────────────────────────────────────────
function useReducedMotion() {
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

// ─── Main component ──────────────────────────────────────────────────────────
export default function SkillsTerminal() {
  const reducedMotion = useReducedMotion();
  const skipAll = _sessionDone || reducedMotion;

  const [cmdText, setCmdText] = useState(skipAll ? COMMAND_TEXT : '');
  const [revealedCount, setRevealedCount] = useState(skipAll ? ALL_LINES.length : 0);
  const [echoText, setEchoText] = useState(skipAll ? ECHO_TEXT : '');
  const [showResponse, setShowResponse] = useState(skipAll);
  const [showSkip, setShowSkip] = useState(false);
  const cancelRef = useRef(false);

  useEffect(() => {
    if (skipAll) return;

    cancelRef.current = false;

    // Skip button after 1s
    const skipTimer = setTimeout(() => setShowSkip(true), 1000);

    const wait = (ms: number) =>
      new Promise<void>((resolve) => setTimeout(resolve, ms));

    const typeText = async (
      text: string,
      setter: (s: string) => void,
      speed = 35
    ) => {
      for (let i = 1; i <= text.length; i++) {
        if (cancelRef.current) return;
        setter(text.slice(0, i));
        await wait(speed);
      }
    };

    const run = async () => {
      // Phase 1 — type the command text (prompt is rendered statically)
      await typeText(COMMAND_TEXT, setCmdText);
      if (cancelRef.current) return;
      await wait(350);

      // Phase 2 — stagger JSON lines
      for (let i = 1; i <= ALL_LINES.length; i++) {
        if (cancelRef.current) return;
        setRevealedCount(i);
        await wait(110);
      }
      if (cancelRef.current) return;
      await wait(420);

      // Phase 3 — type echo command text (prompt static)
      await typeText(ECHO_TEXT, setEchoText);
      if (cancelRef.current) return;
      await wait(300);

      // Phase 4 — reveal response
      setShowResponse(true);
      await wait(200);
      if (cancelRef.current) return;

      _sessionDone = true;
      setShowSkip(false);
    };

    run();

    return () => {
      cancelRef.current = true;
      clearTimeout(skipTimer);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSkip = () => {
    cancelRef.current = true;
    setCmdText(COMMAND_TEXT);
    setRevealedCount(ALL_LINES.length);
    setEchoText(ECHO_TEXT);
    setShowResponse(true);
    setShowSkip(false);
    _sessionDone = true;
  };

  const cmdTyping = cmdText.length > 0 && cmdText.length < COMMAND_TEXT.length;
  const echoTyping = echoText.length > 0 && echoText.length < ECHO_TEXT.length;
  const showEchoLine = echoText.length > 0;

  return (
    <div className="term-window" role="region" aria-label="Skills — interactive terminal">
      {/* Command line — static prompt + animated command text */}
      <div className="term-line">
        <TermPrompt />
        <span className="term-cmd">{cmdText}</span>
        {cmdTyping && <span className="term-cursor" aria-hidden="true">▋</span>}
        {!cmdTyping && cmdText.length === 0 && <span className="term-cursor" aria-hidden="true">▋</span>}
      </div>

      {/* JSON output — lines revealed one by one */}
      {ALL_LINES.slice(0, revealedCount).map((line, i) => (
        <div key={i} className="term-line term-line--json">
          {renderSkillLine(line)}
        </div>
      ))}

      {/* Echo command — static prompt + animated echo text */}
      {showEchoLine && (
        <div className="term-line term-line--gap">
          <TermPrompt />
          <span className="term-cmd">{echoText}</span>
          {echoTyping && <span className="term-cursor" aria-hidden="true">▋</span>}
        </div>
      )}

      {/* Echo response */}
      {showResponse && (
        <div className="term-line term-line--response" aria-live="polite">
          {ECHO_RESPONSE}
        </div>
      )}

      {/* Idle cursor */}
      {showResponse && (
        <div className="term-line term-line--idle">
          <TermPrompt />
          <span className="term-cursor" aria-hidden="true">▋</span>
        </div>
      )}

      {/* Skip affordance */}
      <AnimatePresence>
        {showSkip && !showResponse && (
          <motion.button
            key="skip"
            className="term-skip"
            onClick={handleSkip}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            aria-label="Skip terminal animation"
          >
            [skip →]
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
