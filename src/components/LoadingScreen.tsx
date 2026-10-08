import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../site.config';

interface LoadingScreenProps {
  onComplete: () => void;
}

const ROTATING_WORDS = ['Prayer', 'Intercession', 'Transformation'];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [count, setCount] = useState<number>(0);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [isDone, setIsDone] = useState<boolean>(false);

  // Counter using requestAnimationFrame from 000 -> 100 over 2200ms
  useEffect(() => {
    if (typeof window === 'undefined') {
      onComplete();
      return;
    }

    let startTimestamp: number | null = null;
    const duration = 2000; // ms
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      const currentVal = Math.floor(progress * 100);
      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(100);
        setIsDone(true);
        try {
          sessionStorage.setItem('mpi_site_loaded', 'true');
        } catch {
          // ignore
        }
        const timer = setTimeout(() => {
          onComplete();
        }, 300);
        return () => clearTimeout(timer);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [onComplete]);

  // Center rotating words every 800ms
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 800);

    return () => clearInterval(wordInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isDone ? 0 : 1 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="fixed inset-0 z-[9999] bg-white flex flex-col justify-between p-8 md:p-14 select-none pointer-events-auto"
    >
      {/* Top-left: Ministry label */}
      <div className="flex justify-between items-start">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-xs text-accent uppercase tracking-[0.25em] font-mono font-semibold"
        >
          {siteConfig.name}
        </motion.div>
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="text-xs text-muted uppercase tracking-[0.2em] font-mono hidden sm:block"
        >
          Standing in the Gap
        </motion.div>
      </div>

      {/* Center: Rotating words */}
      <div className="flex items-center justify-center my-auto min-h-[140px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={ROTATING_WORDS[wordIndex]}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-heading tracking-wide text-center"
          >
            {ROTATING_WORDS[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom section */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-end items-end">
          <div className="text-6xl md:text-8xl lg:text-9xl font-display italic text-heading tabular-nums tracking-tighter leading-none">
            {String(count).padStart(3, '0')}
          </div>
        </div>

        {/* Bottom progress bar */}
        <div className="w-full h-[3px] bg-stroke overflow-hidden rounded-full">
          <div
            className="h-full bg-accent transition-transform duration-75 ease-linear rounded-full origin-left"
            style={{
              transform: `scaleX(${count / 100})`,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};
