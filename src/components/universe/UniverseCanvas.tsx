import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { IslandTerrain } from './IslandTerrain';
import { PrologueScene } from './PrologueScene';
import { OriginCoastScene } from './OriginCoastScene';
import { SkillForestScene } from './SkillForestScene';
import { ProjectCityScene } from './ProjectCityScene';
import { ExperienceMountainScene } from './ExperienceMountainScene';
import { ContactBeaconScene } from './ContactBeaconScene';
import { AvatarController } from './AvatarController';
import { FreeRoamController } from './FreeRoamController';
import { GuidedTourController, TOUR_WAYPOINTS } from './GuidedTourController';
import { WORLD_ATMOSPHERE, ZoneCoordinate } from './WorldCoordinates';

export type ExplorationMode = 'orbit' | 'free-roam' | 'guided-tour';

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
  mode?: ExplorationMode;
  joystickInput?: { x: number; y: number };
  tourIndex?: number;
  isTourPlaying?: boolean;
  onTourWaypointChange?: (index: number) => void;
  onTourComplete?: () => void;
  onProximityPOI?: (poiId: string | null) => void;
  onInspectPOI?: (poiId: string) => void;
  onSelectOriginPOI?: (poiId: 'workspace' | 'education') => void;
  onSelectSkillCategory?: (categoryId: string) => void;
  onSelectProject?: (projectId: string) => void;
  onSelectExperiencePOI?: (tab: 'roles' | 'certifications') => void;
  onSelectContactPOI?: (tab: 'transmit' | 'resume') => void;
}

export const UniverseCanvas: React.FC<UniverseCanvasProps> = ({
  activeZone,
  mode = 'orbit',
  joystickInput = { x: 0, y: 0 },
  tourIndex = 0,
  isTourPlaying = true,
  onTourWaypointChange,
  onTourComplete,
  onProximityPOI,
  onInspectPOI,
  onSelectOriginPOI,
  onSelectSkillCategory,
  onSelectProject,
  onSelectExperiencePOI,
  onSelectContactPOI
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

        {/* Camera Control: Orbit Mode vs Guided Tour (Free Roam uses internal camera) */}
        {mode === 'orbit' && (
          <>
            <CameraRig targetZone={activeZone} />
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              maxPolarAngle={Math.PI / 2 - 0.05} // Never look below ocean horizon
              minDistance={10}
              maxDistance={220}
              dampingFactor={0.08}
            />
          </>
        )}

        {mode === 'guided-tour' && (
          <GuidedTourController
            currentIndex={tourIndex}
            isPlaying={isTourPlaying}
            onWaypointChange={onTourWaypointChange || (() => {})}
            onTourComplete={onTourComplete || (() => {})}
          />
        )}

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

            {/* Zone 04: Experience Mountain Ascent & Summit Observatory */}
            <ExperienceMountainScene onSelectPOI={onSelectExperiencePOI} />

            {/* Zone 05: Contact Beacon Oceanic Lighthouse & Launch Deck */}
            <ContactBeaconScene onSelectPOI={onSelectContactPOI} />

            {/* Santhosh Developer Avatar 3D Presence */}
            {mode === 'free-roam' ? (
              <FreeRoamController
                initialPosition={[activeZone.center[0], activeZone.center[1], activeZone.center[2]]}
                joystickInput={joystickInput}
                onProximityPOI={onProximityPOI}
                onInspectPOI={onInspectPOI}
              />
            ) : (
              <AvatarController
                position={[
                  mode === 'guided-tour' && TOUR_WAYPOINTS[tourIndex]
                    ? TOUR_WAYPOINTS[tourIndex].target[0]
                    : activeZone.center[0],
                  mode === 'guided-tour' && TOUR_WAYPOINTS[tourIndex]
                    ? TOUR_WAYPOINTS[tourIndex].target[1]
                    : activeZone.center[1],
                  mode === 'guided-tour' && TOUR_WAYPOINTS[tourIndex]
                    ? TOUR_WAYPOINTS[tourIndex].target[2]
                    : activeZone.center[2]
                ]}
                initialState={mode === 'guided-tour' ? 'thinking' : 'idle'}
              />
            )}
          </>
        )}
      </Canvas>
    </div>
  );
};

