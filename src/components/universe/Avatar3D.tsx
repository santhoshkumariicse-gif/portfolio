import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export type CharacterState =
  | 'idle'
  | 'walking'
  | 'running'
  | 'thinking'
  | 'coding'
  | 'celebrating'
  | 'interacting'
  | 'future';

export interface Avatar3DProps {
  state?: CharacterState;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

export const Avatar3D: React.FC<Avatar3DProps> = ({
  state = 'idle',
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  // Character Color Palette Anchors (Matching authentic Santhosh photo)
  const skinColor = '#BA7E55';
  const hairColor = '#121410';
  const jacketColor = '#171A15';
  const limePiping = '#C7FF45';
  const pantsColor = '#10120F';
  const shoesColor = '#1E231C';

  // Procedural Skeletal Kinematics
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (state === 'walking') {
      const walkSpeed = 6;
      if (leftLegRef.current) leftLegRef.current.rotation.x = Math.sin(t * walkSpeed) * 0.45;
      if (rightLegRef.current) rightLegRef.current.rotation.x = -Math.sin(t * walkSpeed) * 0.45;
      if (leftArmRef.current) leftArmRef.current.rotation.x = -Math.sin(t * walkSpeed) * 0.45;
      if (rightArmRef.current) rightArmRef.current.rotation.x = Math.sin(t * walkSpeed) * 0.45;
      if (groupRef.current) groupRef.current.position.y = position[1] + Math.abs(Math.sin(t * walkSpeed)) * 0.08;
    } else if (state === 'running') {
      const runSpeed = 10;
      if (leftLegRef.current) leftLegRef.current.rotation.x = Math.sin(t * runSpeed) * 0.8;
      if (rightLegRef.current) rightLegRef.current.rotation.x = -Math.sin(t * runSpeed) * 0.8;
      if (leftArmRef.current) leftArmRef.current.rotation.x = -Math.sin(t * runSpeed) * 0.8;
      if (rightArmRef.current) rightArmRef.current.rotation.x = Math.sin(t * runSpeed) * 0.8;
      if (groupRef.current) groupRef.current.position.y = position[1] + Math.abs(Math.sin(t * runSpeed)) * 0.15;
    } else if (state === 'thinking') {
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x = -1.2;
        rightArmRef.current.rotation.z = -0.5;
      }
      if (leftArmRef.current) {
        leftArmRef.current.rotation.x = -0.3;
        leftArmRef.current.rotation.z = 0.2;
      }
      if (headRef.current) headRef.current.rotation.y = 0.2;
    } else if (state === 'celebrating') {
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x = -2.6 + Math.sin(t * 8) * 0.15;
        rightArmRef.current.rotation.z = -0.3;
      }
      if (leftArmRef.current) {
        leftArmRef.current.rotation.x = -2.6 + Math.cos(t * 8) * 0.15;
        leftArmRef.current.rotation.z = 0.3;
      }
    } else if (state === 'coding') {
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x = -1.3 + Math.sin(t * 12) * 0.08;
        rightArmRef.current.rotation.z = -0.2;
      }
      if (leftArmRef.current) {
        leftArmRef.current.rotation.x = -1.3 + Math.cos(t * 12) * 0.08;
        leftArmRef.current.rotation.z = 0.2;
      }
    } else if (state === 'interacting') {
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x = -1.6;
        rightArmRef.current.rotation.y = -0.4;
      }
      if (headRef.current) headRef.current.rotation.x = -0.25;
    } else if (state === 'future') {
      if (headRef.current) {
        headRef.current.rotation.y = -0.4;
        headRef.current.rotation.x = -0.15;
      }
      if (rightArmRef.current) rightArmRef.current.rotation.x = -0.2;
    } else {
      // Idle gentle breathing oscillation
      if (groupRef.current) groupRef.current.position.y = position[1] + Math.sin(t * 2) * 0.03;
      if (leftArmRef.current) leftArmRef.current.rotation.x = Math.sin(t * 2) * 0.05;
      if (rightArmRef.current) rightArmRef.current.rotation.x = -Math.sin(t * 2) * 0.05;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={[scale, scale, scale]}
      name="santhosh-avatar-3d"
    >
      {/* 1. Pelvis & Torso Base */}
      <group position={[0, 0.95, 0]}>
        {/* Tactical Cyber Jacket Body */}
        <mesh position={[0, 0.25, 0]}>
          <boxGeometry args={[0.55, 0.65, 0.32]} />
          <meshStandardMaterial color={jacketColor} roughness={0.7} />
        </mesh>

        {/* Electric Lime Collar Trim */}
        <mesh position={[0, 0.58, 0.08]}>
          <boxGeometry args={[0.3, 0.06, 0.2]} />
          <meshStandardMaterial color={limePiping} emissive={limePiping} emissiveIntensity={0.8} />
        </mesh>

        {/* Chest ID Holographic Badge */}
        <mesh position={[0.15, 0.42, 0.17]}>
          <boxGeometry args={[0.12, 0.06, 0.02]} />
          <meshStandardMaterial color={limePiping} emissive={limePiping} emissiveIntensity={1.2} />
        </mesh>

        {/* Head & Hair Sub-Hierarchy */}
        <group ref={headRef} position={[0, 0.68, 0]}>
          {/* Neck */}
          <mesh position={[0, 0.06, 0]}>
            <cylinderGeometry args={[0.09, 0.1, 0.12, 10]} />
            <meshStandardMaterial color={skinColor} />
          </mesh>

          {/* Head Skull */}
          <mesh position={[0, 0.25, 0]}>
            <boxGeometry args={[0.34, 0.38, 0.32]} />
            <meshStandardMaterial color={skinColor} roughness={0.8} />
          </mesh>

          {/* Styled Obsidian Hair */}
          <mesh position={[0, 0.42, 0.02]}>
            <boxGeometry args={[0.38, 0.16, 0.36]} />
            <meshStandardMaterial color={hairColor} roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.38, -0.1]}>
            <boxGeometry args={[0.36, 0.24, 0.18]} />
            <meshStandardMaterial color={hairColor} roughness={0.9} />
          </mesh>
        </group>

        {/* Left Arm Rig */}
        <group ref={leftArmRef} position={[-0.34, 0.52, 0]}>
          <mesh position={[0, -0.26, 0]}>
            <boxGeometry args={[0.14, 0.55, 0.14]} />
            <meshStandardMaterial color={jacketColor} />
          </mesh>
          {/* Hand */}
          <mesh position={[0, -0.58, 0]}>
            <boxGeometry args={[0.11, 0.12, 0.11]} />
            <meshStandardMaterial color={skinColor} />
          </mesh>
        </group>

        {/* Right Arm Rig */}
        <group ref={rightArmRef} position={[0.34, 0.52, 0]}>
          <mesh position={[0, -0.26, 0]}>
            <boxGeometry args={[0.14, 0.55, 0.14]} />
            <meshStandardMaterial color={jacketColor} />
          </mesh>
          {/* Hand */}
          <mesh position={[0, -0.58, 0]}>
            <boxGeometry args={[0.11, 0.12, 0.11]} />
            <meshStandardMaterial color={skinColor} />
          </mesh>
        </group>
      </group>

      {/* 2. Lower Body (Legs & Shoes) */}
      <group position={[0, 0, 0]}>
        {/* Left Leg Rig */}
        <group ref={leftLegRef} position={[-0.15, 0.95, 0]}>
          <mesh position={[0, -0.45, 0]}>
            <boxGeometry args={[0.16, 0.9, 0.18]} />
            <meshStandardMaterial color={pantsColor} />
          </mesh>
          {/* Shoe */}
          <mesh position={[0, -0.92, 0.05]}>
            <boxGeometry args={[0.18, 0.12, 0.28]} />
            <meshStandardMaterial color={shoesColor} />
          </mesh>
        </group>

        {/* Right Leg Rig */}
        <group ref={rightLegRef} position={[0.15, 0.95, 0]}>
          <mesh position={[0, -0.45, 0]}>
            <boxGeometry args={[0.16, 0.9, 0.18]} />
            <meshStandardMaterial color={pantsColor} />
          </mesh>
          {/* Shoe */}
          <mesh position={[0, -0.92, 0.05]}>
            <boxGeometry args={[0.18, 0.12, 0.28]} />
            <meshStandardMaterial color={shoesColor} />
          </mesh>
        </group>
      </group>
    </group>
  );
};

