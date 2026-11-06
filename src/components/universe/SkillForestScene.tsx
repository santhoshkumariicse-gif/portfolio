import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { skillsData } from '../../data/skills';

export interface SkillForestSceneProps {
  onSelectCategory?: (categoryId: string) => void;
}

// -------------------------------------------------------------
// Bioluminescent Forest Tree Component
// -------------------------------------------------------------
interface BioTreeProps {
  position: [number, number, number];
  scale?: number;
  glowColor?: string;
}

const BioTree: React.FC<BioTreeProps> = ({ position, scale = 1, glowColor = '#00E5FF' }) => {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Dark Twisted Trunk */}
      <mesh position={[0, 2.2, 0]}>
        <cylinderGeometry args={[0.35, 0.65, 4.4, 7]} />
        <meshStandardMaterial color="#141E15" roughness={0.9} flatShading />
      </mesh>

      {/* Bioluminescent Foliage Layers */}
      <mesh position={[0, 4.8, 0]}>
        <dodecahedronGeometry args={[1.9, 0]} />
        <meshStandardMaterial
          color="#0D2E20"
          emissive={glowColor}
          emissiveIntensity={0.4}
          roughness={0.7}
          flatShading
        />
      </mesh>
      <mesh position={[0, 6.2, 0]}>
        <dodecahedronGeometry args={[1.3, 0]} />
        <meshStandardMaterial
          color="#123B2A"
          emissive={glowColor}
          emissiveIntensity={0.6}
          roughness={0.7}
          flatShading
        />
      </mesh>

      {/* Spores / Floating Glowing Lanterns */}
      <mesh position={[1.2, 4.2, 0.4]}>
        <sphereGeometry args={[0.12, 6, 6]} />
        <meshStandardMaterial color={glowColor} emissive={glowColor} emissiveIntensity={2.0} />
      </mesh>
      <mesh position={[-1.0, 4.5, -0.6]}>
        <sphereGeometry args={[0.1, 6, 6]} />
        <meshStandardMaterial color={glowColor} emissive={glowColor} emissiveIntensity={2.0} />
      </mesh>
    </group>
  );
};

// -------------------------------------------------------------
// Interactive Floating Technology Crystal Monolith
// -------------------------------------------------------------
interface SkillCrystalProps {
  id: string;
  title: string;
  color: string;
  position: [number, number, number];
  index: number;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onClick: (id: string) => void;
}

const SkillCrystal: React.FC<SkillCrystalProps> = ({
  id,
  color,
  position,
  index,
  isHovered,
  onHover,
  onClick
}) => {
  const crystalRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    if (crystalRef.current) {
      crystalRef.current.position.y =
        position[1] + Math.sin(elapsed * 1.6 + index * 0.9) * 0.45;
      crystalRef.current.rotation.y = elapsed * 0.6 + index;
      crystalRef.current.rotation.z = Math.sin(elapsed * 0.8 + index) * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -elapsed * 0.4;
    }
  });

  return (
    <group
      position={[position[0], 0, position[2]]}
      onClick={(e) => {
        e.stopPropagation();
        onClick(id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        onHover(id);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'auto';
        onHover(null);
      }}
    >
      {/* Ground Stone Pedestal */}
      <mesh position={[0, position[1] - 3.8, 0]}>
        <cylinderGeometry args={[1.6, 1.9, 0.4, 8]} />
        <meshStandardMaterial color="#161F18" roughness={0.8} />
      </mesh>

      {/* Ground Reticle Ring */}
      <mesh
        ref={ringRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, position[1] - 3.55, 0]}
      >
        <ringGeometry args={[1.8, 2.0, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isHovered ? 0.95 : 0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Floating Polyhedral Crystal */}
      <mesh
        ref={crystalRef}
        position={[0, position[1], 0]}
        scale={isHovered ? [1.25, 1.25, 1.25] : [1, 1, 1]}
      >
        <octahedronGeometry args={[1.3, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isHovered ? 2.5 : 1.7}
          roughness={0.1}
          metalness={0.9}
          flatShading
        />
      </mesh>

      {/* Hover Interaction Indicator Billboard */}
      {isHovered && (
        <group position={[0, position[1] + 1.8, 0]}>
          <mesh>
            <cylinderGeometry args={[0.9, 0.9, 0.05, 16]} />
            <meshBasicMaterial color={color} wireframe />
          </mesh>
        </group>
      )}
    </group>
  );
};

// -------------------------------------------------------------
// Skill Forest Master Scene Component
// -------------------------------------------------------------
export const SkillForestScene: React.FC<SkillForestSceneProps> = ({ onSelectCategory }) => {
  const monolithRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const centerPos: [number, number, number] = [-65, 5, 20];

  // Distinct chromatic signatures for all 7 skill domains
  const categoryColors = useMemo(
    () => [
      '#FFB347', // 01 Languages (Amber)
      '#00E5FF', // 02 Frontend (Cyan)
      '#C7FF45', // 03 Backend (Lime)
      '#2ECC71', // 04 Mobile (Emerald)
      '#3498DB', // 05 Databases (Cobalt)
      '#9B59B6', // 06 Tools & DevOps (Amethyst)
      '#FF3358'  // 07 AI & Security (Crimson)
    ],
    []
  );

  // Compute radial layout for the 7 crystals surrounding the monolith
  const crystals = useMemo(() => {
    const radius = 13.5;
    return skillsData.map((cat, idx) => {
      const angle = (idx * 2 * Math.PI) / skillsData.length;
      const x = centerPos[0] + Math.cos(angle) * radius;
      const z = centerPos[2] + Math.sin(angle) * radius;
      return {
        ...cat,
        color: categoryColors[idx % categoryColors.length],
        position: [x, centerPos[1] + 3.8, z] as [number, number, number],
        index: idx
      };
    });
  }, [centerPos, categoryColors]);

  // Frame animations for central monolith and halo
  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.z = elapsed * 0.5;
      ringRef.current.position.y = centerPos[1] + 6.8 + Math.sin(elapsed * 1.2) * 0.2;
    }
    if (monolithRef.current) {
      monolithRef.current.position.y = centerPos[1] + Math.sin(elapsed * 0.8) * 0.1;
    }
  });

  return (
    <group name="skill-forest-zone">
      {/* ======================================================== */}
      {/* 1. SURROUNDING BIOLUMINESCENT TREES                     */}
      {/* ======================================================== */}
      <BioTree position={[-84, 4.6, 26]} scale={1.2} glowColor="#00E5FF" />
      <BioTree position={[-80, 4.8, 8]} scale={1.05} glowColor="#C7FF45" />
      <BioTree position={[-74, 5.0, 38]} scale={1.15} glowColor="#2ECC71" />
      <BioTree position={[-52, 4.8, 32]} scale={1.1} glowColor="#00E5FF" />
      <BioTree position={[-50, 4.9, 6]} scale={1.25} glowColor="#FFB347" />
      <BioTree position={[-62, 5.0, 40]} scale={0.95} glowColor="#C7FF45" />
      <BioTree position={[-68, 5.1, 2]} scale={1.0} glowColor="#3498DB" />
      <BioTree position={[-88, 4.4, 18]} scale={1.3} glowColor="#9B59B6" />

      {/* ======================================================== */}
      {/* 2. CENTRAL ARSENAL MONOLITH (Coordinates: [-65, 5, 20]) */}
      {/* ======================================================== */}
      <group
        ref={monolithRef}
        position={centerPos}
        onClick={(e) => {
          e.stopPropagation();
          onSelectCategory?.('programming-languages');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
          setHoveredId('central-core');
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'auto';
          setHoveredId(null);
        }}
      >
        {/* Foundation Stepped Altar */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[5.2, 5.8, 0.6, 12]} />
          <meshStandardMaterial color="#131B14" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[4.2, 4.8, 0.4, 12]} />
          <meshStandardMaterial color="#19241B" roughness={0.8} />
        </mesh>

        {/* Outer Emissive Energy Trench */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.92, 0]}>
          <ringGeometry args={[3.8, 4.1, 32]} />
          <meshBasicMaterial color="#00E5FF" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>

        {/* Tall Cybernetic Obelisk */}
        <mesh position={[0, 4.0, 0]}>
          <boxGeometry args={[1.8, 6.2, 1.8]} />
          <meshStandardMaterial
            color="#0E1410"
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>

        {/* Glowing Monolith Circuit Veins */}
        <mesh position={[0, 4.0, 0.92]}>
          <planeGeometry args={[0.2, 5.5]} />
          <meshBasicMaterial color="#00E5FF" />
        </mesh>
        <mesh position={[0, 4.0, -0.92]}>
          <planeGeometry args={[0.2, 5.5]} />
          <meshBasicMaterial color="#00E5FF" />
        </mesh>
        <mesh position={[0.92, 4.0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[0.2, 5.5]} />
          <meshBasicMaterial color="#00E5FF" />
        </mesh>
        <mesh position={[-0.92, 4.0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[0.2, 5.5]} />
          <meshBasicMaterial color="#00E5FF" />
        </mesh>

        {/* Monolith Pyramidion Top */}
        <mesh position={[0, 7.5, 0]}>
          <coneGeometry args={[1.3, 1.2, 4]} />
          <meshStandardMaterial
            color="#00E5FF"
            emissive="#00E5FF"
            emissiveIntensity={1.8}
            flatShading
          />
        </mesh>

        {/* Hovering Energy Halo Ring */}
        <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 6.8, 0]}>
          <ringGeometry args={[2.4, 2.7, 24]} />
          <meshBasicMaterial color="#00E5FF" transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>

        {/* Interactive Interaction Beacon */}
        <group position={[0, 8.8, 0]}>
          <mesh>
            <cylinderGeometry args={[1.4, 1.4, 0.08, 16]} />
            <meshBasicMaterial
              color="#00E5FF"
              transparent
              opacity={hoveredId === 'central-core' ? 0.95 : 0.6}
              wireframe
            />
          </mesh>
        </group>
      </group>

      {/* ======================================================== */}
      {/* 3. 7 INTERACTIVE TECHNOLOGY CRYSTAL CLUSTERS            */}
      {/* ======================================================== */}
      {crystals.map((crystal) => (
        <SkillCrystal
          key={crystal.id}
          id={crystal.id}
          title={crystal.title}
          color={crystal.color}
          position={crystal.position}
          index={crystal.index}
          isHovered={hoveredId === crystal.id}
          onHover={setHoveredId}
          onClick={(id) => onSelectCategory?.(id)}
        />
      ))}
    </group>
  );
};

