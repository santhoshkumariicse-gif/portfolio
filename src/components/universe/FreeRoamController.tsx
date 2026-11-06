import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Avatar3D, CharacterState } from './Avatar3D';

export interface FreeRoamControllerProps {
  initialPosition?: [number, number, number];
  joystickInput?: { x: number; y: number };
  onProximityPOI?: (poiId: string | null) => void;
  onInspectPOI?: (poiId: string) => void;
}

const POI_LOCATIONS = [
  { id: 'origin-coast', pos: [0, 1.5, 75], radius: 8 },
  { id: 'education', pos: [-10, 1.2, 68], radius: 7 },
  { id: 'skill-forest', pos: [-65, 5, 20], radius: 15 },
  { id: 'project-city', pos: [60, 8, -25], radius: 18 },
  { id: 'exp-mountain', pos: [-35, 24, -85], radius: 16 },
  { id: 'contact-beacon', pos: [10, 36, -135], radius: 14 }
];

export const FreeRoamController: React.FC<FreeRoamControllerProps> = ({
  initialPosition = [0, 1.5, 75],
  joystickInput = { x: 0, y: 0 },
  onProximityPOI,
  onInspectPOI
}) => {
  const { camera } = useThree();

  const posRef = useRef(new THREE.Vector3(...initialPosition));
  const rotationYRef = useRef(0);
  const [characterState, setCharacterState] = useState<CharacterState>('idle');
  const nearbyPOIRef = useRef<string | null>(null);

  // Active keyboard keys map
  const keysPressed = useRef<{ [key: string]: boolean }>({});

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = true;

      // 'KeyE' for interaction
      if (e.code === 'KeyE' && nearbyPOIRef.current) {
        onInspectPOI?.(nearbyPOIRef.current);
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = false;
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [onInspectPOI]);

  useFrame((_, delta) => {
    // 1. Gather directional input
    let moveX = 0;
    let moveZ = 0;

    const keys = keysPressed.current;
    if (keys['KeyW'] || keys['ArrowUp']) moveZ -= 1;
    if (keys['KeyS'] || keys['ArrowDown']) moveZ += 1;
    if (keys['KeyA'] || keys['ArrowLeft']) moveX -= 1;
    if (keys['KeyD'] || keys['ArrowRight']) moveX += 1;

    // Incorporate virtual joystick input
    if (Math.abs(joystickInput.x) > 0.05 || Math.abs(joystickInput.y) > 0.05) {
      moveX += joystickInput.x;
      moveZ -= joystickInput.y; // Joystick up is negative Z in world space
    }

    const inputLength = Math.sqrt(moveX * moveX + moveZ * moveZ);
    const isMoving = inputLength > 0.1;
    const isSprinting = Boolean(keys['ShiftLeft'] || keys['ShiftRight'] || inputLength > 0.85);

    if (isMoving) {
      // Normalize vector
      const normX = moveX / inputLength;
      const normZ = moveZ / inputLength;

      const speed = isSprinting ? 18 : 10;
      posRef.current.x += normX * speed * delta;
      posRef.current.z += normZ * speed * delta;

      // Boundary Clamping (Stay within Island perimeter)
      posRef.current.x = Math.max(-85, Math.min(80, posRef.current.x));
      posRef.current.z = Math.max(-140, Math.min(92, posRef.current.z));

      // Calculate approximate island ground elevation based on Z position
      if (posRef.current.z > 50) {
        posRef.current.y = 1.5; // Coastal beach
      } else if (posRef.current.z > -10) {
        posRef.current.y = 5.0; // Skill forest valley
      } else if (posRef.current.z > -60 && posRef.current.x > 30) {
        posRef.current.y = 8.0; // Project city plateau
      } else if (posRef.current.z > -110 && posRef.current.x < 0) {
        posRef.current.y = 24.0; // Experience mountain
      } else if (posRef.current.z <= -110) {
        posRef.current.y = 36.0; // Contact beacon bluff
      }

      // Compute avatar facing angle
      rotationYRef.current = Math.atan2(normX, normZ);

      const targetState: CharacterState = isSprinting ? 'running' : 'walking';
      if (characterState !== targetState) {
        setCharacterState(targetState);
      }
    } else {
      if (characterState !== 'idle') {
        setCharacterState('idle');
      }
    }

    // 2. Third-person camera follow
    const camTarget = new THREE.Vector3(
      posRef.current.x,
      posRef.current.y + 6.5,
      posRef.current.z + 14
    );
    camera.position.lerp(camTarget, 0.08);
    camera.lookAt(posRef.current.x, posRef.current.y + 1.8, posRef.current.z);

    // 3. Proximity POI Detection
    let foundNearby: string | null = null;
    for (const poi of POI_LOCATIONS) {
      const dist = posRef.current.distanceTo(new THREE.Vector3(...poi.pos));
      if (dist < poi.radius) {
        foundNearby = poi.id;
        break;
      }
    }

    if (foundNearby !== nearbyPOIRef.current) {
      nearbyPOIRef.current = foundNearby;
      onProximityPOI?.(foundNearby);
    }
  });

  return (
    <Avatar3D
      state={characterState}
      position={[posRef.current.x, posRef.current.y, posRef.current.z]}
      rotation={[0, rotationYRef.current, 0]}
      scale={1.2}
    />
  );
};

