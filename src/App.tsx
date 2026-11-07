import React, { useState, lazy, Suspense } from 'react';

// 3D Experience Modules: Universe Homepage & Highway Portfolio
const UniverseHomepage = lazy(() =>
  import('./components/universe/UniverseHomepage').then((m) => ({ default: m.UniverseHomepage }))
);
const HighwayStage = lazy(() =>
  import('./components/highway/HighwayStage').then((m) => ({ default: m.HighwayStage }))
);

const FallbackLoader: React.FC = () => (
  <div className="fixed inset-0 bg-[#DCE2E8] flex items-center justify-center font-mono text-xs text-[#626C78]">
    <div className="flex flex-col items-center gap-3.5">
      <div className="w-8 h-8 rounded-full border-2 border-[#E10620] border-t-transparent animate-spin shadow-[0_0_15px_rgba(225,6,32,0.3)]" />
      <span className="text-[#090B0E] tracking-widest uppercase font-bold text-[11px]">
        INITIALIZING AUTOMOTIVE TELEMETRY SYSTEM
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
