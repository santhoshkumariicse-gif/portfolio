import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  GraduationCap,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  User,
  Compass,
  Terminal,
  Shield,
  Sparkles,
  Layers
} from 'lucide-react';
import { personalProfileData } from '../data/profile';
import { ProfilePortraitCard } from './ProfilePortraitCard';
import { DeveloperBlueprintSvg } from '../svgs/DeveloperBlueprintSvg';
import { AnimeAvatar } from './AnimeAvatar';
import { CharacterDialogue } from './CharacterDialogue';
import { StoryChapter } from './StoryChapter';

export const AboutSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeMediaView, setActiveMediaView] = useState<'photo' | 'companion' | 'blueprint'>('photo');

  const facts = [
    { label: 'Institution', value: personalProfileData.education.institution, icon: Award },
    { label: 'Department', value: personalProfileData.department, icon: GraduationCap },
    { label: 'Degree', value: personalProfileData.education.degree, icon: BookOpen },
    { label: 'Expected Graduation', value: personalProfileData.education.expectedGraduation, icon: Calendar },
    { label: 'Academic Standing', value: `GPA: ${personalProfileData.education.gpa}`, icon: GraduationCap },
    { label: 'Base Location', value: personalProfileData.education.location, icon: MapPin }
  ];

  const educationMilestones = [
    {
      period: '2023 — 2027 (Expected)',
      title: 'B.E. Computer Science & Engineering',
      institution: 'Gnanamani College of Technology, Namakkal',
      highlight: 'Core focus in Data Structures, Relational Databases, Operating Systems & Networks. GPA: 7.2/10'
    },
    {
      period: 'Jul 2024 — Present',
      title: 'Python Developer Intern',
      institution: 'Cybernaut',
      highlight: 'Backend automation, data parsing pipelines, and asynchronous script development.'
    },
    {
      period: 'Jul 2025 — Aug 2025',
      title: 'Web & App Developer Intern',
      institution: 'ELITA',
      highlight: 'Full-stack web application development and responsive interface architecture.'
    }
  ];

  return (
    <StoryChapter
      id="about"
      chapterNumber="CH_02"
      title="THE ORIGIN: FOUNDATIONS & ROOTS"
      subtitle="Personal Workspace & Academic Foundations"
      narrativeLogline="A transparent look at my academic background, practical engineering experience, defensive security mindset, and career aspirations."
      environmentTheme="workspace"
    >
      {/* Balanced Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Personal Narrative, Education & Philosophy */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-7 space-y-6 text-sm sm:text-base text-[var(--secondary-text)] leading-relaxed font-sans"
        >
          {/* Primary Bio Statement */}
          <div className="p-4 bg-[var(--surface)] border-l-2 border-[#C7FF45] border-y border-r border-[var(--border)] rounded-sm">
            <p className="text-[var(--primary-text)] font-medium leading-relaxed font-sans">
              "{personalProfileData.bio[0]}"
            </p>
          </div>

          {/* Structured Engineering Narrative */}
          <div className="space-y-4 text-xs sm:text-sm">
            <div>
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--primary-text)] flex items-center gap-2 mb-1.5">
                <GraduationCap className="w-4 h-4 text-[#C7FF45]" />
                <span>Educational Foundation</span>
              </h3>
              <p>
                I am pursuing my Bachelor of Engineering in Computer Science and Engineering at <strong className="text-[var(--primary-text)] font-semibold">Gnanamani College of Technology</strong>, Namakkal (May 2027 graduation, GPA 7.2/10). My coursework provides rigorous foundations in data structures, algorithms, relational database systems, operating systems, and computer networks.
              </p>
            </div>

            <div>
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--primary-text)] flex items-center gap-2 mb-1.5">
                <Terminal className="w-4 h-4 text-[#C7FF45]" />
                <span>Application Development Experience</span>
              </h3>
              <p>
                Rather than solely studying theoretical computer science, I build functional applications to solve real logistical and workflow bottlenecks. My project portfolio includes <strong className="text-[var(--primary-text)] font-semibold">LorryBook / RDA</strong> (an on-demand truck and driver allocation platform), <strong className="text-[var(--primary-text)] font-semibold">NexusATS</strong> (a structured candidate recruitment and resume parsing pipeline), and native Android development.
              </p>
            </div>

            <div>
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--primary-text)] flex items-center gap-2 mb-1.5">
                <Compass className="w-4 h-4 text-[#C7FF45]" />
                <span>AI-Assisted Development & Emerging Tech</span>
              </h3>
              <p>
                I actively leverage modern AI development tooling and APIs to accelerate prototyping and solve complex information retrieval challenges. In the <strong className="text-[var(--primary-text)] font-semibold">Recall AI</strong> hackathon project, I explored semantic chunking and contextual vector embeddings to build an offline document assistant.
              </p>
            </div>

            <div>
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--primary-text)] flex items-center gap-2 mb-1.5">
                <Shield className="w-4 h-4 text-[#C7FF45]" />
                <span>Approach to Learning & Future Aspirations</span>
              </h3>
              <p>
                I approach software engineering with a discipline rooted in defensive security principles: understanding system boundaries, sanitizing inputs, writing modular code, and verifying behavior with reproducible tests. My aspiration is to join a forward-thinking engineering team as a Software Developer or Full-Stack Intern where I can contribute to mission-critical applications.
              </p>
            </div>
          </div>

          {/* Academic & Experience Milestones Timeline */}
          <div className="pt-4 border-t border-[var(--border)]">
            <span className="font-mono font-bold uppercase tracking-wider text-[#C7FF45] block pb-3 text-xs">
              Academic & Internship Timeline:
            </span>
            <div className="space-y-3 font-mono text-xs">
              {educationMilestones.map((m, idx) => (
                <div key={idx} className="p-3 bg-[var(--surface)] border border-[var(--border)] rounded-sm">
                  <div className="flex items-center justify-between text-[11px] text-[var(--muted)] mb-1">
                    <span className="text-[#C7FF45] font-semibold">{m.period}</span>
                    <span>{m.institution}</span>
                  </div>
                  <div className="font-bold text-[var(--primary-text)] font-sans text-sm">{m.title}</div>
                  <p className="mt-1 text-[var(--secondary-text)] font-sans text-xs">{m.highlight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Specifications Table */}
          <div className="pt-4 border-t border-[var(--border)] divide-y divide-[var(--border)] font-mono text-xs">
            <span className="font-bold uppercase tracking-wider text-[#C7FF45] block pb-2 text-[0.72rem]">
              Verified Academic Specifications:
            </span>
            {facts.map((fact, index) => {
              const IconComponent = fact.icon;
              return (
                <div key={index} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                  <span className="text-[var(--secondary-text)] flex items-center gap-2">
                    <IconComponent className="w-3.5 h-3.5 text-[#C7FF45] shrink-0" />
                    <span>{fact.label}</span>
                  </span>
                  <span className="text-[var(--primary-text)] font-semibold sm:text-right font-sans">
                    {fact.value}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Right Column: Verified Professional Photograph & Anime Companion Switcher */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-5 flex flex-col items-center lg:items-end w-full"
        >
          {/* Media Mode Toggle */}
          <div className="w-full max-w-[420px] mb-2 flex items-center justify-between px-1 font-mono text-[0.68rem]">
            <span className="text-[var(--muted)] uppercase tracking-wider">Identity Mode:</span>
            <div className="flex items-center gap-1 bg-[var(--surface)] border border-[var(--border)] p-0.5 rounded-sm">
              <button
                type="button"
                onClick={() => setActiveMediaView('photo')}
                className={`px-2.5 py-1 font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 rounded-sm ${
                  activeMediaView === 'photo'
                    ? 'bg-[#C7FF45] text-[#0A0B09]'
                    : 'text-[var(--secondary-text)] hover:text-[var(--primary-text)]'
                }`}
              >
                <User className="w-3 h-3" />
                <span>Verified Photo</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveMediaView('companion')}
                className={`px-2.5 py-1 font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 rounded-sm ${
                  activeMediaView === 'companion'
                    ? 'bg-[#C7FF45] text-[#0A0B09]'
                    : 'text-[var(--secondary-text)] hover:text-[var(--primary-text)]'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>Companion</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveMediaView('blueprint')}
                className={`px-2.5 py-1 font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 rounded-sm ${
                  activeMediaView === 'blueprint'
                    ? 'bg-[#C7FF45] text-[#0A0B09]'
                    : 'text-[var(--secondary-text)] hover:text-[var(--primary-text)]'
                }`}
              >
                <Layers className="w-3 h-3" />
                <span>CAD</span>
              </button>
            </div>
          </div>

          {/* Display Portrait, Companion or Blueprint */}
          <div className="w-full max-w-[420px]">
            {activeMediaView === 'photo' && (
              <ProfilePortraitCard variant="about" />
            )}

            {activeMediaView === 'companion' && (
              <div className="relative flex flex-col items-center justify-center p-4 border border-white/10 rounded-sm bg-[#131512]/90 backdrop-blur-md">
                <CharacterDialogue
                  speaker="SANTHOSH // WORKSPACE"
                  message="Every complex system is a series of well-understood problems connected together. Here are my academic and practical engineering roots."
                  expression="thinking"
                  position="top"
                  className="mb-2"
                />
                <AnimeAvatar
                  expression="thinking"
                  size="lg"
                  scene="workspace"
                  interactionEnabled={true}
                  showControls={true}
                />
              </div>
            )}

            {activeMediaView === 'blueprint' && (
              <div className="shadow-2xl">
                <DeveloperBlueprintSvg />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </StoryChapter>
  );
};
