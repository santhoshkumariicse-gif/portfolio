import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useHighwayState } from './HighwayStateContext';
import { getPointAtProgress, getTangentAtProgress } from './HighwaySpline';

export const HighwayCameraController: React.FC = () => {
  const { camera } = useThree();
  const { progress, stepFrame, isTransitioning, currentSection } = useHighwayState();

  const camTargetPos = useRef(new THREE.Vector3(0, 4, 16));
  const lookTarget = useRef(new THREE.Vector3(0, 2, -20));
  const openingStartRef = useRef<number | null>(null);

  useFrame((state, delta) => {
    // 1. Step progress animation towards target section
    stepFrame(delta);

    if (openingStartRef.current === null) {
      const isSkip = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('skipIntro') === 'true';
      openingStartRef.current = isSkip ? -10 : state.clock.elapsedTime;
    }
    const openingElapsed = state.clock.elapsedTime - openingStartRef.current;
    const openingAmount = THREE.MathUtils.smoothstep(openingElapsed, 0.25, 3.0);
    const openingProgress = THREE.MathUtils.lerp(0, progress, openingAmount);

    // 2. Compute 3D Coordinates along Spline
    const activeProgress = openingElapsed < 3.0 ? openingProgress : progress;
    const pt = getPointAtProgress(activeProgress);
    const tangent = getTangentAtProgress(activeProgress);

    // Subtle breathing float when stationary at a section, subtle travel feel when moving
    const floatY = isTransitioning ? Math.sin(state.clock.elapsedTime * 8) * 0.05 : Math.sin(state.clock.elapsedTime * 1.5) * 0.04;

    // Editorial viewing rig: stop at the milestone and move slightly off-axis so
    // the billboard and dashboard share the cinematic frame.
    const isMobile = state.size.width < 768;
    const right = new THREE.Vector3().crossVectors(tangent, new THREE.Vector3(0, 1, 0)).normalize();
    const billboardSideOffset = currentSection.id === 'about'
      ? -4.5
      : currentSection.id === 'education' || currentSection.id === 'experience'
        ? 4.5
        : currentSection.id === 'interests'
          ? -4.5
        : 0;

    const camDistance = isMobile ? -18.5 : -15.5;
    const camHeight = isMobile ? 3.8 : 4.4;
    const lookOffset = isMobile ? billboardSideOffset * 0.75 : billboardSideOffset * 0.28;

    const targetCam = pt
      .clone()
      .addScaledVector(tangent, camDistance)
      .addScaledVector(right, billboardSideOffset * (isMobile ? 0.6 : 1.0))
      .add(new THREE.Vector3(0, camHeight + floatY, 0));

    // Look forward along spline towards the active section's billboard
    const targetLook = pt
      .clone()
      .addScaledVector(tangent, 22.0)
      .addScaledVector(right, lookOffset)
      .add(new THREE.Vector3(0, isMobile ? 3.0 : 2.2, 0));

    // Dynamic FOV widening slightly when gliding between sections or on mobile portrait
    if ('fov' in camera) {
      const isMobile = state.size.width < 768;
      const baseFOV = isMobile ? 68 : 55;
      const openingFOV = openingElapsed < 3.0 ? THREE.MathUtils.lerp(isMobile ? 76 : 64, baseFOV, openingAmount) : baseFOV;
      const targetFOV = isTransitioning ? baseFOV + 6 : openingFOV;
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
