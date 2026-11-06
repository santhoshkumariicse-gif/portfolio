import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { SystemVisualization } from './SystemVisualization';
import { personalProfileData } from '../data/profile';
import { useLanguage } from '../i18n/LanguageContext';
import { MagneticElement, ScrollIndicator } from '../motion';

export const HeroSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLanguage();

  const titleLines = [t.hero.headingLine1, `${t.hero.headingLine2} ${t.hero.headingLine2Accent}`];

  return (
    <section id="top" className="relative min-h-[calc(100vh-72px)] flex items-center py-12 md:py-20 border-b border-[var(--border)] overflow-hidden">
      <div className="max-w-[1180px] w-full mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Editorial & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Kicker */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2.5 mb-5 font-[var(--mono)] text-xs font-bold uppercase tracking-widest text-[var(--accent)]"
            >
              <span className="w-6 h-[1.5px] bg-[var(--accent)] inline-block" />
              <span>{t.hero.kicker}</span>
            </motion.div>

            {/* Cinematic Headline */}
            <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-extrabold tracking-tight leading-[1.02] sm:leading-[0.98] text-[var(--primary-text)] break-words">
              {titleLines.map((line, idx) => (
                <span key={idx} className="block overflow-hidden pb-1">
                  <motion.span
                    className="block"
                    initial={shouldReduceMotion ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.1 + idx * 0.15
                    }}
                  >
                    {idx === 1 ? (
                      <>
                        {t.hero.headingLine2}{' '}
                        <em className="font-[var(--serif)] italic font-normal text-[var(--accent)]">
                          {t.hero.headingLine2Accent}
                        </em>
                      </>
                    ) : (
                      line
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Subtitle / Bio */}
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38 }}
              className="mt-6 text-base sm:text-lg text-[var(--secondary-text)] max-w-[560px] leading-relaxed"
            >
              I’m <strong className="text-[var(--primary-text)] font-semibold">{personalProfileData.name}</strong>, a Computer Science Engineering student focused on Python development, secure web architectures, and practical vulnerability assessment.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.48 }}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <MagneticElement strength={22}>
                <a
                  href="#projects"
                  className="min-h-[46px] px-6 inline-flex items-center justify-center gap-2 bg-[var(--accent)] text-[var(--bg)] font-[var(--mono)] text-xs uppercase tracking-wider font-bold transition-all hover:bg-[#D2FF5E] hover:shadow-[0_0_20px_var(--accent-glow)] active:scale-[0.98]"
                >
                  <span>{t.hero.exploreBtn}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </MagneticElement>

              <MagneticElement strength={18}>
                <a
                  href={`mailto:${personalProfileData.contact.email}?subject=Resume%20Request%20-%20${encodeURIComponent(personalProfileData.name)}`}
                  className="min-h-[46px] px-5 inline-flex items-center justify-center gap-2 border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--primary-text)] font-[var(--mono)] text-xs uppercase tracking-wider font-bold hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all active:scale-[0.98]"
                >
                  <span>{t.hero.resumeBtn}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </MagneticElement>

              <MagneticElement strength={15}>
                <a
                  href="#contact"
                  className="min-h-[46px] px-5 inline-flex items-center justify-center border border-[var(--border)] bg-transparent text-[var(--secondary-text)] font-[var(--mono)] text-xs uppercase tracking-wider font-medium hover:text-[var(--primary-text)] hover:border-[var(--border-strong)] transition-all"
                >
                  <span>Contact me</span>
                </a>
              </MagneticElement>
            </motion.div>

            {/* Verified External Links */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.58 }}
              className="mt-7 flex flex-wrap items-center gap-4 text-xs font-[var(--mono)] text-[var(--secondary-text)]"
            >
              <a
                href="https://linkedin.com/in/santhosh-kumar-8681612a4/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-[var(--accent)] underline underline-offset-4 transition-colors"
              >
                <span>LinkedIn Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <span className="text-[var(--muted)]">·</span>
              <a
                href="https://github.com/santhoshkumariicse-gif"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-[var(--accent)] underline underline-offset-4 transition-colors"
              >
                <span>GitHub Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>

            {/* Status & Availability Strip */}
            <div className="mt-8 pt-6 border-t border-[var(--border)] flex flex-col gap-3 font-[var(--mono)] text-xs text-[var(--secondary-text)]">
              <div className="flex flex-wrap items-center gap-y-2 gap-x-5">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                  <span className="text-[var(--primary-text)] font-medium">Open to opportunities</span>
                </span>
                <span className="text-[var(--muted)]">·</span>
                <span className="flex items-center gap-1 text-[var(--muted)]">
                  <MapPin className="w-3.5 h-3.5 text-[var(--secondary-text)]" />
                  <span>Namakkal, Tamil Nadu, India</span>
                </span>
              </div>

              {/* 15-second recruiter context line */}
              <div className="p-2.5 bg-[var(--surface)] border border-[var(--border)] text-[0.72rem] leading-snug">
                <span className="text-[var(--accent)] font-bold uppercase tracking-wider block mb-0.5">
                  Recruiter Fast Facts:
                </span>
                <span className="text-[var(--secondary-text)]">
                  B.E. Computer Science student (Gnanamani College of Tech, May 2027, GPA 7.2/10) · Current Python Developer Intern at Cybernaut · Seeking SOC, Defensive Security, and Python Development internship roles.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Signature Hero System Visualization */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 w-full"
          >
            <SystemVisualization />
          </motion.div>
        </div>

        {/* Animated Scroll Indicator (Prompt 5) */}
        <div className="mt-14 hidden md:flex justify-center">
          <ScrollIndicator targetId="command-center" />
        </div>
      </div>
    </section>
  );
};

