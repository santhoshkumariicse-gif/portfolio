import React, { Suspense, useEffect, useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { HighwayStateProvider } from './HighwayStateContext';
import { HighwayRoadMesh } from './HighwayRoadMesh';
import { HighwayCameraController } from './HighwayCameraController';
import { HighwayBillboardsMesh } from './HighwayBillboardMesh';
import { HighwayHUD } from './HighwayHUD';
import { HighwayEnvironmentAssets } from './HighwayEnvironmentAssets';
import { HIGHWAY_SPLINE } from './HighwaySpline';

const AtmosphericCloudBands: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.position.x += delta * 0.32;
    if (groupRef.current.position.x > 24) groupRef.current.position.x = -24;
    groupRef.current.position.y = 55 + Math.sin(state.clock.elapsedTime * 0.08) * 1.2;
  });

  return (
    <group ref={groupRef} position={[-18, 55, -220]}>
      {[-30, 0, 30].map((x) => (
        <mesh key={x} position={[x, 0, 0]} scale={[18, 3.2, 3.2]}>
          <sphereGeometry args={[1, 10, 8]} />
          <meshBasicMaterial color="#F2F4F7" transparent opacity={0.12} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
};

const RoadDustMotes: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 60;

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const t = Math.random();
      const pt = HIGHWAY_SPLINE.getPointAt(t);
      pos[i * 3] = pt.x + (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = pt.y + 0.6 + Math.random() * 4.0;
      pos[i * 3 + 2] = pt.z + (Math.random() - 0.5) * 18;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const geom = pointsRef.current.geometry;
    const posAttr = geom.attributes.position;
    const arr = posAttr.array as Float32Array;
    for (let i = 0; i < particleCount; i++) {
      arr[i * 3 + 1] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.003;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.28}
        color="#F1F5F7"
        transparent
        opacity={0.32}
        depthWrite={false}
      />
    </points>
  );
};

export interface HighwayStageProps {
  onReturnToUniverse?: () => void;
}

const HighwayCanvasInner: React.FC = () => {
  return (
    <>
      {/* Subtle Neutral Ice Grey Proving Ground Environment */}
      <color attach="background" args={['#C9D0D8']} />
      <fog attach="fog" args={['#C9D0D8', 80, 520]} />
      <AtmosphericCloudBands />

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

      {/* Innovative 3D Environment Assets: Trees, Shrubs, Rocks, Streetlights, Guardrails, Tunnels, Holograms, Pavilion */}
      <HighwayEnvironmentAssets />

      {/* Atmospheric Roadside Dust Motes */}
      <RoadDustMotes />

      {/* 7 Milestone 3D Billboards & Spatial Anchors */}
      <HighwayBillboardsMesh onSelectMilestone={() => {}} />

      {/* Cinematic Camera Rig Following Spline Towards Active Section */}
      <HighwayCameraController />
    </>
  );
};

const HighwayStageContent: React.FC<HighwayStageProps> = ({ onReturnToUniverse }) => {
  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = document.querySelector<HTMLCanvasElement>('.highway-canvas canvas');
      if (!canvas) return;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.display = 'block';
      canvas.setAttribute('aria-label', 'Interactive 3D highway journey');
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    const observer = new MutationObserver(resizeCanvas);
    const stage = document.querySelector('.highway-canvas');
    if (stage) observer.observe(stage, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#DCE2E8] overflow-hidden select-none">
      {/* 1. Main 3D WebGL Canvas */}
      <div className="highway-canvas absolute inset-0 z-0">
        <Canvas
          camera={{ fov: 55, near: 0.1, far: 900, position: [0, 4, 16] }}
          dpr={[1, 1.5]}
          style={{ width: '100%', height: '100%', display: 'block' }}
          resize={{ scroll: false, debounce: { scroll: 50, resize: 50 } }}
          onCreated={({ gl, scene, camera }) => {
            if (typeof window !== 'undefined') {
              (window as any).__THREE_RENDERER__ = gl;
              (window as any).__THREE_SCENE__ = scene;
              (window as any).__THREE_CAMERA__ = camera;
            }
            gl.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.25 : 1.5));
            gl.setSize(window.innerWidth, window.innerHeight, true);
            gl.domElement.style.width = '100%';
            gl.domElement.style.height = '100%';
            gl.domElement.setAttribute('aria-label', 'Interactive 3D highway journey');
          }}
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
