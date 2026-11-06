import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { IslandTerrain } from './IslandTerrain';
import { PrologueScene } from './PrologueScene';
import { OriginCoastScene } from './OriginCoastScene';
import { SkillForestScene } from './SkillForestScene';
import { ProjectCityScene } from './ProjectCityScene';
import { AvatarController } from './AvatarController';
import { WORLD_ATMOSPHERE, ZoneCoordinate } from './WorldCoordinates';

interface CameraRigProps {
  targetZone: ZoneCoordinate;
}

const CameraRig: React.FC<CameraRigProps> = ({ targetZone }) => {
  const targetVector = useRef(new THREE.Vector3(...targetZone.center));

  useFrame(({ camera }) => {
    // Desired camera position: offset from zone center
    const desiredPos = new THREE.Vector3(
      targetZone.center[0] + 25,
      targetZone.center[1] + 22,
      targetZone.center[2] + 45
    );

    camera.position.lerp(desiredPos, 0.04);
    targetVector.current.lerp(new THREE.Vector3(...targetZone.center), 0.04);
    camera.lookAt(targetVector.current);
  });

  return null;
};

export interface UniverseCanvasProps {
  activeZone: ZoneCoordinate;
  onSelectOriginPOI?: (poiId: 'workspace' | 'education') => void;
  onSelectSkillCategory?: (categoryId: string) => void;
  onSelectProject?: (projectId: string) => void;
}

export const UniverseCanvas: React.FC<UniverseCanvasProps> = ({
  activeZone,
  onSelectOriginPOI,
  onSelectSkillCategory,
  onSelectProject
}) => {
  return (
    <div className="relative w-full h-full bg-[#0A0B09]">
      <Canvas
        camera={{ position: [25, 30, 115], fov: 50, near: 0.5, far: 500 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        shadows={false}
      >
        {/* Atmospheric Fog */}
        <color attach="background" args={[WORLD_ATMOSPHERE.fogColor]} />
        <fog
          attach="fog"
          args={[WORLD_ATMOSPHERE.fogColor, WORLD_ATMOSPHERE.fogNear, WORLD_ATMOSPHERE.fogFar]}
        />

        {/* Global Lights */}
        <ambientLight
          color={WORLD_ATMOSPHERE.ambientColor}
          intensity={WORLD_ATMOSPHERE.ambientIntensity}
        />
        <directionalLight
          position={WORLD_ATMOSPHERE.sunPosition}
          color={WORLD_ATMOSPHERE.sunColor}
          intensity={WORLD_ATMOSPHERE.sunIntensity}
        />
        <hemisphereLight
          args={['#1F2B20', '#0B100C', 0.5]}
        />

        {/* Distant Cosmic Starfield */}
        <Stars
          radius={200}
          depth={60}
          count={1500}
          factor={4}
          saturation={0}
          fade
          speed={0.8}
        />

        {/* Camera Lerp Controller */}
        <CameraRig targetZone={activeZone} />

        {/* Navigable Orbit Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          maxPolarAngle={Math.PI / 2 - 0.05} // Never look below ocean horizon
          minDistance={10}
          maxDistance={220}
          dampingFactor={0.08}
        />

        {/* Scene Staging: Orbital Space Prologue vs Island Terrain */}
        {activeZone.id === 'prologue' ? (
          <PrologueScene />
        ) : (
          <>
            {/* Procedural Connected Island */}
            <IslandTerrain />

            {/* Zone 01: Origin Coast High-Fidelity Environment */}
            <OriginCoastScene onSelectPOI={onSelectOriginPOI} />

            {/* Zone 02: Skill Forest Bioluminescent Tech Sanctuary */}
            <SkillForestScene onSelectCategory={onSelectSkillCategory} />

            {/* Zone 03: Project City Cyber Metropolis */}
            <ProjectCityScene onSelectProject={onSelectProject} />

            {/* Santhosh Developer Avatar 3D Presence */}
            <AvatarController
              position={[activeZone.center[0], activeZone.center[1], activeZone.center[2]]}
              initialState="idle"
            />
          </>
        )}
      </Canvas>
    </div>
  );
};

