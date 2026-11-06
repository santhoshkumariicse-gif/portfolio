import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Search, ArrowRight, X, ExternalLink, Terminal, Shield, BookOpen, User, FolderGit2, FileText } from 'lucide-react';
import { projectsData } from '../data/projects';
import { blogArticlesData } from '../data/blogArticles';

interface CommandItem {
  id: string;
  category: 'Navigation' | 'Projects' | 'Writing' | 'External';
  title: string;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (projectId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectProject
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Navigation commands list
  const commands: CommandItem[] = [
    {
      id: 'nav-home',
      category: 'Navigation',
      title: 'Top / Hero Section',
      subtitle: 'System security mesh & introductory positioning',
      icon: User,
      action: () => {
        document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'nav-cmd',
      category: 'Navigation',
      title: 'Developer Command Center',
      subtitle: 'Live internship focus, logs, and roadmap telemetry',
      icon: Terminal,
      action: () => {
        document.getElementById('command-center')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'nav-projects',
      category: 'Navigation',
      title: 'Selected Work & Case Studies',
      subtitle: 'Verified architectures & engineering case studies',
      icon: FolderGit2,
      action: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'nav-lab',
      category: 'Navigation',
      title: 'Inside the Systems Lab',
      subtitle: 'Interactive 4-domain architecture simulator',
      icon: Shield,
      action: () => {
        document.getElementById('systems-lab')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'nav-terminal',
      category: 'Navigation',
      title: 'Interactive Terminal V2',
      subtitle: 'Sandboxed developer CLI with command history',
      icon: Terminal,
      action: () => {
        document.getElementById('terminal')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'nav-blog',
      category: 'Navigation',
      title: 'Technical Writing & Notes',
      subtitle: 'Engineering notes on OWASP LLM-01, SQLi, and Python triage',
      icon: BookOpen,
      action: () => {
        document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'nav-resume',
      category: 'Navigation',
      title: 'Career & Résumé Center',
      subtitle: 'ATS-compatible printable CV with PDF generation',
      icon: FileText,
      action: () => {
        document.getElementById('resume-center')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    ...projectsData.map((p) => ({
      id: `proj-${p.id}`,
      category: 'Projects' as const,
      title: p.title,
      subtitle: `${p.category} · ${p.status}`,
      icon: FolderGit2,
      action: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        if (onSelectProject) onSelectProject(p.id);
        onClose();
      }
    })),
    ...blogArticlesData.map((art) => ({
      id: `art-${art.id}`,
      category: 'Writing' as const,
      title: art.title,
      subtitle: `${art.category} · ${art.readingTime}`,
      icon: BookOpen,
      action: () => {
        document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    })),
    {
      id: 'ext-gh',
      category: 'External',
      title: 'GitHub Profile (@santhoshkumariicse-gif)',
      subtitle: 'Open public source repositories in a new tab',
      icon: ExternalLink,
      action: () => {
        window.open('https://github.com/santhoshkumariicse-gif', '_blank', 'noopener,noreferrer');
        onClose();
      }
    },
    {
      id: 'ext-li',
      category: 'External',
      title: 'LinkedIn Profile',
      subtitle: 'Connect on professional network',
      icon: ExternalLink,
      action: () => {
        window.open('https://linkedin.com/in/santhosh-kumar-8681612a4/', '_blank', 'noopener,noreferrer');
        onClose();
      }
    }
  ];

  // Filter commands by search query
  const filtered = commands.filter((c) => {
    const q = query.toLowerCase();
    return (
      c.title.toLowerCase().includes(q) ||
      (c.subtitle && c.subtitle.toLowerCase().includes(q)) ||
      c.category.toLowerCase().includes(q)
    );
  });

  // Keyboard navigation inside palette
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[70] flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label="Global command palette"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Command Window */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-[var(--surface)] border border-[var(--border-strong)] shadow-2xl overflow-hidden z-10 font-[var(--mono)]"
        >
          {/* Search Input Bar */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--border)] bg-[#171A16]">
            <Search className="w-4 h-4 text-[var(--accent)] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type to search projects, skills, labs, or commands..."
              className="w-full bg-transparent text-sm text-[var(--primary-text)] placeholder:text-[var(--muted)] border-none outline-none font-[var(--mono)]"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-[var(--muted)] hover:text-[var(--primary-text)] text-xs"
              >
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-[var(--muted)] hover:text-[var(--primary-text)] border border-[var(--border)]"
              aria-label="Close command palette"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-[var(--border)]/50">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-xs text-[var(--muted)]">
                No matching results found for "{query}".
              </div>
            ) : (
              filtered.map((item, index) => {
                const isSelected = index === selectedIndex;
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => item.action()}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`px-3 py-2.5 flex items-center justify-between cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[var(--raised)] border-l-2 border-[var(--accent)] text-[var(--primary-text)]'
                        : 'text-[var(--secondary-text)] hover:text-[var(--primary-text)]'
                    }`}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div
                        className={`p-1.5 border ${
                          isSelected
                            ? 'border-[var(--accent)] text-[var(--accent)] bg-[rgba(199,255,69,0.08)]'
                            : 'border-[var(--border)] text-[var(--muted)]'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>

                      <div className="truncate">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[var(--primary-text)] truncate">
                            {item.title}
                          </span>
                          <span className="text-[0.62rem] px-1.5 py-0.2 bg-[var(--surface-subtle)] border border-[var(--border)] text-[var(--muted)] uppercase font-semibold">
                            {item.category}
                          </span>
                        </div>
                        {item.subtitle && (
                          <p className="text-[0.7rem] text-[var(--secondary-text)] truncate mt-0.5">
                            {item.subtitle}
                          </p>
                        )}
                      </div>
                    </div>

                    <ArrowRight
                      className={`w-3.5 h-3.5 shrink-0 transition-opacity ${
                        isSelected ? 'opacity-100 text-[var(--accent)]' : 'opacity-0'
                      }`}
                    />
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Navigation Hints */}
          <div className="px-4 py-2 bg-[#171A16] border-t border-[var(--border)] flex items-center justify-between text-[0.65rem] text-[var(--muted)] select-none">
            <div className="flex items-center gap-3">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
              <span>ESC Close</span>
            </div>
            <span>PORTFOLIO_NAV_ENGINE // V6</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

