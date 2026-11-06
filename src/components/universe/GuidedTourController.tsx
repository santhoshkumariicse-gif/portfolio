import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export interface TourWaypoint {
  id: string;
  title: string;
  subtitle: string;
  camPos: [number, number, number];
  target: [number, number, number];
  duration: number; // in seconds
}

export const TOUR_WAYPOINTS: TourWaypoint[] = [
  {
    id: 'origin-coast',
    title: 'ACT 01 // ORIGIN COAST',
    subtitle: 'Karaikal Roots & Gnanamani College of Technology',
    camPos: [22, 6, 95],
    target: [0, 1.5, 75],
    duration: 8
  },
  {
    id: 'skill-forest',
    title: 'ACT 02 // THE SKILL FOREST',
    subtitle: '7 Verified Technology Crystal Clusters',
    camPos: [-48, 12, 40],
    target: [-65, 5, 20],
    duration: 8
  },
  {
    id: 'project-city',
    title: 'ACT 03 // PROJECT CITY METROPOLIS',
    subtitle: 'Real Software Engineering Missions & Towers',
    camPos: [42, 18, -10],
    target: [60, 8, -25],
    duration: 8
  },
  {
    id: 'exp-mountain',
    title: 'ACT 04 // EXPERIENCE MOUNTAIN',
    subtitle: 'Cybernaut, ELITA Internships & Summit Credentials',
    camPos: [-20, 32, -65],
    target: [-35, 24, -85],
    duration: 8
  },
  {
    id: 'contact-beacon',
    title: 'ACT 05 // CONTACT BEACON FINALE',
    subtitle: 'Oceanic Horizon Lighthouse & ATS Resume',
    camPos: [6, 44, -112],
    target: [10, 36, -135],
    duration: 9
  }
];

export interface GuidedTourControllerProps {
  currentIndex: number;
  isPlaying: boolean;
  onWaypointChange: (index: number) => void;
  onTourComplete: () => void;
}

export const GuidedTourController: React.FC<GuidedTourControllerProps> = ({
  currentIndex,
  isPlaying,
  onWaypointChange,
  onTourComplete
}) => {
  const { camera } = useThree();

  const currentWaypoint = TOUR_WAYPOINTS[currentIndex] || TOUR_WAYPOINTS[0];
  const progressRef = useRef(0);
  const lookTargetRef = useRef(new THREE.Vector3(...currentWaypoint.target));

  // Reset progress when waypoint index changes
  useEffect(() => {
    progressRef.current = 0;
  }, [currentIndex]);

  useFrame((_, delta) => {
    const desiredPos = new THREE.Vector3(...currentWaypoint.camPos);
    const targetFocus = new THREE.Vector3(...currentWaypoint.target);

    // Smoothly lerp camera and lookAt target
    camera.position.lerp(desiredPos, 0.04);
    lookTargetRef.current.lerp(targetFocus, 0.04);
    camera.lookAt(lookTargetRef.current);

    if (isPlaying) {
      progressRef.current += delta;
      if (progressRef.current >= currentWaypoint.duration) {
        if (currentIndex < TOUR_WAYPOINTS.length - 1) {
          onWaypointChange(currentIndex + 1);
        } else {
          onTourComplete();
        }
      }
    }
  });

  return null;
};

