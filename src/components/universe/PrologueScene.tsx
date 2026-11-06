import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

export interface PrologueSceneProps {
  isTransitioning?: boolean;
}

export const PrologueScene: React.FC<PrologueSceneProps> = () => {
  const planetRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.08;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y -= delta * 0.05;
    }
  });

  return (
    <group position={[0, 100, 0]} name="prologue-planet-space">
      {/* 1. Distant Cosmic Dust Particles */}
      <Stars
        radius={280}
        depth={80}
        count={2500}
        factor={5}
        saturation={0.5}
        fade
        speed={1.2}
      />

      {/* 2. Glowing Digital Earth / Cyber Planet */}
      <group ref={planetRef}>
        {/* Planet Core Sphere */}
        <mesh>
          <sphereGeometry args={[22, 32, 32]} />
          <meshStandardMaterial
            color="#081418"
            roughness={0.4}
            metalness={0.7}
          />
        </mesh>

        {/* Digital Continental Wireframe Surface */}
        <mesh>
          <sphereGeometry args={[22.3, 24, 24]} />
          <meshStandardMaterial
            color="#00E5FF"
            emissive="#00E5FF"
            emissiveIntensity={0.6}
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>

        {/* Atmospheric Cyan Corona Glow */}
        <mesh ref={atmosphereRef}>
          <sphereGeometry args={[23.5, 32, 32]} />
          <meshStandardMaterial
            color="#00E5FF"
            emissive="#00E5FF"
            emissiveIntensity={1.2}
            transparent
            opacity={0.12}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Orbital Telemetry Data Ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
          <ringGeometry args={[28, 32, 64]} />
          <meshStandardMaterial
            color="#C7FF45"
            emissive="#C7FF45"
            emissiveIntensity={0.8}
            side={THREE.DoubleSide}
            transparent
            opacity={0.3}
            wireframe
          />
        </mesh>
      </group>

      {/* 3. Central Lighting */}
      <pointLight position={[40, 20, 60]} color="#00E5FF" intensity={2.5} distance={150} />
      <pointLight position={[-40, -20, -60]} color="#C7FF45" intensity={1.5} distance={150} />
    </group>
  );
};
