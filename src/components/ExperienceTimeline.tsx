import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { experienceData } from '../data/experience';
import { Building2, MapPin } from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="experience" className="py-20 md:py-28 border-b border-[var(--border)]">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        {/* Section Head */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="font-[var(--mono)] text-xs font-bold text-[var(--accent)] tracking-widest uppercase mb-3">
            04 / Experience &amp; Education
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--primary-text)]">
            Early experience,{' '}
            <span className="font-[var(--serif)] italic font-normal text-[var(--accent)]">
              real context.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--secondary-text)] max-w-[620px] leading-relaxed">
            Practical roles, developer internship responsibilities, and technical academic involvement preserved from verified background.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative border-t border-[var(--border)] pt-8">
          {/* Animated Vertical Spine Line */}
          <div className="absolute top-0 bottom-0 left-[7px] md:left-[199px] w-[1px] bg-[var(--border)]" />
          {!shouldReduceMotion && (
            <motion.div
              className="absolute top-0 bottom-0 left-[7px] md:left-[199px] w-[1.5px] bg-[var(--accent)] origin-top z-10"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
          )}

          {/* Timeline Items */}
          <div className="space-y-12">
            {experienceData.map((item, index) => (
              <motion.div
                key={index}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 relative pl-8 md:pl-0"
              >
                {/* Milestone Node Marker */}
                <div className="absolute left-[3px] md:left-[195px] top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)] z-20" />

                {/* Date Column */}
                <div className="md:col-span-3 md:text-right md:pr-8">
                  <span className="font-[var(--mono)] text-xs font-bold text-[var(--accent)] tracking-wider block">
                    {item.period}
                  </span>
                  <span className="flex md:justify-end items-center gap-1 text-[0.7rem] font-[var(--mono)] text-[var(--muted)] mt-1">
                    <MapPin className="w-3 h-3 text-[var(--muted)]" />
                    <span>{item.location}</span>
                  </span>
                </div>

                {/* Content Column */}
                <div className="md:col-span-9 bg-[var(--surface)] border border-[var(--border)] p-6 md:p-7 hover:border-[var(--active-border)] transition-colors">
                  <div className="flex flex-wrap items-baseline gap-2 mb-2">
                    <h3 className="text-xl font-extrabold text-[var(--primary-text)]">
                      {item.role}
                    </h3>
                    <span className="text-sm font-[var(--mono)] text-[var(--accent)] font-semibold flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[var(--accent)]" />
                      <span>{item.organization}</span>
                    </span>
                  </div>

                  <p className="text-sm text-[var(--secondary-text)] leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <ul className="space-y-1.5 border-t border-[var(--border)] pt-4 text-xs text-[var(--secondary-text)]">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[var(--accent)] font-bold">›</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

