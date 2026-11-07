import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { HighwayStateProvider } from './HighwayStateContext';
import { HighwayRoadMesh } from './HighwayRoadMesh';
import { HighwayCameraController } from './HighwayCameraController';
import { HighwayBillboardsMesh } from './HighwayBillboardMesh';
import { HighwayHUD } from './HighwayHUD';

export interface HighwayStageProps {
  onReturnToUniverse?: () => void;
}

const HighwayCanvasInner: React.FC = () => {
  return (
    <>
      {/* Subtle Neutral Ice Grey Proving Ground Environment */}
      <color attach="background" args={['#C9D0D8']} />
      <fog attach="fog" args={['#C9D0D8', 80, 520]} />

      {/* Atmospheric High-Performance Automotive Proving Ground Lighting */}
      <ambientLight intensity={1.2} color="#E8EDF2" />
      <directionalLight
        position={[35, 70, 20]}
        intensity={1.5}
        color="#FFFFFF"
      />
      <directionalLight
        position={[-35, 40, -30]}
        intensity={0.6}
        color="#DCE2E8"
      />

      {/* 3D Road Geometry along CatmullRomCurve3 */}
      <HighwayRoadMesh />

      {/* 7 Milestone 3D Billboards & Spatial Anchors */}
      <HighwayBillboardsMesh onSelectMilestone={() => {}} />

      {/* Cinematic Camera Rig Following Spline Towards Active Section */}
      <HighwayCameraController />
    </>
  );
};

const HighwayStageContent: React.FC<HighwayStageProps> = ({ onReturnToUniverse }) => {
  return (
    <div className="relative w-full h-screen bg-[#DCE2E8] overflow-hidden select-none">
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
                <meshBasicMaterial color="#E10620" wireframe />
              </mesh>
            }
          >
            <HighwayCanvasInner />
          </Suspense>
        </Canvas>
      </div>

      {/* 2. Light Proving Ground Vignette Overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(201,208,216,0.6)_100%)]" />

      {/* 3. Sequential Presentation HUD */}
      <HighwayHUD onReturnToUniverse={onReturnToUniverse} />
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
