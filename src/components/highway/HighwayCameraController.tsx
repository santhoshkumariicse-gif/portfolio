import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useHighwayState } from './HighwayStateContext';
import { getPointAtProgress, getTangentAtProgress } from './HighwaySpline';

export interface HighwayCameraControllerProps {
  inputState: {
    forward: boolean;
    backward: boolean;
    left: boolean;
    right: boolean;
    wheelDelta: number;
  };
}

export const HighwayCameraController: React.FC<HighwayCameraControllerProps> = ({ inputState }) => {
  const { camera } = useThree();
  const { progress, speed, steerOffset, cameraView, toggleCameraView, stepFrame } = useHighwayState();

  const camTargetPos = useRef(new THREE.Vector3(0, 4, 16));
  const lookTarget = useRef(new THREE.Vector3(0, 2, -20));
  const upVector = new THREE.Vector3(0, 1, 0);

  // Keyboard shortcut 'c' or 'C' to toggle camera view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'c' || e.key === 'C') {
        toggleCameraView();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleCameraView]);

  useFrame((state, delta) => {
    // 1. Advance Physics & Progression Step
    stepFrame(delta, inputState);

    // 2. Compute 3D Coordinates along Spline
    const pt = getPointAtProgress(progress);
    const tangent = getTangentAtProgress(progress);
    const right = new THREE.Vector3().crossVectors(tangent, upVector).normalize();

    // Virtual Vehicle / Traveler Position with Lateral Steering
    const travelerPos = pt.clone().addScaledVector(right, steerOffset);

    // High-speed micro-shake when traveling over 55 km/h
    const shakeIntensity = speed > 55 ? ((speed - 55) / 100) * 0.08 : 0;
    const shakeX = (Math.sin(state.clock.elapsedTime * 45) * shakeIntensity);
    const shakeY = (Math.cos(state.clock.elapsedTime * 38) * shakeIntensity);

    // 3. Dual Camera Mode Positioning
    let targetCam: THREE.Vector3;
    let targetLook: THREE.Vector3;

    if (cameraView === 'cockpit') {
      // First-Person Cockpit View: Low & Forward
      targetCam = travelerPos
        .clone()
        .addScaledVector(tangent, 1.2)
        .add(new THREE.Vector3(shakeX, 1.35 + shakeY, 0));

      targetLook = travelerPos
        .clone()
        .addScaledVector(tangent, 38.0)
        .add(new THREE.Vector3(0, 1.2, 0));
    } else {
      // Third-Person Chase Cam: Cinematic Follow
      targetCam = travelerPos
        .clone()
        .addScaledVector(tangent, -16.5)
        .add(new THREE.Vector3(shakeX, 4.4 + shakeY, 0))
        .addScaledVector(right, steerOffset * 0.35);

      targetLook = travelerPos
        .clone()
        .addScaledVector(tangent, 26.0)
        .add(new THREE.Vector3(0, 1.9, 0));
    }

    // Dynamic FOV widening based on vehicle speed (from 55° up to 72°)
    if ('fov' in camera) {
      const targetFOV = 55 + Math.min(17, (speed / 120) * 17);
      const perspCam = camera as THREE.PerspectiveCamera;
      perspCam.fov = THREE.MathUtils.damp(perspCam.fov, targetFOV, 4.5, delta);
      perspCam.updateProjectionMatrix();
    }

    // Smooth Exponential Lerp
    const lerpFactor = 1.0 - Math.exp(-9.0 * delta);
    camTargetPos.current.lerp(targetCam, lerpFactor);
    lookTarget.current.lerp(targetLook, lerpFactor);

    camera.position.copy(camTargetPos.current);
    camera.lookAt(lookTarget.current);
  });

  return null;
};
