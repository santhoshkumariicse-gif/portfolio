import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { processData } from '../data/process';

export const EngineeringProcess: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="process" className="py-20 md:py-28 border-b border-[var(--border)]">
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
            05 / Engineering Process
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--primary-text)]">
            A steady way to{' '}
            <span className="font-[var(--serif)] italic font-normal text-[var(--accent)]">
              solve.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--secondary-text)] max-w-[620px] leading-relaxed">
            I try to make each project easier to understand, audit, and improve through a structured, predictable problem-solving discipline.
          </p>
        </motion.div>

        {/* 5-Step Sequential Process Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-t border-[var(--border)]">
          {processData.map((step, index) => (
            <motion.div
              key={step.number}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 border-b lg:border-b-0 lg:border-r border-[var(--border)] last:border-r-0 hover:bg-[var(--surface)] transition-colors flex flex-col justify-between min-h-[200px]"
            >
              <div>
                <span className="font-[var(--mono)] text-xs font-bold text-[var(--accent)] tracking-wider">
                  {step.number}
                </span>

                <h3 className="mt-4 text-base font-bold text-[var(--primary-text)]">
                  {step.title}
                </h3>

                <p className="mt-2 text-xs text-[var(--secondary-text)] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[var(--border)] flex items-center justify-between text-[0.65rem] font-[var(--mono)] text-[var(--muted)]">
                <span>PHASE // {step.number}</span>
                <span>STEP {index + 1}/5</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

