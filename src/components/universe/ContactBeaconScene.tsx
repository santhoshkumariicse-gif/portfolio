import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface ContactBeaconSceneProps {
  onSelectPOI?: (tab: 'transmit' | 'resume') => void;
}

export const ContactBeaconScene: React.FC<ContactBeaconSceneProps> = ({ onSelectPOI }) => {
  const beamRef = useRef<THREE.Mesh>(null);
  const zenithRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  const [hoveredStation, setHoveredStation] = useState<string | null>(null);

  // Animations: Sweeping rotating lighthouse cone, zenith beam pulse, rotating floor reticles
  useFrame(({ clock }, delta) => {
    const elapsed = clock.getElapsedTime();

    if (beamRef.current) {
      beamRef.current.rotation.y += delta * 0.45;
    }

    if (zenithRef.current) {
      const pulse = 1.8 + Math.sin(elapsed * 2.5) * 0.4;
      zenithRef.current.scale.set(pulse, 1, pulse);
    }

    if (ringRef1.current) {
      ringRef1.current.rotation.z = elapsed * 0.3;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z = -elapsed * 0.25;
    }
  });

  return (
    <group name="contact-beacon-zone">
      {/* ======================================================== */}
      {/* 1. HORIZON LIGHTHOUSE STRUCTURE (Coordinates: [10, 36, -135]) */}
      {/* ======================================================== */}
      <group
        position={[10, 36, -135]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectPOI?.('transmit');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
          setHoveredStation('lighthouse');
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'auto';
          setHoveredStation(null);
        }}
      >
        {/* Stepped Foundation Plinth */}
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[7.2, 8.2, 1.2, 16]} />
          <meshStandardMaterial
            color={hoveredStation === 'lighthouse' ? '#252B24' : '#181E17'}
            roughness={0.8}
          />
        </mesh>
        <mesh position={[0, 1.6, 0]}>
          <cylinderGeometry args={[5.8, 6.8, 0.8, 16]} />
          <meshStandardMaterial color="#1E241D" roughness={0.8} />
        </mesh>

        {/* Lighthouse Tower Lower Body */}
        <mesh position={[0, 7.0, 0]}>
          <cylinderGeometry args={[3.2, 4.4, 10, 16]} />
          <meshStandardMaterial color="#E0E5DC" roughness={0.35} />
        </mesh>

        {/* Architectural Crimson Horizontal Identification Band */}
        <mesh position={[0, 13.0, 0]}>
          <cylinderGeometry args={[2.8, 3.2, 2.5, 16]} />
          <meshStandardMaterial color="#FF3358" roughness={0.3} />
        </mesh>

        {/* Lighthouse Tower Upper Body */}
        <mesh position={[0, 16.5, 0]}>
          <cylinderGeometry args={[2.4, 2.8, 4.5, 16]} />
          <meshStandardMaterial color="#E8ECE5" roughness={0.35} />
        </mesh>

        {/* Gallery Observation Deck */}
        <mesh position={[0, 19.0, 0]}>
          <cylinderGeometry args={[3.6, 3.6, 0.6, 16]} />
          <meshStandardMaterial color="#2B332B" metalness={0.8} />
        </mesh>

        {/* Glass Lantern Room Housing */}
        <mesh position={[0, 21.0, 0]}>
          <cylinderGeometry args={[2.2, 2.2, 3.4, 12]} />
          <meshStandardMaterial
            color="#C7FF45"
            emissive="#C7FF45"
            emissiveIntensity={1.2}
            transparent
            opacity={0.5}
            wireframe
          />
        </mesh>

        {/* Lantern Core Fresnel Lens */}
        <mesh position={[0, 21.0, 0]}>
          <sphereGeometry args={[1.2, 12, 12]} />
          <meshStandardMaterial
            color="#C7FF45"
            emissive="#C7FF45"
            emissiveIntensity={2.8}
          />
        </mesh>

        {/* Lantern Conical Roof */}
        <mesh position={[0, 23.5, 0]}>
          <coneGeometry args={[2.6, 1.6, 16]} />
          <meshStandardMaterial color="#1A201A" metalness={0.8} />
        </mesh>

        {/* Sweeping Conical Light Beam */}
        <mesh ref={beamRef} position={[0, 21.0, 0]}>
          <cylinderGeometry args={[0.6, 20, 60, 16, 1, true]} />
          <meshStandardMaterial
            color="#C7FF45"
            emissive="#C7FF45"
            emissiveIntensity={1.8}
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Vertical Zenith Signal Pillar to Outer Cosmos */}
        <mesh ref={zenithRef} position={[0, 95.0, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 140, 8]} />
          <meshStandardMaterial
            color="#C7FF45"
            emissive="#C7FF45"
            emissiveIntensity={3.0}
            transparent
            opacity={0.65}
          />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 2. HOLOGRAPHIC CONTACT LAUNCH DECK                      */}
      {/* (Coordinates: [10, 36.6, -126])                         */}
      {/* ======================================================== */}
      <group position={[10, 36.6, -126]}>
        {/* Concentric Rotating Floor Reticles */}
        <mesh
          ref={ringRef1}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.1, 0]}
        >
          <ringGeometry args={[4.5, 4.8, 32]} />
          <meshBasicMaterial color="#C7FF45" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>

        <mesh
          ref={ringRef2}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.12, 0]}
        >
          <ringGeometry args={[3.2, 3.4, 24]} />
          <meshBasicMaterial color="#00E5FF" transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>

        {/* Pedestal 1: Direct Message Terminal */}
        <group
          position={[-2.4, 0, 0]}
          onClick={(e) => {
            e.stopPropagation();
            onSelectPOI?.('transmit');
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            document.body.style.cursor = 'auto';
          }}
        >
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.35, 0.45, 1.2, 8]} />
            <meshStandardMaterial color="#1B221B" metalness={0.7} />
          </mesh>
          <mesh position={[0, 1.4, 0]}>
            <octahedronGeometry args={[0.35, 0]} />
            <meshStandardMaterial color="#C7FF45" emissive="#C7FF45" emissiveIntensity={2.0} />
          </mesh>
        </group>

        {/* Pedestal 2: ATS Resume Archive */}
        <group
          position={[0, 0, -2.4]}
          onClick={(e) => {
            e.stopPropagation();
            onSelectPOI?.('resume');
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            document.body.style.cursor = 'auto';
          }}
        >
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.35, 0.45, 1.2, 8]} />
            <meshStandardMaterial color="#1B221B" metalness={0.7} />
          </mesh>
          <mesh position={[0, 1.4, 0]}>
            <boxGeometry args={[0.5, 0.65, 0.05]} />
            <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={2.0} />
          </mesh>
        </group>

        {/* Pedestal 3: Network Node (GitHub & LinkedIn) */}
        <group
          position={[2.4, 0, 0]}
          onClick={(e) => {
            e.stopPropagation();
            onSelectPOI?.('transmit');
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            document.body.style.cursor = 'auto';
          }}
        >
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.35, 0.45, 1.2, 8]} />
            <meshStandardMaterial color="#1B221B" metalness={0.7} />
          </mesh>
          <mesh position={[0, 1.4, 0]}>
            <torusGeometry args={[0.3, 0.08, 8, 16]} />
            <meshStandardMaterial color="#FFB347" emissive="#FFB347" emissiveIntensity={2.0} />
          </mesh>
        </group>
      </group>
    </group>
  );
};

