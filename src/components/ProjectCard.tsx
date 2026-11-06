import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, ExternalLink, GitBranch, AlertCircle, ArrowUpRight } from 'lucide-react';
import { ProjectItem } from '../types';
import { ProjectSchematic } from './ProjectSchematic';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  onOpenDetail?: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onOpenDetail }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Status Badge Styling
  const getStatusBadge = (status: ProjectItem['status']) => {
    switch (status) {
      case 'Completed':
        return {
          bg: 'bg-emerald-950/60',
          text: 'text-emerald-400',
          border: 'border-emerald-800/60'
        };
      case 'In development':
        return {
          bg: 'bg-amber-950/60',
          text: 'text-amber-400',
          border: 'border-amber-800/60'
        };
      case 'Prototype':
        return {
          bg: 'bg-blue-950/60',
          text: 'text-blue-400',
          border: 'border-blue-800/60'
        };
      case 'Learning project':
      default:
        return {
          bg: 'bg-[rgba(199,255,69,0.08)]',
          text: 'text-[var(--accent)]',
          border: 'border-[var(--accent)]/30'
        };
    }
  };

  const badgeStyle = getStatusBadge(project.status);

  return (
    <motion.article
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative border-t border-[var(--border)] py-10 transition-all duration-300 hover:border-[var(--active-border)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Number & Category Column */}
        <div className="lg:col-span-2">
          <span className="font-[var(--mono)] text-xs font-bold text-[var(--accent)] tracking-widest block mb-2">
            {project.number}
          </span>
          <span className={`inline-block px-2.5 py-1 text-[0.68rem] font-[var(--mono)] uppercase tracking-wider font-bold border ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}>
            {project.status}
          </span>
        </div>

        {/* Content & Details Column */}
        <div className="lg:col-span-5 flex flex-col justify-start">
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--primary-text)] group-hover:text-white transition-colors">
            {project.title}
          </h3>

          <p className="mt-2 text-xs font-[var(--mono)] uppercase tracking-wider text-[var(--accent)]">
            {project.category}
          </p>

          <p className="mt-4 text-sm sm:text-base text-[var(--secondary-text)] leading-relaxed">
            {project.tagline}
          </p>

          {/* Expandable Case Study Breakdown */}
          <div className="mt-5 border-l-2 border-[var(--border)] pl-4 transition-colors group-hover:border-[var(--accent)]">
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                className="min-h-[44px] inline-flex items-center gap-2 text-xs font-[var(--mono)] font-bold uppercase tracking-wider text-[var(--accent)] hover:opacity-80 transition-opacity focus:outline-none"
                aria-expanded={isDetailsOpen}
              >
                <span>{isDetailsOpen ? 'Hide case-study notes' : 'Read problem & architecture notes'}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isDetailsOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {onOpenDetail && (
                <button
                  type="button"
                  onClick={() => onOpenDetail(project)}
                  className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-[var(--mono)] font-semibold uppercase tracking-wider text-[var(--secondary-text)] hover:text-[var(--accent)] transition-colors focus:outline-none"
                >
                  <span>Full Blueprint Dialog</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent)]" />
                </button>
              )}
            </div>

            {isDetailsOpen && (
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 space-y-3 text-xs sm:text-[0.82rem] text-[var(--secondary-text)] leading-relaxed"
              >
                <div>
                  <strong className="text-[var(--primary-text)] font-semibold block font-[var(--mono)] uppercase tracking-wider text-[0.72rem] text-[var(--accent)] mb-1">
                    Problem Space:
                  </strong>
                  <p>{project.problem}</p>
                </div>

                <div>
                  <strong className="text-[var(--primary-text)] font-semibold block font-[var(--mono)] uppercase tracking-wider text-[0.72rem] text-[var(--accent)] mb-1">
                    Architecture Approach:
                  </strong>
                  <p>{project.solution}</p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Tech Chips */}
          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-1 text-[0.7rem] font-[var(--mono)] border border-[var(--border)] bg-[rgba(240,240,233,0.03)] text-[var(--primary-text)]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Evidence Integrity Banner */}
          <div className="mt-5 flex items-start gap-2 p-3 bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--secondary-text)]">
            <AlertCircle className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
            <span className="leading-snug">
              <strong className="text-[var(--primary-text)] font-semibold font-[var(--mono)] text-[0.7rem] uppercase tracking-wider block">
                Evidence Status:
              </strong>
              {project.evidenceNote}
            </span>
          </div>

          {/* Action Links (Only rendered when authentic links exist) */}
          {(project.demoUrl || project.repoUrl) && (
            <div className="mt-5 flex items-center gap-4 text-xs font-[var(--mono)]">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[var(--primary-text)] hover:text-[var(--accent)] transition-colors underline underline-offset-4"
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>Repository</span>
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[var(--accent)] hover:underline transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          )}
        </div>

        {/* Vector Schematic Visual Column */}
        <div className="lg:col-span-5 w-full">
          <ProjectSchematic
            architectureType={project.architectureType}
            isConceptual={project.isConceptual}
          />
        </div>
      </div>
    </motion.article>
  );
};

