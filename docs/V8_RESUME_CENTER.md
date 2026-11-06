# Portfolio V8: Resume Intelligence & Export Center (Prompt 46)

## 1. Overview & Recruiter Architecture
In accordance with **Prompt 46 (Resume Intelligence and Export Center)**, the portfolio delivers an ATS-optimized, printable, and downloadable curriculum vitae engine at `#resume-center`.

### Key Capabilities:
1. **Dynamic Single Source of Truth**: All education, experience, coursework, and certifications are dynamically hydrated from `src/data/` (`profile.ts`, `experience.ts`, `certifications.ts`).
2. **Instant Print & PDF Export**: Clicking "Print / Save PDF" triggers browser print rendering configured strictly with:
   - `@page { size: A4 portrait; margin: 12mm 14mm; }`
   - Strict CSS rules hiding navigation, headers, footers, and interactive playgrounds (`.print-hide`).
   - Awkward page-break prevention (`.break-inside-avoid`).
   - High-contrast pure black-on-white typography (`#000000` text on `#ffffff`).
3. **One-Click Plain Text ATS Copy**: Clicking "Copy Plain Text" copies a clean, machine-readable ASCII resume layout to the clipboard for recruiters copying into applicant tracking systems.
4. **Verifiable Claims**: Excludes fabricated metrics, fake corporate clients, or misleading scores; presents real undergraduate engineering coursework, GPA (7.2/10), and verified developer internships.

