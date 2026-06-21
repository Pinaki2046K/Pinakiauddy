import { useState, useEffect, useRef } from 'react';

interface UseTypewriterOptions {
  text: string;
  speed?: number; // ms per character
  delay?: number; // ms before starting
  onComplete?: () => void;
  enabled?: boolean;
}

export function useTypewriter({
  text,
  speed = 35,
  delay = 0,
  onComplete,
  enabled = true,
}: UseTypewriterOptions) {
  const [displayText, setDisplayText] = useState('');
  const [isDone, setIsDone] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!enabled) {
      setDisplayText(text);
      setIsDone(true);
      onCompleteRef.current?.();
      return;
    }

    setDisplayText('');
    setIsDone(false);

    let i = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const start = () => {
      const tick = () => {
        if (i < text.length) {
          i++;
          setDisplayText(text.slice(0, i));
          timeoutId = setTimeout(tick, speed);
        } else {
          setIsDone(true);
          onCompleteRef.current?.();
        }
      };
      tick();
    };

    const delayTimeout = setTimeout(start, delay);

    return () => {
      clearTimeout(delayTimeout);
      clearTimeout(timeoutId);
    };
  }, [text, speed, delay, enabled]);

  const skip = () => {
    setDisplayText(text);
    setIsDone(true);
    onCompleteRef.current?.();
  };

  return { displayText, isDone, skip };
}
