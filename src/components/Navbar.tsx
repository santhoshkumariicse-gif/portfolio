import React from 'react';
import { motion } from 'framer-motion';
import { Menu, ArrowUpRight, Search, Languages } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface NavbarProps {
  activeSection: string;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onOpenCommandPalette?: () => void;
  onEnterUniverse?: () => void;
  navItems: { id: string; label: string }[];
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  isMobileMenuOpen,
  onToggleMobileMenu,
  onOpenCommandPalette,
  onEnterUniverse,
  navItems
}) => {
  const { language, setLanguage } = useLanguage();
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[var(--accent)] text-[var(--bg)] font-bold text-xs uppercase tracking-wider outline-none"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[#0A0B09]/90 backdrop-blur-md transition-colors">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between gap-4">
          {/* Brand */}
          <a
            href="#top"
            className="flex items-center gap-3 font-extrabold tracking-tight text-[var(--primary-text)] hover:opacity-90 transition-opacity"
            aria-label="Santhosh Kumar M — Home"
          >
            <span className="w-8 h-8 grid place-items-center border border-[var(--accent)] text-[var(--accent)] font-[var(--mono)] text-xs font-bold bg-[rgba(199,255,69,0.05)] transition-transform hover:scale-105">
              SK
            </span>
            <span className="text-sm font-bold tracking-tight">Santhosh Kumar M</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-[0.78rem] font-[var(--mono)] uppercase tracking-wider font-semibold" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative py-1 transition-colors ${
                    isActive ? 'text-[var(--accent)]' : 'text-[var(--secondary-text)] hover:text-[var(--primary-text)]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeSectionIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA & Mobile Toggle */}
          <div className="flex items-center gap-2.5">
            {/* Language Switcher (Prompt 47) */}
            <button
              type="button"
              onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
              className="min-h-[38px] px-2.5 py-1.5 border border-[var(--border)] bg-[var(--surface)] text-[var(--accent)] hover:border-[var(--accent)] font-[var(--mono)] text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              aria-label={`Switch language to ${language === 'en' ? 'Tamil' : 'English'}`}
              title={language === 'en' ? 'Switch to தமிழ்' : 'Switch to English'}
            >
              <Languages className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span className="font-bold">{language === 'en' ? 'தமிழ்' : 'EN'}</span>
            </button>

            {onOpenCommandPalette && (
              <button
                type="button"
                onClick={onOpenCommandPalette}
                className="min-h-[38px] px-3 py-1.5 border border-[var(--border)] bg-[var(--surface)] text-[var(--secondary-text)] hover:text-[var(--primary-text)] hover:border-[var(--accent)] font-[var(--mono)] text-xs flex items-center gap-2 transition-colors"
                title="Search and commands (Ctrl+K)"
                aria-label="Open command palette"
              >
                <Search className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span className="hidden sm:inline">Search</span>
                <kbd className="hidden lg:inline text-[0.65rem] px-1.5 py-0.5 bg-[var(--raised)] border border-[var(--border)] text-[var(--muted)]">
                  ⌘K
                </kbd>
              </button>
            )}

            {onEnterUniverse && (
              <button
                type="button"
                onClick={onEnterUniverse}
                className="min-h-[38px] px-3 py-1.5 border border-[#00E5FF]/60 bg-[#00E5FF]/10 text-[#00E5FF] hover:bg-[#00E5FF] hover:text-[#0A0B09] font-[var(--mono)] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 rounded-sm transition-all shadow-[0_0_12px_rgba(0,229,255,0.25)]"
                title="Enter 3D Open-World Island Universe"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-ping" />
                <span>3D Universe</span>
              </button>
            )}

            <a
              href="mailto:santhoshkumar160706@gmail.com?subject=Resume%20request"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 border border-[var(--border-strong)] text-[var(--primary-text)] font-[var(--mono)] text-[0.74rem] uppercase tracking-wider font-bold hover:border-[var(--accent)] hover:bg-[rgba(199,255,69,0.08)] transition-all active:scale-[0.98]"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent)]" />
            </a>

            <button
              type="button"
              onClick={onToggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center border border-[var(--border)] text-[var(--primary-text)] hover:border-[var(--accent)] transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

