import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { HighwayStateProvider } from './HighwayStateContext';
import { HighwayRoadMesh } from './HighwayRoadMesh';
import { HighwayCameraController } from './HighwayCameraController';
import { useHighwayInput } from './HighwayInputController';
import { HighwayHUD } from './HighwayHUD';
import { AICore, AIConversationPanel, useSanAI } from '../../ai';

export interface HighwayStageProps {
  onExitHighway: () => void;
}

const HighwayCanvasInner: React.FC = () => {
  const { inputState } = useHighwayInput();

  return (
    <>
      <color attach="background" args={['#070807']} />
      <fog attach="fog" args={['#070807', 30, 420]} />

      {/* Atmospheric Lighting: Deep Night with Overhead Lanterns */}
      <ambientLight intensity={0.55} color="#18201C" />
      <directionalLight
        position={[25, 45, 15]}
        intensity={0.8}
        color="#E2F0D9"
      />

      {/* 3D Road Geometry along CatmullRomCurve3 */}
      <HighwayRoadMesh />

      {/* Camera Rig Following Authoritative Navigation State */}
      <HighwayCameraController inputState={inputState} />
    </>
  );
};

const HighwayStageContent: React.FC<HighwayStageProps> = ({ onExitHighway }) => {
  const { toggleExpand } = useSanAI();

  return (
    <div className="relative w-full h-screen bg-[#070807] overflow-hidden select-none">
      {/* 1. Main 3D WebGL Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ fov: 55, near: 0.1, far: 800, position: [0, 4, 16] }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        >
          <Suspense
            fallback={
              <mesh position={[0, 2, 0]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial color="#00E5FF" wireframe />
              </mesh>
            }
          >
            <HighwayCanvasInner />
          </Suspense>
        </Canvas>
      </div>

      {/* 2. Cinematic Vignette & Cyber Grid Overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(5,7,6,0.85)_100%)]" />

      {/* 3. Responsive JARVIS-inspired HUD */}
      <HighwayHUD
        onExitHighway={onExitHighway}
        onOpenSANAI={toggleExpand}
      />

      {/* 4. Floating SAN AI Holographic Core in Top Right */}
      <div className="fixed top-24 right-4 sm:right-6 z-20 pointer-events-auto">
        <AICore size={76} />
      </div>

      {/* 5. SAN AI Interactive Conversation Terminal */}
      <AIConversationPanel />
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
