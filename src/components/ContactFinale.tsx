import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Copy, Check, Mail, Phone, MapPin, Sparkles, Network, Compass, Rocket } from 'lucide-react';
import { personalProfileData } from '../data/profile';
import { analytics } from '../analytics/tracker';
import { ContactNetworkSvg } from '../svgs/ContactNetworkSvg';
import { AnimeAvatar } from './AnimeAvatar';
import { CharacterDialogue } from './CharacterDialogue';
import { StoryChapter } from './StoryChapter';

export const ContactFinale: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeMediaTab, setActiveMediaTab] = useState<'horizon' | 'network'>('horizon');
  const shouldReduceMotion = useReducedMotion();
  const { email, phone, location, github, linkedin } = personalProfileData.contact;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
    }
  };

  const careerGoals = [
    { title: 'Full-Stack Software Development', desc: 'Engineering resilient web services with React, TypeScript, Python FastAPI, and PostgreSQL.' },
    { title: 'Mobile Application Engineering', desc: 'Developing clean Android client architectures with native Java/Kotlin and RESTful API sync.' },
    { title: 'AI & Contextual Retrieval', desc: 'Integrating modern LLM APIs, semantic vector chunking, and intelligent document assistants.' },
    { title: 'Defensive Security Hardening', desc: 'Applying OWASP defensive guidelines, input sanitization, and automated audit routines.' }
  ];

  return (
    <StoryChapter
      id="contact"
      chapterNumber="CH_06"
      title="THE NEXT CHAPTER: HORIZON OBSERVATION DECK"
      subtitle="Horizon Observation Deck & Open Opportunities"
      narrativeLogline="The Developer Chronicles do not end here — they continue into new missions, production deployments, and high-impact engineering collaborations."
      environmentTheme="horizon"
      className="bg-[#0D0F0C]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Direct Outreach & Career Directives */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          <div className="flex items-center gap-2 mb-3 font-mono text-xs font-bold text-[#C7FF45] tracking-widest uppercase">
            <Rocket className="w-4 h-4" />
            <span>DIRECT TELEMETRY // INITIATE TRANSMISSION</span>
          </div>

          <h3 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--primary-text)] font-sans leading-[1.04]">
            Let's build the{' '}
            <span className="font-[var(--serif)] italic font-normal text-[#C7FF45]">
              next milestone
            </span>{' '}
            together.
          </h3>

          <p className="mt-4 text-sm sm:text-base text-[var(--secondary-text)] max-w-[620px] leading-relaxed font-sans">
            Currently open to Software Developer Internships, Junior Full-Stack Roles, and innovative engineering teams looking for a fast-learning developer passionate about clean code and real solutions.
          </p>

          {/* Primary Verified Email Action */}
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href={`mailto:${email}`}
              className="group inline-flex items-center gap-2.5 text-base sm:text-2xl font-bold text-[var(--primary-text)] border-b-2 border-white/20 pb-1 hover:border-[#C7FF45] hover:text-[#C7FF45] transition-all max-w-full break-all font-mono"
            >
              <Mail className="w-5 h-5 text-[#C7FF45] shrink-0" />
              <span>{email}</span>
              <ArrowUpRight className="w-5 h-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>

            {/* Instant Copy Button */}
            <button
              type="button"
              onClick={handleCopyEmail}
              className={`min-h-[42px] px-4 py-2 border font-mono text-xs uppercase tracking-wider font-bold inline-flex items-center gap-2 transition-all rounded-sm ${
                copied
                  ? 'border-[#C7FF45] bg-[#C7FF45]/10 text-[#C7FF45]'
                  : 'border-white/20 bg-[var(--surface)] text-[var(--primary-text)] hover:border-[#C7FF45] hover:text-[#C7FF45]'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#C7FF45]" />
                  <span>COPIED TO CLIPBOARD</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>COPY EMAIL</span>
                </>
              )}
            </button>
          </div>

          {/* Target Engineering Focus Areas */}
          <div className="mt-8 pt-6 border-t border-[var(--border)]">
            <span className="font-mono text-xs font-bold text-[#C7FF45] uppercase tracking-wider block mb-3">
              Target Technical Horizons:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {careerGoals.map((goal, idx) => (
                <div key={idx} className="p-2.5 bg-[var(--surface)] border border-white/5 rounded-sm">
                  <span className="font-sans font-bold text-xs text-[var(--primary-text)] block">
                    {goal.title}
                  </span>
                  <p className="mt-0.5 text-[11px] text-[var(--secondary-text)] leading-relaxed font-sans">
                    {goal.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Details Row */}
          <div className="mt-8 pt-6 border-t border-[var(--border)] flex flex-wrap items-center gap-y-3 gap-x-6 text-xs font-mono text-[var(--secondary-text)]">
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1.5 hover:text-[#C7FF45] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C7FF45]" />
              <span>{phone}</span>
            </a>

            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => analytics.trackExternalClick('linkedin', linkedin)}
              className="inline-flex items-center gap-1.5 hover:text-[#C7FF45] transition-colors underline underline-offset-4"
            >
              <span>LinkedIn Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => analytics.trackExternalClick('github', github)}
              className="inline-flex items-center gap-1.5 hover:text-[#C7FF45] transition-colors underline underline-offset-4"
            >
              <span>GitHub Repositories</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <span className="inline-flex items-center gap-1.5 text-[var(--muted)]">
              <MapPin className="w-3.5 h-3.5 text-[var(--muted)]" />
              <span>{location}</span>
            </span>
          </div>
        </motion.div>

        {/* Right Column: Horizon Avatar Companion & Network Visualizer */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-5 flex flex-col items-center lg:items-end w-full"
        >
          {/* Mode Switcher */}
          <div className="w-full max-w-[420px] mb-2 flex items-center justify-between px-1 font-mono text-[0.68rem]">
            <span className="text-[var(--muted)] uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-3 h-3 text-[#C7FF45]" />
              FINALE DISPLAY:
            </span>
            <div className="flex items-center gap-1 bg-[var(--surface)] border border-white/10 p-0.5 rounded-sm">
              <button
                type="button"
                onClick={() => setActiveMediaTab('horizon')}
                className={`px-2.5 py-1 font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 rounded-sm ${
                  activeMediaTab === 'horizon'
                    ? 'bg-[#C7FF45] text-[#0A0B09]'
                    : 'text-[var(--secondary-text)] hover:text-[var(--primary-text)]'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>Horizon</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveMediaTab('network')}
                className={`px-2.5 py-1 font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 rounded-sm ${
                  activeMediaTab === 'network'
                    ? 'bg-[#C7FF45] text-[#0A0B09]'
                    : 'text-[var(--secondary-text)] hover:text-[var(--primary-text)]'
                }`}
              >
                <Network className="w-3 h-3" />
                <span>Network</span>
              </button>
            </div>
          </div>

          {/* View Container */}
          <div className="w-full max-w-[420px]">
            {activeMediaTab === 'horizon' ? (
              <div className="relative flex flex-col items-center justify-center p-4 border border-white/10 rounded-sm bg-[#131512]/90 backdrop-blur-md">
                <CharacterDialogue
                  speaker="SANTHOSH // FINALE"
                  message="Every great system begins with an ambitious question. If you are building software that demands reliability, clean architecture, and rapid learning — let's connect."
                  expression="future"
                  position="top"
                  className="mb-2"
                />
                <AnimeAvatar
                  expression="future"
                  size="lg"
                  scene="horizon"
                  interactionEnabled={true}
                  showControls={true}
                />
              </div>
            ) : (
              <div className="shadow-2xl">
                <ContactNetworkSvg />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </StoryChapter>
  );
};

