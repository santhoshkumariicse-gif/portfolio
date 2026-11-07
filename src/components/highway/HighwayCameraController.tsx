import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useHighwayState } from './HighwayStateContext';
import { getPointAtProgress, getTangentAtProgress } from './HighwaySpline';

export const HighwayCameraController: React.FC = () => {
  const { camera } = useThree();
  const { progress, stepFrame, isTransitioning } = useHighwayState();

  const camTargetPos = useRef(new THREE.Vector3(0, 4, 16));
  const lookTarget = useRef(new THREE.Vector3(0, 2, -20));

  useFrame((state, delta) => {
    // 1. Step progress animation towards target section
    stepFrame(delta);

    // 2. Compute 3D Coordinates along Spline
    const pt = getPointAtProgress(progress);
    const tangent = getTangentAtProgress(progress);

    // Subtle breathing float when stationary at a section, subtle travel feel when moving
    const floatY = isTransitioning ? Math.sin(state.clock.elapsedTime * 8) * 0.05 : Math.sin(state.clock.elapsedTime * 1.5) * 0.04;

    // Third-person cinematic follower along the highway spline
    const targetCam = pt
      .clone()
      .addScaledVector(tangent, -15.5)
      .add(new THREE.Vector3(0, 4.4 + floatY, 0));

    // Look forward along spline towards the active section's billboard
    const targetLook = pt
      .clone()
      .addScaledVector(tangent, 26.0)
      .add(new THREE.Vector3(0, 2.2, 0));

    // Dynamic FOV widening slightly when gliding between sections
    if ('fov' in camera) {
      const targetFOV = isTransitioning ? 62 : 55;
      const perspCam = camera as THREE.PerspectiveCamera;
      perspCam.fov = THREE.MathUtils.damp(perspCam.fov, targetFOV, 3.5, delta);
      perspCam.updateProjectionMatrix();
    }

    // Smooth Exponential Lerp
    const lerpFactor = 1.0 - Math.exp(-8.0 * delta);
    camTargetPos.current.lerp(targetCam, lerpFactor);
    lookTarget.current.lerp(targetLook, lerpFactor);

    camera.position.copy(camTargetPos.current);
    camera.lookAt(lookTarget.current);
  });

  return null;
};
