import React, { useState } from 'react';
import { Briefcase, GraduationCap, Shield, Trophy, CheckCircle, Clock, Calendar } from 'lucide-react';
import { journeyMilestonesData, JourneyCategory, JourneyMilestone } from '../data/journeyTimeline';

export const InteractiveJourneyTimeline: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<JourneyCategory>('all');

  const categories: Array<{ id: JourneyCategory; label: string }> = [
    { id: 'all', label: 'All Milestones' },
    { id: 'internship', label: 'Internships' },
    { id: 'education', label: 'Education' },
    { id: 'security', label: 'Security & Labs' },
    { id: 'achievement', label: 'Competitions' }
  ];

  const filteredMilestones = selectedCategory === 'all'
    ? journeyMilestonesData
    : journeyMilestonesData.filter((m) => m.category === selectedCategory);

  const getCategoryIcon = (category: JourneyMilestone['category']) => {
    switch (category) {
      case 'internship': return Briefcase;
      case 'education': return GraduationCap;
      case 'security': return Shield;
      case 'achievement': return Trophy;
      default: return Calendar;
    }
  };

  return (
    <section id="journey-timeline" className="py-20 md:py-28 border-b border-[var(--border)] relative">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-[var(--mono)] text-xs font-bold text-[var(--accent)] tracking-widest uppercase">
                Chronology // Engineering Path
              </span>
              <span className="px-2 py-0.5 text-[0.65rem] font-[var(--mono)] uppercase tracking-wider font-bold bg-[var(--raised)] border border-[var(--border)] text-[var(--secondary-text)]">
                Verified Progression
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--primary-text)]">
              Engineering journey,{' '}
              <span className="font-[var(--serif)] italic font-normal text-[var(--accent)]">
                chronological.
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--secondary-text)] max-w-[620px] leading-relaxed">
              Academic foundation, software developer internships, security lab training, and planned career milestones.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 self-start md:self-end">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`min-h-[36px] px-3 py-1.5 text-xs font-[var(--mono)] rounded transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[var(--accent)] text-[var(--bg)] font-bold shadow-[0_0_12px_var(--accent-glow)]'
                    : 'bg-[var(--surface)] text-[var(--secondary-text)] hover:text-[var(--primary-text)] border border-[var(--border)]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Technical Spine & Milestone Cards */}
        <div className="relative border-l-2 border-[var(--border)] ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-10">
          {filteredMilestones.map((milestone) => {
            const IconComponent = getCategoryIcon(milestone.category);
            const isPlanned = milestone.status === 'planned';
            const isInProgress = milestone.status === 'in-progress';

            return (
              <div key={milestone.id} className="relative group">
                {/* Milestone Node on Spine */}
                <div
                  className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-transform group-hover:scale-110 ${
                    isInProgress
                      ? 'border-[var(--accent)] bg-[var(--bg)] text-[var(--accent)] shadow-[0_0_12px_var(--accent-glow)]'
                      : isPlanned
                      ? 'border-dashed border-[var(--muted)] bg-[var(--surface)] text-[var(--muted)]'
                      : 'border-[var(--accent)] bg-[var(--raised)] text-[var(--accent)]'
                  }`}
                  aria-hidden="true"
                >
                  <IconComponent className="w-3 h-3" />
                </div>

                {/* Milestone Card Body */}
                <div
                  className={`p-5 sm:p-6 bg-[var(--surface)] border transition-all ${
                    isInProgress
                      ? 'border-[var(--active-border)] shadow-[0_0_20px_rgba(199,255,69,0.06)]'
                      : isPlanned
                      ? 'border-dashed border-[var(--border)] opacity-85'
                      : 'border-[var(--border)] hover:border-[var(--border-strong)]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-[var(--mono)] text-xs font-bold text-[var(--accent)]">
                        {milestone.month ? `${milestone.month} ` : ''}{milestone.year}
                      </span>
                      <span className="text-[var(--muted)] text-xs">/</span>
                      <span className="font-[var(--mono)] text-xs uppercase text-[var(--secondary-text)]">
                        {milestone.organization}
                      </span>
                    </div>

                    {/* Status Pill */}
                    <div className="self-start sm:self-auto">
                      {isInProgress && (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[0.65rem] font-[var(--mono)] uppercase tracking-wider font-bold bg-[var(--accent-dim)] text-[var(--accent)] border border-[var(--accent)]">
                          <Clock className="w-3 h-3 animate-spin" />
                          Currently Active
                        </span>
                      )}
                      {isPlanned && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[0.65rem] font-[var(--mono)] uppercase tracking-wider font-bold bg-[var(--raised)] text-[var(--muted)] border border-dashed border-[var(--muted)]">
                          Planned Horizon
                        </span>
                      )}
                      {!isInProgress && !isPlanned && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[0.65rem] font-[var(--mono)] uppercase tracking-wider font-bold bg-[var(--raised)] text-[var(--secondary-text)] border border-[var(--border)]">
                          <CheckCircle className="w-3 h-3 text-[var(--accent)]" />
                          Verified
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[var(--primary-text)] mb-2">
                    {milestone.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--secondary-text)] leading-relaxed mb-4">
                    {milestone.summary}
                  </p>

                  {/* Skills / Focus Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-[var(--border)]">
                    <span className="text-[0.7rem] font-[var(--mono)] text-[var(--muted)] mr-1">Skills:</span>
                    {milestone.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 text-[0.65rem] font-[var(--mono)] bg-[var(--raised)] border border-[var(--border)] text-[var(--secondary-text)]"
                      >
                        {skill}
                      </span>
                    ))}
                    {milestone.evidence && (
                      <span className="ml-auto text-[0.65rem] font-[var(--mono)] text-[var(--accent)] italic">
                        {milestone.evidence}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

