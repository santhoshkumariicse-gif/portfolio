import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experienceData } from '../../data/experience';
import { certificationsData } from '../../data/certifications';
import { useSanAI } from '../../ai';
import {
  Mountain,
  Briefcase,
  Award,
  Calendar,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  ArrowRight,
  Sparkles,
  X
} from 'lucide-react';

export interface ExperienceMountainModalProps {
  initialTab?: 'roles' | 'certifications';
  isOpen: boolean;
  onClose: () => void;
  onTravelToNextZone?: () => void;
}

export const ExperienceMountainModal: React.FC<ExperienceMountainModalProps> = ({
  initialTab = 'roles',
  isOpen,
  onClose,
  onTravelToNextZone
}) => {
  const [activeTab, setActiveTab] = useState<'roles' | 'certifications'>(initialTab);
  const { sendMessage, toggleExpand } = useSanAI();

  if (!isOpen) return null;

  const handleAskAI = (topic: string) => {
    sendMessage(`Tell me about Santhosh's verified experience with ${topic}`);
    toggleExpand();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: -8 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#0E1210]/95 border border-[#C7FF45]/40 rounded-sm shadow-[0_0_40px_rgba(199,255,69,0.25)] flex flex-col overflow-hidden text-[var(--primary-text)] font-sans"
        >
          {/* Top Cyber Lime Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C7FF45] via-[#D2FF5E] to-transparent" />

          {/* Holographic Reticle Corners */}
          <span className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-[#C7FF45]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-[#C7FF45]" />
          <span className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-[#C7FF45]" />
          <span className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-[#C7FF45]" />

          {/* Modal Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between gap-3 bg-[#131713]/80">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-sm bg-[#C7FF45]/10 border border-[#C7FF45]/40 text-[#C7FF45]">
                <Mountain className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-sm font-mono text-[9px] font-bold uppercase bg-[#C7FF45]/20 border border-[#C7FF45]/50 text-[#C7FF45]">
                    ACT 04 // EXPERIENCE MOUNTAIN
                  </span>
                  <span className="font-mono text-[10px] text-[var(--muted)] hidden sm:inline">
                    ASCENT CHECKPOINTS & SUMMIT CREDENTIALS
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-bold font-mono text-white tracking-wide mt-0.5">
                  SANTHOSH KUMAR M — CAREER PROGRESSION
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[var(--muted)] hover:text-white rounded-sm hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-white/10 bg-[#0A0D0B] px-4 pt-2 gap-2 font-mono text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('roles')}
              className={`pb-2.5 px-3 border-b-2 flex items-center gap-2 transition-all ${
                activeTab === 'roles'
                  ? 'border-[#C7FF45] text-[#C7FF45] font-bold'
                  : 'border-transparent text-[var(--secondary-text)] hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>INTERNSHIPS & ROLES</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('certifications')}
              className={`pb-2.5 px-3 border-b-2 flex items-center gap-2 transition-all ${
                activeTab === 'certifications'
                  ? 'border-[#C7FF45] text-[#C7FF45] font-bold'
                  : 'border-transparent text-[var(--secondary-text)] hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>VERIFIED CERTIFICATIONS</span>
            </button>
          </div>

          {/* Modal Body (Scrollable) */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 max-h-[calc(90vh-200px)]">
            {activeTab === 'roles' ? (
              <div className="space-y-4">
                {experienceData.map((exp, idx) => (
                  <div
                    key={`${exp.organization}-${idx}`}
                    className="p-4 rounded-sm bg-[#131713] border border-white/10 space-y-2.5 hover:border-white/25 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-sm bg-[#C7FF45]/15 border border-[#C7FF45]/40 text-[#C7FF45] font-mono text-[10px] font-bold flex items-center justify-center">
                            0{idx + 1}
                          </span>
                          <h3 className="text-base font-bold text-white font-mono">
                            {exp.role}
                          </h3>
                        </div>
                        <p className="text-xs text-[#C7FF45] font-mono font-semibold mt-0.5 ml-7">
                          {exp.organization}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 font-mono text-xs text-[var(--muted)] ml-7 sm:ml-0">
                        <span className="flex items-center gap-1 text-[#00E5FF]">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{exp.period}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#FFB347]" />
                          <span>{exp.location}</span>
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[var(--secondary-text)] leading-relaxed ml-7">
                      {exp.description}
                    </p>

                    <div className="space-y-1.5 ml-7 pt-1 border-t border-white/5">
                      <div className="font-mono text-[10px] text-[var(--muted)] uppercase font-semibold">
                        Key Responsibilities & Deliverables:
                      </div>
                      <div className="space-y-1">
                        {exp.highlights.map((highlight) => (
                          <div
                            key={highlight}
                            className="flex items-start gap-2 text-xs text-[var(--primary-text)] font-sans"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#C7FF45] shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-3.5 rounded-sm bg-[#0E1210] border border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#C7FF45]" />
                    <div>
                      <div className="font-mono text-xs font-bold text-white uppercase">
                        Verified Credentials Registry
                      </div>
                      <p className="text-xs text-[var(--secondary-text)]">
                        Zero self-proclaimed badges. All credentials are fully audited and backed by course certificates.
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-sm bg-[#C7FF45]/15 border border-[#C7FF45]/40 text-[#C7FF45] font-mono text-[10px] font-bold shrink-0">
                    3 AUDITED
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {certificationsData.map((cert, idx) => (
                    <div
                      key={cert.id}
                      className="p-4 rounded-sm bg-[#131713] border border-white/10 flex flex-col justify-between space-y-3 hover:border-white/25 transition-all"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded-sm bg-[#00E5FF]/15 border border-[#00E5FF]/40 text-[#00E5FF] font-mono text-[9px] uppercase font-bold">
                            {cert.category}
                          </span>
                          <span className="font-mono text-[10px] text-[var(--muted)]">
                            {cert.date}
                          </span>
                        </div>

                        <h4 className="font-mono text-sm font-bold text-white leading-snug">
                          {cert.title}
                        </h4>

                        <p className="font-mono text-xs text-[#FFB347]">
                          {cert.issuer}
                        </p>

                        <p className="text-xs text-[var(--secondary-text)] leading-relaxed">
                          {cert.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-[#C7FF45]">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>CREDENTIAL AUDITED</span>
                        </span>
                        <span>0{idx + 1}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Zero-Fabrication Integrity Statement */}
            <div className="p-3.5 rounded-sm bg-[#0A0D0B] border border-white/10 flex items-start gap-3">
              <Terminal className="w-4 h-4 text-[#C7FF45] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-mono text-[10px] font-bold uppercase text-white">
                  Career Transparency & Ethics Standard
                </div>
                <p className="text-xs text-[var(--secondary-text)] leading-relaxed">
                  Every role, period, institution, and certification listed on Experience Mountain is 100% verified. Cybernaut Python Developer internship (Jul 2024–Present) and ELITA Web & App Development internship (Jul–Aug 2025) represent authentic professional engagements in Santhosh's developer career.
                </p>
              </div>
            </div>
          </div>

          {/* Modal Footer Controls */}
          <div className="p-4 border-t border-white/10 bg-[#131713] flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => handleAskAI('Cybernaut and ELITA internship experiences')}
              className="px-3 py-1.5 bg-[#C7FF45]/15 border border-[#C7FF45]/40 text-[#C7FF45] hover:bg-[#C7FF45]/25 font-mono text-xs font-bold rounded-sm transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask SAN AI About Internships</span>
            </button>

            <div className="flex items-center gap-2">
              {onTravelToNextZone && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onTravelToNextZone();
                  }}
                  className="px-4 py-1.5 bg-[#C7FF45] hover:bg-[#D2FF5E] text-[#0A0B09] font-mono text-xs font-black uppercase tracking-wider rounded-sm transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(199,255,69,0.4)]"
                >
                  <span>Next Zone: Contact Beacon</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white font-mono text-xs rounded-sm transition-all"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

