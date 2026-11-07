import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Shield, Phone, Mail, MapPin, Globe } from 'lucide-react';
import { HighwayMilestoneData } from './HighwayMilestones';
import { personalProfileData } from '../../data/profile';
import { SoundFX } from '../../utils/SoundFX';

export interface HighwayModalDrawerProps {
  milestone: HighwayMilestoneData | null;
  onClose: () => void;
  onOpenClassicView?: () => void;
}

export const HighwayModalDrawer: React.FC<HighwayModalDrawerProps> = ({
  milestone,
  onClose
}) => {
  // ESC key to dismiss modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (milestone) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [milestone, onClose]);

  if (!milestone) return null;

  const handleClose = () => {
    SoundFX.playClick();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl font-mono select-text">
        {/* Backdrop click area */}
        <div className="absolute inset-0" onClick={handleClose} />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl max-h-[88vh] bg-[#F2F4F7] border border-[rgba(9,11,14,0.12)] rounded-xl shadow-[0_20px_50px_rgba(9,11,14,0.15)] overflow-hidden flex flex-col z-10"
        >
          {/* 1. Header Bar with Racing Red Laser Accent */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-[#DCE2E8] border-b border-[rgba(9,11,14,0.12)]">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E10620] shadow-[0_0_8px_#FF3548]" />
              <span className="text-[10px] tracking-widest text-[#E10620] font-black uppercase">
                {milestone.codeName} // KM {milestone.km.toFixed(1)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="p-1.5 text-[#626C78] hover:text-[#090B0E] hover:bg-black/5 rounded-lg transition-colors"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 2. Scrollable Body Content */}
          <div className="overflow-y-auto p-5 sm:p-7 space-y-6 custom-scrollbar text-[#171B20]">
            {/* Top Showcase: Image + Title Header */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              {/* Asset Visual */}
              <div className="md:col-span-5 relative rounded-lg overflow-hidden border border-[rgba(9,11,14,0.12)] bg-black/5 shadow-md aspect-video md:aspect-[3/4]">
                <img
                  src={milestone.imageAsset}
                  alt={milestone.title}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#F2F4F7]/95 backdrop-blur-md rounded text-[9px] font-bold text-[#E10620] border border-[#E10620]/30 shadow-xs">
                  {milestone.statBadge.label}: {milestone.statBadge.value}
                </div>
              </div>

              {/* Title & Description */}
              <div className="md:col-span-7 space-y-2">
                <div className="text-xs text-[#E10620] uppercase font-bold tracking-wider">
                  {milestone.subtitle}
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#090B0E] tracking-wide font-sans">
                  {milestone.title}
                </h2>
                <p className="text-sm text-[#171B20] leading-relaxed font-sans">
                  {milestone.tagline}
                </p>
                <p className="text-xs text-[#626C78] italic font-mono pt-1">
                  "{milestone.narration}"
                </p>
              </div>
            </div>

            {/* Bullet Highlights */}
            <div className="bg-[#DCE2E8]/60 border border-[rgba(9,11,14,0.10)] rounded-lg p-4 space-y-2.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#626C78]">
                Verified Dossier Points:
              </div>
              <ul className="space-y-2 text-xs text-[#171B20]">
                {milestone.bulletPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#E10620] shrink-0 mt-0.5" />
                    <span className="font-sans text-[#171B20]">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Category: PROFILE (About Me) */}
            {milestone.category === 'profile' && (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                  <div className="p-3 bg-[#DCE2E8]/70 rounded-lg border border-[rgba(9,11,14,0.10)]">
                    <div className="text-[#626C78] text-[10px] font-semibold">Degree</div>
                    <div className="text-[#090B0E] font-bold mt-1">B.E. CSE</div>
                  </div>
                  <div className="p-3 bg-[#DCE2E8]/70 rounded-lg border border-[rgba(9,11,14,0.10)]">
                    <div className="text-[#626C78] text-[10px] font-semibold">GPA</div>
                    <div className="text-[#E10620] font-bold mt-1">7.2 / 10</div>
                  </div>
                  <div className="p-3 bg-[#DCE2E8]/70 rounded-lg border border-[rgba(9,11,14,0.10)]">
                    <div className="text-[#626C78] text-[10px] font-semibold">Graduation</div>
                    <div className="text-[#090B0E] font-bold mt-1">May 2027</div>
                  </div>
                  <div className="p-3 bg-[#DCE2E8]/70 rounded-lg border border-[rgba(9,11,14,0.10)]">
                    <div className="text-[#626C78] text-[10px] font-semibold">Location</div>
                    <div className="text-[#090B0E] font-bold mt-1">Namakkal, India</div>
                  </div>
                </div>
              </div>
            )}

            {/* Category: SKILLS (Highway Signboards) */}
            {milestone.skillsCategories && (
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#E10620]">
                  Categorized Technical Competencies:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {milestone.skillsCategories.map((cat, cIdx) => (
                    <div
                      key={cIdx}
                      className="p-3.5 bg-[#DCE2E8]/70 rounded-lg border border-[rgba(9,11,14,0.10)] space-y-2"
                    >
                      <div className="text-xs font-bold text-[#E10620] uppercase tracking-wider">
                        {cat.category}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.skills.map((s, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 bg-[#F2F4F7] border border-[rgba(9,11,14,0.10)] text-[#090B0E] text-xs rounded font-medium"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Category: INTERNSHIP EXPERIENCE */}
            {milestone.internships && (
              <div className="space-y-4 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#E10620]">
                  Verified Internship Records:
                </div>
                <div className="space-y-3">
                  {milestone.internships.map((intern, iIdx) => (
                    <div
                      key={iIdx}
                      className="p-4 bg-[#DCE2E8]/70 rounded-lg border border-[rgba(9,11,14,0.10)] space-y-2.5"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div>
                          <span className="text-sm font-black text-[#090B0E]">{intern.company}</span>
                          <span className="text-xs text-[#626C78] ml-2 font-mono">({intern.location})</span>
                        </div>
                        <div className="text-[10px] px-2 py-0.5 bg-[#E10620]/15 text-[#E10620] border border-[#E10620]/30 rounded font-bold w-fit">
                          {intern.period}
                        </div>
                      </div>
                      <div className="text-xs font-bold text-[#E10620]">{intern.role}</div>
                      <ul className="space-y-1.5 text-xs text-[#171B20] font-sans">
                        {intern.responsibilities.map((resp, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E10620] shrink-0 mt-1.5" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Category: PROJECT */}
            {milestone.projectDetails && (
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#E10620]">
                  Project Specifications & Features:
                </div>
                <div className="p-4 bg-[#DCE2E8]/70 rounded-lg border border-[rgba(9,11,14,0.10)] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-[#090B0E]">{milestone.projectDetails.name}</span>
                    <span className="text-[10px] px-2 py-0.5 bg-[#E10620]/15 text-[#E10620] rounded font-bold border border-[#E10620]/30">
                      {milestone.projectDetails.badge}
                    </span>
                  </div>
                  <p className="text-xs text-[#171B20] font-sans">{milestone.projectDetails.desc}</p>

                  <div className="space-y-1.5 pt-1">
                    <div className="text-[10px] font-bold text-[#626C78] uppercase">Verified Architecture Highlights:</div>
                    <ul className="space-y-1 text-xs text-[#171B20]">
                      {milestone.projectDetails.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E10620]" />
                          <span className="font-sans text-[#171B20]">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {milestone.projectDetails.tags.map((t, tIdx) => (
                      <span key={tIdx} className="text-[10px] px-2 py-0.5 bg-black/5 text-[#626C78] rounded border border-black/10">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-3">
                    <a
                      href={milestone.projectDetails.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 bg-[#171B20] hover:bg-[#090B0E] text-white text-xs font-bold rounded transition-all flex items-center gap-2 shadow-sm"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      <span>GitHub Repository</span>
                    </a>
                    {milestone.projectDetails.demoUrl && (
                      <a
                        href={milestone.projectDetails.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-1.5 bg-[#E10620] hover:bg-[#FF3548] text-white text-xs font-bold rounded shadow-xs transition-all flex items-center gap-1.5"
                      >
                        <span>Verified Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Category: CYBERSECURITY (Practical Exposure & Club) */}
            {milestone.category === 'cybersecurity' && (
              <div className="space-y-4 pt-2">
                <div className="p-4 bg-[#DCE2E8]/70 rounded-lg border border-[rgba(9,11,14,0.10)] space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#E10620] uppercase">
                    <Shield className="w-4 h-4 text-[#E10620]" />
                    <span>Cybersecurity Club — Gnanamani College of Technology</span>
                  </div>
                  <div className="text-[10px] text-[#626C78] font-semibold">
                    Member | August 2022 – May 2024
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#171B20] font-sans">
                    <li>• Participated in Capture The Flag (CTF) challenges focusing on web security and basic exploitation techniques.</li>
                    <li>• Gained hands-on exposure to vulnerability identification and security fundamentals.</li>
                    <li>• Actively explored ethical hacking concepts and secure system practices.</li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-[#DCE2E8]/70 rounded-lg border border-[rgba(9,11,14,0.10)] space-y-1">
                    <div className="text-[#626C78] text-[10px] uppercase font-bold">Interests</div>
                    <div className="text-[#090B0E] font-bold">Cybersecurity Research</div>
                  </div>
                  <div className="p-3 bg-[#DCE2E8]/70 rounded-lg border border-[rgba(9,11,14,0.10)] space-y-1">
                    <div className="text-[#626C78] text-[10px] uppercase font-bold">Languages</div>
                    <div className="text-[#090B0E] font-bold">English, Tamil</div>
                  </div>
                </div>
              </div>
            )}

            {/* Category: DESTINATION (Contact Channels from Resume) */}
            {milestone.category === 'destination' && (
              <div className="bg-[#DCE2E8]/70 border border-[rgba(9,11,14,0.10)] rounded-xl p-5 space-y-4">
                <div className="text-center space-y-1.5">
                  <div className="text-sm font-bold text-[#090B0E]">Verified Contact Channels</div>
                  <p className="text-xs text-[#626C78] font-sans">
                    Seeking entry-level cybersecurity, internship, or SOC analyst roles. Direct dispatch channels open:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <a
                    href="mailto:santhoshkumar160706@gmail.com"
                    className="p-3 bg-[#F2F4F7] hover:bg-white rounded-lg border border-[rgba(9,11,14,0.10)] hover:border-[#E10620]/40 flex items-center gap-2.5 text-[#090B0E] transition-colors shadow-2xs"
                  >
                    <Mail className="w-4 h-4 text-[#E10620] shrink-0" />
                    <span className="truncate">{personalProfileData.contact.email}</span>
                  </a>

                  <a
                    href={`tel:${personalProfileData.contact.phone.replace(/[^0-9+]/g, '')}`}
                    className="p-3 bg-[#F2F4F7] hover:bg-white rounded-lg border border-[rgba(9,11,14,0.10)] hover:border-[#E10620]/40 flex items-center gap-2.5 text-[#090B0E] transition-colors shadow-2xs"
                  >
                    <Phone className="w-4 h-4 text-[#E10620] shrink-0" />
                    <span>{personalProfileData.contact.phone}</span>
                  </a>

                  <div className="p-3 bg-[#F2F4F7] rounded-lg border border-[rgba(9,11,14,0.10)] flex items-center gap-2.5 text-[#626C78] shadow-2xs">
                    <MapPin className="w-4 h-4 text-[#E10620] shrink-0" />
                    <span>Namakkal, India</span>
                  </div>

                  <a
                    href={personalProfileData.contact.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-[#F2F4F7] hover:bg-white rounded-lg border border-[rgba(9,11,14,0.10)] hover:border-[#E10620]/40 flex items-center gap-2.5 text-[#090B0E] transition-colors shadow-2xs"
                  >
                    <Globe className="w-4 h-4 text-[#E10620] shrink-0" />
                    <span className="truncate">LinkedIn Profile</span>
                  </a>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href={`mailto:${personalProfileData.contact.email}?subject=Job%20Inquiry%20-%20Santhosh%20Kumar%20M`}
                    className="px-5 py-2.5 bg-[#E10620] hover:bg-[#FF3548] text-white text-xs font-bold rounded-lg shadow-[0_4px_16px_rgba(225,6,32,0.3)] transition-all flex items-center gap-2 border border-[#FF3548]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Direct Email</span>
                  </a>
                  <a
                    href={personalProfileData.contact.github}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 bg-[#171B20] hover:bg-[#090B0E] text-white text-xs font-bold rounded-lg transition-all flex items-center gap-2 shadow-sm"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span>GitHub Profile</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* 3. Bottom Footer Navigation */}
          <div className="px-5 py-3 bg-[#DCE2E8] border-t border-[rgba(9,11,14,0.12)] flex items-center justify-between text-xs text-[#626C78]">
            <span className="text-[10px]">PRESS [ESC] OR CLICK OUTSIDE TO RETURN TO SPEEDWAY</span>
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-1.5 bg-[#E10620] hover:bg-[#FF3548] text-white font-bold rounded text-xs transition-colors shadow-xs"
            >
              Resume Driving
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
