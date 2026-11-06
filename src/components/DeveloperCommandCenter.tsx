import React from 'react';
import { commandCenterData } from '../data/commandCenter';
import { Activity, Compass, Terminal, ArrowUpRight, Clock } from 'lucide-react';

export const DeveloperCommandCenter: React.FC = () => {
  const { status, focusAreas, engineeringLogs, roadmap } = commandCenterData;

  return (
    <section id="command-center" className="py-20 md:py-28 border-b border-[var(--border)] bg-[#0A0B09]">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="font-[var(--mono)] text-xs font-bold text-[var(--accent)] tracking-widest uppercase">
              Dashboard // Command Center
            </span>
            <span className="px-2 py-0.5 text-[0.65rem] font-[var(--mono)] uppercase tracking-wider font-bold bg-[var(--raised)] border border-[var(--border)] text-[var(--secondary-text)]">
              Live Engineering State
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--primary-text)]">
            Engineering telemetry,{' '}
            <span className="font-[var(--serif)] italic font-normal text-[var(--accent)]">
              active.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--secondary-text)] max-w-[640px] leading-relaxed">
            A real-time overview of current internship focus, verified technical development logs, learning roadmaps, and immediate recruiter contact pathways.
          </p>
        </div>

        {/* Top Telemetry Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 mb-8 bg-[var(--surface)] border border-[var(--border-strong)] font-[var(--mono)] text-xs">
          <div className="p-3 bg-[var(--surface-subtle)] border border-[var(--border)]">
            <span className="text-[var(--muted)] text-[0.68rem] uppercase tracking-wider block mb-1">
              OPERATIONAL STATUS
            </span>
            <div className="flex items-center gap-2 font-bold text-[var(--accent)]">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <span>{status.state} // ACTIVE</span>
            </div>
            <span className="text-[0.7rem] text-[var(--secondary-text)] mt-1 block">
              {status.availability}
            </span>
          </div>

          <div className="p-3 bg-[var(--surface-subtle)] border border-[var(--border)]">
            <span className="text-[var(--muted)] text-[0.68rem] uppercase tracking-wider block mb-1">
              CURRENT INTERNSHIP
            </span>
            <span className="font-semibold text-[var(--primary-text)] block truncate">
              Cybernaut
            </span>
            <span className="text-[0.7rem] text-[var(--secondary-text)] mt-1 block">
              Python Developer Intern (Jul 2024–Present)
            </span>
          </div>

          <div className="p-3 bg-[var(--surface-subtle)] border border-[var(--border)]">
            <span className="text-[var(--muted)] text-[0.68rem] uppercase tracking-wider block mb-1">
              ACADEMIC STANDING
            </span>
            <span className="font-semibold text-[var(--primary-text)] block truncate">
              B.E. Computer Science
            </span>
            <span className="text-[0.7rem] text-[var(--secondary-text)] mt-1 block">
              GCT · May 2027 · GPA 7.2/10
            </span>
          </div>

          <div className="p-3 bg-[var(--surface-subtle)] border border-[var(--border)]">
            <span className="text-[var(--muted)] text-[0.68rem] uppercase tracking-wider block mb-1">
              LOCATION &amp; TIMEZONE
            </span>
            <span className="font-semibold text-[var(--primary-text)] block truncate">
              Namakkal, TN, India
            </span>
            <span className="text-[0.7rem] text-[var(--secondary-text)] mt-1 block">
              {status.timezone}
            </span>
          </div>
        </div>

        {/* Dashboard 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (7 cols): Focus Areas & Verified Engineering Updates */}
          <div className="lg:col-span-7 space-y-8">
            {/* Active Focus Areas */}
            <div>
              <div className="flex items-center gap-2 mb-4 font-[var(--mono)] text-xs text-[var(--accent)] font-bold">
                <Compass className="w-4 h-4" />
                <span className="tracking-wider uppercase">01 // Primary Focus Domains</span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {focusAreas.map((area, i) => (
                  <div
                    key={i}
                    className="p-4 bg-[var(--surface)] border border-[var(--border)] transition-colors hover:border-[var(--active-border)]"
                  >
                    <h3 className="text-sm font-bold text-[var(--primary-text)] flex items-center justify-between">
                      <span>{area.title}</span>
                      <span className="text-[0.65rem] font-[var(--mono)] text-[var(--accent)] font-semibold">
                        ACTIVE PRACTICE
                      </span>
                    </h3>
                    <p className="mt-2 text-xs text-[var(--secondary-text)] leading-relaxed">
                      {area.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Engineering Logs */}
            <div>
              <div className="flex items-center gap-2 mb-4 font-[var(--mono)] text-xs text-[var(--accent)] font-bold">
                <Activity className="w-4 h-4" />
                <span className="tracking-wider uppercase">02 // Verified Engineering Logs</span>
              </div>

              <div className="space-y-3 font-[var(--mono)]">
                {engineeringLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-4 bg-[var(--surface)] border border-[var(--border)] flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs transition-colors hover:border-[var(--active-border)]"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <span className="px-2 py-0.5 text-[0.65rem] font-bold bg-[var(--raised)] border border-[var(--border)] text-[var(--accent)]">
                          {log.tag}
                        </span>
                        <span className="text-[var(--primary-text)] font-bold font-[var(--sans)] text-sm">
                          {log.title}
                        </span>
                      </div>
                      <p className="text-[0.78rem] text-[var(--secondary-text)] font-[var(--sans)] leading-relaxed">
                        {log.details}
                      </p>
                    </div>

                    <span className="text-[0.7rem] text-[var(--muted)] font-semibold shrink-0 sm:text-right">
                      {log.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Roadmap & Quick Launch Console */}
          <div className="lg:col-span-5 space-y-8">
            {/* Continuous Learning Roadmap */}
            <div>
              <div className="flex items-center gap-2 mb-4 font-[var(--mono)] text-xs text-[var(--accent)] font-bold">
                <Clock className="w-4 h-4" />
                <span className="tracking-wider uppercase">03 // Continuous Learning Roadmap</span>
              </div>

              <div className="divide-y divide-[var(--border)] border border-[var(--border)] bg-[var(--surface)] font-[var(--mono)] text-xs">
                {roadmap.map((item, idx) => {
                  const isInProgress = item.stage === 'in_progress';
                  return (
                    <div key={idx} className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`text-[0.65rem] font-bold uppercase tracking-wider px-2 py-0.5 border ${
                            isInProgress
                              ? 'bg-[rgba(199,255,69,0.08)] text-[var(--accent)] border-[var(--accent)]/40'
                              : 'bg-[var(--raised)] text-[var(--muted)] border-[var(--border)]'
                          }`}
                        >
                          {isInProgress ? 'In Progress' : 'Planned Target'}
                        </span>
                        <span className="text-[0.68rem] text-[var(--muted)]">
                          {item.target}
                        </span>
                      </div>

                      <h4 className="font-bold text-[var(--primary-text)] font-[var(--sans)] text-sm mt-2">
                        {item.title}
                      </h4>
                      <span className="text-[0.7rem] text-[var(--secondary-text)] block mt-0.5">
                        Domain: {item.focusArea}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Launch Console */}
            <div className="p-6 bg-[var(--surface)] border border-[var(--border)]">
              <div className="flex items-center gap-2 mb-4 font-[var(--mono)] text-xs text-[var(--accent)] font-bold">
                <Terminal className="w-4 h-4" />
                <span className="tracking-wider uppercase">04 // Quick Launch Actions</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-[var(--mono)]">
                <a
                  href="#projects"
                  className="min-h-[42px] px-3 py-2 bg-[var(--raised)] border border-[var(--border)] flex items-center justify-between text-[var(--primary-text)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                >
                  <span>Project Case Studies</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent)]" />
                </a>

                <a
                  href="#systems-lab"
                  className="min-h-[42px] px-3 py-2 bg-[var(--raised)] border border-[var(--border)] flex items-center justify-between text-[var(--primary-text)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                >
                  <span>Systems Laboratory</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent)]" />
                </a>

                <a
                  href="https://github.com/santhoshkumariicse-gif"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[42px] px-3 py-2 bg-[var(--raised)] border border-[var(--border)] flex items-center justify-between text-[var(--primary-text)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                >
                  <span>GitHub Repositories</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent)]" />
                </a>

                <a
                  href="https://linkedin.com/in/santhosh-kumar-8681612a4/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[42px] px-3 py-2 bg-[var(--raised)] border border-[var(--border)] flex items-center justify-between text-[var(--primary-text)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                >
                  <span>LinkedIn Profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent)]" />
                </a>
              </div>

              <div className="mt-4 pt-4 border-t border-[var(--border)]">
                <a
                  href="mailto:santhoshkumar160706@gmail.com?subject=Resume%20Request%20-%20Santhosh%20Kumar%20M"
                  className="min-h-[44px] w-full flex items-center justify-center gap-2 bg-[var(--accent)] text-[var(--bg)] font-bold text-xs uppercase tracking-wider font-[var(--mono)] transition-all hover:bg-[#d8ff6b] active:scale-[0.99]"
                >
                  <span>Direct Résumé Request</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
