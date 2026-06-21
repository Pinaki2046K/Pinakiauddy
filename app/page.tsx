'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BootSequence from '@/components/boot/BootSequence';
import Desktop from '@/components/shell/Desktop';
import MobileLayout from '@/components/mobile/MobileLayout';
import { useBootStore } from '@/lib/store/bootStore';
import { useIsMobile } from '@/hooks/useMediaQuery';

export default function Home() {
  const { hasBooted, bootComplete } = useBootStore();
  const [showBoot, setShowBoot] = useState(false);
  const [desktopReady, setDesktopReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  // Prevent SSR mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (hasBooted) {
      setDesktopReady(true);
    } else {
      setShowBoot(true);
    }
  }, [mounted, hasBooted]);

  const handleBootComplete = () => {
    setShowBoot(false);
    bootComplete();
    // Small delay to let the exit animation finish before mounting desktop
    setTimeout(() => setDesktopReady(true), 100);
  };

  if (!mounted) return null;

  return (
    <main style={{ width: '100%', height: '100%', position: 'fixed', inset: 0 }}>
      <AnimatePresence>
        {showBoot && (
          <BootSequence key="boot" onComplete={handleBootComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {desktopReady && (
          <motion.div
            key="desktop"
            initial={hasBooted ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            style={{ width: '100%', height: '100%' }}
          >
            {isMobile ? <MobileLayout /> : <Desktop />}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
