import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { GitBranch, Star, Clock, ExternalLink, AlertCircle } from 'lucide-react';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

const STATIC_FALLBACK_REPOS: GitHubRepo[] = [
  {
    id: 1,
    name: 'portfolio',
    description: 'Security-minded developer portfolio built with React, Vite, TypeScript, and Framer Motion.',
    html_url: 'https://github.com/santhoshkumariicse-gif/portfolio',
    language: 'TypeScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    name: 'python-security-automation',
    description: 'Modular Python scripts for server log parsing, regex triage, and anomalous authentication detection.',
    html_url: 'https://github.com/santhoshkumariicse-gif',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: new Date(Date.now() - 86400000 * 7).toISOString()
  },
  {
    id: 3,
    name: 'web-vulnerability-evals',
    description: 'Documentation and defense checklists evaluating OWASP Top 10 vulnerabilities in lab environments.',
    html_url: 'https://github.com/santhoshkumariicse-gif',
    language: 'Markdown',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: new Date(Date.now() - 86400000 * 14).toISOString()
  }
];

export const GitHubActivitySection: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>(STATIC_FALLBACK_REPOS);
  const [isLiveApi, setIsLiveApi] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const username = 'santhoshkumariicse-gif';
  const CACHE_KEY = `gh_repos_${username}`;
  const CACHE_TIME_KEY = `gh_repos_${username}_time`;
  const CACHE_TTL_MS = 1000 * 60 * 30; // 30 minutes cache

  useEffect(() => {
    const fetchGitHubData = async () => {
      // 1. Check Session Cache
      try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        const cachedTime = sessionStorage.getItem(CACHE_TIME_KEY);
        if (cached && cachedTime && Date.now() - Number(cachedTime) < CACHE_TTL_MS) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setRepos(parsed.slice(0, 6));
            setIsLiveApi(true);
            return;
          }
        }
      } catch {
        // Continue to fetch if session access fails
      }

      // 2. Fetch from GitHub Public API
      setErrorMsg(null);
      try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, {
          headers: { Accept: 'application/vnd.github.v3+json' }
        });

        if (!res.ok) {
          if (res.status === 403) {
            setErrorMsg('GitHub API rate limit reached. Displaying verified local cache.');
          } else {
            setErrorMsg(`GitHub API HTTP ${res.status}. Falling back to verified registry.`);
          }
          return;
        }

        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setRepos(data);
          setIsLiveApi(true);
          try {
            sessionStorage.setItem(CACHE_KEY, JSON.stringify(data));
            sessionStorage.setItem(CACHE_TIME_KEY, String(Date.now()));
          } catch {
            // Non-critical
          }
        }
      } catch {
        setErrorMsg('Network unreachable. Displaying verified static repository fallback.');
      }
    };

    fetchGitHubData();
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  return (
    <section id="github-activity" className="py-20 md:py-28 border-b border-[var(--border)] bg-[var(--surface-subtle)]">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="font-[var(--mono)] text-xs font-bold text-[var(--accent)] tracking-widest uppercase">
                GitHub // Public Engineering Activity
              </span>
              <span className="px-2 py-0.5 text-[0.65rem] font-[var(--mono)] uppercase tracking-wider font-bold bg-[var(--raised)] border border-[var(--border)] text-[var(--secondary-text)]">
                {isLiveApi ? 'Connected to GitHub Public API' : 'Verified Local Snapshot'}
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--primary-text)]">
              Code in the{' '}
              <span className="font-[var(--serif)] italic font-normal text-[var(--accent)]">
                open.
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--secondary-text)] max-w-[620px] leading-relaxed">
              Real public repositories from GitHub. Handles rate limiting safely and falls back cleanly without displaying fabricated statistics.
            </p>
          </div>

          {/* Direct Profile CTA */}
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-5 inline-flex items-center justify-center gap-2 border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--primary-text)] font-[var(--mono)] text-xs uppercase tracking-wider font-bold hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all shrink-0"
          >
            <GitBranch className="w-4 h-4 text-[var(--accent)]" />
            <span>@{username}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Status / Notice Banner */}
        {errorMsg && (
          <div className="mb-6 p-3 bg-[var(--raised)] border border-[var(--border)] flex items-center gap-2.5 text-xs font-[var(--mono)] text-[var(--muted)]">
            <AlertCircle className="w-4 h-4 text-[var(--accent)] shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {repos.map((repo, idx) => (
            <motion.div
              key={repo.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-6 bg-[var(--surface)] border border-[var(--border)] flex flex-col justify-between transition-all duration-300 hover:border-[var(--active-border)] hover:-translate-y-1 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-[var(--mono)] text-xs text-[var(--muted)] flex items-center gap-1.5">
                    <GitBranch className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>PUBLIC REPO</span>
                  </span>

                  {repo.language && (
                    <span className="px-2 py-0.5 text-[0.65rem] font-[var(--mono)] font-bold bg-[var(--raised)] border border-[var(--border)] text-[var(--accent)]">
                      {repo.language}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-[var(--primary-text)] group-hover:text-white transition-colors">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center gap-1.5"
                  >
                    <span className="truncate">{repo.name}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--accent)]" />
                  </a>
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-[var(--secondary-text)] leading-relaxed line-clamp-3">
                  {repo.description || 'Repository for project development and research notes.'}
                </p>
              </div>

              {/* Footer Meta */}
              <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs font-[var(--mono)] text-[var(--muted)]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[var(--muted)]" />
                  <span>{formatDate(repo.updated_at)}</span>
                </span>

                <div className="flex items-center gap-3">
                  {repo.stargazers_count > 0 && (
                    <span className="flex items-center gap-1 text-[var(--secondary-text)]">
                      <Star className="w-3 h-3 text-[var(--accent)]" />
                      <span>{repo.stargazers_count}</span>
                    </span>
                  )}
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--accent)] font-semibold hover:underline"
                  >
                    View Repo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
