import React, { useState, lazy, Suspense } from 'react';

// 3D Experience Modules: Universe Homepage & Highway Portfolio
const UniverseHomepage = lazy(() =>
  import('./components/universe/UniverseHomepage').then((m) => ({ default: m.UniverseHomepage }))
);
const HighwayStage = lazy(() =>
  import('./components/highway/HighwayStage').then((m) => ({ default: m.HighwayStage }))
);

const FallbackLoader: React.FC = () => (
  <div className="fixed inset-0 bg-[#030806] flex items-center justify-center font-mono text-xs text-[#91A99A]">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 rounded-full border-2 border-[#00E676] border-t-transparent animate-spin shadow-[0_0_15px_rgba(0,230,118,0.5)]" />
      <span className="text-[#39FF88] tracking-widest uppercase font-bold text-[11px]">
        INITIALIZING SAN AI SYSTEM // JARVIS_CORE
      </span>
    </div>
  </div>
);

export const App: React.FC = () => {
  const [portfolioMode, setPortfolioMode] = useState<'universe' | 'highway'>('universe');

  if (portfolioMode === 'universe') {
    return (
      <Suspense fallback={<FallbackLoader />}>
        <UniverseHomepage onViewJourney={() => setPortfolioMode('highway')} />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<FallbackLoader />}>
      <HighwayStage onReturnToUniverse={() => setPortfolioMode('universe')} />
    </Suspense>
  );
};

export default App;
