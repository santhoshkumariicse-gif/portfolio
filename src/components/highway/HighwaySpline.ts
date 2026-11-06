import * as THREE from 'three';

export interface HighwayMilestone {
  id: string;
  km: number;
  progress: number;
  title: string;
  subtitle: string;
  codeName: string;
  color: string;
  description: string;
}

export const HIGHWAY_MILESTONES: HighwayMilestone[] = [
  {
    id: 'km-0',
    km: 0.0,
    progress: 0.0 / 7.0,
    title: 'START POINT',
    subtitle: 'Holographic Welcome Gantry',
    codeName: 'ACT 00 // ORIGIN PORTAL',
    color: '#00E5FF',
    description: 'Welcome to the Developer Highway of Santhosh Kumar M. Prepare for acceleration.'
  },
  {
    id: 'km-1',
    km: 1.0,
    progress: 1.0 / 7.0,
    title: 'ABOUT ME',
    subtitle: 'Coastal Origin & Philosophy',
    codeName: 'ACT 01 // PERSONAL DOSSIER',
    color: '#FFB347',
    description: 'Karaikal roots, practical engineering mindset, and passion for software architecture.'
  },
  {
    id: 'km-2',
    km: 2.0,
    progress: 2.0 / 7.0,
    title: 'EDUCATION',
    subtitle: 'Gnanamani College of Technology',
    codeName: 'ACT 02 // ACADEMIC OVERPASS',
    color: '#C7FF45',
    description: 'B.E. in Computer Science & Engineering (2023–2027), verified GPA 7.2 / 10.0.'
  },
  {
    id: 'km-3',
    km: 3.0,
    progress: 3.0 / 7.0,
    title: 'SKILLS JUNCTION',
    subtitle: '7 Multi-Lane Route Signs',
    codeName: 'ACT 03 // ARSENAL INTERCHANGE',
    color: '#00E5FF',
    description: 'Frontend, Backend, AI Systems, Android Apps, Databases, DevOps, and Security.'
  },
  {
    id: 'km-4',
    km: 4.0,
    progress: 4.0 / 7.0,
    title: 'PROJECT HIGHWAY',
    subtitle: '3D Monumental Billboards',
    codeName: 'ACT 04 // SOFTWARE MISSIONS',
    color: '#FF3366',
    description: 'Real architectures: LorryBook / RDA, NexusATS, Recall AI, and Security Lab.'
  },
  {
    id: 'km-5',
    km: 5.0,
    progress: 5.0 / 7.0,
    title: 'EXPERIENCE TOLL GATE',
    subtitle: 'Cybernaut & ELITA Toll Lanes',
    codeName: 'ACT 05 // PROFESSIONAL MILESTONES',
    color: '#C7FF45',
    description: 'Python developer internship at Cybernaut and web/app engineering at ELITA.'
  },
  {
    id: 'km-6',
    km: 6.0,
    progress: 6.0 / 7.0,
    title: 'REST STOP',
    subtitle: 'Systems Lab & Terminal Overlook',
    codeName: 'ACT 06 // TECHNICAL OVERLOOK',
    color: '#FFB347',
    description: 'Interactive neural architectures, bash terminal simulator, and deep-dive engineering docs.'
  },
  {
    id: 'km-7',
    km: 7.0,
    progress: 7.0 / 7.0,
    title: 'DESTINATION: HIRE ME',
    subtitle: 'Contact Terminal & ATS Resume',
    codeName: 'ACT 07 // TERMINAL ZENITH',
    color: '#C7FF45',
    description: 'Transmit direct dispatch, download ATS resume, and connect on GitHub & LinkedIn.'
  }
];

// 3D Spatial Road Knots spanning 2,200 world units along Z
const ROAD_CONTROL_POINTS: THREE.Vector3[] = [
  new THREE.Vector3(0, 0, 0),        // KM 0: Start
  new THREE.Vector3(0, 0, -315),     // KM 1: About Me
  new THREE.Vector3(28, 4, -630),    // KM 2: Education (curved incline)
  new THREE.Vector3(45, 9, -945),    // KM 3: Skills Junction (bridge overpass)
  new THREE.Vector3(15, 12, -1260),  // KM 4: Project Highway (straightaway)
  new THREE.Vector3(-25, 8, -1575),  // KM 5: Experience Toll Gate
  new THREE.Vector3(-10, 3, -1890),  // KM 6: Rest Stop Overlook
  new THREE.Vector3(0, 0, -2205)     // KM 7: Destination Terminal
];

// Single shared CatmullRomCurve3 instance
export const HIGHWAY_SPLINE = new THREE.CatmullRomCurve3(ROAD_CONTROL_POINTS, false, 'centripetal', 0.25);

export function getPointAtProgress(t: number): THREE.Vector3 {
  const clamped = THREE.MathUtils.clamp(t, 0, 1);
  return HIGHWAY_SPLINE.getPointAt(clamped);
}

export function getTangentAtProgress(t: number): THREE.Vector3 {
  const clamped = THREE.MathUtils.clamp(t, 0, 1);
  return HIGHWAY_SPLINE.getTangentAt(clamped).normalize();
}

export function getMilestoneByKM(km: number): HighwayMilestone {
  const rounded = Math.round(THREE.MathUtils.clamp(km, 0, 7));
  return HIGHWAY_MILESTONES[rounded] || HIGHWAY_MILESTONES[0];
}

export function getNearestMilestone(t: number): HighwayMilestone {
  const km = t * 7.0;
  return getMilestoneByKM(km);
}

