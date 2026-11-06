import React, { useRef } from 'react';
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
  const { progress, steerOffset, stepFrame } = useHighwayState();

  const camTargetPos = useRef(new THREE.Vector3(0, 4, 16));
  const lookTarget = useRef(new THREE.Vector3(0, 2, -20));
  const upVector = new THREE.Vector3(0, 1, 0);

  useFrame((_, delta) => {
    // 1. Advance Physics & Progression Step
    stepFrame(delta, inputState);

    // 2. Compute 3D Coordinates along Spline
    const pt = getPointAtProgress(progress);
    const tangent = getTangentAtProgress(progress);
    const right = new THREE.Vector3().crossVectors(tangent, upVector).normalize();

    // Virtual Vehicle / Traveler Position with Lateral Steering
    const travelerPos = pt.clone().addScaledVector(right, steerOffset);

    // Camera Position: 16 units behind, 4.2 units above
    const targetCam = travelerPos
      .clone()
      .addScaledVector(tangent, -16.0)
      .add(new THREE.Vector3(0, 4.2, 0))
      .addScaledVector(right, steerOffset * 0.35);

    // Camera Look Target: 26 units ahead along tangent
    const targetLook = travelerPos
      .clone()
      .addScaledVector(tangent, 26.0)
      .add(new THREE.Vector3(0, 1.8, 0));

    // Smooth Exponential Lerp
    const lerpFactor = 1.0 - Math.exp(-8.5 * delta);
    camTargetPos.current.lerp(targetCam, lerpFactor);
    lookTarget.current.lerp(targetLook, lerpFactor);

    camera.position.copy(camTargetPos.current);
    camera.lookAt(lookTarget.current);
  });

  return null;
};

