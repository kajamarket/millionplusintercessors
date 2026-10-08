import config from './site.config.json';

export interface SiteConfigNav {
  label: string;
  href: string;
}

export interface SiteConfigSocial {
  label: string;
  href: string;
}

export interface SiteConfigStat {
  value: string;
  label: string;
}

export interface SiteConfigMission {
  label: string;
  heading: string;
  paragraphs: string[];
  ctaText: string;
  ctaHref: string;
}

export interface SiteConfigEditorialStatement {
  statement: string;
  subtext: string;
}

export interface SiteConfigCategoriesSection {
  label: string;
  heading: string;
  intro: string;
  promptDesktop: string;
  promptMobile: string;
}

export interface SiteConfigFeaturedArchive {
  label: string;
  heading: string;
  intro: string;
}

export interface SiteConfigFounder {
  number?: string;
  label?: string;
  name: string;
  title: string;
  paragraphs: string[];
  photo?: string;
  quote?: string;
  stripText?: string;
  booksUrl?: string;
}

export interface SiteConfigNetworkItem {
  name: string;
  description: string;
  href: string;
  cta: string;
}

export interface SiteConfigNewsletter {
  formAction: string;
}

export interface SiteConfig {
  name: string;
  domain: string;
  slug: string;
  wpApiUrl: string;
  tagline: string;
  description: string;
  heroEyebrow: string;
  heroTitle: string;
  heroVideoUrl?: string;
  heroDescription?: string;
  heroMicrocopy?: string;
  heroRoles: string[];
  heroSentence: string;
  nav: SiteConfigNav[];
  social: SiteConfigSocial[];
  contactEmail: string;
  defaultOgImage: string;
  stats: SiteConfigStat[];
  mission?: SiteConfigMission;
  editorialStatement?: SiteConfigEditorialStatement;
  categoriesSection?: SiteConfigCategoriesSection;
  categoryDescriptions?: Record<string, string>;
  tickerWords?: string[];
  featuredArchive?: SiteConfigFeaturedArchive;
  founder?: SiteConfigFounder;
  network?: SiteConfigNetworkItem[];
  newsletter?: SiteConfigNewsletter;
}

export const siteConfig: SiteConfig = config as unknown as SiteConfig;
