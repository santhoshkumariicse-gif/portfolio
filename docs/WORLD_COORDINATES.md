# WORLD COORDINATES & SPATIAL DIRECTORY — SAN AI

**Project**: SAN AI — THE DEVELOPER UNIVERSE  
**Spatial System**: Cartesian 3D `[X, Y, Z]` (Y = Up, +Z = South, -Z = North, +X = East, -X = West)  
**Standard FOV**: 50° (Desktop), 60° (Mobile)  

---

## 1. Primary Zone Centers & Player Spawns

| Zone Name | Zone Key | Zone Center `[X, Y, Z]` | Player Spawn `[X, Y, Z]` | Camera Focus `[X, Y, Z]` | Trigger Radius |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Space Prologue** | `prologue` | `[0, 150, 0]` | `[0, 150, 40]` | `[0, 150, 0]` | N/A (Orbit) |
| **Origin Coast** | `origin-coast` | `[0, 1.2, 80]` | `[0, 1.8, 85]` | `[0, 2, 75]` | 25 meters |
| **Skill Forest** | `skill-forest` | `[-70, 5, 20]` | `[-65, 5.2, 25]` | `[-70, 5, 20]` | 35 meters |
| **Project City** | `project-city` | `[60, 8, -30]` | `[55, 8.2, -20]` | `[60, 10, -30]` | 40 meters |
| **Experience Mountain**| `exp-mountain`| `[-40, 25, -90]` | `[-35, 25.2, -80]`| `[-40, 26, -90]` | 30 meters |
| **Contact Beacon** | `contact-beacon`| `[10, 35, -140]` | `[10, 35.2, -130]`| `[10, 38, -140]` | 25 meters |

---

## 2. Guided Cinematic Tour Camera Keyframe Waypoints

Choreographed camera spline sequence for the automated narrative tour:

```typescript
export const GUIDED_TOUR_WAYPOINTS = [
  // Keyframe 0: Orbital Descent into Island
  {
    time: 0,
    camPos: [0, 90, 160],
    target: [0, 10, 0],
    fov: 45,
    title: 'PROLOGUE // ORBITAL INGRESS'
  },
  // Keyframe 1: Origin Coast Arrival
  {
    time: 5,
    camPos: [15, 6, 95],
    target: [0, 2, 80],
    fov: 50,
    title: 'ZONE 01 // ORIGIN COAST'
  },
  // Keyframe 2: Coastal Road to Skill Forest Transition
  {
    time: 12,
    camPos: [-45, 12, 45],
    target: [-70, 5, 20],
    fov: 52,
    title: 'ZONE 02 // THE SKILL FOREST'
  },
  // Keyframe 3: Overlooking Project City Skyline
  {
    time: 20,
    camPos: [35, 18, -10],
    target: [60, 8, -30],
    fov: 50,
    title: 'ZONE 03 // PROJECT CITY'
  },
  // Keyframe 4: Mountain Trail Ascent
  {
    time: 28,
    camPos: [-20, 32, -70],
    target: [-40, 25, -90],
    fov: 48,
    title: 'ZONE 04 // EXPERIENCE MOUNTAIN'
  },
  // Keyframe 5: Contact Beacon Overlook & Finale
  {
    time: 36,
    camPos: [0, 42, -115],
    target: [10, 36, -140],
    fov: 46,
    title: 'ZONE 05 // CONTACT BEACON'
  }
];
```

---

## 3. Interactive Point of Interest (POI) Registry

Each point of interest broadcasts a spatial proximity event when the player avatar approaches within its activation radius:

```typescript
export interface PointOfInterest {
  id: string;
  zone: string;
  title: string;
  subtitle: string;
  coords: [number, number, number];
  interactionType: 'dialogue' | 'modal' | 'external_link' | 'teleport';
  actionTarget: string;
  proximityRadius: number;
}

export const POINTS_OF_INTEREST: PointOfInterest[] = [
  // Zone 1
  {
    id: 'poi-desk',
    zone: 'origin-coast',
    title: 'Personal Study Workspace',
    subtitle: 'Gnanamani College of Technology Foundations',
    coords: [2, 1.5, 78],
    interactionType: 'modal',
    actionTarget: 'about-details',
    proximityRadius: 4.5
  },
  // Zone 2
  {
    id: 'poi-skill-monolith',
    zone: 'skill-forest',
    title: 'Central Arsenal Monolith',
    subtitle: 'Verified Technical Proficiencies & Architecture',
    coords: [-70, 5.5, 20],
    interactionType: 'modal',
    actionTarget: 'skills-tree',
    proximityRadius: 6.0
  },
  // Zone 3
  {
    id: 'poi-lorrybook-hq',
    zone: 'project-city',
    title: 'LorryBook / RDA Logistics HQ',
    subtitle: 'Acting Driver Booking Platform',
    coords: [55, 8.5, -28],
    interactionType: 'modal',
    actionTarget: 'project-rda',
    proximityRadius: 7.0
  },
  {
    id: 'poi-nexusats-hub',
    zone: 'project-city',
    title: 'NexusATS Gateway',
    subtitle: 'Recruitment & Applicant Tracking Pipeline',
    coords: [68, 8.5, -35],
    interactionType: 'modal',
    actionTarget: 'project-ats',
    proximityRadius: 7.0
  },
  {
    id: 'poi-recallai-cube',
    zone: 'project-city',
    title: 'Recall AI Cognitive Hub',
    subtitle: 'Offline Knowledge Retrieval Assistant',
    coords: [62, 8.5, -44],
    interactionType: 'modal',
    actionTarget: 'project-recall',
    proximityRadius: 7.0
  },
  // Zone 4
  {
    id: 'poi-cybernaut-station',
    zone: 'exp-mountain',
    title: 'Cybernaut Station Alpha',
    subtitle: 'Python Developer Internship Milestones',
    coords: [-38, 20.5, -82],
    interactionType: 'modal',
    actionTarget: 'exp-cybernaut',
    proximityRadius: 5.0
  },
  {
    id: 'poi-elita-station',
    zone: 'exp-mountain',
    title: 'ELITA Summit Station',
    subtitle: 'Web & App Developer Internship',
    coords: [-42, 28.5, -92],
    interactionType: 'modal',
    actionTarget: 'exp-elita',
    proximityRadius: 5.0
  },
  // Zone 5
  {
    id: 'poi-beacon-terminal',
    zone: 'contact-beacon',
    title: 'Contact Transmission Terminal',
    subtitle: 'Direct Recruiter Outreach & Resume Dispatch',
    coords: [10, 36.5, -138],
    interactionType: 'modal',
    actionTarget: 'contact-finale',
    proximityRadius: 5.5
  }
];
```

