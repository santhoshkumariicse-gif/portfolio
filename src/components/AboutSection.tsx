import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, Award, BookOpen, User, Compass, Terminal, Shield } from 'lucide-react';
import { personalProfileData } from '../data/profile';
import { ProfilePortraitCard } from './ProfilePortraitCard';
import { DeveloperBlueprintSvg } from '../svgs/DeveloperBlueprintSvg';

export const AboutSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeMediaView, setActiveMediaView] = useState<'photo' | 'blueprint'>('photo');

  const facts = [
    { label: 'Institution', value: personalProfileData.education.institution, icon: Award },
    { label: 'Department', value: personalProfileData.department, icon: GraduationCap },
    { label: 'Degree', value: personalProfileData.education.degree, icon: BookOpen },
    { label: 'Expected Graduation', value: personalProfileData.education.expectedGraduation, icon: Calendar },
    { label: 'Academic Standing', value: `GPA: ${personalProfileData.education.gpa}`, icon: GraduationCap },
    { label: 'Base Location', value: personalProfileData.education.location, icon: MapPin }
  ];

  return (
    <section id="about" className="py-20 md:py-28 border-b border-[var(--border)] relative bg-[#0D0F0C]">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="font-[var(--mono)] text-xs font-bold text-[var(--accent)] tracking-widest uppercase mb-3">
            01 / Professional Profile
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--primary-text)]">
            Engineering with purpose.{' '}
            <span className="font-[var(--serif)] italic font-normal text-[var(--accent)]">
              Grounded
            </span>{' '}
            in practice.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--secondary-text)] max-w-[640px] leading-relaxed">
            A genuine look at my academic foundations, practical application projects, problem-solving mindset, and software engineering aspirations.
          </p>
        </motion.div>

        {/* Balanced Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Personal Narrative, Education & Philosophy */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 space-y-6 text-sm sm:text-base text-[var(--secondary-text)] leading-relaxed"
          >
            {/* Primary Bio Statement */}
            <div className="p-4 bg-[var(--surface)] border-l-2 border-[var(--accent)] border-y border-r border-[var(--border)]">
              <p className="text-[var(--primary-text)] font-medium leading-relaxed">
                "{personalProfileData.bio[0]}"
              </p>
            </div>

            {/* Structured Engineering Narrative */}
            <div className="space-y-4 text-xs sm:text-sm">
              <div>
                <h3 className="font-[var(--mono)] text-xs font-bold uppercase tracking-wider text-[var(--primary-text)] flex items-center gap-2 mb-1.5">
                  <GraduationCap className="w-4 h-4 text-[var(--accent)]" />
                  <span>Educational Foundation</span>
                </h3>
                <p>
                  I am pursuing my Bachelor of Engineering in Computer Science and Engineering at <strong>Gnanamani College of Technology</strong>, Namakkal (May 2027 graduation, GPA 7.2/10). My coursework has provided rigorous foundations in data structures, algorithms, relational database systems, operating systems, and computer networks.
                </p>
              </div>

              <div>
                <h3 className="font-[var(--mono)] text-xs font-bold uppercase tracking-wider text-[var(--primary-text)] flex items-center gap-2 mb-1.5">
                  <Terminal className="w-4 h-4 text-[var(--accent)]" />
                  <span>Application Development Experience</span>
                </h3>
                <p>
                  Rather than solely studying theoretical computer science, I build functional applications to solve real logistical and workflow bottlenecks. My project portfolio includes <strong>LorryBook / RDA</strong> (an on-demand truck and driver allocation platform), <strong>NexusATS</strong> (a structured candidate recruitment and resume parsing pipeline), and native Android development.
                </p>
              </div>

              <div>
                <h3 className="font-[var(--mono)] text-xs font-bold uppercase tracking-wider text-[var(--primary-text)] flex items-center gap-2 mb-1.5">
                  <Compass className="w-4 h-4 text-[var(--accent)]" />
                  <span>AI-Assisted Development & Emerging Tech</span>
                </h3>
                <p>
                  I actively leverage modern AI development tooling and APIs to accelerate prototyping and solve complex information retrieval challenges. In the <strong>Recall AI</strong> hackathon project, I explored semantic chunking and contextual vector embeddings to build an offline document assistant.
                </p>
              </div>

              <div>
                <h3 className="font-[var(--mono)] text-xs font-bold uppercase tracking-wider text-[var(--primary-text)] flex items-center gap-2 mb-1.5">
                  <Shield className="w-4 h-4 text-[var(--accent)]" />
                  <span>Approach to Learning & Future Aspirations</span>
                </h3>
                <p>
                  I approach software engineering with a discipline rooted in defensive security principles: understanding system boundaries, sanitizing inputs, writing modular code, and verifying behavior with reproducible tests. My aspiration is to join a forward-thinking engineering team as a Software Developer or Full-Stack Intern where I can contribute to mission-critical applications.
                </p>
              </div>
            </div>

            {/* Academic & Personal Facts Table */}
            <div className="mt-8 pt-6 border-t border-[var(--border)] divide-y divide-[var(--border)] font-[var(--mono)] text-xs">
              <span className="font-bold uppercase tracking-wider text-[var(--accent)] block pb-2 text-[0.72rem]">
                Verified Academic Specifications:
              </span>
              {facts.map((fact, index) => {
                const IconComponent = fact.icon;
                return (
                  <div key={index} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                    <span className="text-[var(--secondary-text)] flex items-center gap-2">
                      <IconComponent className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                      <span>{fact.label}</span>
                    </span>
                    <span className="text-[var(--primary-text)] font-semibold sm:text-right">
                      {fact.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Larger Professional Photograph & Blueprint Controls */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col items-center lg:items-end w-full"
          >
            {/* Media Mode Toggle */}
            <div className="w-full max-w-[420px] mb-2 flex items-center justify-between px-2 font-[var(--mono)] text-[0.68rem]">
              <span className="text-[var(--muted)] uppercase tracking-wider">Identity Media:</span>
              <div className="flex items-center gap-1 bg-[var(--surface)] border border-[var(--border)] p-0.5">
                <button
                  type="button"
                  onClick={() => setActiveMediaView('photo')}
                  className={`px-3 py-1 font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                    activeMediaView === 'photo'
                      ? 'bg-[var(--accent)] text-[var(--bg)]'
                      : 'text-[var(--secondary-text)] hover:text-[var(--primary-text)]'
                  }`}
                >
                  <User className="w-3 h-3" />
                  <span>Profile Photo</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMediaView('blueprint')}
                  className={`px-3 py-1 font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                    activeMediaView === 'blueprint'
                      ? 'bg-[var(--accent)] text-[var(--bg)]'
                      : 'text-[var(--secondary-text)] hover:text-[var(--primary-text)]'
                  }`}
                >
                  <Terminal className="w-3 h-3" />
                  <span>CAD Blueprint</span>
                </button>
              </div>
            </div>

            {/* Display Portrait or Blueprint */}
            <div className="w-full max-w-[420px]">
              {activeMediaView === 'photo' ? (
                <ProfilePortraitCard variant="about" />
              ) : (
                <div className="shadow-2xl">
                  <DeveloperBlueprintSvg />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
