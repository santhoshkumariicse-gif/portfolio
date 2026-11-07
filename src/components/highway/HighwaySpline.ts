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
    title: 'WELCOME',
    subtitle: 'System Ingress & Portal',
    codeName: 'ACT 00 // ORIGIN PORTAL',
    color: '#FF1E40',
    description: 'Welcome to the Road of Santhosh. Ingressing at KM 0. Prepare for acceleration.'
  },
  {
    id: 'km-1',
    km: 1.0,
    progress: 1.0 / 7.0,
    title: 'ABOUT ME',
    subtitle: 'Cybersecurity-Focused CSE Student',
    codeName: 'ACT 01 // PERSONAL DOSSIER',
    color: '#FF1E40',
    description: 'Santhosh Kumar M: B.E. CSE, Gnanamani College of Technology (Expected May 2027, GPA: 7.2).'
  },
  {
    id: 'km-2',
    km: 2.0,
    progress: 2.0 / 7.0,
    title: 'EDUCATION',
    subtitle: 'Gnanamani College of Technology',
    codeName: 'ACT 02 // ACADEMIC OVERPASS',
    color: '#00E5FF',
    description: 'B.E. Computer Science & Engineering (GPA 7.2). Coursework: Ethical Hacking, Networks, Operating Systems.'
  },
  {
    id: 'km-3',
    km: 3.0,
    progress: 3.0 / 7.0,
    title: 'SKILLS',
    subtitle: 'Technical Direction Signboards',
    codeName: 'ACT 03 // ARSENAL INTERCHANGE',
    color: '#FFB347',
    description: 'Programming: Python, Java, C. Cybersecurity: Web Security, CTFs, Vulnerability Assessment. Linux & Git.'
  },
  {
    id: 'km-4',
    km: 4.0,
    progress: 4.0 / 7.0,
    title: 'PROJECTS',
    subtitle: 'Verified Engineering Missions',
    codeName: 'ACT 04 // SOFTWARE MISSIONS',
    color: '#FF1E40',
    description: 'Verified real architectures: LorryBook / RDA Logistics, NexusATS, and Recall AI RAG prototype.'
  },
  {
    id: 'km-5',
    km: 5.0,
    progress: 5.0 / 7.0,
    title: 'INTERNSHIPS',
    subtitle: 'Cybernaut & ELITA Toll Lanes',
    codeName: 'ACT 05 // PROFESSIONAL MILESTONES',
    color: '#FFB347',
    description: 'Python Developer Intern at Cybernaut (Karur) & Web/App Development Intern at ELITA (Bangalore).'
  },
  {
    id: 'km-6',
    km: 6.0,
    progress: 6.0 / 7.0,
    title: 'SECURITY LAB',
    subtitle: 'CTF Challenges & Cyber Club',
    codeName: 'ACT 06 // SECURITY OVERLOOK',
    color: '#00E5FF',
    description: 'Web application security testing, lab vulnerability analysis, and Cybersecurity Club member at Gnanamani.'
  },
  {
    id: 'km-7',
    km: 7.0,
    progress: 7.0 / 7.0,
    title: 'CONTACT',
    subtitle: 'Direct Dispatch & Resume Terminal',
    codeName: 'ACT 07 // TERMINAL ZENITH',
    color: '#FF1E40',
    description: 'Direct contact channels, phone (+91 9345402493), email, LinkedIn, GitHub, and resume download.'
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

