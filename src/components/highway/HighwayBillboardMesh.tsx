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

const loadImage = (src: string): Promise<HTMLImageElement | null> =>
  new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = src;
  });

const wrapText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
  const words = text.split(/\s+/);
  let line = '';
  let currentY = y;
  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, currentY);
      line = word;
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  });
  if (line) ctx.fillText(line, x, currentY);
};

const createBillboardTexture = async (data: HighwayMilestoneData): Promise<THREE.CanvasTexture | null> => {
  const canvas = document.createElement('canvas');
  canvas.width = 1536;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.fillStyle = data.category === 'profile' ? '#090B0E' : '#F2F4F7';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#E10620';
  ctx.fillRect(0, 0, 24, canvas.height);

  ctx.fillStyle = data.category === 'profile' ? '#F2F4F7' : '#090B0E';
  ctx.font = '700 42px "JetBrains Mono", monospace';
  ctx.fillText(`${data.codeName.replace('SAN-', '').replace('-', ' ')}`, 82, 78);

  ctx.fillStyle = '#E10620';
  ctx.font = '800 32px "JetBrains Mono", monospace';
  ctx.fillText(`${data.statBadge.label} / ${data.statBadge.value}`, 82, 130);

  const baseUrl = import.meta.env.BASE_URL || '/';
  const profileImage = await loadImage(`${baseUrl}assets/profile/santhosh-profile-formal.jpg`);
  const showcaseImage = await loadImage(data.imageAsset);

  if (data.category === 'profile') {
    if (profileImage) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(82, 170, 650, 760);
      ctx.clip();
      ctx.drawImage(profileImage, 82, 170, 650, 760);
      ctx.restore();
      ctx.strokeStyle = '#C9D0D8';
      ctx.lineWidth = 8;
      ctx.strokeRect(82, 170, 650, 760);
    }
    ctx.fillStyle = '#F2F4F7';
    ctx.font = '900 82px Inter, sans-serif';
    ctx.fillText('SANTHOSH', 790, 330);
    ctx.fillText('KUMAR M', 790, 426);
    ctx.fillStyle = '#FF3548';
    ctx.fillRect(790, 462, 520, 8);
    ctx.fillStyle = '#C9D0D8';
    ctx.font = '700 34px "JetBrains Mono", monospace';
    wrapText(ctx, 'Computer Science Engineer', 790, 548, 620, 48);
    ctx.fillStyle = '#F2F4F7';
    wrapText(ctx, 'Developer | Cybersecurity Enthusiast', 790, 610, 620, 48);
  } else if (data.category === 'education') {
    if (profileImage) {
      ctx.drawImage(profileImage, 82, 175, 430, 670);
    }
    ctx.fillStyle = '#090B0E';
    ctx.font = '900 58px Inter, sans-serif';
    ctx.fillText('ABOUT SANTHOSH', 580, 240);
    ctx.font = '700 30px "JetBrains Mono", monospace';
    ctx.fillStyle = '#626C78';
    wrapText(ctx, 'Cybersecurity-focused Computer Science Engineering student interested in web application security, vulnerability assessment, and software development.', 580, 320, 820, 48);
    ctx.fillStyle = '#090B0E';
    ctx.font = '800 36px Inter, sans-serif';
    wrapText(ctx, 'B.E. COMPUTER SCIENCE & ENGINEERING', 580, 500, 820, 48);
    ctx.font = '700 28px "JetBrains Mono", monospace';
    ctx.fillStyle = '#626C78';
    wrapText(ctx, 'Gnanamani College of Technology  /  Namakkal, Tamil Nadu', 580, 610, 820, 42);
    wrapText(ctx, 'Graduation 2027  /  GPA 7.2 / 10', 580, 720, 820, 42);
  } else if (data.category === 'skills') {
    ctx.fillStyle = '#090B0E';
    ctx.font = '900 72px Inter, sans-serif';
    ctx.fillText('TECHNICAL SKILLS', 82, 238);
    const categories = [
      ['PROGRAMMING', 'Python  /  Java  /  C'],
      ['CYBERSECURITY', 'Web Security  /  CTF  /  Vulnerability Assessment'],
      ['OPERATING SYSTEMS', 'Linux  /  Windows'],
      ['TOOLS', 'Git  /  Command Line']
    ];
    categories.forEach(([title, items], index) => {
      const x = index % 2 === 0 ? 82 : 790;
      const y = index < 2 ? 360 : 680;
      ctx.fillStyle = '#E10620';
      ctx.fillRect(x, y - 40, 560, 8);
      ctx.fillStyle = '#090B0E';
      ctx.font = '800 30px "JetBrains Mono", monospace';
      ctx.fillText(title, x, y + 10);
      ctx.fillStyle = '#626C78';
      ctx.font = '700 27px Inter, sans-serif';
      wrapText(ctx, items, x, y + 66, 560, 38);
    });
  } else if (data.category === 'project' && data.projectDetails) {
    if (showcaseImage) ctx.drawImage(showcaseImage, 82, 190, 650, 700);
    ctx.fillStyle = '#090B0E';
    ctx.font = '900 58px Inter, sans-serif';
    wrapText(ctx, data.projectDetails.name.toUpperCase(), 790, 260, 650, 70);
    ctx.fillStyle = '#626C78';
    ctx.font = '700 28px Inter, sans-serif';
    wrapText(ctx, data.projectDetails.desc, 790, 390, 650, 42);
    ctx.fillStyle = '#E10620';
    ctx.font = '800 24px "JetBrains Mono", monospace';
    wrapText(ctx, data.projectDetails.tags.join('  /  '), 790, 620, 650, 38);
  } else if (data.category === 'experience') {
    ctx.fillStyle = '#090B0E';
    ctx.font = '900 70px Inter, sans-serif';
    ctx.fillText('INTERNSHIP EXPERIENCE', 82, 240);
    const roles = [
      ['CYBERNAUT', 'Python Developer Intern', 'July 2024 — Present'],
      ['ELITA', 'Web & App Development Intern', 'July 2025 — August 2025']
    ];
    roles.forEach(([company, role, period], index) => {
      const x = index === 0 ? 82 : 790;
      ctx.fillStyle = '#E10620';
      ctx.fillRect(x, 330, 560, 8);
      ctx.fillStyle = '#090B0E';
      ctx.font = '900 42px Inter, sans-serif';
      ctx.fillText(company, x, 420);
      ctx.fillStyle = '#626C78';
      ctx.font = '700 26px "JetBrains Mono", monospace';
      wrapText(ctx, role, x, 488, 560, 38);
      ctx.fillStyle = '#090B0E';
      wrapText(ctx, period, x, 590, 560, 38);
    });
  } else if (data.category === 'cybersecurity') {
    ctx.fillStyle = '#090B0E';
    ctx.font = '900 64px Inter, sans-serif';
    ctx.fillText('CERTIFICATIONS & ACHIEVEMENTS', 82, 230);
    ctx.font = '800 30px "JetBrains Mono", monospace';
    ctx.fillStyle = '#E10620';
    ctx.fillText('CERTIFICATIONS', 82, 340);
    ctx.fillStyle = '#626C78';
    ctx.font = '700 27px Inter, sans-serif';
    wrapText(ctx, 'PortSwigger Web Security Academy practice and Gnanamani coursework in Ethical Hacking and Penetration Testing.', 82, 400, 620, 42);
    ctx.fillStyle = '#E10620';
    ctx.font = '800 30px "JetBrains Mono", monospace';
    ctx.fillText('ACHIEVEMENTS', 790, 340);
    ctx.fillStyle = '#626C78';
    ctx.font = '700 27px Inter, sans-serif';
    wrapText(ctx, 'Cybersecurity Club peer workshops / Inter-college CTF participation / 7.2 / 10 academic record', 790, 400, 620, 42);
  } else if (data.category === 'destination') {
    ctx.fillStyle = '#090B0E';
    ctx.font = '900 82px Inter, sans-serif';
    ctx.fillText('CONTACT', 82, 300);
    ctx.fillStyle = '#E10620';
    ctx.fillRect(82, 340, 520, 10);
    ctx.fillStyle = '#626C78';
    ctx.font = '700 34px "JetBrains Mono", monospace';
    wrapText(ctx, 'santhoshkumar160706@gmail.com', 82, 430, 700, 48);
    wrapText(ctx, '+91 9345402493', 82, 520, 700, 48);
    wrapText(ctx, 'Namakkal, Tamil Nadu, India', 82, 610, 700, 48);
    ctx.fillStyle = '#090B0E';
    ctx.font = '800 28px Inter, sans-serif';
    wrapText(ctx, 'linkedin.com/in/santhosh-kumar-8681612a4', 82, 720, 700, 42);
    wrapText(ctx, 'github.com/santhoshkumariicse-gif', 82, 790, 700, 42);
  }

  ctx.fillStyle = '#090B0E';
  ctx.fillRect(0, 950, canvas.width, 74);
  ctx.fillStyle = '#F2F4F7';
  ctx.font = '800 26px "JetBrains Mono", monospace';
  ctx.fillText(`SECTION ${data.id.replace('km-', '').padStart(2, '0')}  /  THE ROAD OF SANTHOSH`, 82, 1000);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.generateMipmaps = true;
  return texture;
};

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
    createBillboardTexture(data).then((canvasTexture) => {
      if (!isMounted || !canvasTexture) return;
      setTexture(canvasTexture);
    });
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
  // Alternating mix of light grey and dark carbon panels as per design specification
  const isLightFrame = Math.round(data.km) % 2 === 0;
  const frameColor = isLightFrame ? '#F2F4F7' : '#171B20';
  const frameMetalness = isLightFrame ? 0.4 : 0.88;
  const frameRoughness = isLightFrame ? 0.35 : 0.22;

  return (
    <group
      ref={meshRef}
      position={position}
      rotation={[0, rotationY, 0]}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* 1. Structural Truss Framework / Backing Frame - Mix of Light Grey & Carbon Black */}
      <mesh position={[0, 0, -0.4]}>
        <boxGeometry args={[width + 0.8, height + 0.8, 0.6]} />
        <meshStandardMaterial
          color={frameColor}
          metalness={frameMetalness}
          roughness={frameRoughness}
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
            color={frameColor}
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
          <meshStandardMaterial color={frameColor} metalness={frameMetalness} roughness={frameRoughness} />
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
          <meshStandardMaterial color={frameColor} metalness={frameMetalness} roughness={frameRoughness} />
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
