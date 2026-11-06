# PROMPT 13 — SAN AI VOICE INTELLIGENCE SPECIFICATION

## 1. System Overview
**SAN AI** is an interactive, JARVIS-inspired artificial intelligence copilot designed specifically for **Santhosh Kumar M's Developer Universe**. It serves as an autonomous guide, answering visitor questions, navigating between 3D regions, launching cinematic flythroughs, and presenting verified architectural dossiers.

---

## 2. Voice Input Architecture (Speech-to-Text)

### Implementation Standard:
- Utilizes the standardized browser `webkitSpeechRecognition` / `SpeechRecognition` API.
- Microphone activation is strictly **opt-in** and only triggered when the user explicitly clicks the microphone button in the HUD or conversation panel.
- Continuous listening is automatically terminated upon utterance completion (`onend` / `onresult`) or error.
- Interruption safety: Activating the microphone instantly halts any playing speech synthesis (`window.speechSynthesis.cancel()`), preventing the microphone from hearing and repeating SAN AI's own voice.

### Visual State Indicators:
- `idle`: Muted cyan core pulse.
- `listening`: High-frequency lime green (`#C7FF45`) audio ripple with HUD badge `[LISTENING TO SPEECH...]`.
- `processing`: Cyan ping pulse (`[PROCESSING QUERY AGAINST VERIFIED KNOWLEDGE BASE]`).
- `speaking`: Rhythmic audio wave oscillation.
- `error`: Amber warning badge prompting manual keyboard input.

---

## 3. Voice Output Architecture (Text-to-Speech)

### Implementation Standard:
- Powered by `window.speechSynthesis` and `SpeechSynthesisUtterance`.
- **Speech Rate**: $1.05\times$ for clear, natural conversational cadence.
- **Pitch**: $1.0$ (calm, balanced technological timbre).
- **Voice Selection**: Dynamic selection via `speechSynthesis.getVoices()`. Prioritizes English voices matching keywords: `"Google"`, `"Natural"`, `"Samantha"`, `"David"`, `"Zira"`.
- **Zero Autoplay Violation**: By default, `isMuted` is initialized to `true` to strictly comply with modern browser autoplay policies. Audio only speaks after the visitor enables sound or issues an explicit voice/text query.
- **Voice Interruption**: Any user interaction (sending a new query, toggling the microphone, or clicking mute) executes `interruptSpeech()`, terminating pending speech immediately without audio overlap.

---

## 4. Voice Command Router & Intent Classification

The `CommandProcessor` parses natural language phrases with fuzzy intent matching against the verified portfolio knowledge base:

| Command Phrase | Classified Intent | Triggered Action |
| :--- | :--- | :--- |
| `"Hey SAN"` / `"Hello SAN"` | Wake & Greeting | Greets visitor, activates telemetry HUD |
| `"Introduce Santhosh"` / `"Who is Santhosh?"` | Origin Biography | Speaks verified background: B.E. CSE, Karaikal, full stack/AI |
| `"Start guided tour"` / `"Cinematic tour"` | Camera Autopilot | Sets `explorationMode: 'guided-tour'` and initiates 5-zone flight |
| `"Enter free roam"` / `"Walk around"` | Player Controls | Sets `explorationMode: 'free-roam'` enabling WASD and touch joystick |
| `"Orbit mode"` / `"Tactical view"` | Panoramic Camera | Sets `explorationMode: 'orbit'` for 360-degree orbital rotation |
| `"Show skills"` / `"What is his stack?"` | Arsenal Telemetry | Navigates to `skill-forest` and summarizes 7 crystal categories |
| `"Open projects"` / `"Show missions"` | Projects Telemetry | Navigates to `project-city` and summarizes software platforms |
| `"Explain LorryBook"` / `"What is RDA?"` | Project Deep Dive | Navigates to `project-city` and opens LorryBook schematic modal |
| `"Explain NexusATS"` | Project Deep Dive | Navigates to `project-city` and opens NexusATS candidate modal |
| `"Explain Recall AI"` | Project Deep Dive | Navigates to `project-city` and opens Recall AI cognitive modal |
| `"Show education"` / `"College details"` | Academic Verification | Navigates to `origin-coast` and summarizes Gnanamani College records |
| `"Show achievements"` / `"Internships"` | Career Track Record | Navigates to `exp-mountain` and reviews Cybernaut & ELITA roles |
| `"Download resume"` / `"View CV"` | Document Dispatch | Opens verified ATS-compliant resume viewer modal |
| `"Go to contact"` / `"Hire Santhosh"` | Dispatch Channel | Navigates to `contact-beacon` and opens transmission interface |
| `"Switch to classic view"` / `"2D mode"` | Fallback Viewport | Calls `onExitUniverse()` to switch to high-speed 2D HTML portfolio |

---

## 5. Security & Privacy Guarantees
1. **Zero Secret Recording**: No background audio stream is captured without active visual feedback.
2. **Local Edge Execution**: Speech recognition is handled directly by browser native APIs; no audio recordings are sent to third-party recording servers.
3. **No Leaked Secrets**: All command parsing is executed client-side in TypeScript against `PortfolioKnowledgeBase.ts`.
4. **Instant Opt-Out**: Users can permanently silence SAN AI by clicking the HUD mute icon or pressing the mute toggle inside the conversation window.

---

## 6. Browser Compatibility Matrix

| Browser | Speech Recognition (STT) | Speech Synthesis (TTS) | Graceful Fallback Behavior |
| :--- | :---: | :---: | :--- |
| **Google Chrome (Desktop/Mobile)** | ✅ Full Support | ✅ Full Support | Native experience with high-fidelity voices |
| **Microsoft Edge** | ✅ Full Support | ✅ Full Support | Native experience with Microsoft Natural voices |
| **Apple Safari (macOS / iOS)** | ⚠️ Limited / Permission | ✅ Full Support | Prompts user for speech permission; keyboard fallback if denied |
| **Mozilla Firefox** | ❌ Flag Gated | ✅ Full Support | Automatically provides text terminal with quick chips |
| **Brave / Privacy Browsers** | ⚠️ Shield Dependent | ✅ Full Support | Displays gentle notice to use text terminal if shields block STT |
