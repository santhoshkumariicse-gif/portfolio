# Motion system

## Principles

Motion supports hierarchy and feedback rather than decorating every element. The site uses CSS transitions and one lightweight pointer interaction; it does not require an animation library, WebGL, scroll hijacking, or a loading screen.

## Interactions

- The hero network is a small inline SVG with three paths and four nodes. Paths draw once on entry, nodes reveal in sequence, and the surrounding geometry responds to a fine pointer only when normal motion is enabled.
- The hero headline uses two clipped lines with a short, staged reveal. The full accessible text remains available through the heading's `aria-label`.
- Project rows, section headings, and experience entries reveal once when they enter the viewport. The experience timeline accent line draws once as its section becomes visible.

- Buttons lift by 2px on hover and show a lime keyboard focus ring.
- Navigation links change to the lime accent and receive an active-section state from `IntersectionObserver`.
- Project rows strengthen their border on hover while all project details remain readable.
- The hero system graphic responds to a fine pointer with a small perspective shift and returns to a stable state on pointer leave.
- The mobile menu closes after navigation or Escape and returns focus to its trigger.

## Reduced motion

`prefers-reduced-motion: reduce` changes smooth scrolling to automatic, removes the hero pointer response, makes the headline and content immediately visible, completes the timeline line, and reduces CSS transition/animation durations. No essential content is revealed only by motion.
