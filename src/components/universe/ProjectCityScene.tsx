import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface ProjectCitySceneProps {
  onSelectProject?: (projectId: string) => void;
}

export const ProjectCityScene: React.FC<ProjectCitySceneProps> = ({ onSelectProject }) => {
  const radarRef = useRef<THREE.Mesh>(null);
  const vectorCoreRef = useRef<THREE.Mesh>(null);
  const logisticsBeaconRef = useRef<THREE.Mesh>(null);
  const skybridgeHaloRef = useRef<THREE.Mesh>(null);

  const [hoveredBuilding, setHoveredBuilding] = useState<string | null>(null);

  // Animations: Radar spinning, vector core floating/rotating, beacon pulse
  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    if (radarRef.current) {
      radarRef.current.rotation.y = elapsed * 1.8;
    }

    if (vectorCoreRef.current) {
      vectorCoreRef.current.rotation.y = elapsed * 0.9;
      vectorCoreRef.current.rotation.x = Math.sin(elapsed * 0.6) * 0.3;
      vectorCoreRef.current.position.y = 7.5 + Math.sin(elapsed * 1.4) * 0.35;
    }

    if (logisticsBeaconRef.current) {
      logisticsBeaconRef.current.rotation.y = -elapsed * 1.2;
    }

    if (skybridgeHaloRef.current) {
      skybridgeHaloRef.current.rotation.z = elapsed * 0.5;
    }
  });

  return (
    <group name="project-city-zone">
      {/* ======================================================== */}
      {/* 1. METROPOLIS FOUNDATION PLAZA (Obsidian Deck)           */}
      {/* ======================================================== */}
      <group position={[62, 7.8, -26]}>
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[46, 0.6, 42]} />
          <meshStandardMaterial color="#0E1210" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Outer Crimson Perimeter Boundary Ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.52, 0]}>
          <planeGeometry args={[44, 40]} />
          <meshBasicMaterial color="#FF3358" wireframe />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 2. TOWER 01: LORRYBOOK / RDA LOGISTICS HQ               */}
      {/* (Coordinates: [52, 8, -20])                              */}
      {/* ======================================================== */}
      <group
        position={[52, 8, -20]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectProject?.('rda-lorrybook');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
          setHoveredBuilding('rda-lorrybook');
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'auto';
          setHoveredBuilding(null);
        }}
      >
        {/* Tier 1 Tower Base */}
        <mesh position={[0, 5, 0]}>
          <boxGeometry args={[8, 10, 8]} />
          <meshStandardMaterial
            color={hoveredBuilding === 'rda-lorrybook' ? '#201518' : '#111412'}
            roughness={0.2}
            metalness={0.85}
          />
        </mesh>

        {/* Tier 2 Mid Section */}
        <mesh position={[0, 13, 0]}>
          <boxGeometry args={[6.5, 8, 6.5]} />
          <meshStandardMaterial color="#141815" roughness={0.2} metalness={0.85} />
        </mesh>

        {/* Tier 3 Crown */}
        <mesh position={[0, 19, 0]}>
          <boxGeometry args={[5, 5, 5]} />
          <meshStandardMaterial color="#161B17" roughness={0.2} metalness={0.85} />
        </mesh>

        {/* Crimson Edge Neon Conduits */}
        <mesh position={[0, 12, 4.05]}>
          <planeGeometry args={[0.3, 22]} />
          <meshBasicMaterial color="#FF3358" />
        </mesh>
        <mesh position={[0, 12, -4.05]}>
          <planeGeometry args={[0.3, 22]} />
          <meshBasicMaterial color="#FF3358" />
        </mesh>

        {/* Telemetry Antenna & Dynamic Beacon */}
        <mesh position={[0, 23.5, 0]}>
          <cylinderGeometry args={[0.1, 0.2, 5, 8]} />
          <meshStandardMaterial color="#353D37" metalness={0.9} />
        </mesh>
        <mesh
          ref={logisticsBeaconRef}
          position={[0, 26, 0]}
          rotation={[0, 0, Math.PI / 4]}
        >
          <octahedronGeometry args={[0.9, 0]} />
          <meshStandardMaterial
            color="#FF3358"
            emissive="#FF3358"
            emissiveIntensity={hoveredBuilding === 'rda-lorrybook' ? 3.0 : 1.8}
            flatShading
          />
        </mesh>

        {/* Hover Billboard Reticle */}
        <group position={[0, 28, 0]}>
          <mesh>
            <cylinderGeometry args={[1.5, 1.5, 0.08, 16]} />
            <meshBasicMaterial
              color="#FF3358"
              transparent
              opacity={hoveredBuilding === 'rda-lorrybook' ? 0.95 : 0.55}
              wireframe
            />
          </mesh>
        </group>
      </group>

      {/* ======================================================== */}
      {/* 3. TOWER 02: NEXUSATS APPLICANT PIPELINE CENTER         */}
      {/* (Coordinates: [70, 8, -32])                              */}
      {/* ======================================================== */}
      <group
        position={[70, 8, -32]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectProject?.('hr-recruitment-suite');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
          setHoveredBuilding('hr-recruitment-suite');
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'auto';
          setHoveredBuilding(null);
        }}
      >
        {/* Left Spire */}
        <mesh position={[-3.5, 13, 0]}>
          <boxGeometry args={[4.5, 26, 5]} />
          <meshStandardMaterial
            color={hoveredBuilding === 'hr-recruitment-suite' ? '#121E20' : '#101512'}
            roughness={0.25}
            metalness={0.8}
          />
        </mesh>

        {/* Right Spire */}
        <mesh position={[3.5, 11, 0]}>
          <boxGeometry args={[4.5, 22, 5]} />
          <meshStandardMaterial
            color={hoveredBuilding === 'hr-recruitment-suite' ? '#121E20' : '#101512'}
            roughness={0.25}
            metalness={0.8}
          />
        </mesh>

        {/* Connecting Skybridge Corridor */}
        <mesh position={[0, 15, 0]}>
          <boxGeometry args={[5, 2.5, 3.5]} />
          <meshStandardMaterial color="#1B2B28" roughness={0.3} metalness={0.9} />
        </mesh>

        {/* Skybridge Cyan Energy Halo */}
        <mesh
          ref={skybridgeHaloRef}
          position={[0, 15, 1.85]}
          rotation={[0, 0, 0]}
        >
          <ringGeometry args={[1.2, 1.4, 16]} />
          <meshBasicMaterial color="#00E5FF" side={THREE.DoubleSide} />
        </mesh>

        {/* Vertical Stage-Gate Data Conduits */}
        <mesh position={[-3.5, 13, 2.55]}>
          <planeGeometry args={[0.25, 24]} />
          <meshBasicMaterial color="#00E5FF" />
        </mesh>
        <mesh position={[3.5, 11, 2.55]}>
          <planeGeometry args={[0.25, 20]} />
          <meshBasicMaterial color="#00E5FF" />
        </mesh>

        {/* Hover Billboard Reticle */}
        <group position={[0, 27.5, 0]}>
          <mesh>
            <cylinderGeometry args={[1.5, 1.5, 0.08, 16]} />
            <meshBasicMaterial
              color="#00E5FF"
              transparent
              opacity={hoveredBuilding === 'hr-recruitment-suite' ? 0.95 : 0.55}
              wireframe
            />
          </mesh>
        </group>
      </group>

      {/* ======================================================== */}
      {/* 4. TOWER 03: RECALL AI COGNITIVE CUBE (Hackathon Lab)    */}
      {/* (Coordinates: [74, 8, -16])                              */}
      {/* ======================================================== */}
      <group
        position={[74, 8, -16]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectProject?.('recall-ai');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
          setHoveredBuilding('recall-ai');
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'auto';
          setHoveredBuilding(null);
        }}
      >
        {/* Base Pedestal */}
        <mesh position={[0, 1.5, 0]}>
          <cylinderGeometry args={[5, 5.5, 3, 8]} />
          <meshStandardMaterial color="#121814" roughness={0.7} />
        </mesh>

        {/* Open Pavilion Cube Cage */}
        <mesh position={[0, 7.5, 0]}>
          <boxGeometry args={[7.5, 8.5, 7.5]} />
          <meshStandardMaterial
            color="#0E1410"
            wireframe
          />
        </mesh>

        {/* Floating Rotating Inner Vector Core */}
        <mesh ref={vectorCoreRef} position={[0, 7.5, 0]}>
          <octahedronGeometry args={[2.0, 0]} />
          <meshStandardMaterial
            color="#C7FF45"
            emissive="#C7FF45"
            emissiveIntensity={hoveredBuilding === 'recall-ai' ? 3.0 : 1.9}
            flatShading
          />
        </mesh>

        {/* Floor Energy Reticle */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 3.05, 0]}>
          <ringGeometry args={[3.2, 3.6, 24]} />
          <meshBasicMaterial color="#C7FF45" transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>

        {/* Hover Billboard Reticle */}
        <group position={[0, 13.5, 0]}>
          <mesh>
            <cylinderGeometry args={[1.5, 1.5, 0.08, 16]} />
            <meshBasicMaterial
              color="#C7FF45"
              transparent
              opacity={hoveredBuilding === 'recall-ai' ? 0.95 : 0.55}
              wireframe
            />
          </mesh>
        </group>
      </group>

      {/* ======================================================== */}
      {/* 5. TOWER 04: CYBERNAUT DEFENSE & AUTOMATION TOWER       */}
      {/* (Coordinates: [54, 8, -36])                              */}
      {/* ======================================================== */}
      <group
        position={[54, 8, -36]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectProject?.('python-security-automation');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
          setHoveredBuilding('python-security-automation');
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'auto';
          setHoveredBuilding(null);
        }}
      >
        {/* Cylindrical Armored Tower Body */}
        <mesh position={[0, 8, 0]}>
          <cylinderGeometry args={[3.6, 4.4, 16, 12]} />
          <meshStandardMaterial
            color={hoveredBuilding === 'python-security-automation' ? '#221915' : '#121512'}
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>

        {/* Defensive Armor Ring Bands */}
        <mesh position={[0, 5, 0]}>
          <cylinderGeometry args={[4.2, 4.2, 0.6, 12]} />
          <meshStandardMaterial color="#FFB347" emissive="#FFB347" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[0, 11, 0]}>
          <cylinderGeometry args={[3.8, 3.8, 0.6, 12]} />
          <meshStandardMaterial color="#FF3358" emissive="#FF3358" emissiveIntensity={0.8} />
        </mesh>

        {/* Rooftop Scanner Platform & Rotating Radar Dish */}
        <mesh position={[0, 16.5, 0]}>
          <cylinderGeometry args={[3.0, 3.4, 1.0, 12]} />
          <meshStandardMaterial color="#1E2620" metalness={0.9} />
        </mesh>
        <mesh
          ref={radarRef}
          position={[0, 17.8, 0]}
          rotation={[0.3, 0, 0]}
        >
          <cylinderGeometry args={[1.6, 0.2, 0.4, 8]} />
          <meshStandardMaterial color="#FF3358" emissive="#FF3358" emissiveIntensity={1.4} />
        </mesh>

        {/* Hover Billboard Reticle */}
        <group position={[0, 20.5, 0]}>
          <mesh>
            <cylinderGeometry args={[1.5, 1.5, 0.08, 16]} />
            <meshBasicMaterial
              color="#FFB347"
              transparent
              opacity={hoveredBuilding === 'python-security-automation' ? 0.95 : 0.55}
              wireframe
            />
          </mesh>
        </group>
      </group>
    </group>
  );
};

