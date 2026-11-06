import React, { Suspense, useState, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { HighwayStateProvider, useHighwayState } from './HighwayStateContext';
import { HighwayRoadMesh } from './HighwayRoadMesh';
import { HighwayCameraController } from './HighwayCameraController';
import { HighwayBillboardsMesh } from './HighwayBillboardMesh';
import { HighwayModalDrawer } from './HighwayModalDrawer';
import { HighwayMilestoneData, getDetailedMilestoneByKM } from './HighwayMilestones';
import { useHighwayInput } from './HighwayInputController';
import { HighwayHUD } from './HighwayHUD';
import { AICore, AIConversationPanel, useSanAI } from '../../ai';

export interface HighwayStageProps {
  onExitHighway: () => void;
  onReturnToUniverse?: () => void;
}

interface HighwayCanvasInnerProps {
  onSelectMilestone: (data: HighwayMilestoneData) => void;
}

const HighwayCanvasInner: React.FC<HighwayCanvasInnerProps> = ({ onSelectMilestone }) => {
  const { inputState } = useHighwayInput();

  return (
    <>
      <color attach="background" args={['#050706']} />
      <fog attach="fog" args={['#050706', 40, 480]} />

      {/* Atmospheric Lighting: Deep Night with Overhead Lanterns */}
      <ambientLight intensity={0.45} color="#0B120F" />
      <directionalLight
        position={[35, 60, 20]}
        intensity={0.85}
        color="#D0E8DD"
      />

      {/* 3D Road Geometry along CatmullRomCurve3 */}
      <HighwayRoadMesh />

      {/* 8 Milestone 3D Billboards & Spatial Anchors */}
      <HighwayBillboardsMesh onSelectMilestone={onSelectMilestone} />

      {/* Camera Rig Following Authoritative Navigation State */}
      <HighwayCameraController inputState={inputState} />
    </>
  );
};

const HighwayStageContent: React.FC<HighwayStageProps> = ({ onExitHighway, onReturnToUniverse }) => {
  const { toggleExpand } = useSanAI();
  const { currentKM } = useHighwayState();
  const [selectedMilestone, setSelectedMilestone] = useState<HighwayMilestoneData | null>(null);

  // Keyboard shortcut [ENTER] to open active milestone details
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'Enter') {
        const currentData = getDetailedMilestoneByKM(currentKM);
        setSelectedMilestone(currentData);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentKM]);

  const handleInspectMilestone = useCallback((km: number) => {
    const data = getDetailedMilestoneByKM(km);
    setSelectedMilestone(data);
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#050706] overflow-hidden select-none">
      {/* 1. Main 3D WebGL Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ fov: 55, near: 0.1, far: 900, position: [0, 4, 16] }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        >
          <Suspense
            fallback={
              <mesh position={[0, 2, 0]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial color="#FF1E40" wireframe />
              </mesh>
            }
          >
            <HighwayCanvasInner onSelectMilestone={setSelectedMilestone} />
          </Suspense>
        </Canvas>
      </div>

      {/* 2. Cinematic Vignette & Cyber Grid Overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(5,7,6,0.85)_100%)]" />

      {/* 3. Responsive JARVIS-inspired HUD */}
      <HighwayHUD
        onExitHighway={onExitHighway}
        onReturnToUniverse={onReturnToUniverse}
        onOpenSANAI={toggleExpand}
        onInspectMilestone={handleInspectMilestone}
      />

      {/* 4. Floating SAN AI Holographic Core in Top Right */}
      <div className="fixed top-24 right-4 sm:right-6 z-20 pointer-events-auto">
        <AICore size={76} />
      </div>

      {/* 5. SAN AI Interactive Conversation Terminal */}
      <AIConversationPanel />

      {/* 6. Deep Dive Milestone Drawer */}
      <HighwayModalDrawer
        milestone={selectedMilestone}
        onClose={() => setSelectedMilestone(null)}
        onOpenClassicView={onExitHighway}
      />
    </div>
  );
};

export const HighwayStage: React.FC<HighwayStageProps> = (props) => {
  return (
    <HighwayStateProvider>
      <HighwayStageContent {...props} />
    </HighwayStateProvider>
  );
};
