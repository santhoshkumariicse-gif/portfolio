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
      <color attach="background" args={['#090B0E']} />
      <fog attach="fog" args={['#090B0E', 40, 480]} />

      {/* Atmospheric Lighting: Carbon Black Night with High-Performance Headlights */}
      <ambientLight intensity={0.45} color="#171B20" />
      <directionalLight
        position={[35, 60, 20]}
        intensity={0.85}
        color="#F2F4F7"
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
    <div className="relative w-full h-screen bg-[#090B0E] overflow-hidden select-none">
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

      {/* 2. Cinematic Vignette Overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(9,11,14,0.88)_100%)]" />

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
