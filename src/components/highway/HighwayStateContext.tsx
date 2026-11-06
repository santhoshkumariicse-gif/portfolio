import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import * as THREE from 'three';
import { HIGHWAY_MILESTONES, HighwayMilestone, getNearestMilestone } from './HighwaySpline';
import { SoundFX } from '../../utils/SoundFX';

export type TravelMode = 'manual' | 'autopilot';

export interface HighwayStateContextType {
  progress: number;
  currentKM: number;
  speed: number;
  mode: TravelMode;
  steerOffset: number;
  targetKM: number | null;
  activeMilestone: HighwayMilestone;
  isMuted: boolean;
  setMode: (mode: TravelMode) => void;
  toggleMode: () => void;
  setTargetKM: (km: number) => void;
  toggleMute: () => void;
  accelerate: (amount?: number) => void;
  brake: (amount?: number) => void;
  steer: (direction: number) => void;
  stepFrame: (
    delta: number,
    input: { forward: boolean; backward: boolean; left: boolean; right: boolean; wheelDelta: number }
  ) => void;
}

const HighwayStateContext = createContext<HighwayStateContextType | null>(null);

export const HighwayStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState(0.0);
  const [currentKM, setCurrentKM] = useState(0.0);
  const [speed, setSpeed] = useState(0.0); // km/h
  const [mode, setModeState] = useState<TravelMode>('manual');
  const [steerOffset, setSteerOffset] = useState(0.0);
  const [targetKM, setTargetKMState] = useState<number | null>(null);
  const [activeMilestone, setActiveMilestone] = useState<HighwayMilestone>(HIGHWAY_MILESTONES[0]);
  const [isMuted, setIsMuted] = useState(true);

  // Refs to allow atomic, non-stuttering physics update at 60 FPS
  const progressRef = useRef(0.0);
  const speedRef = useRef(0.0);
  const steerRef = useRef(0.0);
  const targetKMRef = useRef<number | null>(null);
  const modeRef = useRef<TravelMode>('manual');

  const setMode = useCallback((newMode: TravelMode) => {
    modeRef.current = newMode;
    setModeState(newMode);
    SoundFX.playModeSwitch();
  }, []);

  const toggleMode = useCallback(() => {
    const next = modeRef.current === 'manual' ? 'autopilot' : 'manual';
    setMode(next);
  }, [setMode]);

  const setTargetKM = useCallback((km: number) => {
    const clamped = THREE.MathUtils.clamp(km, 0, 7.0);
    targetKMRef.current = clamped;
    setTargetKMState(clamped);
    modeRef.current = 'autopilot';
    setModeState('autopilot');
    SoundFX.playWarp();
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      SoundFX.setMuted(next);
      return next;
    });
  }, []);

  const accelerate = useCallback((amount = 4.0) => {
    speedRef.current = Math.min(140.0, speedRef.current + amount);
  }, []);

  const brake = useCallback((amount = 8.0) => {
    speedRef.current = Math.max(-20.0, speedRef.current - amount);
  }, []);

  const steer = useCallback((direction: number) => {
    steerRef.current = THREE.MathUtils.clamp(steerRef.current + direction * 0.15, -4.5, 4.5);
    setSteerOffset(steerRef.current);
  }, []);

  // Central frame stepping method called once per frame from R3F useFrame
  const stepFrame = useCallback(
    (
      delta: number,
      input: { forward: boolean; backward: boolean; left: boolean; right: boolean; wheelDelta: number }
    ) => {
      const dt = Math.min(delta, 0.1); // prevent giant deltas on tab switch

      // 1. Process Input into Speed
      if (modeRef.current === 'autopilot') {
        // Autopilot cruising logic
        const targetProgress = targetKMRef.current !== null ? targetKMRef.current / 7.0 : 1.0;
        const diff = targetProgress - progressRef.current;

        if (Math.abs(diff) < 0.002) {
          // Reached destination milestone
          speedRef.current = THREE.MathUtils.damp(speedRef.current, 0, 4, dt);
          if (targetKMRef.current !== null) {
            targetKMRef.current = null;
            setTargetKMState(null);
          }
        } else {
          // Cruise at optimal speed: 85 km/h
          const desiredSpeed = Math.sign(diff) * Math.min(85.0, Math.abs(diff) * 600);
          speedRef.current = THREE.MathUtils.damp(speedRef.current, desiredSpeed, 3, dt);
        }

        // Center lane during autopilot
        steerRef.current = THREE.MathUtils.damp(steerRef.current, 0, 4, dt);
      } else {
        // Manual driving mode
        if (input.forward) {
          speedRef.current = Math.min(130.0, speedRef.current + 45.0 * dt);
        } else if (input.backward) {
          speedRef.current = Math.max(-25.0, speedRef.current - 60.0 * dt);
        } else if (Math.abs(input.wheelDelta) > 0.01) {
          speedRef.current = THREE.MathUtils.clamp(speedRef.current + input.wheelDelta * 1.5, -20.0, 130.0);
        } else {
          // Natural rolling friction resistance
          speedRef.current = THREE.MathUtils.damp(speedRef.current, 0, 2.5, dt);
        }

        // Steering input
        if (input.left) {
          steerRef.current = Math.max(-4.2, steerRef.current - 9.0 * dt);
        } else if (input.right) {
          steerRef.current = Math.min(4.2, steerRef.current + 9.0 * dt);
        } else {
          // Gentle steering auto-center
          steerRef.current = THREE.MathUtils.damp(steerRef.current, 0, 3.0, dt);
        }
      }

      // 2. Advance road progress
      // Total road length = 2200 units = 7.0 KM -> 1 KM = ~314.3 units.
      // speed in km/h -> km/s = speed / 3600
      const kmPerSec = speedRef.current / 3600.0;
      const progressDelta = (kmPerSec * dt) / 7.0 * 20.0; // Scaled for engaging responsive game-feel

      progressRef.current = THREE.MathUtils.clamp(progressRef.current + progressDelta, 0.0, 1.0);

      // Stop velocity at road boundaries
      if (progressRef.current <= 0.0 || progressRef.current >= 1.0) {
        speedRef.current = THREE.MathUtils.damp(speedRef.current, 0, 8, dt);
      }

      // 3. Sync state to React
      const currentKMCalc = progressRef.current * 7.0;
      setProgress(progressRef.current);
      setCurrentKM(currentKMCalc);
      setSpeed(Math.round(Math.abs(speedRef.current)));
      setSteerOffset(steerRef.current);

      const nearest = getNearestMilestone(progressRef.current);
      setActiveMilestone(nearest);
    },
    []
  );

  return (
    <HighwayStateContext.Provider
      value={{
        progress,
        currentKM,
        speed,
        mode,
        steerOffset,
        targetKM,
        activeMilestone,
        isMuted,
        setMode,
        toggleMode,
        setTargetKM,
        toggleMute,
        accelerate,
        brake,
        steer,
        stepFrame
      }}
    >
      {children}
    </HighwayStateContext.Provider>
  );
};

export const useHighwayState = (): HighwayStateContextType => {
  const context = useContext(HighwayStateContext);
  if (!context) {
    throw new Error('useHighwayState must be used within a HighwayStateProvider');
  }
  return context;
};

