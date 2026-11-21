import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import * as THREE from 'three';
import { PORTFOLIO_SECTIONS, PortfolioSection, getSectionByIndex } from './HighwaySections';
import { SoundFX } from '../../utils/SoundFX';

export interface HighwayStateContextType {
  currentSectionIndex: number;
  currentSection: PortfolioSection;
  totalSections: number;
  isTransitioning: boolean;
  progress: number;
  currentKM: number;
  isMuted: boolean;
  isJourneyPaused: boolean;
  goToNextSection: () => void;
  goToPrevSection: () => void;
  goToSection: (index: number) => void;
  toggleMute: () => void;
  toggleJourneyPause: () => void;
  stepFrame: (delta: number) => void;
}

const HighwayStateContext = createContext<HighwayStateContextType | null>(null);

export const HighwayStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize at Section 01: About Me (KM 1.0)
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(PORTFOLIO_SECTIONS[0].progress);
  const [currentKM, setCurrentKM] = useState(PORTFOLIO_SECTIONS[0].km);
  const [isMuted, setIsMuted] = useState(true);
  const [isJourneyPaused, setIsJourneyPaused] = useState(false);

  // High-performance animation refs (bypasses React render loop lag)
  const currentProgressRef = useRef(PORTFOLIO_SECTIONS[0].progress);
  const targetProgressRef = useRef(PORTFOLIO_SECTIONS[0].progress);
  const isTransitioningRef = useRef(false);
  const isJourneyPausedRef = useRef(false);
  const sectionIndexRef = useRef(0);

  const totalSections = PORTFOLIO_SECTIONS.length;
  const currentSection = getSectionByIndex(currentSectionIndex);

  const goToSection = useCallback((index: number) => {
    if (isTransitioningRef.current) return; // Prevent duplicate clicks and overlapping animations

    const clamped = Math.max(0, Math.min(index, totalSections - 1));
    if (clamped === sectionIndexRef.current) return;

    sectionIndexRef.current = clamped;
    setCurrentSectionIndex(clamped);

    const target = PORTFOLIO_SECTIONS[clamped].progress;
    targetProgressRef.current = target;
    isTransitioningRef.current = true;
    setIsTransitioning(true);

    SoundFX.playChapterWhoosh();
  }, [totalSections]);

  const goToNextSection = useCallback(() => {
    if (isTransitioningRef.current) return;
    if (sectionIndexRef.current < totalSections - 1) {
      goToSection(sectionIndexRef.current + 1);
    }
  }, [goToSection, totalSections]);

  const goToPrevSection = useCallback(() => {
    if (isTransitioningRef.current) return;
    if (sectionIndexRef.current > 0) {
      goToSection(sectionIndexRef.current - 1);
    }
  }, [goToSection]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      SoundFX.setMuted(next);
      return next;
    });
  }, []);

  const toggleJourneyPause = useCallback(() => {
    setIsJourneyPaused((paused) => {
      const next = !paused;
      isJourneyPausedRef.current = next;
      return next;
    });
  }, []);

  // Frame stepping loop driven by R3F useFrame at 60 FPS
  const stepFrame = useCallback((delta: number) => {
    if (isJourneyPausedRef.current) return;
    const dt = Math.min(delta, 0.1);
    const current = currentProgressRef.current;
    const target = targetProgressRef.current;
    const diff = target - current;

    if (Math.abs(diff) > 0.0005) {
      // Smooth exponential damping along the highway curve (damp factor ~4.2 for elegant cinematic travel)
      const nextProgress = THREE.MathUtils.damp(current, target, 4.2, dt);
      currentProgressRef.current = nextProgress;
      setProgress(nextProgress);
      setCurrentKM(nextProgress * 7.0);
    } else {
      // Settled at exact destination
      if (isTransitioningRef.current) {
        currentProgressRef.current = target;
        setProgress(target);
        setCurrentKM(target * 7.0);
        isTransitioningRef.current = false;
        setIsTransitioning(false);
        SoundFX.playMilestoneChime();
      }
    }
  }, []);

  return (
    <HighwayStateContext.Provider
      value={{
        currentSectionIndex,
        currentSection,
        totalSections,
        isTransitioning,
        progress,
        currentKM,
        isMuted,
        isJourneyPaused,
        goToNextSection,
        goToPrevSection,
        goToSection,
        toggleMute,
        toggleJourneyPause,
        stepFrame
      }}
    >
      {children}
    </HighwayStateContext.Provider>
  );
};

export const useHighwayState = (): HighwayStateContextType => {
  const context = useContext(HighwayStateContext);
  if (!context) {
    throw new Error('useHighwayState must be used within a HighwayStateProvider');
  }
  return context;
};
