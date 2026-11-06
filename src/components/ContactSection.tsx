import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Copy, Check, Mail, Phone, MapPin } from 'lucide-react';
import { personalProfileData } from '../data/profile';
import { analytics } from '../analytics/tracker';
import { useLanguage } from '../i18n/LanguageContext';
import { ContactNetworkSvg } from '../svgs/ContactNetworkSvg';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLanguage();
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

  return (
    <section id="contact" className="py-20 md:py-28 bg-[var(--surface)] border-b border-[var(--border)] relative">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Direct Outreach & Actions */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <p className="font-[var(--mono)] text-xs font-bold text-[var(--accent)] tracking-widest uppercase mb-3">
              {t.contact.sectionNum}
            </p>

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[var(--primary-text)] leading-[1.02]">
              {t.contact.title}{' '}
              <span className="font-[var(--serif)] italic font-normal text-[var(--accent)]">
                {t.contact.titleAccent}
              </span>
            </h2>

            <p className="mt-5 text-sm sm:text-base text-[var(--secondary-text)] max-w-[620px] leading-relaxed">
              {t.contact.description}
            </p>

            {/* Primary Contact Actions */}
            <div className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
              <a
                href={`mailto:${email}`}
                className="group inline-flex items-center gap-2.5 text-base sm:text-2xl font-bold text-[var(--primary-text)] border-b-2 border-[var(--border-strong)] pb-1 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all max-w-full break-all"
              >
                <Mail className="w-5 h-5 text-[var(--accent)] shrink-0" />
                <span>{email}</span>
                <ArrowUpRight className="w-5 h-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              {/* Copy Button */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className={`min-h-[44px] px-4 py-2 border font-[var(--mono)] text-xs uppercase tracking-wider font-bold inline-flex items-center gap-2 transition-all ${
                  copied
                    ? 'border-[var(--accent)] bg-[rgba(199,255,69,0.12)] text-[var(--accent)]'
                    : 'border-[var(--border-strong)] bg-[var(--surface-subtle)] text-[var(--primary-text)] hover:border-[var(--accent)] hover:bg-[var(--raised)]'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[var(--accent)]" />
                    <span>{t.contact.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>{t.contact.copyEmail}</span>
                  </>
                )}
              </button>
            </div>

            {/* Secondary Details Row */}
            <div className="mt-10 pt-8 border-t border-[var(--border)] flex flex-wrap items-center gap-y-3 gap-x-8 text-xs font-[var(--mono)] text-[var(--secondary-text)]">
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 hover:text-[var(--accent)] transition-colors"
              >
                <Phone className="w-4 h-4 text-[var(--accent)]" />
                <span>{phone}</span>
              </a>

              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => analytics.trackExternalClick('linkedin', linkedin)}
                className="inline-flex items-center gap-1.5 hover:text-[var(--accent)] transition-colors underline underline-offset-4"
              >
                <span>LinkedIn Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => analytics.trackExternalClick('github', github)}
                className="inline-flex items-center gap-1.5 hover:text-[var(--accent)] transition-colors underline underline-offset-4"
              >
                <span>GitHub Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <span className="inline-flex items-center gap-1.5 text-[var(--muted)]">
                <MapPin className="w-4 h-4 text-[var(--muted)]" />
                <span>{location}</span>
              </span>
            </div>
          </motion.div>

          {/* Right Column: Custom Animated Communication Network SVG */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 shadow-2xl"
          >
            <ContactNetworkSvg />
          </motion.div>
        </div>
      </div>
    </section>
  );
};


