import React, { useState, useEffect } from 'react';
import { Seo } from '../components/Seo';
import { LoadingScreen } from '../components/LoadingScreen';
import { Hero } from '../components/Hero';
import { MissionSection } from '../components/MissionSection';
import { EditorialStatement } from '../components/EditorialStatement';
import { CategoryCarousel } from '../components/CategoryCarousel';
import { ArchiveTicker } from '../components/ArchiveTicker';
import { SelectedWorks } from '../components/SelectedWorks';
import { Journal } from '../components/Journal';
import { Explorations } from '../components/Explorations';
import { FounderSection } from '../components/FounderSection';
import { Stats } from '../components/Stats';
import { NetworkSection } from '../components/NetworkSection';
import { NewsletterSection } from '../components/NewsletterSection';
import { ContactFooter } from '../components/ContactFooter';
import { posts } from '../data/posts';
import { siteConfig } from '../site.config';

export const HomePage: React.FC = () => {
  const [showLoading, setShowLoading] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const alreadyLoaded = sessionStorage.getItem('mpi_site_loaded');
        if (!alreadyLoaded) {
          setShowLoading(true);
        }
      } catch {
        setShowLoading(false);
      }
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-bg text-text-primary overflow-x-hidden">
      <Seo
        title={siteConfig.name}
        description={siteConfig.description}
        path="/"
        type="website"
        pageType="WebPage"
      />

      {/* Loading Screen: Home only, once per session */}
      {showLoading && (
        <LoadingScreen onComplete={() => setShowLoading(false)} />
      )}

      {/* Hero Section (contains exactly one h1) */}
      <Hero ready={!showLoading} />

      {/* 03. FROM THE ARCHIVE (Featured / Selected Works in magazine layout) */}
      <SelectedWorks posts={posts} />

      {/* 01. THE MISSION */}
      <MissionSection />

      {/* EDITORIAL STATEMENT */}
      <EditorialStatement />

      {/* 02. EXPLORE THE ARCHIVE (category carousel) */}
      <CategoryCarousel posts={posts} />

      {/* ARCHIVE TICKER */}
      <ArchiveTicker />

      {/* Journal Section */}
      <Journal posts={posts} />

      {/* Parallax Visual Archive Gallery */}
      <Explorations />

      {/* 04. THE FOUNDER */}
      <FounderSection />

      {/* Ministry Statistics */}
      <Stats />

      {/* 05. OUR NETWORK */}
      <NetworkSection />

      {/* 06. STAY CONNECTED */}
      <NewsletterSection />

      {/* Contact & Footer */}
      <ContactFooter />
    </div>
  );
};
