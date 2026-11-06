# SAN AI HOLOGRAPHIC CORE SPECIFICATION

**System Name**: SAN AI (Santhosh Kumar's Personal Copilot & World Guide)  
**Architecture**: Local Command Processor & Semantic Knowledge Base  
**Components**: `src/ai/SanAIProvider.tsx`, `src/ai/AICore.tsx`, `src/ai/AIConversationPanel.tsx`, `src/ai/CommandProcessor.ts`, `src/ai/PortfolioKnowledgeBase.ts`  
**Security & Privacy**: 100% Client-Side Evaluation; Zero Exposed Keys; Explicit Microphone Activation  

---

## 1. Executive Summary

SAN AI is an original JARVIS-inspired intelligent assistant built natively into Santhosh Kumar M's portfolio. It serves as an autonomous guide capable of spatial camera routing across the 3D Developer Universe, context-aware information synthesis from verified portfolio databases, and dual-mode interaction (Voice & Monospace Chat).

---

## 2. Six Assistant Operational States

```
                 ┌──────────┐
                 │   IDLE   │◄────────────────┐
                 └────┬─────┘                 │
                      │                       │
         ┌────────────┴────────────┐          │
         ▼                         ▼          │
  ┌──────────────┐          ┌──────────────┐  │
  │  LISTENING   │          │  PROCESSING  │  │
  │ (Audio Input)│          │  (KB Match)  │  │
  └──────┬───────┘          └──────┬───────┘  │
         │                         │          │
         └────────────┬────────────┘          │
                      │                       │
         ┌────────────┴────────────┐          │
         ▼                         ▼          │
  ┌──────────────┐          ┌──────────────┐  │
  │   SPEAKING   │          │  NAVIGATION  │  │
  │(Speech Synth)│          │ (Zone Warp)  │  │
  └──────┬───────┘          └──────┬───────┘  │
         │                         │          │
         └────────────┬────────────┘          │
                      │                       │
                      ▼                       │
                 ┌──────────┐                 │
                 │  ERROR   ├─────────────────┘
                 │ (Notice) │
                 └──────────┘
```

| State | Visual Ring Accent | Core Glow | Auditory / Status Behavior |
| :--- | :--- | :--- | :--- |
| **`idle`** | Cyan (`#00E5FF`) | Gentle 1.8s breath pulse | Standard monitoring mode; waiting for user input. |
| **`listening`**| Lime (`#C7FF45`) | Rapid pulse | Web Speech API active; microphone capturing verbal input. |
| **`processing`**| Amber (`#FFB347`)| Rotating telemetry ticks | Matching query against verified `PortfolioKnowledgeBase`. |
| **`speaking`** | Cyan (`#00E5FF`) | Oscillating waveform bars | Browser `SpeechSynthesis` actively narrating response. |
| **`navigation`**| Crimson (`#FF3358`)| High-intensity lock | Camera lerping towards requested zone coordinates. |
| **`error`** | Crimson (`#FF3358`)| Alert ring ping | Graceful notice (e.g. browser speech unsupported). |

---

## 3. Local Command Processor Engine

Queries are evaluated locally using structured regular-expression intent recognition without exposing third-party LLM endpoints:

```typescript
// Sample Routing Intent:
"Show my frontend skills" ➔ Navigates to Zone 02 (Skill Forest) & displays React, Tailwind, and Vite proficiencies.
"Open LorryBook"         ➔ Navigates to Zone 03 (Project City) & opens RDA logistics directive.
"Who is Santhosh?"       ➔ Synthesizes verified Gnanamani College background and engineering aspirations.
"Switch to 2D view"      ➔ Instantly toggles between 3D Universe and Classic HTML portfolio.
```

---

## 4. Audio & Privacy Safeguards

1. **No Autoplay Audio**: Speech synthesis begins muted by default (`isMuted: true`). Visitors click the volume icon to enable spoken narration.
2. **No Stealth Recording**: The microphone is accessed exclusively upon explicit visitor click of the microphone button.
3. **Hardware Independence**: Full keyboard and touch navigation supported across all browsers without requiring microphone hardware.

