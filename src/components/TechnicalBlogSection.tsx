import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { blogArticlesData } from '../data/blogArticles';
import { Search, Clock, ChevronDown } from 'lucide-react';

export const TechnicalBlogSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const categories = ['All', 'Cybersecurity', 'Web Development', 'Python Automation', 'AI Security'];

  const filteredArticles = blogArticlesData.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="blog" className="py-20 md:py-28 border-b border-[var(--border)] bg-[#0A0B09]">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="font-[var(--mono)] text-xs font-bold text-[var(--accent)] tracking-widest uppercase">
              Writing // Technical Notes &amp; Studies
            </span>
            <span className="px-2 py-0.5 text-[0.65rem] font-[var(--mono)] uppercase tracking-wider font-bold bg-[var(--raised)] border border-[var(--border)] text-[var(--secondary-text)]">
              Engineering Knowledge Base
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--primary-text)]">
            Thoughts in{' '}
            <span className="font-[var(--serif)] italic font-normal text-[var(--accent)]">
              syntax.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--secondary-text)] max-w-[640px] leading-relaxed">
            Technical write-ups, security vulnerability research, defensive architecture breakdowns, and Python automation notes based on practical lab evaluations.
          </p>
        </div>

        {/* Filter Controls: Categories & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[var(--border)]">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 font-[var(--mono)] text-xs">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`min-h-[38px] px-3.5 py-1.5 border transition-colors ${
                    isActive
                      ? 'border-[var(--accent)] bg-[rgba(199,255,69,0.08)] text-[var(--accent)] font-bold'
                      : 'border-[var(--border)] text-[var(--secondary-text)] hover:text-[var(--primary-text)] bg-[var(--surface)]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes or tags..."
              className="w-full pl-9 pr-3 py-2 bg-[var(--surface)] border border-[var(--border)] text-xs font-[var(--mono)] text-[var(--primary-text)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)]"
            />
          </div>
        </div>

        {/* Articles List */}
        {filteredArticles.length === 0 ? (
          <div className="p-8 text-center bg-[var(--surface)] border border-[var(--border)] text-xs font-[var(--mono)] text-[var(--muted)]">
            No technical notes match your current query. Try clearing the search filter.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredArticles.map((article, idx) => {
              const isExpanded = expandedArticleId === article.id;
              return (
                <motion.article
                  key={article.id}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="p-6 bg-[var(--surface)] border border-[var(--border)] transition-all duration-300 hover:border-[var(--active-border)] group"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2 font-[var(--mono)] text-xs">
                        <span className="px-2 py-0.5 text-[0.68rem] font-bold bg-[var(--raised)] border border-[var(--border)] text-[var(--accent)]">
                          {article.category}
                        </span>
                        <span className="text-[var(--muted)]">·</span>
                        <span className="flex items-center gap-1 text-[var(--muted)] text-[0.72rem]">
                          <Clock className="w-3 h-3 text-[var(--muted)]" />
                          <span>{article.readingTime}</span>
                        </span>
                        <span className="text-[var(--muted)]">·</span>
                        <span className="text-[var(--muted)] text-[0.72rem]">{article.date}</span>
                      </div>

                      <h3 className="text-xl font-bold text-[var(--primary-text)] group-hover:text-white transition-colors">
                        {article.title}
                      </h3>

                      <p className="mt-2 text-xs sm:text-sm text-[var(--secondary-text)] leading-relaxed">
                        {article.summary}
                      </p>

                      {/* Tags */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {article.tags.map((t, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-[var(--surface-subtle)] border border-[var(--border)] text-[0.68rem] font-[var(--mono)] text-[var(--secondary-text)]"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>

                      {/* Expandable Content Preview */}
                      {isExpanded && (
                        <div className="mt-5 pt-4 border-t border-[var(--border)] space-y-3 text-xs sm:text-[0.84rem] text-[var(--secondary-text)] leading-relaxed bg-[var(--surface-subtle)] p-4 border">
                          <strong className="text-[var(--accent)] font-[var(--mono)] text-[0.72rem] uppercase tracking-wider block mb-1">
                            Extended Study Notes:
                          </strong>
                          {article.content.map((p, pIdx) => (
                            <p key={pIdx}>{p}</p>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setExpandedArticleId(isExpanded ? null : article.id)}
                      className="min-h-[42px] px-4 py-2 bg-[var(--raised)] border border-[var(--border)] text-xs font-[var(--mono)] font-bold uppercase tracking-wider text-[var(--primary-text)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all shrink-0 inline-flex items-center gap-2 self-start md:self-center"
                    >
                      <span>{isExpanded ? 'Collapse' : 'Read Notes'}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

