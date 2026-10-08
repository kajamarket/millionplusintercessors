import React, { useState } from 'react';
import { Seo } from '../components/Seo';
import { ContactFooter } from '../components/ContactFooter';
import { siteConfig } from '../site.config';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    topic: 'Standing in Prayer',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-text-primary pt-28 pb-16">
      <Seo
        title={`Contact ${siteConfig.name} — Connect With Our Prayer Movement`}
        description={`Connect with ${siteConfig.name}. Send inquiries, request prayer partnership, or learn more about standing in the gap.`}
        path="/contact/"
        type="website"
        pageType="ContactPage"
        breadcrumbs={[{ name: 'Contact', path: '/contact/' }]}
      />

      <div className="max-w-[800px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-accent/60" />
            <span className="text-xs text-muted uppercase tracking-[0.25em] font-medium font-mono">
              GET IN TOUCH
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-heading tracking-tight mb-6">
            Connect With <span className="font-display italic font-normal">{siteConfig.name}</span>
          </h1>

          <p className="text-lg md:text-xl text-heading/90 font-light leading-relaxed">
            We welcome inquiries from believers, pastors, and intercessors committed to standing in the gap for communities and nations.
          </p>
        </div>

        {/* Narrative Section */}
        <div className="space-y-6 text-base md:text-lg text-text-primary/85 leading-relaxed font-light border-t border-stroke pt-10 mb-12">
          <p>
            Million Plus Intercessors is dedicated to fostering spiritual unity and encouraging faithful prayer. Whether you are inquiring about corporate prayer initiatives, seeking guidance on establishing intercession in your fellowship, or desiring to stand with the movement, we welcome your message.
          </p>
          <p>
            Please use the inquiry form below to share your details and prayer focus. Correspondence is reviewed with care, discretion, and spiritual attentiveness.
          </p>
        </div>

        {/* Clean Contact Form Structure */}
        <div className="p-8 sm:p-10 rounded-3xl bg-surface/50 border border-stroke shadow-xs mb-16">
          {submitted ? (
            <div className="py-8 text-center">
              <div className="w-12 h-12 rounded-full bg-accent/15 text-accent flex items-center justify-center mx-auto mb-4 font-mono text-xl">
                ✓
              </div>
              <h3 className="text-2xl font-display italic text-heading mb-2">
                Thank You for Connecting
              </h3>
              <p className="text-sm text-muted max-w-md mx-auto font-light leading-relaxed">
                Your message has been received with appreciation. May the Lord strengthen you as you stand in faithful prayer.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-heading font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-stroke text-sm text-heading placeholder:text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-xs font-mono uppercase tracking-wider text-heading font-medium mb-2">
                    City / Country
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Lagos, Nigeria or Nairobi, Kenya"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-stroke text-sm text-heading placeholder:text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="topic" className="block text-xs font-mono uppercase tracking-wider text-heading font-medium mb-2">
                  Inquiry Topic
                </label>
                <select
                  id="topic"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-stroke text-sm text-heading focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <option value="Standing in Prayer">Joining the Prayer Movement</option>
                  <option value="Fellowship Inquiries">Intercession Fellowship Inquiry</option>
                  <option value="Resources">Teaching & Study Materials</option>
                  <option value="General Correspondence">General Correspondence</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-heading font-medium mb-2">
                  Message / Prayer Focus
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share your message or prayer focus..."
                  className="w-full px-4 py-3 rounded-xl bg-white border border-stroke text-sm text-heading placeholder:text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-accent resize-y"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-accent text-white hover:bg-accent-light font-medium text-xs font-mono uppercase tracking-wider transition-colors shadow-sm cursor-pointer focus-visible:ring-2 focus-visible:ring-accent"
              >
                Send Message →
              </button>
            </form>
          )}
        </div>

        {/* Social communities */}
        {siteConfig.social && siteConfig.social.length > 0 && (
          <div className="p-8 rounded-3xl bg-surface/30 border border-stroke">
            <h2 className="text-xs text-muted uppercase tracking-[0.2em] font-mono font-medium mb-4">
              Social Channels
            </h2>
            <div className="flex flex-wrap items-center gap-4">
              {siteConfig.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-white border border-stroke text-xs font-mono text-heading hover:border-accent hover:text-accent transition-colors flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span>{s.label}</span>
                  <span className="text-accent">↗</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-20">
        <ContactFooter />
      </div>
    </div>
  );
};
