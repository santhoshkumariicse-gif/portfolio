import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface ExperienceMountainSceneProps {
  onSelectPOI?: (tab: 'roles' | 'certifications') => void;
}

export const ExperienceMountainScene: React.FC<ExperienceMountainSceneProps> = ({
  onSelectPOI
}) => {
  const domeRingRef = useRef<THREE.Mesh>(null);
  const beaconRef = useRef<THREE.Mesh>(null);
  const [hoveredStation, setHoveredStation] = useState<string | null>(null);

  // Animations: Summit rotating halo and beacon oscillation
  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    if (domeRingRef.current) {
      domeRingRef.current.rotation.z = elapsed * 0.4;
      domeRingRef.current.rotation.y = elapsed * 0.2;
    }

    if (beaconRef.current) {
      beaconRef.current.rotation.y = -elapsed * 0.8;
      beaconRef.current.position.y = 36 + Math.sin(elapsed * 1.5) * 0.3;
    }
  });

  return (
    <group name="experience-mountain-zone">
      {/* ======================================================== */}
      {/* 1. CHECKPOINT 01: CYBERNAUT PYTHON OUTPOST             */}
      {/* (Coordinates: [-44, 18, -75])                           */}
      {/* ======================================================== */}
      <group
        position={[-44, 18, -75]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectPOI?.('roles');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
          setHoveredStation('cybernaut');
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'auto';
          setHoveredStation(null);
        }}
      >
        {/* Timber Shelter Base */}
        <mesh position={[0, 0.25, 0]}>
          <boxGeometry args={[4.5, 0.5, 4.0]} />
          <meshStandardMaterial
            color={hoveredStation === 'cybernaut' ? '#222B1E' : '#141813'}
            roughness={0.8}
          />
        </mesh>

        {/* Shelter Posts & Roof */}
        {[-1.8, 1.8].map((px) =>
          [-1.6, 1.6].map((pz) => (
            <mesh key={`${px}-${pz}`} position={[px, 1.6, pz]}>
              <cylinderGeometry args={[0.08, 0.08, 2.8, 6]} />
              <meshStandardMaterial color="#3D3025" roughness={0.9} />
            </mesh>
          ))
        )}
        <mesh position={[0, 3.2, 0]} rotation={[0, 0, 0]}>
          <coneGeometry args={[3.2, 1.2, 4]} />
          <meshStandardMaterial color="#2B2117" roughness={0.85} />
        </mesh>

        {/* Cyber Lime Flagpole & Banner */}
        <mesh position={[2.2, 2.5, 1.8]}>
          <cylinderGeometry args={[0.04, 0.04, 5.0, 8]} />
          <meshStandardMaterial color="#60665D" metalness={0.9} />
        </mesh>
        <mesh position={[2.7, 4.5, 1.8]}>
          <planeGeometry args={[1.0, 0.6]} />
          <meshBasicMaterial
            color="#C7FF45"
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Hover Reticle */}
        <group position={[0, 4.5, 0]}>
          <mesh>
            <cylinderGeometry args={[1.2, 1.2, 0.08, 16]} />
            <meshBasicMaterial
              color="#C7FF45"
              transparent
              opacity={hoveredStation === 'cybernaut' ? 0.95 : 0.55}
              wireframe
            />
          </mesh>
        </group>
      </group>

      {/* ======================================================== */}
      {/* 2. CHECKPOINT 02: ELITA WEB & APP STATION              */}
      {/* (Coordinates: [-28, 22, -82])                           */}
      {/* ======================================================== */}
      <group
        position={[-28, 22, -82]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectPOI?.('roles');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
          setHoveredStation('elita');
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'auto';
          setHoveredStation(null);
        }}
      >
        {/* Outpost Plinth */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[2.5, 2.8, 0.6, 8]} />
          <meshStandardMaterial
            color={hoveredStation === 'elita' ? '#182424' : '#121815'}
            roughness={0.7}
          />
        </mesh>

        {/* Cyan Flag Banner */}
        <mesh position={[1.5, 2.2, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 4.5, 8]} />
          <meshStandardMaterial color="#60665D" metalness={0.9} />
        </mesh>
        <mesh position={[2.0, 4.0, 0]}>
          <planeGeometry args={[1.0, 0.6]} />
          <meshBasicMaterial color="#00E5FF" side={THREE.DoubleSide} />
        </mesh>

        {/* Hover Reticle */}
        <group position={[0, 4.0, 0]}>
          <mesh>
            <cylinderGeometry args={[1.2, 1.2, 0.08, 16]} />
            <meshBasicMaterial
              color="#00E5FF"
              transparent
              opacity={hoveredStation === 'elita' ? 0.95 : 0.55}
              wireframe
            />
          </mesh>
        </group>
      </group>

      {/* ======================================================== */}
      {/* 3. CHECKPOINT 03: CYBERSECURITY CTF RIDGE OUTPOST       */}
      {/* (Coordinates: [-42, 26, -92])                           */}
      {/* ======================================================== */}
      <group
        position={[-42, 26, -92]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectPOI?.('roles');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
          setHoveredStation('ctf');
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'auto';
          setHoveredStation(null);
        }}
      >
        {/* Stone Defense Tower */}
        <mesh position={[0, 1.8, 0]}>
          <cylinderGeometry args={[2.0, 2.4, 3.6, 8]} />
          <meshStandardMaterial
            color={hoveredStation === 'ctf' ? '#28241D' : '#1A1814'}
            roughness={0.8}
          />
        </mesh>

        {/* Amber Flag Banner */}
        <mesh position={[1.4, 3.0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 4.5, 8]} />
          <meshStandardMaterial color="#60665D" metalness={0.9} />
        </mesh>
        <mesh position={[1.9, 4.8, 0]}>
          <planeGeometry args={[1.0, 0.6]} />
          <meshBasicMaterial color="#FFB347" side={THREE.DoubleSide} />
        </mesh>

        {/* Hover Reticle */}
        <group position={[0, 4.5, 0]}>
          <mesh>
            <cylinderGeometry args={[1.2, 1.2, 0.08, 16]} />
            <meshBasicMaterial
              color="#FFB347"
              transparent
              opacity={hoveredStation === 'ctf' ? 0.95 : 0.55}
              wireframe
            />
          </mesh>
        </group>
      </group>

      {/* ======================================================== */}
      {/* 4. SUMMIT OBSERVATORY & CERTIFICATIONS SHRINE           */}
      {/* (Coordinates: [-35, 32, -85])                           */}
      {/* ======================================================== */}
      <group
        position={[-35, 32, -85]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectPOI?.('certifications');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
          setHoveredStation('summit');
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'auto';
          setHoveredStation(null);
        }}
      >
        {/* Summit Foundation Plinth */}
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[5.5, 6.2, 0.8, 12]} />
          <meshStandardMaterial
            color={hoveredStation === 'summit' ? '#21291F' : '#151A14'}
            roughness={0.7}
          />
        </mesh>

        {/* Summit Geodesic Dome */}
        <mesh position={[0, 2.5, 0]}>
          <sphereGeometry args={[4.2, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial
            color="#C7FF45"
            emissive="#C7FF45"
            emissiveIntensity={hoveredStation === 'summit' ? 1.5 : 0.8}
            wireframe
          />
        </mesh>

        {/* Rotating Achievement Halo Rings */}
        <mesh
          ref={domeRingRef}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 3.5, 0]}
        >
          <ringGeometry args={[4.6, 5.0, 32]} />
          <meshBasicMaterial color="#C7FF45" side={THREE.DoubleSide} />
        </mesh>

        {/* High-Altitude Signal Beacon Octahedron */}
        <mesh
          ref={beaconRef}
          position={[0, 36, 0]}
        >
          <octahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial
            color="#C7FF45"
            emissive="#C7FF45"
            emissiveIntensity={2.5}
            flatShading
          />
        </mesh>

        {/* Hover Reticle */}
        <group position={[0, 6.5, 0]}>
          <mesh>
            <cylinderGeometry args={[1.6, 1.6, 0.08, 16]} />
            <meshBasicMaterial
              color="#C7FF45"
              transparent
              opacity={hoveredStation === 'summit' ? 0.95 : 0.6}
              wireframe
            />
          </mesh>
        </group>
      </group>
    </group>
  );
};
