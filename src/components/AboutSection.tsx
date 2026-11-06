import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, Award, BookOpen } from 'lucide-react';
import { personalProfileData } from '../data/profile';
import { DeveloperBlueprintSvg } from '../svgs/DeveloperBlueprintSvg';

export const AboutSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const facts = [
    { label: 'Location', value: personalProfileData.education.location, icon: MapPin },
    { label: 'Degree', value: personalProfileData.education.degree, icon: GraduationCap },
    { label: 'Institution', value: personalProfileData.education.institution, icon: Award },
    { label: 'Expected Graduation', value: personalProfileData.education.expectedGraduation, icon: Calendar },
    { label: 'Academic Standing', value: `GPA: ${personalProfileData.education.gpa}`, icon: BookOpen }
  ];

  return (
    <section id="about" className="py-20 md:py-28 border-b border-[var(--border)] relative bg-[#0D0F0C]">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="font-[var(--mono)] text-xs font-bold text-[var(--accent)] tracking-widest uppercase mb-3">
            02 / About Me
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--primary-text)]">
            Curious by default.{' '}
            <span className="font-[var(--serif)] italic font-normal text-[var(--accent)]">
              Careful
            </span>{' '}
            by design.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--secondary-text)] max-w-[620px] leading-relaxed">
            My engineering goal is to grow toward SOC, threat detection, vulnerability assessment, and security automation roles through disciplined, hands-on practice.
          </p>
        </motion.div>

        {/* Two-Column Editorial & Custom SVG Blueprint Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Bio Narrative & Facts Table */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 space-y-6 text-sm sm:text-base text-[var(--secondary-text)] leading-relaxed"
          >
            {personalProfileData.bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            {/* Academic & Personal Facts Table */}
            <div className="mt-6 pt-6 border-t border-[var(--border)] divide-y divide-[var(--border)] font-[var(--mono)] text-xs">
              {facts.map((fact, index) => {
                const IconComponent = fact.icon;
                return (
                  <div key={index} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                    <span className="text-[var(--secondary-text)] flex items-center gap-2">
                      <IconComponent className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                      <span>{fact.label}</span>
                    </span>
                    <span className="text-[var(--primary-text)] font-semibold sm:text-right">
                      {fact.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Custom Animated Developer Blueprint SVG */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 shadow-2xl"
          >
            <DeveloperBlueprintSvg />
          </motion.div>
        </div>
      </div>
    </section>
  );
};


