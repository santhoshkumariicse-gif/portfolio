import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { DETAILED_HIGHWAY_MILESTONES, HighwayMilestoneData } from './HighwayMilestones';
import { HIGHWAY_SPLINE } from './HighwaySpline';
import { useHighwayState } from './HighwayStateContext';
import { SoundFX } from '../../utils/SoundFX';

interface SingleBillboardProps {
  data: HighwayMilestoneData;
  onSelect: (data: HighwayMilestoneData) => void;
}

const SingleBillboard: React.FC<SingleBillboardProps> = ({ data, onSelect }) => {
  const meshRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const { camera } = useThree();
  const { currentSection } = useHighwayState();

  const isActive = Math.abs(currentSection.km - data.km) < 0.45;

  // Load texture with standard Three.js TextureLoader to handle base URLs safely
  useEffect(() => {
    let isMounted = true;
    const loader = new THREE.TextureLoader();
    loader.load(
      data.imageAsset,
      (loadedTex) => {
        if (!isMounted) return;
        loadedTex.colorSpace = THREE.SRGBColorSpace;
        loadedTex.minFilter = THREE.LinearMipmapLinearFilter;
        loadedTex.generateMipmaps = true;
        setTexture(loadedTex);
      },
      undefined,
      (err) => {
        console.warn(`[HighwayBillboard] Could not load texture: ${data.imageAsset}`, err);
      }
    );
    return () => {
      isMounted = false;
    };
  }, [data.imageAsset]);

  // Compute 3D Position and Orientation along the Spline
  const { position, rotationY, width, height } = React.useMemo(() => {
    const pt = HIGHWAY_SPLINE.getPointAt(data.progress);
    const tangent = HIGHWAY_SPLINE.getTangentAt(data.progress).normalize();
    const upVector = new THREE.Vector3(0, 1, 0);
    const right = new THREE.Vector3().crossVectors(tangent, upVector).normalize();

    const [w, h] = data.billboardSize;
    let offsetVector = new THREE.Vector3();
    let yPos = h / 2 + 3.0;

    const lateral = data.lateralOffset ?? (data.side === 'left' ? -14.0 : 14.0);

    if (data.side === 'left' || data.side === 'right') {
      offsetVector = right.clone().multiplyScalar(lateral);
    } else {
      // Overhead Gantry spanning across the highway
      yPos = 11.5;
    }

    const finalPos = pt.clone().add(offsetVector);
    finalPos.y += yPos;

    // Angle perpendicular to tangent or angled slightly towards the road center
    const angle = Math.atan2(tangent.x, tangent.z);
    let rotY = angle + Math.PI;

    if (data.side === 'left') {
      rotY += 0.22; // angled inward toward driver
    } else if (data.side === 'right') {
      rotY -= 0.22; // angled inward toward driver
    }

    return {
      position: [finalPos.x, finalPos.y, finalPos.z] as [number, number, number],
      rotationY: rotY,
      width: w,
      height: h
    };
  }, [data]);

  // Proximity and subtle hover float in useFrame
  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Calculate distance to camera
    const dist = camera.position.distanceTo(meshRef.current.position);
    const isNearby = dist < 75;

    // Pulse glow when nearby or active
    if (glowRef.current) {
      const glowMat = glowRef.current.material as THREE.MeshBasicMaterial;
      if (glowMat) {
        const targetOpacity = isActive || hovered
          ? 0.75 + Math.sin(state.clock.elapsedTime * 4) * 0.2
          : (isNearby ? 0.35 : 0.15);
        glowMat.opacity = THREE.MathUtils.damp(glowMat.opacity, targetOpacity, 6, delta);
      }
    }

    // Subtle scale animation on hover or when active
    const targetScale = hovered ? 1.05 : (isActive ? 1.025 : 1.0);
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 8);
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    SoundFX.playClick();
    onSelect(data);
  };

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
    setHovered(true);
    SoundFX.playHover();
  };

  const handlePointerOut = () => {
    document.body.style.cursor = 'auto';
    setHovered(false);
  };

  const isKM1Personal = data.id === 'km-1';

  return (
    <group
      ref={meshRef}
      position={position}
      rotation={[0, rotationY, 0]}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* 1. Structural Truss Framework / Backing Frame - Carbon Black */}
      <mesh position={[0, 0, -0.4]}>
        <boxGeometry args={[width + 0.8, height + 0.8, 0.6]} />
        <meshStandardMaterial
          color="#171B20"
          metalness={0.9}
          roughness={0.25}
        />
      </mesh>

      {/* 2. Racing Red / Signal Red Perimeter Glow Border */}
      <mesh ref={glowRef} position={[0, 0, -0.05]}>
        <planeGeometry args={[width + 1.2, height + 1.2]} />
        <meshBasicMaterial
          color={data.accentColor}
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 3. Main Billboard Display Surface */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[width, height]} />
        {texture ? (
          <meshBasicMaterial
            map={texture}
            side={THREE.DoubleSide}
          />
        ) : (
          <meshStandardMaterial
            color="#171B20"
            roughness={0.6}
            metalness={0.3}
            side={THREE.DoubleSide}
          />
        )}
      </mesh>

      {/* Dedicated High-CRI Natural Spotlight for KM 1 Personal Photo Billboard */}
      {isKM1Personal && (
        <group position={[0, height / 2 + 1.5, 3]}>
          <pointLight color="#F4FBF7" intensity={2.8} distance={24} />
          <pointLight color="#FF3548" intensity={0.6} distance={16} position={[0, -height, 1]} />
          <mesh>
            <sphereGeometry args={[0.18, 8, 8]} />
            <meshBasicMaterial color="#F2F4F7" />
          </mesh>
        </group>
      )}

      {/* 4. Top Gantry Indicator Bar with Milestone Code */}
      <group position={[0, height / 2 + 0.6, 0.1]}>
        {/* Banner Bar */}
        <mesh>
          <boxGeometry args={[width, 0.8, 0.3]} />
          <meshStandardMaterial color="#171B20" metalness={0.92} roughness={0.2} />
        </mesh>
        {/* Neon Light Accent */}
        <mesh position={[0, 0, 0.18]}>
          <planeGeometry args={[width * 0.95, 0.12]} />
          <meshBasicMaterial color={data.accentColor} />
        </mesh>
      </group>

      {/* 5. Bottom Status Plate with Stat Badge */}
      <group position={[0, -height / 2 - 0.6, 0.1]}>
        <mesh>
          <boxGeometry args={[width, 0.8, 0.3]} />
          <meshStandardMaterial color="#171B20" metalness={0.92} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.18]}>
          <planeGeometry args={[width * 0.95, 0.12]} />
          <meshBasicMaterial color={data.accentColor} />
        </mesh>
      </group>

      {/* 6. Ground Support Pylons (if side billboard) */}
      {data.side !== 'overhead' && (
        <group position={[0, -height / 2 - 3.5, -0.4]}>
          <mesh position={[-width * 0.35, 0, 0]}>
            <cylinderGeometry args={[0.25, 0.35, 7.0, 12]} />
            <meshStandardMaterial color="#20252C" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[width * 0.35, 0, 0]}>
            <cylinderGeometry args={[0.25, 0.35, 7.0, 12]} />
            <meshStandardMaterial color="#20252C" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>
      )}

      {/* 7. Overhead Arch Support Columns (if overhead billboard) */}
      {data.side === 'overhead' && (
        <group position={[0, -height / 2 - 5.5, -0.4]}>
          <mesh position={[-width / 2 - 1.5, 0, 0]}>
            <cylinderGeometry args={[0.45, 0.6, 12.0, 12]} />
            <meshStandardMaterial color="#20252C" metalness={0.85} roughness={0.25} />
          </mesh>
          <mesh position={[width / 2 + 1.5, 0, 0]}>
            <cylinderGeometry args={[0.45, 0.6, 12.0, 12]} />
            <meshStandardMaterial color="#20252C" metalness={0.85} roughness={0.25} />
          </mesh>
        </group>
      )}
    </group>
  );
};

export interface HighwayBillboardsMeshProps {
  onSelectMilestone: (data: HighwayMilestoneData) => void;
}

export const HighwayBillboardsMesh: React.FC<HighwayBillboardsMeshProps> = ({ onSelectMilestone }) => {
  return (
    <group name="HighwayMilestoneBillboards">
      {DETAILED_HIGHWAY_MILESTONES.map((milestone) => (
        <SingleBillboard
          key={milestone.id}
          data={milestone}
          onSelect={onSelectMilestone}
        />
      ))}
    </group>
  );
};
