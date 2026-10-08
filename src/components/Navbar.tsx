import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { siteConfig } from '../site.config';
import { ThemeToggle } from './ThemeToggle';

const ARTICLE_CATEGORIES = [
  { name: 'All Articles', href: '/blog/' },
  { name: 'Intercession & Prayer', href: '/category/intercession/' },
  { name: 'Unity in Prayer', href: '/category/unity/' },
  { name: 'Christian Discipleship', href: '/category/discipleship/' },
  { name: 'Inspiring Articles', href: '/category/inspiring-articles/' },
  { name: 'General Stories', href: '/category/uncategorized/' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [articlesDropdownOpen, setArticlesDropdownOpen] = useState<boolean>(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setArticlesDropdownOpen(false);
  }, [location.pathname]);

  const handleMouseEnterArticles = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setArticlesDropdownOpen(true);
  };

  const handleMouseLeaveArticles = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setArticlesDropdownOpen(false);
    }, 150);
  };

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const currentPath = location.pathname;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 md:pt-4 px-3 sm:px-4 pointer-events-none">
      <nav
        aria-label="Main Navigation"
        className={`pointer-events-auto inline-flex items-center rounded-full border border-stroke/90 bg-white/95 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 transition-all duration-300 shadow-sm ${
          scrolled ? 'shadow-md border-stroke bg-white' : ''
        }`}
      >
        {/* Brand Mark / Logo: Million Plus Intercessors */}
        <Link
          to="/"
          className="relative flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer shrink-0 pr-1 py-0.5"
          title={`${siteConfig.name} - Home`}
        >
          <img
            src="/favicon.png"
            alt={`${siteConfig.name} logo`}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover shrink-0 shadow-xs"
          />
          <div className="flex flex-col text-left justify-center">
            <span className="font-display italic font-bold text-sm sm:text-base text-heading leading-none tracking-tight">
              Million Plus
            </span>
            <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-accent font-semibold leading-none mt-0.5">
              Intercessors
            </span>
          </div>
        </Link>

        {/* Divider */}
        <div className="w-px h-5 bg-stroke mx-2 hidden lg:block" />

        {/* Desktop Nav links */}
        <div className="hidden lg:flex items-center gap-1">
          {siteConfig.nav.map((item) => {
            const isArticles = item.href === '/blog/';
            const isHash = item.href.startsWith('/#');
            const isActive =
              item.href === '/'
                ? currentPath === '/'
                : isArticles
                ? currentPath.startsWith('/blog/') || currentPath.startsWith('/category/')
                : !isHash && currentPath.startsWith(item.href);

            if (isArticles) {
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={handleMouseEnterArticles}
                  onMouseLeave={handleMouseLeaveArticles}
                >
                  <Link
                    to={item.href}
                    className={`group inline-flex items-center gap-1 text-xs rounded-full px-2.5 py-1.5 transition-colors cursor-pointer font-medium whitespace-nowrap focus-visible:ring-2 focus-visible:ring-accent ${
                      isActive
                        ? 'text-heading font-semibold'
                        : 'text-muted hover:text-heading'
                    }`}
                  >
                    <span className="relative py-0.5">
                      {item.label}
                      <span
                        className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-accent transition-transform duration-300 origin-left ${
                          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </span>
                    <ChevronDown className="w-3 h-3 text-muted group-hover:text-heading transition-transform" />
                  </Link>

                  {/* Dropdown Menu for Categories */}
                  {articlesDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-stroke rounded-2xl py-2 shadow-xl z-50">
                      <div className="px-3 py-1 text-[10px] uppercase tracking-widest font-mono text-accent font-semibold">
                        Topics
                      </div>
                      {ARTICLE_CATEGORIES.map((cat) => (
                        <Link
                          key={cat.href}
                          to={cat.href}
                          onClick={() => setArticlesDropdownOpen(false)}
                          className="block px-3 py-1.5 text-xs text-text-primary/80 hover:text-heading hover:bg-surface transition-colors"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  if (item.href.startsWith('/#') && location.pathname === '/') {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }
                }}
                className={`group relative text-xs rounded-full px-2.5 py-1.5 transition-colors cursor-pointer font-medium whitespace-nowrap focus-visible:ring-2 focus-visible:ring-accent ${
                  isActive
                    ? 'text-heading font-semibold'
                    : 'text-muted hover:text-heading'
                }`}
              >
                <span className="relative py-0.5">
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-accent transition-transform duration-300 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </span>
              </a>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-stroke mx-2 hidden sm:block" />

        {/* Primary CTA: "Join the Movement" */}
        <a
          href="/#join"
          onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault();
              handleNavClick('/#join');
            }
          }}
          className="relative inline-flex items-center text-xs font-medium rounded-full px-3.5 py-1.5 sm:px-4 sm:py-1.5 bg-accent text-white hover:bg-accent-light transition-colors shrink-0 shadow-xs whitespace-nowrap ml-1 focus-visible:ring-2 focus-visible:ring-accent"
        >
          <span>Join the Movement</span>
        </a>

        {/* Theme Toggle */}
        <div className="ml-1 shrink-0">
          <ThemeToggle />
        </div>

        {/* Mobile Menu Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          className="lg:hidden relative w-8 h-8 rounded-full flex items-center justify-center text-muted hover:text-text-primary hover:bg-surface transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ml-0.5 cursor-pointer shrink-0"
        >
          {mobileMenuOpen ? <X className="w-4 h-4 text-heading" /> : <Menu className="w-4 h-4 text-heading" />}
        </button>
      </nav>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden pointer-events-auto fixed top-16 inset-x-4 max-w-sm mx-auto bg-white border border-stroke rounded-3xl p-5 shadow-2xl flex flex-col gap-2 z-50 max-h-[85vh] overflow-y-auto">
          <div className="text-[10px] text-muted uppercase tracking-[0.2em] font-mono px-3 mb-1 font-semibold">
            Navigation
          </div>
          {siteConfig.nav.map((item) => {
            const isArticles = item.href === '/blog/';
            const isHash = item.href.startsWith('/#');
            const isActive =
              item.href === '/'
                ? currentPath === '/'
                : isArticles
                ? currentPath.startsWith('/blog/')
                : !isHash && currentPath.startsWith(item.href);

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  if (item.href.startsWith('/#') && location.pathname === '/') {
                    e.preventDefault();
                    handleNavClick(item.href);
                  } else {
                    setMobileMenuOpen(false);
                  }
                }}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-heading bg-surface font-semibold'
                    : 'text-text-primary/80 hover:text-heading hover:bg-surface'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-xs text-accent">→</span>
              </a>
            );
          })}

          <div className="pt-3 mt-2 border-t border-stroke flex flex-col gap-2">
            <a
              href="/#join"
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  handleNavClick('/#join');
                } else {
                  setMobileMenuOpen(false);
                }
              }}
              className="w-full text-center py-2.5 rounded-full bg-accent text-white text-xs font-mono uppercase tracking-wider font-semibold shadow-sm"
            >
              Join the Movement →
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
