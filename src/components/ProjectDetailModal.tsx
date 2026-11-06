import React, { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, ExternalLink, GitBranch, AlertCircle } from 'lucide-react';
import { ProjectItem } from '../types';
import { ProjectSchematic } from './ProjectSchematic';
import { analytics } from '../analytics/tracker';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const shouldReduceMotion = useReducedMotion();

  // Track project view
  useEffect(() => {
    if (project) {
      analytics.trackProjectView(project.id, project.title);
    }
  }, [project]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && project) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  // Lock body scroll while modal is active
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-4xl bg-[var(--surface)] border border-[var(--border-strong)] shadow-2xl p-6 sm:p-8 md:p-10 z-10 my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-[var(--border)]">
            <div className="flex items-center gap-3">
              <span className="font-[var(--mono)] text-xs font-bold text-[var(--accent)] tracking-widest">
                {project.number}
              </span>
              <span className="px-2.5 py-1 text-[0.7rem] font-[var(--mono)] uppercase tracking-wider font-bold bg-[var(--raised)] border border-[var(--border)] text-[var(--secondary-text)]">
                {project.status}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close case study dialog"
              className="min-w-[40px] min-h-[40px] grid place-items-center border border-[var(--border)] text-[var(--secondary-text)] hover:text-[var(--primary-text)] hover:border-[var(--accent)] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Header */}
          <div className="mt-6">
            <span className="text-xs font-[var(--mono)] uppercase tracking-widest text-[var(--accent)] font-semibold">
              {project.category}
            </span>
            <h2 id="modal-project-title" className="text-2xl sm:text-4xl font-extrabold text-[var(--primary-text)] tracking-tight mt-1">
              {project.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--secondary-text)] leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Interactive Schematic Showcase */}
          <div className="mt-8 border border-[var(--border)] bg-[var(--bg)] p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 text-xs font-[var(--mono)] text-[var(--muted)]">
              <span className="text-[var(--accent)] font-bold">SYSTEM SCHEMATIC BLUEPRINT</span>
              <span>{project.isConceptual ? '[CONCEPTUAL ARCHITECTURE]' : '[VERIFIED LAB STUDY]'}</span>
            </div>
            <ProjectSchematic
              architectureType={project.architectureType}
              isConceptual={project.isConceptual}
            />
          </div>

          {/* Engineering Deep Dive Grid */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="p-5 bg-[var(--surface-subtle)] border border-[var(--border)]">
              <strong className="text-[var(--accent)] font-[var(--mono)] text-xs uppercase tracking-wider block mb-2">
                01 // Problem Space
              </strong>
              <p className="text-[var(--secondary-text)] leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-5 bg-[var(--surface-subtle)] border border-[var(--border)]">
              <strong className="text-[var(--accent)] font-[var(--mono)] text-xs uppercase tracking-wider block mb-2">
                02 // Architecture Approach
              </strong>
              <p className="text-[var(--secondary-text)] leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Technologies Used */}
          <div className="mt-6 pt-6 border-t border-[var(--border)]">
            <span className="text-xs font-[var(--mono)] uppercase tracking-wider text-[var(--muted)] block mb-3">
              Technologies &amp; Libraries:
            </span>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[var(--raised)] border border-[var(--border)] text-[0.75rem] font-[var(--mono)] text-[var(--primary-text)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Evidence Status & Ethical Boundaries */}
          <div className="mt-6 p-4 bg-[var(--raised)] border border-[var(--border)] flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
            <div className="text-xs text-[var(--secondary-text)] leading-relaxed">
              <strong className="text-[var(--primary-text)] font-[var(--mono)] uppercase tracking-wider block text-[0.72rem] mb-0.5">
                Authentic Evidence Status:
              </strong>
              {project.evidenceNote}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="mt-8 pt-6 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs font-[var(--mono)]">
              {project.repoUrl ? (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[var(--primary-text)] hover:text-[var(--accent)] underline underline-offset-4 transition-colors"
                >
                  <GitBranch className="w-4 h-4" />
                  <span>Public Repository</span>
                </a>
              ) : (
                <span className="text-[var(--muted)]">[Repository Private / Internal Notes]</span>
              )}

              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[var(--accent)] hover:underline transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Production Instance</span>
                </a>
              ) : (
                <span className="text-[var(--muted)]">[Local Sandbox Prototype Only]</span>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-[var(--accent)] text-[var(--bg)] font-[var(--mono)] text-xs font-bold uppercase tracking-wider transition-colors hover:bg-[#d8ff6b]"
            >
              Back to Overview
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
