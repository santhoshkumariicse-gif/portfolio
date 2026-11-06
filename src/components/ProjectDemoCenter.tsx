import React, { useState } from 'react';
import { Play, Users, Layers, AlertTriangle, ArrowRight, Terminal, ExternalLink, CheckCircle } from 'lucide-react';
import { projectDemosData, ProjectDemoDetail } from '../data/projectDemos';

export const ProjectDemoCenter: React.FC = () => {
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'demo' | 'limitations'>('overview');

  // Interactive Demo Simulator States
  const [logSimulationCount, setLogSimulationCount] = useState<number>(3);
  const [demoLogOutput, setDemoLogOutput] = useState<string[]>([
    '[2024-11-05 10:14:02] Accepted password for santhosh from 192.168.1.45 port 52140 ssh2',
    '[2024-11-05 10:15:10] Failed password for invalid user admin from 203.0.113.19 port 41202 ssh2'
  ]);
  const [demoAlertTriggered, setDemoAlertTriggered] = useState<boolean>(false);

  const currentProject: ProjectDemoDetail = projectDemosData[activeProjectIndex] || projectDemosData[0];

  const handleSimulateLogAttack = () => {
    const attackIp = '198.51.100.84';
    const newCount = logSimulationCount + 1;
    setLogSimulationCount(newCount);

    const newLogs = [
      ...demoLogOutput,
      `[${new Date().toISOString().substring(11, 19)}] Failed password for root from ${attackIp} port ${40000 + newCount} ssh2`
    ];

    if (newCount >= 5) {
      newLogs.push(`🚨 [ALERT DISPATCH] High-frequency brute-force threshold breached for IP ${attackIp} (${newCount} failures in 60s)!`);
      setDemoAlertTriggered(true);
    }

    setDemoLogOutput(newLogs.slice(-6));
  };

  const handleResetLogDemo = () => {
    setLogSimulationCount(0);
    setDemoAlertTriggered(false);
    setDemoLogOutput([
      '[SYSTEM DAEMON READY] Monitoring /var/log/auth.log via non-blocking POSIX descriptor...'
    ]);
  };

  return (
    <section id="demo-center" className="py-20 md:py-28 border-b border-[var(--border)] bg-[#0A0B09] relative">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-[var(--mono)] text-xs font-bold text-[var(--accent)] tracking-widest uppercase">
                Demonstrations // Engineering Evidence
              </span>
              <span className="px-2 py-0.5 text-[0.65rem] font-[var(--mono)] uppercase tracking-wider font-bold bg-[var(--raised)] border border-[var(--border)] text-[var(--secondary-text)]">
                Verifiable Showcase
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--primary-text)]">
              Project demonstration center,{' '}
              <span className="font-[var(--serif)] italic font-normal text-[var(--accent)]">
                verified.
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--secondary-text)] max-w-[620px] leading-relaxed">
              In-depth technical problem analyses, design trade-offs, live in-browser feature simulators, and transparently documented limitations.
            </p>
          </div>
        </div>

        {/* Project Selector Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-[var(--border)] pb-4">
          {projectDemosData.map((project, idx) => {
            const isActive = activeProjectIndex === idx;
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => {
                  setActiveProjectIndex(idx);
                  setActiveTab('overview');
                }}
                className={`min-h-[44px] px-4 py-2 border font-[var(--mono)] text-xs transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'border-[var(--accent)] bg-[var(--surface)] text-[var(--accent)] font-bold shadow-[0_0_15px_var(--accent-glow)]'
                    : 'border-[var(--border)] bg-[var(--raised)] text-[var(--secondary-text)] hover:text-[var(--primary-text)]'
                }`}
              >
                <span>{project.title}</span>
                <span className="text-[0.65rem] px-1.5 py-0.2 bg-[var(--bg)] border border-[var(--border)] text-[var(--muted)]">
                  {project.status}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Showcase Housing */}
        <div className="bg-[var(--surface)] border border-[var(--border-strong)] p-6 sm:p-10 shadow-xl">
          {/* Top Title & Metadata Strip */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-[var(--border)] pb-6 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-[var(--mono)] text-[var(--accent)] mb-2">
                <span>{currentProject.category}</span>
                <span>//</span>
                <span>{currentProject.status}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--primary-text)]">
                {currentProject.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--secondary-text)] max-w-2xl leading-relaxed">
                {currentProject.tagline}
              </p>
            </div>

            {currentProject.repoUrl && (
              <a
                href={currentProject.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start min-h-[40px] px-4 py-2 bg-[var(--raised)] border border-[var(--border)] text-[var(--primary-text)] hover:border-[var(--accent)] hover:text-[var(--accent)] font-[var(--mono)] text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-2"
              >
                <span>GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-8 font-[var(--mono)] text-xs border-b border-[var(--border)] pb-3">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`min-h-[38px] px-3.5 py-1.5 rounded transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'overview'
                  ? 'bg-[var(--accent)] text-[var(--bg)] font-bold'
                  : 'text-[var(--secondary-text)] hover:text-[var(--primary-text)]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>1. Problem &amp; Users</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('architecture')}
              className={`min-h-[38px] px-3.5 py-1.5 rounded transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'architecture'
                  ? 'bg-[var(--accent)] text-[var(--bg)] font-bold'
                  : 'text-[var(--secondary-text)] hover:text-[var(--primary-text)]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>2. Architecture &amp; Decisions</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('demo')}
              className={`min-h-[38px] px-3.5 py-1.5 rounded transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'demo'
                  ? 'bg-[var(--accent)] text-[var(--bg)] font-bold'
                  : 'text-[var(--secondary-text)] hover:text-[var(--primary-text)]'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>3. Live Feature Simulator</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('limitations')}
              className={`min-h-[38px] px-3.5 py-1.5 rounded transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'limitations'
                  ? 'bg-[var(--accent)] text-[var(--bg)] font-bold'
                  : 'text-[var(--secondary-text)] hover:text-[var(--primary-text)]'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>4. Limitations &amp; Roadmap</span>
            </button>
          </div>

          {/* Tab 1: Overview & Users */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
              <div className="space-y-4">
                <div>
                  <h4 className="font-[var(--mono)] text-xs uppercase tracking-wider text-[var(--accent)] font-bold mb-2">
                    The Problem Statement:
                  </h4>
                  <p className="text-[var(--secondary-text)] leading-relaxed">
                    {currentProject.problem}
                  </p>
                </div>

                <div>
                  <h4 className="font-[var(--mono)] text-xs uppercase tracking-wider text-[var(--accent)] font-bold mb-2">
                    Engineered Solution:
                  </h4>
                  <p className="text-[var(--secondary-text)] leading-relaxed">
                    {currentProject.solution}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-[var(--mono)] text-xs uppercase tracking-wider text-[var(--accent)] font-bold mb-3">
                  Target User Profiles:
                </h4>
                <div className="space-y-2.5">
                  {currentProject.targetUsers.map((user, idx) => (
                    <div key={idx} className="p-3 bg-[var(--raised)] border border-[var(--border)] flex items-start gap-2.5">
                      <Users className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                      <span className="text-xs text-[var(--primary-text)]">{user}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Architecture & Decisions */}
          {activeTab === 'architecture' && (
            <div className="space-y-6 text-sm">
              <div>
                <h4 className="font-[var(--mono)] text-xs uppercase tracking-wider text-[var(--accent)] font-bold mb-3">
                  Technology Stack:
                </h4>
                <div className="flex flex-wrap items-center gap-2">
                  {currentProject.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-[var(--raised)] border border-[var(--border)] text-xs font-[var(--mono)] text-[var(--accent)] font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-[var(--mono)] text-xs uppercase tracking-wider text-[var(--accent)] font-bold mb-3">
                  Important Implementation Trade-offs &amp; Architectural Decisions:
                </h4>
                <div className="space-y-3">
                  {currentProject.designTradeoffs.map((tradeoff, idx) => (
                    <div key={idx} className="p-4 bg-[var(--raised)] border-l-2 border-[var(--accent)] text-xs text-[var(--secondary-text)] leading-relaxed">
                      {tradeoff}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Interactive Demo Simulator */}
          {activeTab === 'demo' && (
            <div className="space-y-6">
              <div className="p-4 bg-[var(--raised)] border border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-[var(--mono)] text-[var(--accent)] font-bold">
                    Interactive In-Browser Simulation
                  </div>
                  <div className="text-xs text-[var(--secondary-text)] mt-0.5">
                    Trigger simulated server log ingress events to verify regular expression parsing and sliding-window rate thresholds.
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleSimulateLogAttack}
                    className="min-h-[38px] px-4 py-1.5 bg-[var(--accent)] text-[var(--bg)] font-[var(--mono)] text-xs font-bold uppercase tracking-wider hover:bg-[#d8ff6b] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Simulate Failed Login (+1)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={handleResetLogDemo}
                    className="min-h-[38px] px-3 py-1.5 border border-[var(--border)] bg-[var(--surface)] text-[var(--secondary-text)] hover:text-[var(--primary-text)] font-[var(--mono)] text-xs transition-colors cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Terminal Viewport */}
              <div className="bg-[#050604] border border-[var(--border-strong)] p-4 font-[var(--mono)] text-xs">
                <div className="flex items-center justify-between border-b border-[var(--border)] pb-2 mb-3 text-[0.7rem] text-[var(--muted)]">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>python3 -u log_triage_daemon.py --watch /var/log/auth.log</span>
                  </div>
                  <span className={demoAlertTriggered ? 'text-red-400 font-bold' : 'text-[var(--accent)]'}>
                    STATUS: {demoAlertTriggered ? 'THRESHOLD ALERT ACTIVE' : 'STREAMING'}
                  </span>
                </div>

                <div className="space-y-1.5 min-h-[140px]">
                  {demoLogOutput.map((line, idx) => (
                    <div
                      key={idx}
                      className={
                        line.includes('ALERT DISPATCH')
                          ? 'text-red-400 font-bold bg-red-950/20 p-1 border-l border-red-500'
                          : line.includes('Failed password')
                          ? 'text-yellow-300'
                          : 'text-[var(--secondary-text)]'
                      }
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Limitations & Roadmap */}
          {activeTab === 'limitations' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
              <div>
                <h4 className="font-[var(--mono)] text-xs uppercase tracking-wider text-yellow-400 font-bold mb-3 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  <span>Acknowledged Technical Limitations:</span>
                </h4>
                <div className="space-y-2.5">
                  {currentProject.knownLimitations.map((lim, idx) => (
                    <div key={idx} className="p-3 bg-[var(--raised)] border border-[var(--border)] text-xs text-[var(--secondary-text)] leading-relaxed">
                      • {lim}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-[var(--mono)] text-xs uppercase tracking-wider text-[var(--accent)] font-bold mb-3 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[var(--accent)]" />
                  <span>Future Engineering Milestones:</span>
                </h4>
                <div className="space-y-2.5">
                  {currentProject.futureRoadmap.map((road, idx) => (
                    <div key={idx} className="p-3 bg-[var(--raised)] border border-[var(--border)] text-xs text-[var(--primary-text)] leading-relaxed">
                      → {road}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
