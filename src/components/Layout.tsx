import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { ScrollToTop } from './ScrollToTop';

export const Layout: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <div className="min-h-screen bg-bg text-text-primary selection:bg-accent/30 selection:text-text-primary">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <ScrollToTop />
    </div>
  );
};
