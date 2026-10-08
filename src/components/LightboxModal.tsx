import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExplorationItem } from '../data/portfolioData';

interface LightboxModalProps {
  item: ExplorationItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Modal container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative max-w-2xl w-full z-10 flex flex-col items-center"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="self-end mb-3 w-8 h-8 rounded-full bg-surface border border-stroke hover:bg-stroke text-muted hover:text-text-primary flex items-center justify-center transition-colors cursor-pointer"
            title="Close lightbox (Esc)"
          >
            ✕
          </button>

          {/* High-res image display */}
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-surface border border-stroke shadow-2xl">
            <img
              src={item.image}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Image caption & details */}
          <div className="w-full mt-4 p-4 rounded-2xl bg-surface/80 border border-stroke/80 backdrop-blur-md flex items-center justify-between">
            <div>
              <h3 className="text-sm md:text-base font-medium text-text-primary tracking-tight">
                {item.title}
              </h3>
              <p className="text-xs text-muted font-mono mt-0.5">
                {item.medium}
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono text-text-primary/80">
                {item.year}
              </span>
              <div className="text-[10px] text-muted uppercase tracking-wider">
                Exploration
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
