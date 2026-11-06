import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { skillsData } from '../data/skills';
import {
  ProgrammingSvg,
  WebArchitectureSvg,
  SecurityEngineeringSvg,
  WorkflowToolingSvg,
  AISecuritySvg
} from '../svgs/SkillCategorySvgs';

export const SkillsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const renderIcon = (type: string) => {
    switch (type) {
      case 'programming':
        return <ProgrammingSvg className="w-6 h-6 text-[var(--accent)]" />;
      case 'web':
        return <WebArchitectureSvg className="w-6 h-6 text-[var(--accent)]" />;
      case 'security':
        return <SecurityEngineeringSvg className="w-6 h-6 text-[var(--accent)]" />;
      case 'workflow':
        return <WorkflowToolingSvg className="w-6 h-6 text-[var(--accent)]" />;
      case 'ai-security':
        return <AISecuritySvg className="w-6 h-6 text-[var(--accent)]" />;
      default:
        return null;
    }
  };

  return (
    <section id="skills" className="py-20 md:py-28 border-b border-[var(--border)]">
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
            03 / Technical Toolkit
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--primary-text)]">
            Tools for the{' '}
            <span className="font-[var(--serif)] italic font-normal text-[var(--accent)]">
              next layer.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--secondary-text)] max-w-[620px] leading-relaxed">
            A verified index of technical abilities supported by internship contributions and practical security lab study. No arbitrary proficiency percentages.
          </p>
        </motion.div>

        {/* Responsive Skill Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillsData.map((category, index) => (
            <motion.div
              key={category.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="p-6 bg-[var(--surface)] border border-[var(--border)] flex flex-col justify-between transition-all duration-300 hover:border-[var(--active-border)] hover:bg-[var(--surface-subtle)] hover:-translate-y-1 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-[var(--mono)] text-xs font-bold text-[var(--muted)]">
                    {category.number}
                  </span>
                  <div className="p-2 border border-[var(--border)] bg-[var(--raised)] group-hover:border-[var(--accent)] transition-colors">
                    {renderIcon(category.iconType)}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[var(--primary-text)] group-hover:text-white transition-colors">
                  {category.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-[var(--secondary-text)] leading-relaxed">
                  {category.description}
                </p>
              </div>

              {/* Skills Item Pills */}
              <div className="mt-6 pt-4 border-t border-[var(--border)] flex flex-wrap gap-1.5">
                {category.items.map((item, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 text-[0.68rem] font-[var(--mono)] bg-[rgba(240,240,233,0.03)] border border-[var(--border)] text-[var(--secondary-text)] group-hover:text-[var(--primary-text)] transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

