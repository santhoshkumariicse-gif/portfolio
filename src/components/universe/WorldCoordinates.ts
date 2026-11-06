export interface ZoneCoordinate {
  id: string;
  name: string;
  subtitle: string;
  center: [number, number, number];
  color: string;
}

export const ZONE_COORDINATES: Record<string, ZoneCoordinate> = {
  prologue: {
    id: 'prologue',
    name: 'Space Prologue',
    subtitle: 'Gateway to the Digital Metropolis',
    center: [0, 120, 0],
    color: '#00E5FF'
  },
  'origin-coast': {
    id: 'origin-coast',
    name: 'Zone 01: Origin Coast',
    subtitle: 'Karaikal Shoreline & Workspace',
    center: [0, 1.5, 75],
    color: '#FFB347'
  },
  'skill-forest': {
    id: 'skill-forest',
    name: 'Zone 02: Skill Forest',
    subtitle: 'Bioluminescent Tech Monoliths',
    center: [-65, 5, 20],
    color: '#00E5FF'
  },
  'project-city': {
    id: 'project-city',
    name: 'Zone 03: Project City',
    subtitle: 'Neon Deployed Missions Metropolis',
    center: [60, 8, -25],
    color: '#FF3358'
  },
  'exp-mountain': {
    id: 'exp-mountain',
    name: 'Zone 04: Experience Mountain',
    subtitle: 'Internship & Academic Ascent',
    center: [-35, 24, -85],
    color: '#C7FF45'
  },
  'contact-beacon': {
    id: 'contact-beacon',
    name: 'Zone 05: Contact Beacon',
    subtitle: 'Oceanic Horizon Lighthouse',
    center: [10, 36, -135],
    color: '#C7FF45'
  }
};

export const WORLD_ATMOSPHERE = {
  fogColor: '#0A0B09',
  fogNear: 50,
  fogFar: 260,
  sunColor: '#FFF6E5',
  sunIntensity: 1.2,
  sunPosition: [70, 90, 80] as [number, number, number],
  ambientColor: '#171A15',
  ambientIntensity: 0.7
};

