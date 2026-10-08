import React from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { siteConfig } from '../site.config';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg text-text-primary flex flex-col items-center justify-center px-6 text-center pt-24 pb-16">
      <Seo
        title="404 — Page Not Found"
        description={`The requested page could not be found on ${siteConfig.name}.`}
        path="/404/"
        type="website"
        pageType="WebPage"
      />

      <div className="max-w-md mx-auto flex flex-col items-center">
        <span className="text-xs text-accent uppercase tracking-[0.25em] font-mono font-medium mb-4">
          STATUS 404
        </span>

        <h1 className="text-5xl md:text-7xl font-display italic text-heading mb-6">
          Story not found
        </h1>

        <p className="text-sm md:text-base text-muted font-light mb-10 leading-relaxed">
          The article or record you followed may have been updated, relocated, or temporarily unlisted.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 rounded-full bg-accent text-white hover:bg-accent-light hover:text-black font-medium text-xs font-mono uppercase tracking-wider transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-accent"
          >
            Return to Home
          </Link>
          <Link
            to="/blog/"
            className="px-6 py-3 rounded-full bg-surface border border-stroke text-heading font-medium text-xs font-mono uppercase tracking-wider hover:border-accent hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent"
          >
            Browse All Articles
          </Link>
        </div>
      </div>
    </div>
  );
};
