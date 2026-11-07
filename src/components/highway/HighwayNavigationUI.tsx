import React, { useEffect } from 'react';
import { useHighwayState } from './HighwayStateContext';
import { ArrowLeft, ArrowRight, Home, Check } from 'lucide-react';

export interface HighwayNavigationUIProps {
  onReturnToUniverse?: () => void;
}

export const HighwayNavigationUI: React.FC<HighwayNavigationUIProps> = ({ onReturnToUniverse }) => {
  const {
    currentSectionIndex,
    totalSections,
    isTransitioning,
    goToNextSection,
    goToPrevSection,
    goToSection
  } = useHighwayState();

  const isFirstSection = currentSectionIndex === 0;
  const isFinalSection = currentSectionIndex === totalSections - 1;
  const formattedCurrent = String(currentSectionIndex + 1).padStart(2, '0');
  const formattedTotal = String(totalSections).padStart(2, '0');

  // Keyboard navigation: ArrowRight / ArrowLeft
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowRight' || e.key === 'KeyD') {
        if (!isTransitioning) {
          if (!isFinalSection) {
            goToNextSection();
          } else if (onReturnToUniverse) {
            onReturnToUniverse();
          }
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'KeyA') {
        if (!isTransitioning && !isFirstSection) {
          goToPrevSection();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTransitioning, isFirstSection, isFinalSection, goToNextSection, goToPrevSection, onReturnToUniverse]);

  return (
    <nav
      aria-label="Sequential Presentation Navigation"
      className="pointer-events-auto flex items-center justify-center w-full select-none"
    >
      <div className="flex items-center gap-2 sm:gap-4 px-3.5 py-2.5 sm:px-5 sm:py-3 rounded-2xl bg-[#07120D]/95 border border-[#00E676]/25 backdrop-blur-xl shadow-[0_16px_40px_rgba(0,0,0,0.85)] font-mono">
        {/* 1. PREVIOUS SECTION BUTTON */}
        {!isFirstSection ? (
          <button
            type="button"
            onClick={goToPrevSection}
            disabled={isTransitioning}
            className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border text-xs font-bold uppercase transition-all flex items-center gap-1.5 ${
              isTransitioning
                ? 'opacity-40 cursor-not-allowed bg-black/30 border-white/10 text-slate-400'
                : 'bg-black/40 border-white/15 text-white hover:border-[#00E676] hover:bg-[#00E676]/10 hover:text-[#39FF88] active:scale-95'
            }`}
            title="Navigate to Previous Section (Hotkey: Left Arrow)"
            aria-label="Previous Section"
          >
            <ArrowLeft className="w-4 h-4 text-[#00E676]" />
            <span className="hidden sm:inline">PREVIOUS</span>
            <span className="sm:hidden">PREV</span>
          </button>
        ) : (
          <div className="w-1 sm:w-2" />
        )}

        {/* 2. SECTION INDICATOR & 7 INTERACTIVE PIPS */}
        <div className="flex flex-col items-center px-2 sm:px-4">
          <div className="flex items-baseline gap-1 text-[10px] text-[#91A99A] uppercase tracking-wider font-bold">
            <span>SECTION</span>
            <span className="text-sm sm:text-base font-black text-[#00E676] tracking-wider">
              {formattedCurrent}
            </span>
            <span className="text-xs text-white/40">/ {formattedTotal}</span>
          </div>

          {/* 7 Section Quick Jump Pips */}
          <div className="flex items-center gap-1.5 mt-1.5">
            {Array.from({ length: totalSections }).map((_, idx) => {
              const isActive = idx === currentSectionIndex;
              const isPassed = idx < currentSectionIndex;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goToSection(idx)}
                  disabled={isTransitioning}
                  className={`h-1.5 rounded-full transition-all ${
                    isActive
                      ? 'w-5 sm:w-6 bg-[#00E676] shadow-[0_0_8px_#00E676]'
                      : isPassed
                      ? 'w-2 bg-[#00E676]/50 hover:bg-[#00E676]'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  title={`Jump to Section 0${idx + 1}`}
                  aria-label={`Jump to Section 0${idx + 1}`}
                />
              );
            })}
          </div>
        </div>

        {/* 3. NEXT SECTION OR FINISH / BACK TO HOME BUTTON */}
        {!isFinalSection ? (
          <button
            type="button"
            onClick={goToNextSection}
            disabled={isTransitioning}
            className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,230,118,0.35)] ${
              isTransitioning
                ? 'opacity-50 cursor-not-allowed bg-[#00E676]/30 text-[#030806]'
                : 'bg-[#00E676] hover:bg-[#39FF88] text-[#030806] active:scale-95'
            }`}
            title="Navigate to Next Section (Hotkey: Right Arrow)"
            aria-label="Next Section"
          >
            <span>NEXT SECTION</span>
            <ArrowRight className="w-4 h-4 text-[#030806]" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onReturnToUniverse}
            className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase transition-all flex items-center gap-2 bg-[#00E676] hover:bg-[#39FF88] text-[#030806] shadow-[0_0_24px_rgba(0,230,118,0.45)] active:scale-95"
            title="Finish Journey & Return to Universe Homepage"
            aria-label="Finish and Return to Home"
          >
            <Check className="w-4 h-4 text-[#030806]" />
            <span>FINISH / HOME</span>
            <Home className="w-3.5 h-3.5 text-[#030806]" />
          </button>
        )}
      </div>
    </nav>
  );
};
