import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  Cpu,
  ExternalLink,
  FolderGit2,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  User
} from 'lucide-react';
import { useHighwayState } from './HighwayStateContext';
import { personalProfileData } from '../../data/profile';
import {
  ProgrammingSvg,
  SecurityEngineeringSvg,
  DatabaseSvg,
  ToolsSvg
} from '../../svgs/SkillCategorySvgs';

const SECTION_ICONS: Record<string, React.ElementType> = {
  about: User,
  education: GraduationCap,
  skills: Cpu,
  projects: FolderGit2,
  experience: Briefcase,
  interests: ShieldCheck,
  contact: Send
};

const getVisual = (id: string): { src: string; alt: string } => {
  switch (id) {
    case 'about':
      return { src: `${import.meta.env.BASE_URL}assets/profile/santhosh-profile-formal.jpg`, alt: 'Portrait of Santhosh Kumar M' };
    case 'education':
      return { src: `${import.meta.env.BASE_URL}assets/portfolio/billboards/km2-education-telemetry.jpg`, alt: 'Education milestone visual' };
    case 'skills':
      return { src: `${import.meta.env.BASE_URL}assets/portfolio/billboards/km3-skills-telemetry.jpg`, alt: 'Technical skills milestone visual' };
    case 'projects':
      return { src: `${import.meta.env.BASE_URL}assets/projects/systems-lab-optical-bus.jpg`, alt: 'Software project environment' };
    case 'experience':
      return { src: `${import.meta.env.BASE_URL}assets/portfolio/billboards/km5-experience-telemetry.jpg`, alt: 'Professional experience milestone visual' };
    case 'interests':
      return { src: `${import.meta.env.BASE_URL}assets/cybersecurity/cyber-soc-threat-command.jpg`, alt: 'Cybersecurity operations visual' };
    case 'contact':
      return { src: `${import.meta.env.BASE_URL}assets/profile/santhosh-profile-formal.jpg`, alt: 'Santhosh Kumar M contact portrait' };
    default:
      return { src: `${import.meta.env.BASE_URL}assets/portfolio/billboards/km0-welcome-telemetry.jpg`, alt: 'Portfolio milestone visual' };
  }
};

export const HighwaySectionCard: React.FC = () => {
  const { currentSection, totalSections } = useHighwayState();
  const SectionIcon = SECTION_ICONS[currentSection.id] || Sparkles;
  const visual = getVisual(currentSection.id);

  const skillIcon = (category: string, index: number) => {
    const Icon = /security|cyber/i.test(category)
      ? SecurityEngineeringSvg
      : /database/i.test(category)
        ? DatabaseSvg
        : /tool/i.test(category)
          ? ToolsSvg
          : ProgrammingSvg;
    return <Icon key={index} className="w-5 h-5" />;
  };

  return (
    <aside
      aria-label={`Active Portfolio Section: ${currentSection.title}`}
      aria-live="polite"
      className="pointer-events-auto mx-auto w-[calc(100%-1.5rem)] sm:w-[calc(100%-3rem)] max-w-[980px] h-[min(68vh,680px)] sm:h-[min(66vh,680px)] overflow-hidden rounded-[18px] border border-[rgba(9,11,14,0.16)] bg-[#F2F4F7]/[0.97] backdrop-blur-2xl shadow-[0_24px_70px_rgba(9,11,14,0.24)] font-sans"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection.id}
          initial={{ opacity: 0, y: 16, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.985 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="h-full flex flex-col"
        >
          <header className="shrink-0 h-[68px] px-4 sm:px-6 flex items-center justify-between border-b border-[rgba(9,11,14,0.12)] bg-[#DCE2E8]/90">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#090B0E] text-[#FF3548] border border-[rgba(255,53,72,0.35)] flex items-center justify-center shrink-0">
                <SectionIcon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[9px] sm:text-[10px] font-mono font-bold tracking-[0.18em] text-[#E10620] uppercase">
                  Section {currentSection.sectionNumber} / {String(totalSections).padStart(2, '0')}
                </div>
                <h2 className="text-base sm:text-lg font-black tracking-tight text-[#090B0E] truncate">
                  {currentSection.id === 'about' ? 'ABOUT ME' : currentSection.title}
                </h2>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <div className="text-right">
                <div className="text-[9px] font-mono uppercase text-[#626C78]">{currentSection.statBadge.label}</div>
                <div className="text-[11px] font-mono font-bold text-[#090B0E]">{currentSection.statBadge.value}</div>
              </div>
              <div className="w-px h-8 bg-[rgba(9,11,14,0.14)]" />
              <div className="text-[10px] font-mono font-bold text-[#E10620]">KM {currentSection.km.toFixed(1)}</div>
            </div>
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-[38%_62%] min-h-full">
              <motion.section
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12, duration: 0.45 }}
                className="relative min-h-[260px] md:min-h-full bg-[#171B20] overflow-hidden border-b md:border-b-0 md:border-r border-[rgba(9,11,14,0.12)]"
              >
                <img
                  src={visual.src}
                  alt={visual.alt}
                  className={`absolute inset-0 w-full h-full ${
                    currentSection.id === 'about' || currentSection.id === 'contact'
                      ? 'object-cover object-[center_18%]'
                      : 'object-cover'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090B0E]/80 via-transparent to-[#090B0E]/10" />
                <div className="absolute left-4 right-4 bottom-4 flex items-end justify-between gap-3">
                  {currentSection.id === 'about' && (
                    <div>
                      <div className="text-[9px] font-mono tracking-[0.18em] uppercase text-[#C9D0D8]">Personal Dossier</div>
                      <div className="text-lg sm:text-xl font-black text-white">Santhosh Kumar M</div>
                    </div>
                  )}
                  {currentSection.id === 'education' && (
                    <div className="font-mono text-xs text-white">
                      <div className="text-[#FF3548] font-bold">2023 — 2027</div>
                      <div>B.E. CSE</div>
                    </div>
                  )}
                  {currentSection.id === 'projects' && (
                    <div className="font-mono text-xs text-white">VERIFIED PROJECT ARCHITECTURES</div>
                  )}
                  {currentSection.id === 'experience' && (
                    <div className="font-mono text-xs text-white">CYBERNAUT · ELITA</div>
                  )}
                  {currentSection.id === 'interests' && (
                    <div className="font-mono text-xs text-white">CTF · WEB SECURITY · RESEARCH</div>
                  )}
                  {currentSection.id === 'skills' && (
                    <div className="font-mono text-xs text-white">ENGINEERING · SECURITY · TOOLING</div>
                  )}
                  {currentSection.id === 'contact' && (
                    <div className="font-mono text-xs text-white">NAMAKKAL · INDIA</div>
                  )}
                  <span className="w-2 h-2 mb-1 rounded-full bg-[#E10620] shadow-[0_0_12px_#FF3548]" />
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.16, duration: 0.45 }}
                className="p-5 sm:p-7 lg:p-8"
              >
                <div className="mb-5">
                  <div className="text-[10px] font-mono font-bold tracking-[0.16em] uppercase text-[#E10620]">
                    {currentSection.subtitle}
                  </div>
                  {currentSection.id === 'about' && (
                    <h1 className="mt-2 text-2xl sm:text-3xl lg:text-4xl leading-tight font-black tracking-tight text-[#090B0E]">
                      Santhosh Kumar M
                    </h1>
                  )}
                  <p className="mt-2 text-sm sm:text-[15px] leading-7 text-[#626C78] max-w-[620px]">
                    {currentSection.tagline}
                  </p>
                </div>

                {currentSection.id === 'about' && (
                  <div className="space-y-5">
                    <div className="space-y-3 text-sm leading-7 text-[#171B20]">
                      {personalProfileData.bio.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden rounded-lg border border-[rgba(9,11,14,0.12)] bg-[rgba(9,11,14,0.12)]">
                      {[
                        ['Degree', 'B.E. CSE'],
                        ['GPA', '7.2 / 10'],
                        ['Graduation', 'May 2027'],
                        ['Location', 'Namakkal, IN']
                      ].map(([label, value]) => (
                        <div key={label} className="bg-[#F2F4F7] p-3">
                          <div className="text-[9px] font-mono uppercase text-[#626C78]">{label}</div>
                          <div className="mt-1 text-xs font-bold text-[#090B0E]">{value}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {personalProfileData.interests.map((interest) => (
                        <span key={interest} className="border-l-2 border-[#E10620] pl-2 pr-1 text-[11px] font-mono text-[#626C78]">
                          {interest}
                        </span>
                      ))}
                    </div>
                    <SocialLinks />
                  </div>
                )}

                {currentSection.id === 'education' && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        ['Institution', 'Gnanamani College of Technology'],
                        ['Degree', 'Bachelor of Engineering'],
                        ['Department', 'Computer Science & Engineering'],
                        ['Timeline', '2023 — 2027'],
                        ['Graduation', 'May 2027'],
                        ['GPA', '7.2 / 10.0']
                      ].map(([label, value]) => (
                        <div key={label} className="border-t border-[rgba(9,11,14,0.12)] pt-3">
                          <div className="text-[9px] font-mono uppercase tracking-wider text-[#626C78]">{label}</div>
                          <div className="mt-1 text-sm font-bold text-[#090B0E]">{value}</div>
                        </div>
                      ))}
                    </div>
                    <ContentList points={currentSection.bulletPoints} />
                  </div>
                )}

                {currentSection.skillsCategories && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">
                    {currentSection.skillsCategories.map((category, index) => (
                      <div key={category.category} className="border-t-2 border-[rgba(9,11,14,0.12)] pt-3">
                        <div className="flex items-center gap-2.5 mb-3 text-[#E10620]">
                          {skillIcon(category.category, index)}
                          <div className="text-[10px] font-mono font-bold uppercase tracking-[0.12em] text-[#090B0E]">
                            {category.category}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {category.skills.map((skill) => (
                            <span key={skill} className="text-xs text-[#171B20] bg-[#DCE2E8]/70 px-2.5 py-1.5 rounded-md">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {currentSection.projects && (
                  <div className="space-y-4">
                    {currentSection.projects.map((project) => (
                      <article key={project.id} className="border-t border-[rgba(9,11,14,0.14)] pt-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-[10px] font-mono font-bold uppercase text-[#E10620]">{project.badge}</div>
                            <h3 className="mt-1 text-lg font-black text-[#090B0E]">{project.name}</h3>
                          </div>
                          <a href={project.githubUrl} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} on GitHub`} className="p-2 rounded-full border border-[rgba(9,11,14,0.14)] text-[#090B0E] hover:text-[#E10620] hover:border-[#E10620]">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-[#626C78]">{project.desc}</p>
                        <ul className="mt-3 grid gap-1.5 text-xs text-[#171B20]">
                          {project.features.map((feature) => (
                            <li key={feature} className="flex gap-2">
                              <span className="mt-2 w-1 h-1 rounded-full bg-[#E10620] shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {project.tags.map((tag) => (
                            <span key={tag} className="font-mono text-[10px] px-2 py-1 rounded bg-[#171B20] text-[#F2F4F7]">{tag}</span>
                          ))}
                        </div>
                        {project.demoUrl && (
                          <a href={project.demoUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#E10620]">
                            View live project <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </article>
                    ))}
                  </div>
                )}

                {currentSection.internships && (
                  <div className="space-y-5">
                    {currentSection.internships.map((internship) => (
                      <article key={`${internship.company}-${internship.role}`} className="border-t border-[rgba(9,11,14,0.14)] pt-4">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                          <div>
                            <h3 className="text-lg font-black text-[#090B0E]">{internship.company}</h3>
                            <div className="text-xs font-mono font-bold text-[#E10620]">{internship.role}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] font-mono font-bold text-[#090B0E]">{internship.period}</div>
                            <div className="text-[10px] text-[#626C78]">{internship.location}</div>
                          </div>
                        </div>
                        <ul className="mt-3 space-y-2">
                          {internship.responsibilities.map((responsibility) => (
                            <li key={responsibility} className="flex gap-2.5 text-sm leading-6 text-[#171B20]">
                              <CheckCircle2 className="w-4 h-4 mt-1 text-[#E10620] shrink-0" />
                              {responsibility}
                            </li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                )}

                {currentSection.id === 'interests' && (
                  <div className="space-y-5">
                    <ContentList points={currentSection.bulletPoints} />
                    <div className="grid grid-cols-2 gap-3">
                      {['Cybersecurity Research', 'Web Security', 'CTF Challenges', 'Python Automation'].map((interest) => (
                        <div key={interest} className="flex items-center gap-2 border-l-2 border-[#E10620] pl-3 py-2 text-xs font-bold text-[#090B0E]">
                          {interest}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentSection.contactInfo && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-px overflow-hidden rounded-lg border border-[rgba(9,11,14,0.12)] bg-[rgba(9,11,14,0.12)]">
                      <a href={`mailto:${currentSection.contactInfo.email}`} className="bg-[#F2F4F7] p-3.5 flex items-center gap-3 text-sm text-[#090B0E] hover:bg-[#DCE2E8]">
                        <Mail className="w-4 h-4 text-[#E10620]" />
                        <span className="truncate">{currentSection.contactInfo.email}</span>
                      </a>
                      <a href={`tel:${currentSection.contactInfo.phone}`} className="bg-[#F2F4F7] p-3.5 flex items-center gap-3 text-sm text-[#090B0E] hover:bg-[#DCE2E8]">
                        <Phone className="w-4 h-4 text-[#E10620]" />
                        {currentSection.contactInfo.phone}
                      </a>
                      <div className="bg-[#F2F4F7] p-3.5 flex items-center gap-3 text-sm text-[#626C78]">
                        <MapPin className="w-4 h-4 text-[#E10620]" />
                        {currentSection.contactInfo.location}
                      </div>
                      <a href={currentSection.contactInfo.linkedin} target="_blank" rel="noreferrer" className="bg-[#F2F4F7] p-3.5 flex items-center gap-3 text-sm text-[#090B0E] hover:bg-[#DCE2E8]">
                        <ExternalLink className="w-4 h-4 text-[#E10620]" />
                        LinkedIn
                      </a>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <a href={`mailto:${currentSection.contactInfo.email}?subject=Interview%20Inquiry`} className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#E10620] text-white text-xs font-bold hover:bg-[#FF3548]">
                        <Send className="w-4 h-4" /> Send direct email
                      </a>
                      <a href={currentSection.contactInfo.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#171B20] text-white text-xs font-bold hover:bg-[#090B0E]">
                        <ExternalLink className="w-4 h-4" /> GitHub profile
                      </a>
                    </div>
                    <ContentList points={currentSection.bulletPoints.filter((point) => !point.includes('@') && !point.includes('linkedin') && !point.includes('github'))} />
                  </div>
                )}
              </motion.section>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </aside>
  );
};

const ContentList: React.FC<{ points: string[] }> = ({ points }) => (
  <ul className="space-y-2.5">
    {points.map((point) => (
      <li key={point} className="flex items-start gap-2.5 text-sm leading-6 text-[#171B20]">
        <CheckCircle2 className="w-4 h-4 mt-1 text-[#E10620] shrink-0" />
        <span>{point}</span>
      </li>
    ))}
  </ul>
);

const SocialLinks: React.FC = () => (
  <div className="flex flex-wrap gap-3">
    <a href={personalProfileData.contact.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[rgba(9,11,14,0.14)] text-xs font-bold text-[#090B0E] hover:border-[#E10620] hover:text-[#E10620]">
      LinkedIn <ArrowUpRight className="w-3.5 h-3.5" />
    </a>
    <a href={personalProfileData.contact.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[rgba(9,11,14,0.14)] text-xs font-bold text-[#090B0E] hover:border-[#E10620] hover:text-[#E10620]">
      GitHub <ArrowUpRight className="w-3.5 h-3.5" />
    </a>
  </div>
);
