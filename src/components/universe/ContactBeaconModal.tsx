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
  Layers,
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
  onRestartJourney,
  onExitToClassic
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: -8 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#0E1210]/95 border border-[#C7FF45]/40 rounded-sm shadow-[0_0_40px_rgba(199,255,69,0.25)] flex flex-col overflow-hidden text-[var(--primary-text)] font-sans"
        >
          {/* Top Lime Gradient Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C7FF45] via-[#00E5FF] to-transparent" />

          {/* Holographic Reticle Corners */}
          <span className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-[#C7FF45]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-[#C7FF45]" />
          <span className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-[#C7FF45]" />
          <span className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-[#C7FF45]" />

          {/* Modal Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between gap-3 bg-[#131713]/80">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-sm bg-[#C7FF45]/10 border border-[#C7FF45]/40 text-[#C7FF45]">
                <Radio className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-sm font-mono text-[9px] font-bold uppercase bg-[#C7FF45]/20 border border-[#C7FF45]/50 text-[#C7FF45]">
                    ACT 05 // CONTACT BEACON FINALE
                  </span>
                  <span className="font-mono text-[10px] text-[var(--muted)] hidden sm:inline">
                    HORIZON TRANSMISSION UPLINK
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-bold font-mono text-white tracking-wide mt-0.5">
                  CONNECT WITH SANTHOSH KUMAR M
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
              onClick={() => setActiveTab('transmit')}
              className={`pb-2.5 px-3 border-b-2 flex items-center gap-2 transition-all ${
                activeTab === 'transmit'
                  ? 'border-[#C7FF45] text-[#C7FF45] font-bold'
                  : 'border-transparent text-[var(--secondary-text)] hover:text-white'
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
                  ? 'border-[#C7FF45] text-[#C7FF45] font-bold'
                  : 'border-transparent text-[var(--secondary-text)] hover:text-white'
              }`}
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>VERIFIED ATS RESUME ARCHIVE</span>
            </button>
          </div>

          {/* Modal Body (Scrollable) */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 max-h-[calc(90vh-200px)]">
            {activeTab === 'transmit' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Direct Contact Channels */}
                <div className="space-y-3">
                  <h3 className="font-mono text-xs font-bold uppercase text-white flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-[#C7FF45]" />
                    <span>Direct Communication Channels</span>
                  </h3>

                  {/* Email Card */}
                  <div className="p-3.5 rounded-sm bg-[#131713] border border-white/10 flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="font-mono text-[9px] uppercase text-[var(--muted)]">
                        PRIMARY EMAIL ADDRESS
                      </div>
                      <div className="font-mono text-xs font-semibold text-white select-all">
                        {personalProfileData.contact.email}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => copyToClipboard(personalProfileData.contact.email, 'email')}
                        className="p-1.5 bg-white/5 hover:bg-white/15 text-[var(--muted)] hover:text-white rounded-sm transition-all"
                        title="Copy email"
                      >
                        {copiedField === 'email' ? (
                          <Check className="w-3.5 h-3.5 text-[#C7FF45]" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <a
                        href={`mailto:${personalProfileData.contact.email}`}
                        className="px-2.5 py-1 bg-[#C7FF45]/15 border border-[#C7FF45]/40 text-[#C7FF45] font-mono text-[10px] font-bold rounded-sm hover:bg-[#C7FF45]/30 transition-all"
                      >
                        Launch
                      </a>
                    </div>
                  </div>

                  {/* Phone Card */}
                  <div className="p-3.5 rounded-sm bg-[#131713] border border-white/10 flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="font-mono text-[9px] uppercase text-[var(--muted)] flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-[#C7FF45]" />
                        <span>TELEPHONE / WHATSAPP</span>
                      </div>
                      <div className="font-mono text-xs font-semibold text-white">
                        {personalProfileData.contact.phone}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(personalProfileData.contact.phone, 'phone')}
                      className="p-1.5 bg-white/5 hover:bg-white/15 text-[var(--muted)] hover:text-white rounded-sm transition-all"
                      title="Copy phone"
                    >
                      {copiedField === 'phone' ? (
                        <Check className="w-3.5 h-3.5 text-[#C7FF45]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Geographic & Timezone */}
                  <div className="p-3.5 rounded-sm bg-[#131713] border border-white/10 flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="font-mono text-[9px] uppercase text-[var(--muted)]">
                        HEADQUARTERS & TIMEZONE
                      </div>
                      <div className="font-mono text-xs text-[var(--primary-text)] flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#FFB347]" />
                        <span>{personalProfileData.contact.location}</span>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-[#00E5FF] bg-[#00E5FF]/10 px-2 py-0.5 rounded-sm border border-[#00E5FF]/30">
                      {personalProfileData.contact.timezone}
                    </span>
                  </div>

                  {/* External Network Uplinks */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <a
                      href={personalProfileData.contact.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-sm bg-[#131713] border border-white/10 hover:border-[#00E5FF]/50 transition-all flex items-center gap-2.5 group"
                    >
                      <svg className="w-4 h-4 fill-current text-white group-hover:text-[#00E5FF] transition-colors shrink-0" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      <div className="font-mono text-xs">
                        <span className="block text-white font-bold">GitHub</span>
                        <span className="text-[10px] text-[var(--muted)]">@santhoshkumar</span>
                      </div>
                    </a>

                    <a
                      href={personalProfileData.contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-sm bg-[#131713] border border-white/10 hover:border-[#00E5FF]/50 transition-all flex items-center gap-2.5 group"
                    >
                      <svg className="w-4 h-4 fill-current text-[#00E5FF] group-hover:text-white transition-colors shrink-0" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      <div className="font-mono text-xs">
                        <span className="block text-white font-bold">LinkedIn</span>
                        <span className="text-[10px] text-[var(--muted)]">santhosh-kumar</span>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Direct Message Transmission Composer */}
                <div className="p-4 rounded-sm bg-[#131713] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-mono text-xs font-bold uppercase text-white flex items-center gap-1.5">
                      <Send className="w-3.5 h-3.5 text-[#C7FF45]" />
                      <span>Transmit Direct Message</span>
                    </h3>
                    <span className="font-mono text-[9px] text-[#C7FF45]">
                      DIRECT TO INBOX
                    </span>
                  </div>

                  <form onSubmit={handleTransmitMessage} className="space-y-2.5">
                    <div>
                      <label className="block font-mono text-[10px] text-[var(--muted)] uppercase mb-1">
                        Your Name / Recruiter ID
                      </label>
                      <input
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="e.g. Elena Rostova / Technical Recruiter"
                        className="w-full px-3 py-1.5 bg-[#0A0D0B] border border-white/15 rounded-sm font-mono text-xs text-white placeholder-white/20 focus:border-[#C7FF45] outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] text-[var(--muted)] uppercase mb-1">
                        Your Work Email
                      </label>
                      <input
                        type="email"
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        placeholder="e.g. recruiter@company.com"
                        className="w-full px-3 py-1.5 bg-[#0A0D0B] border border-white/15 rounded-sm font-mono text-xs text-white placeholder-white/20 focus:border-[#C7FF45] outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] text-[var(--muted)] uppercase mb-1">
                        Transmission Message
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={senderMsg}
                        onChange={(e) => setSenderMsg(e.target.value)}
                        placeholder="Discuss internship openings, engineering roles, or software architecture collaboration..."
                        className="w-full px-3 py-1.5 bg-[#0A0D0B] border border-white/15 rounded-sm font-mono text-xs text-white placeholder-white/20 focus:border-[#C7FF45] outline-none transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 bg-[#C7FF45] hover:bg-[#D2FF5E] text-[#0A0B09] font-mono text-xs font-black uppercase tracking-wider rounded-sm transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(199,255,69,0.3)]"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Signal via Mailto</span>
                    </button>

                    {sentSuccess && (
                      <div className="p-2 bg-[#C7FF45]/20 border border-[#C7FF45]/50 text-[#C7FF45] font-mono text-[10px] text-center rounded-sm">
                        ✓ Transmission dispatched to your local mail client!
                      </div>
                    )}
                  </form>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Resume Overview Card */}
                <div className="p-4 rounded-sm bg-[#131713] border border-white/10 flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#C7FF45]" />
                      <span className="font-mono text-xs font-bold uppercase text-[#C7FF45]">
                        ATS-OPTIMIZED ENGINEERING RESUME
                      </span>
                    </div>
                    <h3 className="text-base font-bold font-mono text-white">
                      SANTHOSH KUMAR M — SOFTWARE DEVELOPER RESUME
                    </h3>
                    <p className="text-xs text-[var(--secondary-text)] max-w-xl">
                      Machine-readable, single-column formatted resume compliant with major Applicant Tracking Systems (Workday, Greenhouse, Lever, NexusATS).
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto shrink-0">
                    <a
                      href={`${import.meta.env.BASE_URL}resume.html`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#C7FF45] hover:bg-[#D2FF5E] text-[#0A0B09] font-mono text-xs font-black uppercase tracking-wider rounded-sm transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(199,255,69,0.3)]"
                    >
                      <FileDown className="w-3.5 h-3.5" />
                      <span>View / Print PDF</span>
                    </a>
                  </div>
                </div>

                {/* Target Developer Roles Matrix */}
                <div className="p-3.5 rounded-sm bg-[#131713]/80 border border-white/10 space-y-2">
                  <div className="font-mono text-xs font-bold uppercase text-white">
                    Verified Target Roles (Available Immediately)
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {personalProfileData.resumeMetadata.targetRoles.map((role) => (
                      <span
                        key={role}
                        className="px-3 py-1 bg-[#0A0D0B] border border-[#C7FF45]/40 text-[#C7FF45] font-mono text-xs rounded-sm"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Verified Dossier Core Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-sm bg-[#131713]/60 border border-white/10 space-y-1">
                    <div className="font-mono text-[10px] text-[#00E5FF] uppercase font-bold">
                      ACADEMIC CREDENTIAL
                    </div>
                    <div className="font-mono text-xs font-bold text-white">
                      B.E. Computer Science
                    </div>
                    <p className="text-[11px] text-[var(--secondary-text)]">
                      Gnanamani College of Tech (2023–2027) · GPA 7.2/10
                    </p>
                  </div>

                  <div className="p-3 rounded-sm bg-[#131713]/60 border border-white/10 space-y-1">
                    <div className="font-mono text-[10px] text-[#C7FF45] uppercase font-bold">
                      DEVELOPER INTERNSHIP
                    </div>
                    <div className="font-mono text-xs font-bold text-white">
                      Cybernaut Developer
                    </div>
                    <p className="text-[11px] text-[var(--secondary-text)]">
                      Python Log Analysis & Automation Tooling (Jul 2024–Pres)
                    </p>
                  </div>

                  <div className="p-3 rounded-sm bg-[#131713]/60 border border-white/10 space-y-1">
                    <div className="font-mono text-[10px] text-[#FFB347] uppercase font-bold">
                      FLAGSHIP ARCHITECTURE
                    </div>
                    <div className="font-mono text-xs font-bold text-white">
                      LorryBook / RDA Platform
                    </div>
                    <p className="text-[11px] text-[var(--secondary-text)]">
                      FastAPI & PostgreSQL Event Dispatch Engine
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer Controls */}
          <div className="p-4 border-t border-white/10 bg-[#131713] flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => handleAskAI('How can I contact Santhosh Kumar for internship opportunities?')}
              className="px-3 py-1.5 bg-[#C7FF45]/15 border border-[#C7FF45]/40 text-[#C7FF45] hover:bg-[#C7FF45]/25 font-mono text-xs font-bold rounded-sm transition-all flex items-center gap-1.5"
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
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white font-mono text-xs rounded-sm transition-all flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restart Tour</span>
                </button>
              )}

              {onExitToClassic && (
                <button
                  type="button"
                  onClick={onExitToClassic}
                  className="px-3 py-1.5 bg-[#00E5FF]/20 border border-[#00E5FF]/50 hover:bg-[#00E5FF]/30 text-[#00E5FF] font-mono text-xs font-bold rounded-sm transition-all flex items-center gap-1.5"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Classic 2D View</span>
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
