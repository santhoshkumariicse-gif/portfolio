# Portfolio V7: Centralized Content Architecture & Schema System

## 1. Executive Architecture Summary
In accordance with **Prompt 33 (Data-Driven Content Architecture)**, all portfolio content has been migrated from ad-hoc component variables into strongly typed, centralized content modules located in `src/data/` and governed by strict TypeScript interfaces in `src/types/index.ts`.

All presentation components (`AboutSection`, `CareerResumeCenter`, `HeroSection`, `ContactSection`, `SkillsSection`, `ProjectsSection`) now consume data through these single-source-of-truth modules, completely eliminating hardcoded profile strings, fragmented dates, and duplicated project descriptions.

---

## 2. Structured Content Modules Topography

```
src/
├── types/
│   └── index.ts                 # Centralized type definitions & validation schemas
└── data/
    ├── profile.ts               # Personal info, education, bio, contacts, resume metadata
    ├── projects.ts              # 6 engineering projects (featured, status, schemas)
    ├── skills.ts                # 5 skill taxonomies (programming, web, sec, workflow, AI)
    ├── experience.ts            # Chronological internships & academic milestones
    ├── certifications.ts        # Verified coursework & professional credentials
    ├── achievements.ts          # Competitions, club leadership, and academic merits
    ├── blogArticles.ts          # 4 technical study notes with slugs and tags
    ├── commandCenter.ts         # Telemetry metrics, focus domains, engineering logs
    ├── validator.ts             # Runtime & build-time content validation utilities
    └── index.ts                 # Unified re-export hub
```

---

## 3. Data Schemas & Strict Interfaces

### 3.1 Personal Profile & Resume Metadata (`src/types/index.ts`)
```typescript
export interface PersonalProfile {
  name: string;
  headline: string;
  bio: string[];
  education: EducationInfo;
  internships: InternshipInfo[];
  contact: ContactInfo;
  resumeMetadata: ResumeMetadata;
}
```

### 3.2 Projects Architecture (`src/types/index.ts`)
```typescript
export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  status: 'Completed' | 'In development' | 'Prototype' | 'Learning project';
  isConceptual: boolean;
  featured: boolean;
  order: number;
  tagline: string;
  problem: string;
  solution: string;
  technologies: string[];
  evidenceNote: string;
  demoUrl?: string;
  repoUrl?: string;
  architectureType: ArchitectureType;
}
```

---

## 4. Content Validation Rules & Enforcement (`src/data/validator.ts`)

The `validatePortfolioData()` engine runs during development bootstrapping and can be executed within CI pipelines:

1. **Duplicate Identifier Guard**: Checks all `id` strings across projects, skills, articles, certifications, and achievements, throwing a hard validation error on collisions.
2. **URL Protocol Integrity**: Guarantees that every repository URL, credential URL, LinkedIn, and GitHub link matches `^(https?://|mailto:)`.
3. **Email Formatting**: Strictly enforces RFC 5322 standard regex patterns on contact email addresses.
4. **Mandatory Content Fields**: Asserts non-empty strings on problem/solution pairs, bio paragraphs, and role summaries.
5. **Collection Non-Emptiness**: Warns if technology tags or experience highlights are missing.

---

## 5. Migration Verification Matrix
| Content Domain | Pre-V7 State | V7 Data-Driven State | Verification |
| :--- | :--- | :--- | :--- |
| Personal Profile | Hardcoded in `AboutSection` & `HeroSection` | Centralized in `src/data/profile.ts` | Verified |
| Contact Data | Hardcoded strings in `ContactSection` | Centralized in `personalProfileData.contact` | Verified |
| ATS Resume Sheet | Duplicated text in `CareerResumeCenter` | Dynamically driven from `src/data/` | Verified |
| Certifications | Unstructured mentions | Strongly typed in `src/data/certifications.ts` | Verified |
| Achievements | Informal references | Structured in `src/data/achievements.ts` | Verified |
| Validation Engine | None | Automated validator in `src/data/validator.ts` | Pass (0 errors) |

