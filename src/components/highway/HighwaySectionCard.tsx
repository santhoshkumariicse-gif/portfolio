import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHighwayState } from './HighwayStateContext';
import {
  User,
  GraduationCap,
  Cpu,
  FolderGit2,
  Briefcase,
  ShieldCheck,
  Send,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  ExternalLink,
  Sparkles
} from 'lucide-react';

const SECTION_ICONS: Record<string, React.ElementType> = {
  about: User,
  education: GraduationCap,
  skills: Cpu,
  projects: FolderGit2,
  experience: Briefcase,
  interests: ShieldCheck,
  contact: Send
};

export const HighwaySectionCard: React.FC = () => {
  const { currentSection, totalSections } = useHighwayState();
  const SectionIcon = SECTION_ICONS[currentSection.id] || Sparkles;

  return (
    <aside
      aria-label={`Active Portfolio Section: ${currentSection.title}`}
      className="pointer-events-auto w-full max-w-md sm:max-w-lg ml-0 sm:ml-4 lg:ml-8 max-h-[52vh] sm:max-h-[64vh] overflow-hidden flex flex-col rounded-2xl bg-[#171B20]/95 border border-[rgba(201,208,216,0.12)] backdrop-blur-xl shadow-[0_24px_48px_rgba(0,0,0,0.95)] transition-all font-sans"
    >
      {/* 1. Card Header */}
      <div className="px-4 py-3 sm:px-5 sm:py-3.5 border-b border-[rgba(201,208,216,0.12)] bg-[#20252C]/90 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#E10620]/15 border border-[#E10620]/30 flex items-center justify-center text-[#FF3548]">
            <SectionIcon className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold tracking-widest text-[#FF3548] uppercase">
              SECTION {currentSection.sectionNumber} OF 0{totalSections}
            </div>
            <h2 className="text-sm sm:text-base font-bold text-[#F2F4F7] tracking-tight">
              {currentSection.title}
            </h2>
          </div>
        </div>

        <div className="text-right">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#E10620]/15 text-[#FF3548] border border-[#E10620]/30">
            {currentSection.statBadge.value}
          </span>
          <div className="text-[9px] font-mono text-[#87919D] mt-0.5">
            KM {currentSection.km.toFixed(1)}
          </div>
        </div>
      </div>

      {/* 2. Scrollable Section Body */}
      <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs sm:text-sm text-[#C9D0D8] custom-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="space-y-4"
          >
            {/* Subtitle & Tagline */}
            <div>
              <div className="text-xs font-mono text-[#E10620] font-semibold tracking-wide uppercase">
                {currentSection.subtitle}
              </div>
              <p className="text-xs sm:text-sm text-[#C9D0D8] mt-1 leading-relaxed">
                {currentSection.tagline}
              </p>
            </div>

            {/* SECTION 01: ABOUT ME FAST FACTS */}
            {currentSection.id === 'about' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center font-mono">
                <div className="p-2.5 rounded-lg bg-[#090B0E]/80 border border-[rgba(201,208,216,0.12)]">
                  <div className="text-[9px] text-[#87919D] uppercase tracking-wider">Degree</div>
                  <div className="text-xs font-bold text-[#F2F4F7] mt-0.5">B.E. CSE</div>
                </div>
                <div className="p-2.5 rounded-lg bg-[#090B0E]/80 border border-[rgba(201,208,216,0.12)]">
                  <div className="text-[9px] text-[#87919D] uppercase tracking-wider">GPA</div>
                  <div className="text-xs font-bold text-[#FF3548] mt-0.5">7.2 / 10</div>
                </div>
                <div className="p-2.5 rounded-lg bg-[#090B0E]/80 border border-[rgba(201,208,216,0.12)]">
                  <div className="text-[9px] text-[#87919D] uppercase tracking-wider">Graduation</div>
                  <div className="text-xs font-bold text-[#F2F4F7] mt-0.5">May 2027</div>
                </div>
                <div className="p-2.5 rounded-lg bg-[#090B0E]/80 border border-[rgba(201,208,216,0.12)]">
                  <div className="text-[9px] text-[#87919D] uppercase tracking-wider">Location</div>
                  <div className="text-xs font-bold text-[#F2F4F7] mt-0.5">Namakkal, IN</div>
                </div>
              </div>
            )}

            {/* SECTION 03: SKILLS MATRIX */}
            {currentSection.skillsCategories && (
              <div className="space-y-3 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentSection.skillsCategories.map((cat, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-[#090B0E]/80 border border-[rgba(201,208,216,0.12)] space-y-1.5"
                    >
                      <div className="text-[10px] font-mono font-bold text-[#FF3548] uppercase tracking-wider">
                        {cat.category}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {cat.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#171B20] border border-[rgba(201,208,216,0.12)] text-[#C9D0D8]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 04: PROJECTS */}
            {currentSection.projects && (
              <div className="space-y-3 pt-1">
                {currentSection.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-3.5 rounded-xl bg-[#090B0E]/80 border border-[rgba(201,208,216,0.12)] hover:border-[#E10620]/40 transition-colors space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-[#F2F4F7] text-sm">{proj.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E10620]/15 text-[#FF3548] border border-[#E10620]/30 font-bold">
                        {proj.badge}
                      </span>
                    </div>
                    <p className="text-xs text-[#C9D0D8] leading-relaxed">{proj.desc}</p>
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[rgba(201,208,216,0.08)]">
                      <div className="flex flex-wrap gap-1">
                        {proj.tags.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-1.5 py-0.5 text-[10px] font-mono bg-white/5 rounded text-[#87919D]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-mono font-semibold text-[#FF3548] hover:text-[#F2F4F7] flex items-center gap-1 transition-colors"
                      >
                        <span>GitHub</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* SECTION 05: INTERNSHIP EXPERIENCE */}
            {currentSection.internships && (
              <div className="space-y-3 pt-1">
                {currentSection.internships.map((intern, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#090B0E]/80 border border-[rgba(201,208,216,0.12)] space-y-2"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <span className="font-bold text-[#F2F4F7] text-sm">{intern.company}</span>
                        <span className="text-xs text-[#87919D] ml-2 font-mono">({intern.location})</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#E10620]/15 text-[#FF3548] border border-[#E10620]/30 w-fit">
                        {intern.period}
                      </span>
                    </div>
                    <div className="text-xs font-mono font-bold text-[#E10620]">{intern.role}</div>
                    <ul className="space-y-1 text-xs text-[#C9D0D8]">
                      {intern.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF3548] shrink-0 mt-1.5" />
                          <span className="leading-relaxed">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* SECTION 07: CONTACT CHANNELS */}
            {currentSection.contactInfo && (
              <div className="space-y-3 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs">
                  <a
                    href={`mailto:${currentSection.contactInfo.email}`}
                    className="p-3 rounded-lg bg-[#090B0E]/80 border border-[rgba(201,208,216,0.12)] hover:border-[#E10620]/40 flex items-center gap-2.5 text-[#F2F4F7] transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#FF3548] shrink-0" />
                    <span className="truncate">{currentSection.contactInfo.email}</span>
                  </a>
                  <a
                    href={`tel:${currentSection.contactInfo.phone}`}
                    className="p-3 rounded-lg bg-[#090B0E]/80 border border-[rgba(201,208,216,0.12)] hover:border-[#E10620]/40 flex items-center gap-2.5 text-[#F2F4F7] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#FF3548] shrink-0" />
                    <span>{currentSection.contactInfo.phone}</span>
                  </a>
                  <div className="p-3 rounded-lg bg-[#090B0E]/80 border border-[rgba(201,208,216,0.12)] flex items-center gap-2.5 text-[#87919D]">
                    <MapPin className="w-4 h-4 text-[#FF3548] shrink-0" />
                    <span>{currentSection.contactInfo.location}</span>
                  </div>
                  <a
                    href={currentSection.contactInfo.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-lg bg-[#090B0E]/80 border border-[rgba(201,208,216,0.12)] hover:border-[#E10620]/40 flex items-center gap-2.5 text-[#F2F4F7] transition-colors"
                  >
                    <svg className="w-4 h-4 fill-[#FF3548] shrink-0" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.48 1.48 0 1 0 0-2.96 1.48 1.48 0 0 0 0 2.96M7.86 18.5v-8.37H5.07v8.37h2.79z" />
                    </svg>
                    <span>LinkedIn Profile</span>
                  </a>
                </div>

                <div className="pt-2 flex flex-wrap gap-2.5">
                  <a
                    href={`mailto:${currentSection.contactInfo.email}?subject=Interview%20Inquiry%20-%20Santhosh%20Kumar%20M`}
                    className="px-5 py-2.5 rounded-lg bg-[#E10620] hover:bg-[#FF3548] text-[#F2F4F7] font-bold text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(225,6,32,0.35)] transition-all border border-[#FF3548]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Direct Email</span>
                  </a>
                  <a
                    href={currentSection.contactInfo.github}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#F2F4F7] font-bold text-xs flex items-center gap-2 border border-white/20 transition-all"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span>GitHub Profile</span>
                  </a>
                </div>
              </div>
            )}

            {/* Bullet Highlights for Non-Grid Sections */}
            {currentSection.id !== 'skills' && currentSection.id !== 'projects' && currentSection.id !== 'contact' && (
              <div className="space-y-2 pt-2 border-t border-[rgba(201,208,216,0.12)]">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#87919D]">
                  Verified Highlights:
                </div>
                <ul className="space-y-2 text-xs">
                  {currentSection.bulletPoints.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#FF3548] shrink-0 mt-0.5" />
                      <span className="text-[#C9D0D8] leading-relaxed font-sans">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </aside>
  );
};
