import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalProfileData } from '../../data/profile';
import { useSanAI } from '../../ai';
import {
  Radio,
  Mail,
  Phone,
  MapPin,
  FileDown,
  Send,
  Copy,
  Check,
  ShieldCheck,
  Sparkles,
  RotateCcw,
  X
} from 'lucide-react';

export interface ContactBeaconModalProps {
  initialTab?: 'transmit' | 'resume';
  isOpen: boolean;
  onClose: () => void;
  onRestartJourney?: () => void;
  onExitToClassic?: () => void;
}

export const ContactBeaconModal: React.FC<ContactBeaconModalProps> = ({
  initialTab = 'transmit',
  isOpen,
  onClose,
  onRestartJourney
}) => {
  const [activeTab, setActiveTab] = useState<'transmit' | 'resume'>(initialTab);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Quick message form states
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderMsg, setSenderMsg] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const { sendMessage, toggleExpand } = useSanAI();

  if (!isOpen) return null;

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleTransmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderMsg.trim()) return;

    // Compose mailto URI
    const subject = encodeURIComponent(`Portfolio Inquiry from ${senderName || 'Recruiter'}`);
    const body = encodeURIComponent(
      `Name: ${senderName}\nEmail: ${senderEmail}\n\nMessage:\n${senderMsg}\n\n[Transmitted via SAN AI Contact Beacon]`
    );
    window.location.href = `mailto:${personalProfileData.contact.email}?subject=${subject}&body=${body}`;

    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 4000);
  };

  const handleAskAI = (query: string) => {
    sendMessage(query);
    toggleExpand();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#090B0E]/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: -8 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#F2F4F7] border border-[rgba(9,11,14,0.14)] rounded-2xl shadow-[0_10px_40px_rgba(9,11,14,0.2)] flex flex-col overflow-hidden text-[#090B0E] font-sans"
        >
          {/* Top Racing Red Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#A9081A] via-[#E10620] to-[#FF3548]" />

          {/* Modal Header */}
          <div className="p-4 sm:p-5 border-b border-[rgba(9,11,14,0.12)] flex items-center justify-between gap-3 bg-[#DCE2E8]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#E10620]/10 border border-[#E10620]/30 text-[#E10620]">
                <Radio className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded font-mono text-[9px] font-bold uppercase bg-[#E10620]/15 border border-[#E10620]/30 text-[#E10620]">
                    CONTACT BEACON
                  </span>
                  <span className="font-mono text-[10px] text-[#626C78] hidden sm:inline">
                    DIRECT RECRUITER DISPATCH
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-bold font-sans text-[#090B0E] tracking-wide mt-0.5">
                  CONNECT WITH SANTHOSH KUMAR M
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[#626C78] hover:text-[#090B0E] rounded-lg hover:bg-black/5 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-[rgba(9,11,14,0.12)] bg-[#E8EDF2] px-4 pt-2 gap-2 font-mono text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('transmit')}
              className={`pb-2.5 px-3 border-b-2 flex items-center gap-2 transition-all ${
                activeTab === 'transmit'
                  ? 'border-[#E10620] text-[#E10620] font-bold'
                  : 'border-transparent text-[#626C78] hover:text-[#090B0E]'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>DIRECT TRANSMISSION & NETWORKS</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('resume')}
              className={`pb-2.5 px-3 border-b-2 flex items-center gap-2 transition-all ${
                activeTab === 'resume'
                  ? 'border-[#E10620] text-[#E10620] font-bold'
                  : 'border-transparent text-[#626C78] hover:text-[#090B0E]'
              }`}
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>VERIFIED RESUME ARCHIVE</span>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 custom-scrollbar">
            {activeTab === 'transmit' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Direct Contact Channels */}
                <div className="space-y-3">
                  <h3 className="font-mono text-xs font-bold uppercase text-[#090B0E] flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-[#E10620]" />
                    <span>Direct Communication Channels</span>
                  </h3>

                  {/* Email Card */}
                  <div className="p-3.5 rounded-xl bg-[#DCE2E8]/70 border border-[rgba(9,11,14,0.12)] flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="font-mono text-[9px] uppercase text-[#626C78]">
                        PRIMARY EMAIL ADDRESS
                      </div>
                      <div className="font-mono text-xs font-semibold text-[#090B0E] select-all">
                        {personalProfileData.contact.email}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => copyToClipboard(personalProfileData.contact.email, 'email')}
                        className="p-1.5 bg-black/5 hover:bg-black/10 text-[#626C78] hover:text-[#090B0E] rounded-lg transition-all"
                        title="Copy email"
                      >
                        {copiedField === 'email' ? (
                          <Check className="w-3.5 h-3.5 text-[#E10620]" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <a
                        href={`mailto:${personalProfileData.contact.email}`}
                        className="px-2.5 py-1 bg-[#E10620] text-white font-mono text-[10px] font-bold rounded-lg hover:bg-[#FF3548] transition-all"
                      >
                        Launch
                      </a>
                    </div>
                  </div>

                  {/* Phone Card */}
                  <div className="p-3.5 rounded-xl bg-[#DCE2E8]/70 border border-[rgba(9,11,14,0.12)] flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="font-mono text-[9px] uppercase text-[#626C78] flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-[#E10620]" />
                        <span>TELEPHONE / WHATSAPP</span>
                      </div>
                      <div className="font-mono text-xs font-semibold text-[#090B0E]">
                        {personalProfileData.contact.phone}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(personalProfileData.contact.phone, 'phone')}
                      className="p-1.5 bg-black/5 hover:bg-black/10 text-[#626C78] hover:text-[#090B0E] rounded-lg transition-all"
                      title="Copy phone"
                    >
                      {copiedField === 'phone' ? (
                        <Check className="w-3.5 h-3.5 text-[#E10620]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Geographic & Location */}
                  <div className="p-3.5 rounded-xl bg-[#DCE2E8]/70 border border-[rgba(9,11,14,0.12)] flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="font-mono text-[9px] uppercase text-[#626C78]">
                        HEADQUARTERS
                      </div>
                      <div className="font-mono text-xs text-[#090B0E] flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#E10620]" />
                        <span>{personalProfileData.contact.location}</span>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-[#171B20] bg-white/60 px-2 py-0.5 rounded-md border border-[rgba(9,11,14,0.12)]">
                      {personalProfileData.contact.timezone}
                    </span>
                  </div>

                  {/* External Network Uplinks */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <a
                      href={personalProfileData.contact.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-[#DCE2E8]/70 border border-[rgba(9,11,14,0.12)] hover:border-[#E10620] transition-all flex items-center gap-2.5 group"
                    >
                      <svg className="w-4 h-4 fill-current text-[#090B0E] group-hover:text-[#E10620] transition-colors shrink-0" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      <div className="font-mono text-xs">
                        <span className="block text-[#090B0E] font-bold">GitHub</span>
                        <span className="text-[10px] text-[#626C78]">@santhoshkumar</span>
                      </div>
                    </a>

                    <a
                      href={personalProfileData.contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-[#DCE2E8]/70 border border-[rgba(9,11,14,0.12)] hover:border-[#E10620] transition-all flex items-center gap-2.5 group"
                    >
                      <svg className="w-4 h-4 fill-current text-[#E10620] group-hover:text-[#090B0E] transition-colors shrink-0" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      <div className="font-mono text-xs">
                        <span className="block text-[#090B0E] font-bold">LinkedIn</span>
                        <span className="text-[10px] text-[#626C78]">santhosh-kumar</span>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Direct Message Transmission Composer */}
                <div className="p-4 rounded-xl bg-[#DCE2E8]/70 border border-[rgba(9,11,14,0.12)] space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-mono text-xs font-bold uppercase text-[#090B0E] flex items-center gap-1.5">
                      <Send className="w-3.5 h-3.5 text-[#E10620]" />
                      <span>Transmit Direct Message</span>
                    </h3>
                    <span className="font-mono text-[9px] text-[#E10620] font-bold">
                      DIRECT TO INBOX
                    </span>
                  </div>

                  <form onSubmit={handleTransmitMessage} className="space-y-2.5">
                    <div>
                      <label className="block font-mono text-[10px] text-[#626C78] uppercase mb-1">
                        Your Name / Recruiter ID
                      </label>
                      <input
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="e.g. Technical Recruiter"
                        className="w-full px-3 py-1.5 bg-[#FFFFFF] border border-[rgba(9,11,14,0.16)] rounded-lg font-mono text-xs text-[#090B0E] placeholder-[#87919D] focus:border-[#E10620] outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] text-[#626C78] uppercase mb-1">
                        Your Work Email
                      </label>
                      <input
                        type="email"
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        placeholder="e.g. recruiter@company.com"
                        className="w-full px-3 py-1.5 bg-[#FFFFFF] border border-[rgba(9,11,14,0.16)] rounded-lg font-mono text-xs text-[#090B0E] placeholder-[#87919D] focus:border-[#E10620] outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] text-[#626C78] uppercase mb-1">
                        Transmission Message
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={senderMsg}
                        onChange={(e) => setSenderMsg(e.target.value)}
                        placeholder="Discuss internship openings, engineering roles, or software architecture collaboration..."
                        className="w-full px-3 py-1.5 bg-[#FFFFFF] border border-[rgba(9,11,14,0.16)] rounded-lg font-mono text-xs text-[#090B0E] placeholder-[#87919D] focus:border-[#E10620] outline-none transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#E10620] hover:bg-[#FF3548] text-white font-mono text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 shadow-md border border-[#E10620]"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Signal via Mailto</span>
                    </button>

                    {sentSuccess && (
                      <div className="p-2 bg-[#E10620]/15 border border-[#E10620]/40 text-[#E10620] font-mono text-[10px] text-center rounded-lg">
                        ✓ Transmission dispatched to your local mail client!
                      </div>
                    )}
                  </form>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Resume Overview Card */}
                <div className="p-4 rounded-xl bg-[#DCE2E8]/70 border border-[rgba(9,11,14,0.12)] flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#E10620]" />
                      <span className="font-mono text-xs font-bold uppercase text-[#E10620]">
                        ATS-OPTIMIZED ENGINEERING RESUME
                      </span>
                    </div>
                    <h3 className="text-base font-bold font-sans text-[#090B0E]">
                      SANTHOSH KUMAR M — SOFTWARE DEVELOPER RESUME
                    </h3>
                    <p className="text-xs text-[#626C78] max-w-xl">
                      Machine-readable, single-column formatted resume compliant with major Applicant Tracking Systems.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto shrink-0">
                    <a
                      href={`${import.meta.env.BASE_URL}resume.html`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#E10620] hover:bg-[#FF3548] text-white font-mono text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 shadow-md border border-[#E10620]"
                    >
                      <FileDown className="w-3.5 h-3.5" />
                      <span>View / Print PDF</span>
                    </a>
                  </div>
                </div>

                {/* Target Developer Roles Matrix */}
                <div className="p-3.5 rounded-xl bg-[#DCE2E8]/70 border border-[rgba(9,11,14,0.12)] space-y-2">
                  <div className="font-mono text-xs font-bold uppercase text-[#090B0E]">
                    Verified Target Roles (Available Immediately)
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {personalProfileData.resumeMetadata.targetRoles.map((role) => (
                      <span
                        key={role}
                        className="px-3 py-1 bg-[#F2F4F7] border border-[rgba(9,11,14,0.12)] text-[#090B0E] font-mono text-xs rounded-lg"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Verified Dossier Core Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-[#DCE2E8]/70 border border-[rgba(9,11,14,0.12)] space-y-1">
                    <div className="font-mono text-[10px] text-[#626C78] uppercase font-bold">
                      ACADEMIC CREDENTIAL
                    </div>
                    <div className="font-mono text-xs font-bold text-[#090B0E]">
                      B.E. Computer Science
                    </div>
                    <p className="text-[11px] text-[#626C78]">
                      Gnanamani College of Tech (2023–2027) · GPA 7.2/10
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#DCE2E8]/70 border border-[rgba(9,11,14,0.12)] space-y-1">
                    <div className="font-mono text-[10px] text-[#E10620] uppercase font-bold">
                      DEVELOPER INTERNSHIP
                    </div>
                    <div className="font-mono text-xs font-bold text-[#090B0E]">
                      Cybernaut Developer
                    </div>
                    <p className="text-[11px] text-[#626C78]">
                      Python Log Analysis & Automation Tooling
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#DCE2E8]/70 border border-[rgba(9,11,14,0.12)] space-y-1">
                    <div className="font-mono text-[10px] text-[#E10620] uppercase font-bold">
                      FLAGSHIP ARCHITECTURE
                    </div>
                    <div className="font-mono text-xs font-bold text-[#090B0E]">
                      LorryBook / RDA Platform
                    </div>
                    <p className="text-[11px] text-[#626C78]">
                      FastAPI & PostgreSQL Event Dispatch Engine
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer Controls */}
          <div className="p-4 border-t border-[rgba(9,11,14,0.12)] bg-[#DCE2E8] flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => handleAskAI('How can I contact Santhosh Kumar for internship opportunities?')}
              className="px-3 py-1.5 bg-[#E10620]/10 border border-[#E10620]/30 text-[#E10620] hover:bg-[#E10620]/20 font-mono text-xs font-bold rounded-lg transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask SAN AI About Contact</span>
            </button>

            <div className="flex items-center gap-2">
              {onRestartJourney && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onRestartJourney();
                  }}
                  className="px-3 py-1.5 bg-white hover:bg-[#F2F4F7] text-[#090B0E] border border-[rgba(9,11,14,0.14)] font-mono text-xs rounded-lg transition-all flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restart Tour</span>
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 bg-[#E10620] hover:bg-[#FF3548] text-white font-mono text-xs font-bold rounded-lg transition-all"
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
