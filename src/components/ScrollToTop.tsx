import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      setVisible(window.scrollY > 320);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (typeof window === 'undefined') return;
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top of page"
      className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full bg-surface/90 border border-accent/50 text-accent hover:text-white hover:bg-surface hover:border-accent shadow-xl backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer group"
    >
      <ArrowUp className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
    </button>
  );
};
