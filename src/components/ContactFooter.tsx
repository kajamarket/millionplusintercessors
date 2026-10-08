import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../site.config';

export const ContactFooter: React.FC = () => {
  const networkItems = (siteConfig.network || []).filter(
    (item) => item.href && item.href.trim() !== ''
  );

  return (
    <footer
      id="footer"
      className="relative bg-white pt-16 md:pt-20 pb-12 overflow-hidden border-t border-stroke/70 select-none"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Top Footer Row: Brand & Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-stroke">
          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <img
                src="/favicon.png"
                alt={`${siteConfig.name} logo`}
                className="w-8 h-8 rounded-full object-cover shrink-0 shadow-xs"
              />
              <div className="flex flex-col text-left justify-center">
                <span className="font-display italic font-bold text-lg text-heading leading-none">
                  {siteConfig.name}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-accent font-semibold mt-0.5">
                  Standing in the Gap
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-muted font-light leading-relaxed max-w-md mb-6">
              {siteConfig.description}
            </p>

            <div className="inline-flex items-center gap-2 text-xs font-mono text-accent">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>Dedicated to Persistent Intercession & Unity</span>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
            {/* Column 1: Navigation */}
            <div>
              <span className="font-mono uppercase tracking-widest text-[11px] text-accent font-semibold block mb-3.5">
                Navigation
              </span>
              <ul className="space-y-2.5">
                <li>
                  <Link to="/" className="text-muted hover:text-heading transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about/" className="text-muted hover:text-heading transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <a href="/#vision" className="text-muted hover:text-heading transition-colors">
                    Our Vision
                  </a>
                </li>
                <li>
                  <a href="/#prayer" className="text-muted hover:text-heading transition-colors">
                    Prayer & Intercession
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Resources & Articles */}
            <div>
              <span className="font-mono uppercase tracking-widest text-[11px] text-accent font-semibold block mb-3.5">
                Resources
              </span>
              <ul className="space-y-2.5">
                <li>
                  <Link to="/blog/" className="text-muted hover:text-heading transition-colors">
                    Articles & Teachings
                  </Link>
                </li>
                <li>
                  <a href="/#resources" className="text-muted hover:text-heading transition-colors">
                    Books & Materials
                  </a>
                </li>
                <li>
                  <Link to="/contact/" className="text-muted hover:text-heading transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Ministry Network */}
            <div>
              <span className="font-mono uppercase tracking-widest text-[11px] text-accent font-semibold block mb-3.5">
                Ministry Network
              </span>
              <ul className="space-y-2.5">
                {networkItems.slice(0, 4).map((net) => (
                  <li key={net.href}>
                    <a
                      href={net.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-heading transition-colors"
                    >
                      {net.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Tagline */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted font-mono">
          <div>
            {siteConfig.tagline}
          </div>
          <div>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
