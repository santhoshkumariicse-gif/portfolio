# Portfolio V8: Multilingual Localization Architecture (English & Tamil)

## 1. Overview & Cultural Integrity
In accordance with **Prompt 47 (Portfolio Localization Architecture)**, the portfolio delivers an internationalization architecture supporting **English** and **Tamil** (`ta`):

- **Zero Fabricated Translations**: Technical names and standard acronyms (`Python`, `FastAPI`, `SQL`, `Burp Suite`, `OWASP Top 10`, `Linux`, `Git`, `REST APIs`) are preserved in their recognized technical form to ensure 100% industry accuracy.
- **Native Unicode Rendering**: Leverages standard UTF-8 charset with modern system font stacks supporting Tamil typography (`system-ui`, `sans-serif`) across Windows, macOS, Android, and iOS.
- **Persistent Language Preference**: User language choice is stored in `localStorage ('portfolio_locale')` with default fallback to `en`.

---

## 2. Localization Components & Utilities

### 2.1 Centralized Dictionaries (`src/i18n/translations.ts`)
```typescript
export interface TranslationDictionary {
  nav: { command: string; work: string; labs: string; security: string; ... };
  hero: { kicker: string; headingLine1: string; headingLine2: string; bio: string; ... };
  tracks: { general: string; recruiter: string; developer: string; };
  projects: { sectionNum: string; title: string; description: string; ... };
  resume: { title: string; printBtn: string; copyPlainBtn: string; ... };
  contact: { title: string; description: string; copyEmail: string; ... };
}
```

### 2.2 React Context Provider (`src/i18n/LanguageContext.tsx`)
Exposes `useLanguage()` hook giving any component reactive access to `language`, `setLanguage`, and translated dictionary `t`.
Updates `document.documentElement.lang` synchronously when language shifts.

### 2.3 One-Click Header Switcher (`src/components/Navbar.tsx`)
Accessible toggle button (`[ தமிழ் | EN ]`) positioned in the primary navigation bar.

