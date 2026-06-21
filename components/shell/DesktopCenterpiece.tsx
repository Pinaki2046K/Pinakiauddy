'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

export default function DesktopCenterpiece() {
  const shouldReduceMotion = useReducedMotion();

  const animationProps = shouldReduceMotion
    ? { initial: { opacity: 1, scale: 1 }, animate: { opacity: 1, scale: 1 } }
    : {
        initial: { opacity: 0, scale: 0.97 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 1.2, ease: 'easeOut' as const },
      };

  return (
    <div className="desktop-centerpiece" aria-hidden="true">
      {/* Outer wrapper: handles the one-time fade/scale-in on load */}
      <motion.div
        className="centerpiece-illustration-wrap"
        {...animationProps}
      >
        {/* Inner wrapper: handles the continuous subtle breathing loop */}
        <motion.div
          animate={shouldReduceMotion ? {} : { scale: [1, 1.015, 1] }}
          transition={{
            duration: 6,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="centerpiece-illustration-inner"
        >
          <Image
            src="/bow.png"
            alt=""
            width={400}
            height={400}
            className="centerpiece-illustration-img"
            priority
          />
        </motion.div>
      </motion.div>
      <div className="centerpiece-text">
        <div className="centerpiece-title">PINAKAOS</div>
        <div className="centerpiece-tagline">
          Precision, pull, and the knowledge of when to release.
        </div>
      </div>
    </div>
  );
}
