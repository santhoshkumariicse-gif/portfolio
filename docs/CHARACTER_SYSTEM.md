# CHARACTER SYSTEM SPECIFICATION — SAN AI: THE DEVELOPER UNIVERSE

**Character Identity**: Santhosh Kumar M (Young Male Software Developer)  
**Photo Reference**: `public/images/santhosh-kumar.jpg` (Strict Anchor: Never replaced with AI faces)  
**3D Component**: `src/components/universe/Avatar3D.tsx`  
**2D Fallback**: `src/components/universe/AvatarSprite.tsx`  
**Controller**: `src/components/universe/AvatarController.tsx`  

---

## 1. Visual Appearance & Consistency Anchors

To guarantee 100% visual fidelity matching authentic photographs:
- **Skin Tones**: Base `#BA7E55`, highlight `#D49C74`, shadow `#9C6542`.
- **Hair**: Textured obsidian black hairstyle (`#121410`).
- **Outfit**: Tactical developer cyber-jacket (`#171A15`) with signature Electric Lime piping (`#C7FF45`).
- **Chest Badge**: Monospace holographic ID tag `SKM//01`.
- **Lower Garments**: Matte black developer pants (`#10120F`) and lightweight urban runners (`#1E231C`).

---

## 2. The Eight Canonical Character States

| State | Component Routine | Procedural Skeletal Kinematics | Narrative Staging |
| :--- | :--- | :--- | :--- |
| **`idle`** | `Avatar3D.tsx` | Vertical sinusoidal breathing oscillation (`Math.sin(t * 2) * 0.03`). Arms relaxed at sides. | General exploration rest state. |
| **`walking`** | `Avatar3D.tsx` | Alternating limb stride oscillation (`walkSpeed = 6`, `rotation.x = ±0.45 rad`). Vertical step bounce. | Free Roam navigation. |
| **`running`** | `Avatar3D.tsx` | High-frequency stride oscillation (`runSpeed = 10`, `rotation.x = ±0.8 rad`). Forward torso lean. | Fast traversal mode. |
| **`thinking`** | `Avatar3D.tsx` | Right arm folded to chin (`rotation.x = -1.2`, `z = -0.5`). Head tilted 12° (`rotation.y = 0.2`). | Origin Coast workspace; architecture analysis. |
| **`coding`** | `Avatar3D.tsx` | Both forearms elevated over floating virtual keyboard with rapid typing oscillations (`t * 12`). | Project City Mission Control. |
| **`celebrating`**| `Avatar3D.tsx` | Dual arms elevated in victory triumph (`rotation.x = -2.6 + sin(t * 8)`). | Milestone & certification checkpoints. |
| **`interacting`**| `Avatar3D.tsx` | Right arm gesturing forward-upward towards the SAN AI holographic core orb (`rotation.x = -1.6`). | Voice and command dialogue. |
| **`future`** | `Avatar3D.tsx` | Head and shoulders turned 3/4 towards the oceanic horizon (`rotation.y = -0.4`, `x = -0.15`). | Contact Beacon finale. |

---

## 3. 3D Procedural Rigging & Performance Budget

1. **Procedural Geometry Hierarchy**:
   - Total character polygon count: **< 1,800 polygons**.
   - Zero external multi-megabyte GLB downloads required; character constructs procedurally in memory instantaneously.
2. **2D Sprite Fallback (`AvatarSprite.tsx`)**:
   - For ultra-low-power devices or when WebGL performance drops below 30 FPS, the character automatically switches to an SVG billboard sprite using our verified vector asset catalog.
3. **No Copyrighted IP**:
   - The design is an authentic stylized developer representation of Santhosh Kumar M.

