import React, { useState, useEffect, lazy, Suspense } from 'react';
import { AICore, AIConversationPanel } from './ai';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './motion/ScrollProgress';
import { PageTransition } from './motion/PageTransition';
import { SectionDivider } from './components/SectionDivider';
import { Navbar } from './components/Navbar';
import { MobileNavigation } from './components/MobileNavigation';
import { CommandPalette } from './components/CommandPalette';
import { HeroSection } from './components/HeroSection';
import { DeveloperCommandCenter } from './components/DeveloperCommandCenter';
import { MissionsSection } from './components/MissionsSection';
import { GitHubActivitySection } from './components/GitHubActivitySection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { EngineeringProcess } from './components/EngineeringProcess';
import { AIEngineeringSection } from './components/AIEngineeringSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CircuitBackground } from './components/CircuitBackground';
import { VisitorIntentSelector } from './components/VisitorIntentSelector';
import { projectsData } from './data/projects';
import { ProjectItem, VisitorPath } from './types';

// Code-split heavy interactive laboratories and modals for peak initial Core Web Vitals
const InsideTheSystemsLab = lazy(() => import('./components/InsideTheSystemsLab').then(m => ({ default: m.InsideTheSystemsLab })));
const TechnicalKnowledgeGraph = lazy(() => import('./components/TechnicalKnowledgeGraph').then(m => ({ default: m.TechnicalKnowledgeGraph })));
const ProjectDemoCenter = lazy(() => import('./components/ProjectDemoCenter').then(m => ({ default: m.ProjectDemoCenter })));
const InteractiveArchitectureVisualizer = lazy(() => import('./components/InteractiveArchitectureVisualizer').then(m => ({ default: m.InteractiveArchitectureVisualizer })));
const InteractiveJourneyTimeline = lazy(() => import('./components/InteractiveJourneyTimeline').then(m => ({ default: m.InteractiveJourneyTimeline })));
const CybersecurityPlayground = lazy(() => import('./components/CybersecurityPlayground').then(m => ({ default: m.CybersecurityPlayground })));
const ApiEngineeringLab = lazy(() => import('./components/ApiEngineeringLab').then(m => ({ default: m.ApiEngineeringLab })));
const InteractiveTerminalV2 = lazy(() => import('./components/InteractiveTerminalV2').then(m => ({ default: m.InteractiveTerminalV2 })));
const TechnicalBlogSection = lazy(() => import('./components/TechnicalBlogSection').then(m => ({ default: m.TechnicalBlogSection })));
const EngineeringDocCenter = lazy(() => import('./components/EngineeringDocCenter').then(m => ({ default: m.EngineeringDocCenter })));
const CareerResumeCenter = lazy(() => import('./components/CareerResumeCenter').then(m => ({ default: m.CareerResumeCenter })));
const ProjectDetailModal = lazy(() => import('./components/ProjectDetailModal').then(m => ({ default: m.ProjectDetailModal })));
const UniverseHomepage = lazy(() => import('./components/universe/UniverseHomepage').then(m => ({ default: m.UniverseHomepage })));
const HighwayStage = lazy(() => import('./components/highway/HighwayStage').then(m => ({ default: m.HighwayStage })));

const FallbackLoader: React.FC = () => (
  <div className="py-16 flex items-center justify-center font-[var(--mono)] text-xs text-[var(--muted)]">
    <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping mr-2 inline-block" />
    <span>Loading system module...</span>
  </div>
);

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('top');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [selectedDetailProject, setSelectedDetailProject] = useState<ProjectItem | null>(null);
  const [portfolioMode, setPortfolioMode] = useState<'classic' | 'highway' | 'universe'>('universe');
  const [visitorPath, setVisitorPath] = useState<VisitorPath>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('portfolio_visitor_path');
        if (stored === 'recruiter' || stored === 'developer' || stored === 'general') {
          return stored;
        }
      } catch {
        // Storage unavailable
      }
    }
    return 'general';
  });

  const handleSelectPath = (path: VisitorPath) => {
    setVisitorPath(path);
    try {
      localStorage.setItem('portfolio_visitor_path', path);
    } catch {
      // Storage unavailable
    }
  };

  const navItems = [
    { id: 'command-center', label: 'Command' },
    { id: 'projects', label: 'Work' },
    { id: 'systems-lab', label: 'Labs' },
    { id: 'security-playground', label: 'Security' },
    { id: 'terminal', label: 'CLI' },
    { id: 'blog', label: 'Writing' },
    { id: 'engineering', label: 'Docs' },
    { id: 'resume-center', label: 'Résumé' },
    { id: 'contact', label: 'Contact' }
  ];

  // Global Ctrl+K / Cmd+K Command Palette Trigger
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Active section observer on scroll
  useEffect(() => {
    const sectionIds = [
      'top',
      'command-center',
      'projects',
      'github-activity',
      'about',
      'skills',
      'experience',
      'process',
      'systems-lab',
      'security-playground',
      'api-lab',
      'terminal',
      'blog',
      'engineering',
      'ai-engineering',
      'resume-center',
      'contact'
    ];
    const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-35% 0px -55% 0px'
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (portfolioMode === 'universe') {
    return (
      <Suspense fallback={<FallbackLoader />}>
        <UniverseHomepage
          onViewJourney={() => setPortfolioMode('highway')}
          onExplorePortfolio2D={() => setPortfolioMode('classic')}
        />
      </Suspense>
    );
  }

  if (portfolioMode === 'highway') {
    return (
      <Suspense fallback={<FallbackLoader />}>
        <HighwayStage
          onExitHighway={() => setPortfolioMode('classic')}
          onReturnToUniverse={() => setPortfolioMode('universe')}
        />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--primary-text)] font-[var(--sans)] flex flex-col selection:bg-[var(--accent)] selection:text-[var(--bg)]">
      {/* Skip to Main Content Link (WCAG 2.2 AA SC 2.4.1) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--accent)] focus:text-[var(--bg)] focus:font-[var(--mono)] focus:text-xs focus:font-bold focus:shadow-xl focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Desktop Precision Custom Cursor */}
      <CustomCursor />

      {/* Ambient Circuit Trace Background (Framer Motion) */}
      <CircuitBackground />

      {/* Navigation Header */}
      <Navbar
        activeSection={activeSection}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onEnterHighway={() => setPortfolioMode('highway')}
        onEnterUniverse={() => setPortfolioMode('universe')}
        navItems={navItems}
      />

      {/* Accessible Mobile Drawer */}
      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
        navItems={navItems}
      />

      {/* Main Content Regions */}
      <main id="main-content" className="flex-1">
        <PageTransition>
          {/* 01. Hero Section */}
          <HeroSection />

          {/* Visitor Personalization Intent Selector */}
          <VisitorIntentSelector
            currentPath={visitorPath}
            onSelectPath={handleSelectPath}
          />

          <SectionDivider label="SECTION // 01" sub="DEVELOPER COMMAND CENTER" />

          {/* 02. Developer Command Center */}
          <DeveloperCommandCenter />

          <SectionDivider label="SECTION // 02" sub="SELECTED CASE STUDIES" />

          {/* 03. Chapter 04: The Missions */}
          <MissionsSection onOpenDetail={setSelectedDetailProject} />

          {/* 03b. Verifiable Project Demo Center (Prompt 44) */}
          <Suspense fallback={<FallbackLoader />}>
            <ProjectDemoCenter />
          </Suspense>

          <SectionDivider label="SECTION // 03" sub="PUBLIC GITHUB REGISTRY" />

          {/* 04. GitHub Public Activity */}
          <GitHubActivitySection />

          <SectionDivider label="SECTION // 04" sub="ACADEMIC & BACKGROUND" />

          {/* 05. About Me Section */}
          <AboutSection />

          <SectionDivider label="SECTION // 05" sub="TECHNICAL TOOLKIT" />

          {/* 06. Technical Skills Section */}
          <SkillsSection />

          {/* 06b. Technical Knowledge Graph (Prompt 45) */}
          <Suspense fallback={<FallbackLoader />}>
            <TechnicalKnowledgeGraph />
          </Suspense>

          <SectionDivider label="SECTION // 06" sub="EXPERIENCE TIMELINE" />

          {/* 07. Experience & Education Section */}
          <ExperienceTimeline />

          {/* 07b. Interactive Journey Timeline (Prompt 43) */}
          <Suspense fallback={<FallbackLoader />}>
            <InteractiveJourneyTimeline />
          </Suspense>

          <SectionDivider label="SECTION // 07" sub="DISCIPLINED PROCESS" />

          {/* 08. Engineering Process Section */}
          <EngineeringProcess />

          <SectionDivider label="SECTION // 08" sub="INTERACTIVE ARCHITECTURE TOPOLOGY" />

          {/* 08b. Interactive Architecture Visualizer (Prompt 42) */}
          <Suspense fallback={<FallbackLoader />}>
            <InteractiveArchitectureVisualizer />
          </Suspense>

          <SectionDivider label="SECTION // 09" sub="INTERACTIVE ARCHITECTURE LAB" />

          {/* 09. Interactive Laboratory: Inside the Systems */}
          <Suspense fallback={<FallbackLoader />}>
            <InsideTheSystemsLab />
          </Suspense>

          <SectionDivider label="SECTION // 09" sub="CYBERSECURITY PLAYGROUND" />

          {/* 10. Interactive Cybersecurity Playground */}
          <Suspense fallback={<FallbackLoader />}>
            <CybersecurityPlayground />
          </Suspense>

          <SectionDivider label="SECTION // 10" sub="API ARCHITECTURE LAB" />

          {/* 11. REST API Lifecycle Laboratory */}
          <Suspense fallback={<FallbackLoader />}>
            <ApiEngineeringLab />
          </Suspense>

          <SectionDivider label="SECTION // 11" sub="INTERACTIVE CLI SHELL" />

          {/* 12. Interactive Terminal V2 */}
          <Suspense fallback={<FallbackLoader />}>
            <InteractiveTerminalV2 />
          </Suspense>

          <SectionDivider label="SECTION // 12" sub="TECHNICAL KNOWLEDGE BASE" />

          {/* 13. Technical Writing & Blog */}
          <Suspense fallback={<FallbackLoader />}>
            <TechnicalBlogSection />
          </Suspense>

          <SectionDivider label="SECTION // 13" sub="ENGINEERING DOCUMENTATION" />

          {/* 14. Engineering Documentation Center */}
          <Suspense fallback={<FallbackLoader />}>
            <EngineeringDocCenter />
          </Suspense>

          <SectionDivider label="SECTION // 14" sub="AI & LLM SECURITY" />

          {/* 15. AI Systems & LLM Security Section */}
          <AIEngineeringSection />

          <SectionDivider label="SECTION // 15" sub="CAREER & RESUME CENTER" />

          {/* 16. Professional Career Resume Center */}
          <Suspense fallback={<FallbackLoader />}>
            <CareerResumeCenter />
          </Suspense>

          <SectionDivider label="SECTION // 16" sub="COMMUNICATION INQUIRY BUS" />

          {/* 17. Contact Section */}
          <ContactSection />
        </PageTransition>
      </main>

      {/* Case Study Deep Dive Modal */}
      <Suspense fallback={null}>
        <ProjectDetailModal
          project={selectedDetailProject}
          onClose={() => setSelectedDetailProject(null)}
        />
      </Suspense>

      {/* Global Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectProject={(id) => {
          const p = projectsData.find((x) => x.id === id);
          if (p) setSelectedDetailProject(p);
        }}
      />

      {/* Floating SAN AI Holographic Copilot */}
      <div className="fixed bottom-6 right-6 z-40">
        <AICore size={72} />
      </div>
      <AIConversationPanel />

      {/* Site Footer */}
      <Footer />
    </div>
  );
};

export default App;

