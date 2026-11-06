import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalProfileData } from '../../data/profile';
import { useSanAI } from '../../ai';
import {
  GraduationCap,
  User,
  Compass,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  MapPin,
  Calendar,
  Award,
  Terminal,
  Sparkles,
  X
} from 'lucide-react';

export interface OriginCoastModalProps {
  initialTab?: 'workspace' | 'education';
  isOpen: boolean;
  onClose: () => void;
  onTravelToNextZone?: () => void;
}

export const OriginCoastModal: React.FC<OriginCoastModalProps> = ({
  initialTab = 'workspace',
  isOpen,
  onClose,
  onTravelToNextZone
}) => {
  const [activeTab, setActiveTab] = useState<'workspace' | 'education'>(initialTab);
  const { sendMessage, toggleExpand } = useSanAI();

  if (!isOpen) return null;

  const handleAskAI = (query: string) => {
    sendMessage(query);
    toggleExpand();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md">
        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: -8 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-3xl max-h-[90vh] bg-[#0E1210]/95 border border-[#FFB347]/40 rounded-sm shadow-[0_0_40px_rgba(255,179,71,0.25)] flex flex-col overflow-hidden text-[var(--primary-text)] font-sans"
        >
          {/* Top Amber Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FFB347] via-[#FFD180] to-transparent" />

          {/* Holographic Reticle Corners */}
          <span className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-[#FFB347]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-[#FFB347]" />
          <span className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-[#FFB347]" />
          <span className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-[#FFB347]" />

          {/* Modal Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between gap-3 bg-[#131713]/80">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#FFB347]/10 border border-[#FFB347]/30 rounded-sm text-[#FFB347]">
                <Compass className="w-5 h-5 animate-spin-slow" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-sm font-mono text-[9px] font-bold uppercase bg-[#FFB347]/20 border border-[#FFB347]/50 text-[#FFB347]">
                    ACT 01 // ORIGIN COAST
                  </span>
                  <span className="font-mono text-[10px] text-[var(--muted)] hidden sm:inline">
                    COORDINATES: [0, 1.5, 75]
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-bold font-mono text-white tracking-wide mt-0.5">
                  SANTHOSH KUMAR M — FOUNDATION DOSSIER
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
              onClick={() => setActiveTab('workspace')}
              className={`pb-2.5 px-3 border-b-2 flex items-center gap-2 transition-all ${
                activeTab === 'workspace'
                  ? 'border-[#FFB347] text-[#FFB347] font-bold'
                  : 'border-transparent text-[var(--secondary-text)] hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>ORIGIN & WORKSPACE</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('education')}
              className={`pb-2.5 px-3 border-b-2 flex items-center gap-2 transition-all ${
                activeTab === 'education'
                  ? 'border-[#FFB347] text-[#FFB347] font-bold'
                  : 'border-transparent text-[var(--secondary-text)] hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>GNANAMANI COLLEGE OF TECHNOLOGY</span>
            </button>
          </div>

          {/* Modal Body (Scrollable) */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-5 max-h-[calc(90vh-180px)]">
            {activeTab === 'workspace' ? (
              <div className="space-y-5">
                {/* Profile Card with Real Photo */}
                <div className="p-4 rounded-sm bg-[#131713] border border-white/10 flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  <div className="relative group shrink-0">
                    <img
                      src={`${import.meta.env.BASE_URL}images/santhosh-kumar.jpg`}
                      alt="Santhosh Kumar M"
                      className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-sm border-2 border-[#FFB347]/60 shadow-[0_0_20px_rgba(255,179,71,0.3)]"
                    />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#0A0B09] border border-[#C7FF45]/60 text-[#C7FF45] font-mono text-[9px] uppercase font-bold rounded-sm whitespace-nowrap flex items-center gap-1 shadow-sm">
                      <ShieldCheck className="w-3 h-3" />
                      <span>VERIFIED</span>
                    </div>
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="text-lg font-bold text-white font-mono">
                        {personalProfileData.name}
                      </h3>
                      <div className="flex items-center justify-center sm:justify-start gap-1 font-mono text-xs text-[#FFB347]">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Karaikal & Namakkal, India</span>
                      </div>
                    </div>
                    <p className="text-xs text-[#00E5FF] font-mono mt-0.5">
                      {personalProfileData.headline}
                    </p>
                    <blockquote className="italic text-xs text-[var(--muted)] border-l-2 border-[#FFB347]/40 pl-2.5 my-2.5 text-left">
                      "{personalProfileData.tagline}"
                    </blockquote>
                    <p className="text-xs text-[var(--secondary-text)] leading-relaxed text-left">
                      {personalProfileData.bio[0]}
                    </p>
                  </div>
                </div>

                {/* Narrative Origin & Engineering Ethos */}
                <div className="p-4 rounded-sm bg-[#131713]/60 border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#FFB347] uppercase">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Coastal Origin & Developer Ethos</span>
                  </div>
                  <p className="text-xs text-[var(--secondary-text)] leading-relaxed">
                    Origin Coast represents the bedrock of Santhosh's journey — grounded in the coastal town of Karaikal, Puducherry. His fascination with computing evolved into systematic engineering: understanding how operating systems allocate memory, how network packets route across distributed servers, and how human-centric user interfaces interact with reliable backend services.
                  </p>
                  <p className="text-xs text-[var(--secondary-text)] leading-relaxed">
                    Rather than relying on theoretical abstractions alone, Santhosh builds complete, operational systems — from logistics scheduling engines (LorryBook/RDA) and candidate tracking pipelines (NexusATS) to offline AI retrieval tools.
                  </p>
                </div>

                {/* Core Architectural Focus Areas */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-sm bg-[#131713]/70 border border-white/10">
                    <span className="font-mono text-[10px] text-[#00E5FF] font-bold block mb-1">
                      01 // FULL-STACK WEB
                    </span>
                    <p className="text-[11px] text-[var(--secondary-text)] leading-tight">
                      Modular React + TypeScript architectures, state management, REST APIs, and responsive design systems.
                    </p>
                  </div>
                  <div className="p-3 rounded-sm bg-[#131713]/70 border border-white/10">
                    <span className="font-mono text-[10px] text-[#C7FF45] font-bold block mb-1">
                      02 // PYTHON AUTOMATION
                    </span>
                    <p className="text-[11px] text-[var(--secondary-text)] leading-tight">
                      Automated log auditing, backend endpoints with FastAPI, security utility scripts, and data pipeline tasks.
                    </p>
                  </div>
                  <div className="p-3 rounded-sm bg-[#131713]/70 border border-white/10">
                    <span className="font-mono text-[10px] text-[#FFB347] font-bold block mb-1">
                      03 // SYSTEM INTEGRATION
                    </span>
                    <p className="text-[11px] text-[var(--secondary-text)] leading-tight">
                      Relational database schemas with PostgreSQL, cloud CI/CD flows, Git version control, and Linux CLI workflows.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {/* College Primary Header Card */}
                <div className="p-4 rounded-sm bg-[#131713] border border-[#FFB347]/30 flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-[#FFB347]" />
                      <span className="font-mono text-xs uppercase tracking-wider text-[#FFB347] font-bold">
                        ACCREDITED HIGHER EDUCATION
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold font-mono text-white">
                      {personalProfileData.education.institution}
                    </h3>
                    <p className="text-xs text-[#00E5FF] font-mono">
                      {personalProfileData.education.degree}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs text-[var(--secondary-text)]">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#FFB347]" />
                        {personalProfileData.education.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#C7FF45]" />
                        Expected: {personalProfileData.education.expectedGraduation}
                      </span>
                    </div>
                  </div>

                  {/* GPA Box */}
                  <div className="p-3 sm:p-4 rounded-sm bg-[#0E1210] border border-[#C7FF45]/50 text-center shrink-0 min-w-[130px]">
                    <div className="font-mono text-[9px] uppercase tracking-wider text-[var(--muted)]">
                      CURRENT CGPA
                    </div>
                    <div className="font-mono text-2xl font-black text-[#C7FF45] mt-0.5">
                      {personalProfileData.education.gpa}
                    </div>
                    <div className="font-mono text-[8px] text-[var(--muted)] mt-0.5">
                      VERIFIED ACADEMIC RECORD
                    </div>
                  </div>
                </div>

                {/* Core Computer Science Coursework */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-mono text-xs font-bold uppercase text-white flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#00E5FF]" />
                      <span>Verified Academic Curriculum & Coursework</span>
                    </h4>
                    <span className="font-mono text-[10px] text-[var(--muted)]">
                      B.E. CSE SYLLABUS
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {personalProfileData.education.coursework.map((course, idx) => (
                      <div
                        key={course}
                        className="p-2.5 rounded-sm bg-[#131713]/80 border border-white/10 flex items-center gap-2.5"
                      >
                        <span className="w-5 h-5 rounded-sm bg-[#FFB347]/10 border border-[#FFB347]/30 text-[#FFB347] font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                          0{idx + 1}
                        </span>
                        <span className="text-xs text-[var(--primary-text)] font-mono font-medium">
                          {course}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Academic Standards Guarantee */}
                <div className="p-3 rounded-sm bg-[#0A0D0B] border border-white/10 flex items-center gap-3">
                  <Award className="w-5 h-5 text-[#C7FF45] shrink-0" />
                  <p className="text-xs text-[var(--secondary-text)] leading-relaxed">
                    Santhosh adheres to strict academic and professional integrity. All listed coursework, CGPA records (7.2/10), and project deliverables are 100% accurate and verifiable through Gnanamani College of Technology records.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer Controls */}
          <div className="p-4 border-t border-white/10 bg-[#131713] flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => handleAskAI('Tell me about Santhosh Kumar and his education at Gnanamani College')}
              className="px-3 py-1.5 bg-[#FFB347]/15 border border-[#FFB347]/40 text-[#FFB347] hover:bg-[#FFB347]/25 font-mono text-xs font-bold rounded-sm transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask SAN AI About Origin</span>
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
                  <span>Next Zone: Skill Forest</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white font-mono text-xs rounded-sm transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
