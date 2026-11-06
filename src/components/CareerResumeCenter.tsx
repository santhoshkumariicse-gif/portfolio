import React, { useState } from 'react';
import { Printer, Mail, Award, CheckCircle, Copy, Check } from 'lucide-react';
import { personalProfileData } from '../data/profile';
import { experienceData } from '../data/experience';
import { certificationsData } from '../data/certifications';
import { analytics } from '../analytics/tracker';

export const CareerResumeCenter: React.FC = () => {
  const [copiedPlainText, setCopiedPlainText] = useState<boolean>(false);

  const handlePrint = () => {
    analytics.trackResumeAction('print');
    window.print();
  };

  const { name, headline, education, contact, resumeMetadata } = personalProfileData;

  const handleCopyPlainText = async () => {
    const plainText = [
      `${name.toUpperCase()}`,
      `${headline}`,
      `Location: ${contact.location} | Email: ${contact.email} | Phone: ${contact.phone}`,
      `GitHub: ${contact.github} | LinkedIn: ${contact.linkedin}`,
      '',
      'EDUCATION',
      `${education.institution} - ${education.degree}`,
      `Expected: ${education.expectedGraduation} | GPA: ${education.gpa}`,
      `Coursework: ${education.coursework.join(', ')}`,
      '',
      'EXPERIENCE',
      ...experienceData.map(
        (exp) =>
          `${exp.role.toUpperCase()} - ${exp.organization} (${exp.period})\n${exp.description}\n` +
          exp.highlights.map((h) => `• ${h}`).join('\n')
      ),
      '',
      'CERTIFICATIONS',
      ...certificationsData.map((c) => `• ${c.title} - ${c.issuer} (${c.date})`),
      '',
      'TARGET ROLES',
      resumeMetadata.targetRoles.join(', ')
    ].join('\n');

    try {
      await navigator.clipboard.writeText(plainText);
      setCopiedPlainText(true);
      setTimeout(() => setCopiedPlainText(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <section id="resume-center" className="py-20 md:py-28 border-b border-[var(--border)] bg-[#131512]">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="font-[var(--mono)] text-xs font-bold text-[var(--accent)] tracking-widest uppercase">
                Career // Professional Profile
              </span>
              <span className="px-2 py-0.5 text-[0.65rem] font-[var(--mono)] uppercase tracking-wider font-bold bg-[var(--raised)] border border-[var(--border)] text-[var(--secondary-text)]">
                {resumeMetadata.atsCompliant ? 'ATS-Optimized' : 'Recruiter Ready'}
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--primary-text)]">
              Curriculum vitae,{' '}
              <span className="font-[var(--serif)] italic font-normal text-[var(--accent)]">
                structured.
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--secondary-text)] max-w-[620px] leading-relaxed">
              Verified academic, internship, and project milestones presented in ATS-compatible typography with print and PDF generation support.
            </p>
          </div>

          {/* Action CTAs: Print / Request */}
          <div className="flex flex-wrap items-center gap-3 shrink-0 print-hide">
            <button
              type="button"
              onClick={handlePrint}
              className="min-h-[44px] px-4 py-2 border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--primary-text)] font-[var(--mono)] text-xs uppercase tracking-wider font-bold hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all flex items-center gap-2 cursor-pointer"
              aria-label="Print or save resume as PDF"
            >
              <Printer className="w-4 h-4 text-[var(--accent)]" />
              <span>Print / Save PDF</span>
            </button>

            <button
              type="button"
              onClick={handleCopyPlainText}
              className="min-h-[44px] px-4 py-2 border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--primary-text)] font-[var(--mono)] text-xs uppercase tracking-wider font-bold hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all flex items-center gap-2 cursor-pointer"
              aria-label="Copy plain text formatted resume"
            >
              {copiedPlainText ? (
                <>
                  <Check className="w-4 h-4 text-[var(--accent)]" />
                  <span className="text-[var(--accent)]">Copied Text!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[var(--accent)]" />
                  <span>Copy Plain Text</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${contact.email}?subject=Formal%20Resume%20Request%20-%20${encodeURIComponent(name)}`}
              onClick={() => analytics.trackResumeAction('request')}
              className="min-h-[44px] px-4 py-2 bg-[var(--accent)] text-[var(--bg)] font-[var(--mono)] text-xs uppercase tracking-wider font-bold hover:bg-[#d8ff6b] transition-all flex items-center gap-2"
              aria-label="Send email to request direct resume"
            >
              <Mail className="w-4 h-4" />
              <span>Request Direct Copy</span>
            </a>
          </div>
        </div>

        {/* ATS-Style Resume Sheet Housing */}
        <div className="w-full max-w-4xl mx-auto bg-[#0A0B09] border border-[var(--border-strong)] p-6 sm:p-10 md:p-14 shadow-2xl print:border-none print:p-0 print:bg-white print:text-black">
          {/* Header Block */}
          <div className="border-b border-[var(--border)] pb-8 mb-8 print:border-black">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--primary-text)] tracking-tight print:text-black">
                  {name}
                </h1>
                <p className="text-sm font-[var(--mono)] text-[var(--accent)] font-semibold mt-1 print:text-black">
                  {headline}
                </p>
              </div>

              <div className="text-xs font-[var(--mono)] text-[var(--secondary-text)] sm:text-right space-y-1 print:text-black">
                <div>{contact.location}</div>
                <div>{contact.email}</div>
                <div>{contact.phone}</div>
                <div>github.com/santhoshkumariicse-gif</div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--border)] text-xs text-[var(--secondary-text)] leading-relaxed print:text-black">
              <strong>Professional Summary:</strong> Computer Science Engineering undergraduate (expected {education.expectedGraduation}) with developer internship experience in Python backend automation and web interfaces. Hands-on laboratory experience auditing web application attack surfaces (OWASP Top 10, SQLi, XSS) and exploring emerging AI guardrail architectures. Seeking technical internship opportunities in SOC operations, defensive security, or software development.
            </div>
          </div>

          {/* Education Section */}
          <div className="mb-8 break-inside-avoid">
            <h2 className="text-xs font-[var(--mono)] font-bold uppercase tracking-widest text-[var(--accent)] border-b border-[var(--border)] pb-2 mb-4 print:text-black print:border-black">
              01 // Education
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div>
                <h3 className="text-base font-bold text-[var(--primary-text)] print:text-black">
                  {education.institution}
                </h3>
                <p className="text-xs font-[var(--mono)] text-[var(--secondary-text)] print:text-black">
                  {education.degree}
                </p>
              </div>
              <div className="text-xs font-[var(--mono)] text-[var(--accent)] sm:text-right print:text-black">
                <span>Expected: {education.expectedGraduation}</span> · <span>GPA: {education.gpa}</span>
              </div>
            </div>
            <div className="mt-2 text-xs text-[var(--secondary-text)] print:text-black">
              <span className="font-semibold text-[var(--primary-text)] print:text-black">Core Coursework: </span>
              {education.coursework.join(', ')}
            </div>
          </div>

          {/* Experience Section */}
          <div className="mb-8">
            <h2 className="text-xs font-[var(--mono)] font-bold uppercase tracking-widest text-[var(--accent)] border-b border-[var(--border)] pb-2 mb-4 print:text-black print:border-black">
              02 // Verified Work & Club Experience
            </h2>
            <div className="space-y-6">
              {experienceData.map((exp, idx) => (
                <div key={idx} className="break-inside-avoid">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                    <h3 className="text-sm font-bold text-[var(--primary-text)] print:text-black">
                      {exp.role} · {exp.organization}
                    </h3>
                    <span className="text-xs font-[var(--mono)] text-[var(--secondary-text)] print:text-black">
                      {exp.period} · {exp.location}
                    </span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-[var(--secondary-text)] space-y-1.5 leading-relaxed print:text-black">
                    {exp.highlights.map((h, hIdx) => (
                      <li key={hIdx}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Section */}
          <div className="mb-8 break-inside-avoid">
            <h2 className="text-xs font-[var(--mono)] font-bold uppercase tracking-widest text-[var(--accent)] border-b border-[var(--border)] pb-2 mb-4 print:text-black print:border-black">
              03 // Verified Certifications & Coursework
            </h2>
            <div className="space-y-3">
              {certificationsData.map((cert) => (
                <div key={cert.id} className="text-xs break-inside-avoid">
                  <div className="flex items-center justify-between font-bold text-[var(--primary-text)] print:text-black">
                    <span className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-[var(--accent)] print:text-black" />
                      {cert.title}
                    </span>
                    <span className="font-[var(--mono)] text-[0.7rem] text-[var(--secondary-text)] print:text-black">
                      {cert.issuer} · {cert.date}
                    </span>
                  </div>
                  <p className="text-[var(--secondary-text)] mt-0.5 print:text-black pl-5">
                    {cert.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Target Roles Alignment */}
          <div className="mb-6 break-inside-avoid">
            <h2 className="text-xs font-[var(--mono)] font-bold uppercase tracking-widest text-[var(--accent)] border-b border-[var(--border)] pb-2 mb-4 print:text-black print:border-black">
              04 // Target Internship & Role Alignment
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-[var(--mono)] text-[var(--secondary-text)] print:text-black">
              {resumeMetadata.targetRoles.map((role, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[var(--accent)] shrink-0 print:text-black" />
                  <span>{role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Print Metadata Strip */}
          <div className="pt-6 border-t border-[var(--border)] flex items-center justify-between text-[0.65rem] font-[var(--mono)] text-[var(--muted)] print:text-black">
            <span>RESUME VERSION: {resumeMetadata.version} // ATS ACCREDITED</span>
            <span>VERIFIED ON GITHUB: @santhoshkumariicse-gif</span>
          </div>
        </div>
      </div>
    </section>
  );
};
