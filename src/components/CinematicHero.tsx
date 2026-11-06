import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, MapPin, Download, Send, Eye, ShieldCheck, Sparkles, Terminal, Compass } from 'lucide-react';
import { CinematicParallaxBackdrop } from './CinematicParallaxBackdrop';
import { AnimeAvatar } from './AnimeAvatar';
import { CharacterDialogue } from './CharacterDialogue';
import { ProfilePortraitCard } from './ProfilePortraitCard';
import { SystemVisualization } from './SystemVisualization';
import { personalProfileData } from '../data/profile';
import { useLanguage } from '../i18n/LanguageContext';
import { MagneticElement, ScrollIndicator } from '../motion';

export const CinematicHero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLanguage();
  const [activeVisualTab, setActiveVisualTab] = useState<'avatar' | 'portrait' | 'architecture'>('avatar');

  return (
    <section
      id="top"
      data-chapter="CH_01"
      data-theme="cyber-city"
      className="relative min-h-[calc(100vh-72px)] flex items-center py-12 md:py-20 border-b border-[var(--border)] overflow-hidden"
    >
      {/* Layered Cyber Parallax Background */}
      <CinematicParallaxBackdrop />

      <div className="max-w-[1180px] w-full mx-auto px-4 sm:px-6 relative z-10">
        {/* Chapter 01 Narrative Banner */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-[var(--secondary-text)] pb-3 border-b border-white/10"
        >
          <div className="flex items-center gap-2.5">
            <span className="px-2 py-0.5 rounded-sm bg-[#C7FF45]/10 text-[#C7FF45] border border-[#C7FF45]/40 font-bold tracking-widest uppercase">
              CHAPTER 01
            </span>
            <span className="text-white/60 tracking-wider uppercase font-semibold">
              THE BEGINNING // GATEWAY TO THE DIGITAL METROPOLIS
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[10px] text-[#C7FF45]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C7FF45] animate-ping" />
            <span>SESSION: DEV_CHRONICLES // ONLINE</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Narrative Headline, Tagline, Profile, and CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Kicker / Institution Details */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2.5 mb-3 font-mono text-xs font-bold uppercase tracking-widest text-[#C7FF45]"
            >
              <span className="w-6 h-[1.5px] bg-[#C7FF45] inline-block" />
              <span>{personalProfileData.department} · {personalProfileData.education.institution}</span>
            </motion.div>

            {/* Cinematic Headline: SANTHOSH KUMAR M */}
            <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-[4.6rem] font-extrabold tracking-tight leading-[1.02] sm:leading-[0.98] text-[var(--primary-text)] break-words font-sans">
              <span className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={shouldReduceMotion ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                >
                  SANTHOSH KUMAR M
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-1">
                <motion.span
                  className="block text-xl sm:text-3xl md:text-4xl text-[var(--secondary-text)] font-semibold mt-2"
                  initial={shouldReduceMotion ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                >
                  Computer Science Engineering Student
                </motion.span>
              </span>
            </h1>

            {/* Tagline */}
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="mt-3 text-lg sm:text-xl font-[var(--serif)] italic text-[#C7FF45] font-medium"
            >
              "Every great solution begins with a problem worth solving."
            </motion.p>

            {/* Verified Professional Introduction */}
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-4 text-sm sm:text-base text-[var(--secondary-text)] max-w-[580px] leading-relaxed font-sans"
            >
              I'm <strong className="text-[var(--primary-text)] font-semibold">{personalProfileData.name}</strong>, a Computer Science Engineering student passionate about building practical software solutions. I enjoy developing applications, exploring emerging technologies, solving real-world problems, and continuously improving my engineering skills.
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.48 }}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              {/* Enter My World (Scroll to Chapter 2: The Origin) */}
              <MagneticElement strength={20}>
                <a
                  href="#about"
                  className="min-h-[46px] px-6 inline-flex items-center justify-center gap-2 bg-[#C7FF45] text-[#0A0B09] font-mono text-xs uppercase tracking-wider font-extrabold transition-all hover:bg-[#D2FF5E] hover:shadow-[0_0_20px_rgba(199,255,69,0.4)] active:scale-[0.98]"
                >
                  <Compass className="w-4 h-4" />
                  <span>Enter My World</span>
                </a>
              </MagneticElement>

              {/* View Projects */}
              <MagneticElement strength={18}>
                <a
                  href="#projects"
                  className="min-h-[46px] px-5 inline-flex items-center justify-center gap-2 border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--primary-text)] font-mono text-xs uppercase tracking-wider font-bold hover:border-[#C7FF45] hover:text-[#C7FF45] transition-all active:scale-[0.98]"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{t.hero.exploreBtn}</span>
                </a>
              </MagneticElement>

              {/* Download / View Resume */}
              <MagneticElement strength={16}>
                <a
                  href="#resume"
                  className="min-h-[46px] px-5 inline-flex items-center justify-center gap-2 border border-[var(--border)] bg-transparent text-[var(--secondary-text)] font-mono text-xs uppercase tracking-wider font-medium hover:text-[var(--primary-text)] hover:border-[var(--border-strong)] transition-all active:scale-[0.98]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.hero.resumeBtn}</span>
                </a>
              </MagneticElement>

              {/* Contact Me */}
              <MagneticElement strength={14}>
                <a
                  href="#contact"
                  className="min-h-[46px] px-4 inline-flex items-center justify-center gap-2 border border-transparent text-[var(--secondary-text)] font-mono text-xs uppercase tracking-wider hover:text-[#C7FF45] transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.hero.contactBtn}</span>
                </a>
              </MagneticElement>
            </motion.div>

            {/* Verified External Links */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.58 }}
              className="mt-6 flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--secondary-text)]"
            >
              <a
                href={personalProfileData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#C7FF45] underline underline-offset-4 transition-colors"
              >
                <span>LinkedIn Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <span className="text-[var(--muted)]">·</span>
              <a
                href={personalProfileData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[#C7FF45] underline underline-offset-4 transition-colors"
              >
                <span>GitHub Repositories</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>

            {/* Primary Interests & Academic Badge Strip */}
            <div className="mt-7 pt-5 border-t border-[var(--border)] flex flex-col gap-2.5 font-mono text-xs text-[var(--secondary-text)]">
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C7FF45] animate-pulse" />
                  <span className="text-[var(--primary-text)] font-medium">Aspiring Software Developer</span>
                </span>
                <span className="text-[var(--muted)]">·</span>
                <span className="flex items-center gap-1 text-[var(--muted)]">
                  <MapPin className="w-3.5 h-3.5 text-[var(--secondary-text)]" />
                  <span>{personalProfileData.education.location}</span>
                </span>
              </div>

              {/* Verified Primary Interests Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[0.66rem] uppercase tracking-wider text-[var(--muted)] mr-1">Interests:</span>
                {personalProfileData.interests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-[0.65rem] border border-[var(--border)] bg-[var(--surface)] text-[var(--secondary-text)] rounded-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Stage with Companion / Portrait / Architecture Switcher */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 w-full flex flex-col items-center lg:items-end"
          >
            {/* View Selector Controls */}
            <div className="w-full max-w-[420px] mb-2 flex items-center justify-between px-1 font-mono text-[0.68rem]">
              <span className="text-[var(--muted)] uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-[#C7FF45]" />
                Display Mode:
              </span>
              <div className="flex items-center gap-1 bg-[var(--surface)] border border-[var(--border)] p-0.5 rounded-sm">
                <button
                  type="button"
                  onClick={() => setActiveVisualTab('avatar')}
                  className={`px-2.5 py-1 font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 rounded-sm ${
                    activeVisualTab === 'avatar'
                      ? 'bg-[#C7FF45] text-[#0A0B09]'
                      : 'text-[var(--secondary-text)] hover:text-[var(--primary-text)]'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Companion</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveVisualTab('portrait')}
                  className={`px-2.5 py-1 font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 rounded-sm ${
                    activeVisualTab === 'portrait'
                      ? 'bg-[#C7FF45] text-[#0A0B09]'
                      : 'text-[var(--secondary-text)] hover:text-[var(--primary-text)]'
                  }`}
                >
                  <ShieldCheck className="w-3 h-3" />
                  <span>Portrait</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveVisualTab('architecture')}
                  className={`px-2.5 py-1 font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 rounded-sm ${
                    activeVisualTab === 'architecture'
                      ? 'bg-[#C7FF45] text-[#0A0B09]'
                      : 'text-[var(--secondary-text)] hover:text-[var(--primary-text)]'
                  }`}
                >
                  <span>Topology</span>
                </button>
              </div>
            </div>

            {/* Display View Content Container */}
            <div className="w-full max-w-[420px] relative">
              {activeVisualTab === 'avatar' && (
                <div className="relative flex flex-col items-center justify-center p-4 border border-white/10 rounded-sm bg-[#131512]/90 backdrop-blur-md">
                  {/* Speech Bubble Dialogue */}
                  <CharacterDialogue
                    speaker="SANTHOSH // DEV-01"
                    message="Welcome to The Developer Chronicles. I'm Santhosh Kumar M, Computer Science student. Ready to explore my real projects and technical journey?"
                    expression="idle"
                    position="top"
                    className="mb-2"
                  />

                  {/* Anime Avatar in Idle Pose */}
                  <AnimeAvatar
                    expression="idle"
                    size="lg"
                    scene="cyber-city"
                    interactionEnabled={true}
                    showControls={true}
                  />
                </div>
              )}

              {activeVisualTab === 'portrait' && (
                <ProfilePortraitCard variant="hero" />
              )}

              {activeVisualTab === 'architecture' && (
                <SystemVisualization />
              )}
            </div>
          </motion.div>
        </div>

        {/* Animated Scroll Indicator to Next Chapter */}
        <div className="mt-12 hidden md:flex justify-center">
          <ScrollIndicator targetId="about" />
        </div>
      </div>
    </section>
  );
};
