import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, MapPin, Download, Send, Eye, ShieldCheck, Cpu } from 'lucide-react';
import { SystemVisualization } from './SystemVisualization';
import { ProfilePortraitCard } from './ProfilePortraitCard';
import { personalProfileData } from '../data/profile';
import { useLanguage } from '../i18n/LanguageContext';
import { MagneticElement, ScrollIndicator } from '../motion';

export const HeroSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLanguage();
  const [activeVisualTab, setActiveVisualTab] = useState<'portrait' | 'architecture'>('portrait');

  return (
    <section id="top" className="relative min-h-[calc(100vh-72px)] flex items-center py-12 md:py-20 border-b border-[var(--border)] overflow-hidden">
      <div className="max-w-[1180px] w-full mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Kicker */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2.5 mb-4 font-[var(--mono)] text-xs font-bold uppercase tracking-widest text-[var(--accent)]"
            >
              <span className="w-6 h-[1.5px] bg-[var(--accent)] inline-block" />
              <span>{personalProfileData.department} · {personalProfileData.education.institution}</span>
            </motion.div>

            {/* Cinematic Headline: SANTHOSH KUMAR M */}
            <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-[4.8rem] font-extrabold tracking-tight leading-[1.02] sm:leading-[0.98] text-[var(--primary-text)] break-words">
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
              className="mt-3 text-lg sm:text-xl font-[var(--serif)] italic text-[var(--accent)] font-medium"
            >
              "{personalProfileData.tagline}"
            </motion.p>

            {/* Verified Professional Introduction */}
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-5 text-sm sm:text-base text-[var(--secondary-text)] max-w-[580px] leading-relaxed"
            >
              I'm <strong className="text-[var(--primary-text)] font-semibold">{personalProfileData.name}</strong>, a Computer Science Engineering student passionate about building practical software solutions. I enjoy developing applications, exploring emerging technologies, solving real-world problems, and continuously improving my engineering skills.
            </motion.p>

            {/* CTA Buttons: View Projects, Download Resume, Contact Me */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.48 }}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              {/* View Projects */}
              <MagneticElement strength={22}>
                <a
                  href="#projects"
                  className="min-h-[46px] px-6 inline-flex items-center justify-center gap-2 bg-[var(--accent)] text-[var(--bg)] font-[var(--mono)] text-xs uppercase tracking-wider font-bold transition-all hover:bg-[#D2FF5E] hover:shadow-[0_0_20px_var(--accent-glow)] active:scale-[0.98]"
                >
                  <Eye className="w-4 h-4" />
                  <span>{t.hero.exploreBtn}</span>
                </a>
              </MagneticElement>

              {/* Download / View Resume */}
              <MagneticElement strength={18}>
                <a
                  href="#resume"
                  className="min-h-[46px] px-5 inline-flex items-center justify-center gap-2 border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--primary-text)] font-[var(--mono)] text-xs uppercase tracking-wider font-bold hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all active:scale-[0.98]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.hero.resumeBtn}</span>
                </a>
              </MagneticElement>

              {/* Contact Me */}
              <MagneticElement strength={15}>
                <a
                  href="#contact"
                  className="min-h-[46px] px-5 inline-flex items-center justify-center gap-2 border border-[var(--border)] bg-transparent text-[var(--secondary-text)] font-[var(--mono)] text-xs uppercase tracking-wider font-medium hover:text-[var(--primary-text)] hover:border-[var(--border-strong)] transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.hero.contactBtn}</span>
                </a>
              </MagneticElement>
            </motion.div>

            {/* Verified External Links with Icons */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.58 }}
              className="mt-7 flex flex-wrap items-center gap-4 text-xs font-[var(--mono)] text-[var(--secondary-text)]"
            >
              <a
                href={personalProfileData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[var(--accent)] underline underline-offset-4 transition-colors"
              >
                <span>LinkedIn Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <span className="text-[var(--muted)]">·</span>
              <a
                href={personalProfileData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-[var(--accent)] underline underline-offset-4 transition-colors"
              >
                <span>GitHub Repositories</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>

            {/* Primary Interests & Academic Badge Strip */}
            <div className="mt-8 pt-6 border-t border-[var(--border)] flex flex-col gap-3 font-[var(--mono)] text-xs text-[var(--secondary-text)]">
              <div className="flex flex-wrap items-center gap-y-2 gap-x-5">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
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
                    className="px-2 py-0.5 text-[0.65rem] border border-[var(--border)] bg-[var(--surface)] text-[var(--secondary-text)]"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Profile Portrait & Interactive Visualizer Tabs */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 w-full flex flex-col items-center lg:items-end"
          >
            {/* View Selector Controls */}
            <div className="w-full max-w-[420px] mb-2 flex items-center justify-between px-2 font-[var(--mono)] text-[0.68rem]">
              <span className="text-[var(--muted)] uppercase tracking-wider">Visual Display:</span>
              <div className="flex items-center gap-1 bg-[var(--surface)] border border-[var(--border)] p-0.5">
                <button
                  type="button"
                  onClick={() => setActiveVisualTab('portrait')}
                  className={`px-3 py-1 font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                    activeVisualTab === 'portrait'
                      ? 'bg-[var(--accent)] text-[var(--bg)]'
                      : 'text-[var(--secondary-text)] hover:text-[var(--primary-text)]'
                  }`}
                >
                  <ShieldCheck className="w-3 h-3" />
                  <span>Portrait</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveVisualTab('architecture')}
                  className={`px-3 py-1 font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                    activeVisualTab === 'architecture'
                      ? 'bg-[var(--accent)] text-[var(--bg)]'
                      : 'text-[var(--secondary-text)] hover:text-[var(--primary-text)]'
                  }`}
                >
                  <Cpu className="w-3 h-3" />
                  <span>Architecture</span>
                </button>
              </div>
            </div>

            {/* Display View Content */}
            <div className="w-full max-w-[420px]">
              {activeVisualTab === 'portrait' ? (
                <ProfilePortraitCard variant="hero" />
              ) : (
                <SystemVisualization />
              )}
            </div>
          </motion.div>
        </div>

        {/* Animated Scroll Indicator */}
        <div className="mt-14 hidden md:flex justify-center">
          <ScrollIndicator targetId="about" />
        </div>
      </div>
    </section>
  );
};
