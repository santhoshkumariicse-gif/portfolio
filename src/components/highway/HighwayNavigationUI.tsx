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
      <div className="flex items-center gap-2 sm:gap-4 px-3.5 py-2.5 sm:px-5 sm:py-3 rounded-2xl bg-[#171B20]/95 border border-[rgba(201,208,216,0.12)] backdrop-blur-xl shadow-[0_16px_40px_rgba(0,0,0,0.9)] font-mono">
        {/* 1. PREVIOUS SECTION BUTTON */}
        {!isFirstSection ? (
          <button
            type="button"
            onClick={goToPrevSection}
            disabled={isTransitioning}
            className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border text-xs font-bold uppercase transition-all flex items-center gap-1.5 ${
              isTransitioning
                ? 'opacity-40 cursor-not-allowed bg-black/30 border-white/10 text-slate-400'
                : 'bg-[#090B0E]/80 border-[rgba(201,208,216,0.12)] text-[#C9D0D8] hover:border-[#E10620] hover:bg-[#E10620]/10 hover:text-[#FF3548] active:scale-95'
            }`}
            title="Navigate to Previous Section (Hotkey: Left Arrow)"
            aria-label="Previous Section"
          >
            <ArrowLeft className="w-4 h-4 text-[#FF3548]" />
            <span className="hidden sm:inline">PREVIOUS</span>
            <span className="sm:hidden">PREV</span>
          </button>
        ) : (
          <div className="w-1 sm:w-2" />
        )}

        {/* 2. SECTION INDICATOR & 7 INTERACTIVE PIPS */}
        <div className="flex flex-col items-center px-2 sm:px-4">
          <div className="flex items-baseline gap-1 text-[10px] text-[#87919D] uppercase tracking-wider font-bold">
            <span>SECTION</span>
            <span className="text-sm sm:text-base font-black text-[#FF3548] tracking-wider">
              {formattedCurrent}
            </span>
            <span className="text-xs text-[#87919D]/60">/ {formattedTotal}</span>
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
                      ? 'w-5 sm:w-6 bg-[#E10620] shadow-[0_0_8px_#E10620]'
                      : isPassed
                      ? 'w-2 bg-[#E10620]/50 hover:bg-[#E10620]'
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
            className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(225,6,32,0.35)] border border-[#FF3548] ${
              isTransitioning
                ? 'opacity-50 cursor-not-allowed bg-[#E10620]/30 text-white'
                : 'bg-[#E10620] hover:bg-[#FF3548] text-[#F2F4F7] active:scale-95'
            }`}
            title="Navigate to Next Section (Hotkey: Right Arrow)"
            aria-label="Next Section"
          >
            <span>NEXT SECTION</span>
            <ArrowRight className="w-4 h-4 text-[#F2F4F7]" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onReturnToUniverse}
            className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase transition-all flex items-center gap-2 bg-[#E10620] hover:bg-[#FF3548] text-[#F2F4F7] shadow-[0_0_24px_rgba(225,6,32,0.45)] active:scale-95 border border-[#FF3548]"
            title="Finish Journey & Return to Universe Homepage"
            aria-label="Finish and Return to Home"
          >
            <Check className="w-4 h-4 text-[#F2F4F7]" />
            <span>FINISH / HOME</span>
            <Home className="w-3.5 h-3.5 text-[#F2F4F7]" />
          </button>
        )}
      </div>
    </nav>
  );
};
