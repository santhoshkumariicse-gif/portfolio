import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface OriginCoastSceneProps {
  onSelectPOI?: (poiId: 'workspace' | 'education') => void;
}

// -------------------------------------------------------------
// Low-Poly Procedural Palm Tree
// -------------------------------------------------------------
interface PalmTreeProps {
  position: [number, number, number];
  scale?: number;
  rotationY?: number;
}

const PalmTree: React.FC<PalmTreeProps> = ({ position, scale = 1, rotationY = 0 }) => {
  const treeRef = useRef<THREE.Group>(null);
  const randomOffset = useMemo(() => Math.random() * 10, []);

  // Gentle wind swaying animation
  useFrame(({ clock }) => {
    if (treeRef.current) {
      const time = clock.getElapsedTime() * 1.2 + randomOffset;
      treeRef.current.rotation.z = Math.sin(time) * 0.025;
      treeRef.current.rotation.x = Math.cos(time * 0.8) * 0.015;
    }
  });

  return (
    <group position={position} scale={[scale, scale, scale]} rotation={[0, rotationY, 0]}>
      <group ref={treeRef}>
        {/* Curved Segmented Trunk */}
        <mesh position={[0, 1.0, 0]}>
          <cylinderGeometry args={[0.3, 0.45, 2.0, 7]} />
          <meshStandardMaterial color="#543D2B" roughness={0.9} flatShading />
        </mesh>
        <mesh position={[0.15, 2.8, 0.05]} rotation={[0, 0, -0.08]}>
          <cylinderGeometry args={[0.26, 0.3, 1.8, 7]} />
          <meshStandardMaterial color="#5C4330" roughness={0.9} flatShading />
        </mesh>
        <mesh position={[0.4, 4.4, 0.15]} rotation={[0, 0, -0.12]}>
          <cylinderGeometry args={[0.22, 0.26, 1.6, 7]} />
          <meshStandardMaterial color="#4A3525" roughness={0.9} flatShading />
        </mesh>
        <mesh position={[0.7, 5.8, 0.3]} rotation={[0, 0, -0.16]}>
          <cylinderGeometry args={[0.18, 0.22, 1.4, 7]} />
          <meshStandardMaterial color="#3E2B1E" roughness={0.9} flatShading />
        </mesh>

        {/* Coconuts Cluster */}
        <group position={[0.85, 6.4, 0.35]}>
          <mesh position={[0.15, -0.1, 0.1]}>
            <sphereGeometry args={[0.18, 6, 6]} />
            <meshStandardMaterial color="#2E1C10" roughness={0.8} />
          </mesh>
          <mesh position={[-0.15, -0.1, 0.08]}>
            <sphereGeometry args={[0.17, 6, 6]} />
            <meshStandardMaterial color="#28180E" roughness={0.8} />
          </mesh>
          <mesh position={[0, -0.12, -0.15]}>
            <sphereGeometry args={[0.16, 6, 6]} />
            <meshStandardMaterial color="#321F12" roughness={0.8} />
          </mesh>
        </group>

        {/* 8 Palm Fronds (Canopy) */}
        <group position={[0.85, 6.5, 0.35]}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const angle = (i * Math.PI) / 4;
            const frondColor = i % 2 === 0 ? '#265C28' : '#2D6B2F';
            return (
              <group key={i} rotation={[0, angle, -0.45]}>
                {/* Frond Rib & Leaf Mesh */}
                <mesh position={[1.4, -0.2, 0]} rotation={[0, 0, -0.2]}>
                  <boxGeometry args={[2.8, 0.05, 0.7]} />
                  <meshStandardMaterial color={frondColor} roughness={0.7} flatShading />
                </mesh>
              </group>
            );
          })}
        </group>
      </group>
    </group>
  );
};

// -------------------------------------------------------------
// Origin Coast Master Scene Component
// -------------------------------------------------------------
export const OriginCoastScene: React.FC<OriginCoastSceneProps> = ({ onSelectPOI }) => {
  const wavesRef = useRef<THREE.Mesh>(null);
  const hologramHoloRef = useRef<THREE.Mesh>(null);
  const steamParticlesRef = useRef<THREE.Group>(null);

  const [hoveredPOI, setHoveredPOI] = useState<'workspace' | 'education' | null>(null);

  // Load Santhosh's authentic photograph as a Three.js texture for desk monitor
  const photoTexture = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const loader = new THREE.TextureLoader();
    const tex = loader.load(`${import.meta.env.BASE_URL}images/santhosh-kumar.jpg`);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  // Frame animations: waves surging, floating blueprint spinning
  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    // Ocean shoreline surge
    if (wavesRef.current) {
      wavesRef.current.position.z = 94 + Math.sin(elapsed * 1.4) * 1.8;
      wavesRef.current.position.y = 0.15 + Math.cos(elapsed * 1.4) * 0.08;
    }

    // Holographic schematic blueprint rotation
    if (hologramHoloRef.current) {
      hologramHoloRef.current.rotation.y = elapsed * 0.6;
      hologramHoloRef.current.rotation.x = Math.sin(elapsed * 0.4) * 0.2;
    }

    // Steam particles oscillation
    if (steamParticlesRef.current) {
      steamParticlesRef.current.rotation.y = elapsed * 0.2;
      steamParticlesRef.current.position.y = 2.4 + Math.sin(elapsed * 2.0) * 0.05;
    }
  });

  return (
    <group name="origin-coast-zone">
      {/* ======================================================== */}
      {/* 1. COASTAL SHORELINE & DYNAMIC WAVES                     */}
      {/* ======================================================== */}
      <mesh
        ref={wavesRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.2, 94]}
      >
        <planeGeometry args={[140, 18, 16, 4]} />
        <meshStandardMaterial
          color="#38A3D8"
          emissive="#1E5C7D"
          emissiveIntensity={0.3}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.75}
          flatShading
        />
      </mesh>

      {/* Foam Crest Edge Strip */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.22, 90]}>
        <planeGeometry args={[130, 2.5]} />
        <meshStandardMaterial
          color="#EAF6FF"
          emissive="#FFFFFF"
          emissiveIntensity={0.2}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Coastal Rocks & Boulders */}
      <group position={[-25, 0.5, 86]}>
        <mesh position={[0, 0.4, 0]}>
          <dodecahedronGeometry args={[1.6, 0]} />
          <meshStandardMaterial color="#2B302B" roughness={0.9} flatShading />
        </mesh>
        <mesh position={[1.8, 0.2, 0.8]}>
          <dodecahedronGeometry args={[1.0, 0]} />
          <meshStandardMaterial color="#353D35" roughness={0.9} flatShading />
        </mesh>
      </group>

      <group position={[28, 0.5, 84]}>
        <mesh position={[0, 0.5, 0]}>
          <dodecahedronGeometry args={[2.0, 0]} />
          <meshStandardMaterial color="#2E332E" roughness={0.9} flatShading />
        </mesh>
        <mesh position={[-1.6, 0.3, 0.6]}>
          <dodecahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial color="#3A423A" roughness={0.9} flatShading />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 2. INSTANCED COASTAL PALM GROVE (Karaikal Coastal Theme) */}
      {/* ======================================================== */}
      <PalmTree position={[-20, 0.6, 70]} scale={1.1} rotationY={0.4} />
      <PalmTree position={[-15, 0.8, 80]} scale={0.95} rotationY={1.2} />
      <PalmTree position={[-26, 0.5, 85]} scale={1.05} rotationY={2.1} />
      <PalmTree position={[16, 0.7, 72]} scale={1.15} rotationY={0.8} />
      <PalmTree position={[22, 0.7, 82]} scale={0.9} rotationY={1.7} />
      <PalmTree position={[29, 0.5, 88]} scale={1.0} rotationY={2.9} />
      <PalmTree position={[-8, 0.9, 90]} scale={0.85} rotationY={3.4} />
      <PalmTree position={[10, 0.8, 92]} scale={0.92} rotationY={0.2} />

      {/* Stone Flagstone Path leading inland towards Skill Forest */}
      {[-2, 0, 2].map((x) => (
        <group key={x}>
          {[72, 68, 64, 60, 56, 52, 48].map((z, idx) => (
            <mesh
              key={z}
              position={[x + (idx % 2 === 0 ? 0.3 : -0.3), 0.45, z]}
              rotation={[-Math.PI / 2, 0, (idx * 0.1)]}
            >
              <planeGeometry args={[1.6, 1.4]} />
              <meshStandardMaterial color="#3B3E37" roughness={0.95} flatShading />
            </mesh>
          ))}
        </group>
      ))}

      {/* ======================================================== */}
      {/* 3. DEVELOPER STUDY WORKSPACE (Coordinates: [0, 1.2, 75]) */}
      {/* ======================================================== */}
      <group
        position={[0, 1.2, 75]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectPOI?.('workspace');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
          setHoveredPOI('workspace');
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'auto';
          setHoveredPOI(null);
        }}
      >
        {/* Workspace Circular Foundation Deck */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[4.8, 5.2, 0.25, 24]} />
          <meshStandardMaterial
            color={hoveredPOI === 'workspace' ? '#242921' : '#181C16'}
            roughness={0.7}
          />
        </mesh>

        {/* Glowing Amber Reticle Ring on Floor */}
        <mesh position={[0, 0.24, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[4.2, 4.4, 32]} />
          <meshBasicMaterial
            color="#FFB347"
            transparent
            opacity={hoveredPOI === 'workspace' ? 0.9 : 0.45}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Study Desk Surface */}
        <mesh position={[0, 1.0, 0]}>
          <boxGeometry args={[3.4, 0.1, 1.6]} />
          <meshStandardMaterial color="#2A241E" roughness={0.6} />
        </mesh>

        {/* Desk Steel Legs */}
        {[-1.5, 1.5].map((lx) =>
          [-0.65, 0.65].map((lz) => (
            <mesh key={`${lx}-${lz}`} position={[lx, 0.5, lz]}>
              <cylinderGeometry args={[0.04, 0.04, 0.9, 8]} />
              <meshStandardMaterial color="#4A4E48" metalness={0.8} roughness={0.3} />
            </mesh>
          ))
        )}

        {/* Ergonomic Office Chair */}
        <group position={[0, 0, 0.9]}>
          {/* Chair Seat */}
          <mesh position={[0, 0.65, 0]}>
            <boxGeometry args={[0.7, 0.08, 0.7]} />
            <meshStandardMaterial color="#1A1F1B" roughness={0.8} />
          </mesh>
          {/* Chair Backrest */}
          <mesh position={[0, 1.15, 0.32]} rotation={[-0.1, 0, 0]}>
            <boxGeometry args={[0.65, 0.85, 0.08]} />
            <meshStandardMaterial color="#111612" roughness={0.9} />
          </mesh>
          {/* Chair Base & Stem */}
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.6, 8]} />
            <meshStandardMaterial color="#383D39" metalness={0.8} />
          </mesh>
        </group>

        {/* Primary Ultrawide Monitor (Code & Architecture) */}
        <group position={[0.2, 1.5, -0.4]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.8, 0.9, 0.05]} />
            <meshStandardMaterial color="#0F120F" metalness={0.7} roughness={0.4} />
          </mesh>
          {/* Glowing Code Editor Screen */}
          <mesh position={[0, 0, 0.03]}>
            <planeGeometry args={[1.72, 0.82]} />
            <meshBasicMaterial color="#0A110D" />
          </mesh>
          {/* Simulated Code Lines */}
          <mesh position={[-0.25, 0.15, 0.035]}>
            <planeGeometry args={[1.0, 0.05]} />
            <meshBasicMaterial color="#00E5FF" />
          </mesh>
          <mesh position={[-0.35, 0.05, 0.035]}>
            <planeGeometry args={[0.8, 0.04]} />
            <meshBasicMaterial color="#C7FF45" />
          </mesh>
          <mesh position={[-0.15, -0.05, 0.035]}>
            <planeGeometry args={[1.2, 0.04]} />
            <meshBasicMaterial color="#FFB347" />
          </mesh>
          <mesh position={[-0.4, -0.15, 0.035]}>
            <planeGeometry args={[0.7, 0.04]} />
            <meshBasicMaterial color="#00E5FF" />
          </mesh>
          {/* Monitor Stand */}
          <mesh position={[0, -0.4, -0.1]}>
            <cylinderGeometry args={[0.04, 0.04, 0.3, 8]} />
            <meshStandardMaterial color="#40453F" metalness={0.8} />
          </mesh>
        </group>

        {/* Secondary Vertical Monitor with Santhosh's Real Photo */}
        <group position={[-1.15, 1.5, -0.25]} rotation={[0, 0.35, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.85, 1.1, 0.05]} />
            <meshStandardMaterial color="#0F120F" metalness={0.7} roughness={0.4} />
          </mesh>

          {/* Photo Display Mesh */}
          <mesh position={[0, 0, 0.03]}>
            <planeGeometry args={[0.78, 1.0]} />
            {photoTexture ? (
              <meshBasicMaterial map={photoTexture} />
            ) : (
              <meshStandardMaterial color="#FFB347" />
            )}
          </mesh>

          {/* Holographic Glowing Frame */}
          <mesh position={[0, 0, 0.035]}>
            <ringGeometry args={[0.5, 0.52, 16]} />
            <meshBasicMaterial color="#FFB347" wireframe />
          </mesh>
        </group>

        {/* Mechanical Keyboard with Backlight */}
        <mesh position={[0.2, 1.08, 0.2]}>
          <boxGeometry args={[0.8, 0.04, 0.28]} />
          <meshStandardMaterial color="#161815" roughness={0.5} />
        </mesh>

        {/* Cyber Mousepad & Precision Mouse */}
        <mesh position={[0.85, 1.06, 0.2]}>
          <planeGeometry args={[0.35, 0.3]} />
          <meshStandardMaterial color="#0A0B09" roughness={0.9} />
        </mesh>
        <mesh position={[0.85, 1.09, 0.2]}>
          <boxGeometry args={[0.09, 0.04, 0.14]} />
          <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={0.4} />
        </mesh>

        {/* Coffee Mug with Animated Steam */}
        <group position={[-0.8, 1.15, 0.2]}>
          <mesh>
            <cylinderGeometry args={[0.08, 0.07, 0.16, 12]} />
            <meshStandardMaterial color="#E8ECE5" roughness={0.3} />
          </mesh>
          {/* Steam Cloud (Floating tiny spheres) */}
          <group ref={steamParticlesRef} position={[0, 0.1, 0]}>
            <mesh position={[0.02, 0.06, 0]}>
              <sphereGeometry args={[0.03, 6, 6]} />
              <meshBasicMaterial color="#FFFFFF" transparent opacity={0.35} />
            </mesh>
            <mesh position={[-0.02, 0.12, 0.01]}>
              <sphereGeometry args={[0.035, 6, 6]} />
              <meshBasicMaterial color="#FFFFFF" transparent opacity={0.25} />
            </mesh>
            <mesh position={[0.01, 0.18, -0.01]}>
              <sphereGeometry args={[0.04, 6, 6]} />
              <meshBasicMaterial color="#FFFFFF" transparent opacity={0.15} />
            </mesh>
          </group>
        </group>

        {/* Floating Rotating Architectural Schematic Blueprint */}
        <mesh ref={hologramHoloRef} position={[0, 2.6, 0]}>
          <octahedronGeometry args={[0.45, 0]} />
          <meshStandardMaterial
            color="#FFB347"
            emissive="#FFB347"
            emissiveIntensity={1.8}
            wireframe
          />
        </mesh>

        {/* Floating 3D Interaction Billboard */}
        <group position={[0, 3.4, 0]}>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[1.2, 1.2, 0.08, 16]} />
            <meshBasicMaterial
              color="#FFB347"
              transparent
              opacity={hoveredPOI === 'workspace' ? 0.9 : 0.6}
              wireframe
            />
          </mesh>
        </group>
      </group>

      {/* ======================================================== */}
      {/* 4. GNANAMANI COLLEGE OF TECHNOLOGY ACADEMIC MONUMENT     */}
      {/* (Coordinates: [-10, 1.2, 68])                           */}
      {/* ======================================================== */}
      <group
        position={[-10, 1.2, 68]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectPOI?.('education');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
          setHoveredPOI('education');
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'auto';
          setHoveredPOI(null);
        }}
      >
        {/* Foundation Stepped Platform */}
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[6.5, 0.4, 4.5]} />
          <meshStandardMaterial
            color={hoveredPOI === 'education' ? '#252923' : '#1A1E18'}
            roughness={0.8}
          />
        </mesh>
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[5.5, 0.25, 3.8]} />
          <meshStandardMaterial color="#212620" roughness={0.8} />
        </mesh>

        {/* Twin Collegiate Academic Pillars */}
        <mesh position={[-2.0, 2.5, 0]}>
          <cylinderGeometry args={[0.4, 0.45, 4.0, 10]} />
          <meshStandardMaterial color="#2E352C" roughness={0.7} />
        </mesh>
        <mesh position={[2.0, 2.5, 0]}>
          <cylinderGeometry args={[0.4, 0.45, 4.0, 10]} />
          <meshStandardMaterial color="#2E352C" roughness={0.7} />
        </mesh>

        {/* Archway Beam */}
        <mesh position={[0, 4.6, 0]}>
          <boxGeometry args={[4.8, 0.4, 0.7]} />
          <meshStandardMaterial color="#283027" roughness={0.6} />
        </mesh>

        {/* Central Collegiate Golden Plaque */}
        <mesh position={[0, 2.8, 0]}>
          <boxGeometry args={[2.8, 2.2, 0.15]} />
          <meshStandardMaterial
            color="#141814"
            roughness={0.4}
            metalness={0.8}
          />
        </mesh>

        {/* Engraved Holographic Border on Plaque */}
        <mesh position={[0, 2.8, 0.09]}>
          <planeGeometry args={[2.6, 2.0]} />
          <meshBasicMaterial
            color="#FFB347"
            wireframe
          />
        </mesh>

        {/* Floating Amber Crest / Graduation Seal above Archway */}
        <mesh position={[0, 5.3, 0]} rotation={[0, 0, Math.PI / 4]}>
          <octahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial
            color="#FFB347"
            emissive="#FFB347"
            emissiveIntensity={2.0}
            flatShading
          />
        </mesh>

        {/* Floating Interactive Reticle for Monument */}
        <group position={[0, 6.2, 0]}>
          <mesh>
            <cylinderGeometry args={[1.0, 1.0, 0.08, 16]} />
            <meshBasicMaterial
              color="#FFB347"
              transparent
              opacity={hoveredPOI === 'education' ? 0.95 : 0.6}
              wireframe
            />
          </mesh>
        </group>
      </group>
    </group>
  );
};
