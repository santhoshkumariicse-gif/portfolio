# Portfolio design system

## Direction

The portfolio uses a dark creative-studio language: charcoal and graphite surfaces, soft white type, electric-lime accents, crisp borders, and an engineering-inspired geometric system mark. The design avoids decorative stock imagery, fake metrics, and interaction that hides essential content.

## Tokens

The reusable tokens live in the `:root` block in [`index.html`](../index.html):

- `--bg`, `--surface`, and `--raised` provide the charcoal page and panel surfaces.
- `--text` and `--muted` provide the primary and secondary text colors.
- `--accent` and `--active-border` identify actions, active states, and technical markers.
- `--border` defines the low-contrast border system.
- `--sans` is the readable interface/body family and `--serif` is reserved for emphasis in the hero.

## Layout

The maximum content width is 1180px with a 24px desktop gutter and a 16px mobile gutter. Sections use a 120px vertical rhythm on larger screens and 78px on small screens.

- **Header:** compact horizontal navigation, changing to an explicit menu at 800px.
- **Hero:** asymmetric two-column composition on desktop, stacked mark and copy on mobile.
- **Work:** three-column project layout, collapsing to one column at 800px.
- **Toolkit:** four columns on desktop, two at tablet width, one on narrow mobile screens.
- **Background and experience:** editorial heading paired with a readable content column or timeline.
- **Process:** five sequential steps, stacked on mobile.
- **Contact:** high-contrast closing section with direct email and phone links.

## Accessibility and motion

All interactive elements have visible keyboard focus styles. The mobile menu is controlled with `aria-expanded`, closes after navigation, and can be dismissed with Escape. Essential project information is available without JavaScript through native `details` elements.

The page uses only CSS hover/focus transitions and native browser behavior. Smooth scrolling is disabled when `prefers-reduced-motion: reduce` is active. No pointer effect or animation is required to understand the content.

## Content rules

Only verified experience, skills, contact details, and links should be added. Project cards explicitly identify missing public demos, screenshots, and source links rather than filling those gaps with fabricated evidence.
