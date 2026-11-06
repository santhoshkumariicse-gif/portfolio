import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const IslandTerrain: React.FC = () => {
  const beaconBeamRef = useRef<THREE.Mesh>(null);

  // Subtle rotational animations for beacon
  useFrame((_, delta) => {
    if (beaconBeamRef.current) {
      beaconBeamRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group name="aethelgard-island-world">
      {/* 1. Endless Digital Ocean Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.4, 0]} receiveShadow>
        <planeGeometry args={[600, 600, 32, 32]} />
        <meshStandardMaterial
          color="#06101E"
          roughness={0.2}
          metalness={0.7}
          flatShading
        />
      </mesh>

      {/* 2. Sandy Coastal Beach Rim (Origin Coast South) */}
      <mesh position={[0, 0.4, 60]} receiveShadow>
        <cylinderGeometry args={[55, 65, 1.2, 16]} />
        <meshStandardMaterial color="#D2B58A" roughness={0.9} flatShading />
      </mesh>

      {/* 3. Central Inland Island Base (Forest & Green Landmass) */}
      <mesh position={[-15, 2, 10]} receiveShadow>
        <cylinderGeometry args={[75, 90, 3.5, 18]} />
        <meshStandardMaterial color="#142116" roughness={0.85} flatShading />
      </mesh>

      {/* 4. Project City Elevated Tech Plateau (East) */}
      <mesh position={[55, 4.5, -25]} receiveShadow>
        <cylinderGeometry args={[42, 48, 5.5, 14]} />
        <meshStandardMaterial color="#121413" roughness={0.4} metalness={0.6} flatShading />
      </mesh>

      {/* 5. Experience Mountain Peak (North-West) */}
      <mesh position={[-35, 16, -85]} receiveShadow>
        <coneGeometry args={[36, 32, 8]} />
        <meshStandardMaterial color="#222822" roughness={0.95} flatShading />
      </mesh>

      {/* 6. Contact Beacon Bluff (Far North) */}
      <mesh position={[10, 22, -135]} receiveShadow>
        <cylinderGeometry args={[22, 28, 28, 10]} />
        <meshStandardMaterial color="#1A1F1A" roughness={0.9} flatShading />
      </mesh>

      {/* ======================================================== */}
      {/* ZONE LANDMARKS & PROCEDURAL MONUMENTS                   */}
      {/* ======================================================== */}

      {/* ZONE 04: Experience Mountain Observation Station */}
      <group position={[-35, 32, -85]}>
        <mesh position={[0, 1, 0]}>
          <cylinderGeometry args={[5, 6, 2, 8]} />
          <meshStandardMaterial color="#C7FF45" emissive="#C7FF45" emissiveIntensity={0.8} wireframe />
        </mesh>
      </group>

      {/* ZONE 05: Contact Beacon (The Oceanic Lighthouse & Light Beam) */}
      <group position={[10, 36, -135]}>
        {/* Lighthouse Core Structure */}
        <mesh position={[0, 7, 0]}>
          <cylinderGeometry args={[2.5, 4, 14, 12]} />
          <meshStandardMaterial color="#E8ECE5" roughness={0.3} />
        </mesh>

        {/* Rotating Lighthouse Beam */}
        <mesh ref={beaconBeamRef} position={[0, 14.5, 0]}>
          <cylinderGeometry args={[0.8, 14, 40, 16, 1, true]} />
          <meshStandardMaterial
            color="#C7FF45"
            emissive="#C7FF45"
            emissiveIntensity={1.5}
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Vertical Zenith Signal Pillar */}
        <mesh position={[0, 70, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 110, 8]} />
          <meshStandardMaterial color="#C7FF45" emissive="#C7FF45" emissiveIntensity={2.5} transparent opacity={0.6} />
        </mesh>
      </group>
    </group>
  );
};

