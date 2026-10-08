import React from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { ContactFooter } from '../components/ContactFooter';
import { siteConfig } from '../site.config';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-text-primary pt-28 pb-16">
      <Seo
        title={`About ${siteConfig.name} — Standing in the Gap for Nations`}
        description={siteConfig.description}
        path="/about/"
        type="website"
        pageType="AboutPage"
        breadcrumbs={[{ name: 'About', path: '/about/' }]}
      />

      <div className="max-w-[800px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-accent/60" />
            <span className="text-xs text-muted uppercase tracking-[0.25em] font-medium font-mono">
              ABOUT OUR CALLING
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-heading tracking-tight mb-6">
            About <span className="font-display italic font-normal">{siteConfig.name}</span>
          </h1>

          <p className="text-lg md:text-xl text-heading/90 font-light leading-relaxed">
            {siteConfig.tagline}
          </p>
        </div>

        {/* Narrative Section */}
        <div className="space-y-10 text-base md:text-lg text-text-primary/85 leading-relaxed font-light border-t border-stroke pt-10">
          <section>
            <h2 className="text-2xl font-display italic text-heading mb-4">
              Our Heart & Calling
            </h2>
            <p className="mb-4">
              {siteConfig.name} is a Christian prayer and intercession movement dedicated to raising, encouraging, and mobilising believers to stand in the gap. The movement is grounded in the conviction that God desires men and women who will deliberately take their place before Him in persistent, selfless intercession for individuals, families, churches, communities, and nations.
            </p>
            <p className="mb-4">
              In a rapidly changing world confronted by social, spiritual, and moral challenges, we believe that prayer is the foundational work of Christian ministry. Authentic intercession bridges human need with divine mercy, fostering spiritual renewal and practical transformation across society.
            </p>
            <p>
              Rather than viewing prayer as an occasional response to crisis, we call believers to cultivated spiritual vigilance, disciplined intercession, and united fellowship.
            </p>
          </section>

          <section className="p-8 rounded-3xl bg-surface/60 border border-stroke shadow-xs">
            <h2 className="text-xs text-accent uppercase tracking-[0.2em] font-mono font-medium mb-4">
              Core Principles
            </h2>
            <ul className="space-y-3.5 text-sm md:text-base text-text-primary/90 font-light">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span>
                  <strong className="font-semibold text-heading">Persistent Prayer:</strong> A dedication to personal and corporate communion with God, standing consistently in the gap as commanded in scripture.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span>
                  <strong className="font-semibold text-heading">Spiritual Commitment:</strong> Believing that prayer is accompanied by holy living, Christian discipleship, and faithfulness to the Word of God.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span>
                  <strong className="font-semibold text-heading">Believers in Unity:</strong> Fostering harmony and collaboration among believers across cultural and geographic backgrounds.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span>
                  <strong className="font-semibold text-heading">Focus on Nations:</strong> Lifting communities, civic leaders, and nations before God for moral restoration and enduring peace.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display italic text-heading mb-4">
              Ministry Context & Leadership
            </h2>
            <p className="mb-4">
              Million Plus Intercessors is connected with the wider Christian ministry work and teaching associated with Emmanuel Olu Falodun, reflecting a longstanding emphasis on prayer, fasting, Christian discipleship, and spiritual leadership.
            </p>
            <p>
              Our desire is to serve the body of Christ by providing biblical encouragement, devotional resources, and opportunities for believers to align their hearts with the eternal purposes of God.
            </p>
          </section>

          {/* Action CTAs */}
          <div className="pt-8 border-t border-stroke flex flex-wrap items-center gap-4">
            <Link
              to="/blog/"
              className="px-6 py-3 rounded-full bg-accent text-white hover:bg-accent-light font-medium text-xs font-mono uppercase tracking-wider transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-accent"
            >
              Explore Teachings & Articles →
            </Link>
            <Link
              to="/contact/"
              className="px-6 py-3 rounded-full bg-white border border-stroke text-heading font-medium text-xs font-mono uppercase tracking-wider hover:border-accent hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <ContactFooter />
      </div>
    </div>
  );
};
