# Project handover

## Summary

The portfolio is a lightweight, responsive static site for Santhosh Kumar M. It presents verified education, internships, cybersecurity learning areas, skills, process, and contact details using an editorial warm-white, charcoal, and muted-green design system.

## Technical changes

- Replaced the previous monolithic themed page with semantic sections and responsive CSS.
- Added responsive navigation with active-section state, keyboard focus, Escape-to-close behavior, and a skip link.
- Added native expandable project notes, direct email/phone links, and copy-email feedback.
- Removed runtime dependencies, external font/icon requests, large embedded media, and blocking preload behavior.
- Added metadata, an inline favicon, reduced-motion handling, and deployment-relative URLs.

## Run locally

This is a static site and has no dependency installation or build step. From the repository root, serve the folder with any static server, for example:

```text
python -m http.server 8000
```

Then open `http://localhost:8000/`.

## Validation

There is no package manifest, test suite, or build command in the repository. Validation should be performed by opening the page through a local static server and checking navigation, the mobile menu, keyboard focus, the copy-email action, and responsive layouts in the browser.

The current local smoke test confirmed that the page has no browser page errors, the mobile menu opens and closes with Escape, the hero scroll cue navigates to Work, and the email contact link resolves to the verified address. The full phase-by-phase status is recorded in [`PHASE_STATUS.md`](./PHASE_STATUS.md).

## GitHub Pages

`.github/workflows/deploy-pages.yml` uploads the repository root on pushes to `main` and deploys it with GitHub Pages. Because the site uses relative URLs and no client-side routing, it works at the existing `/portfolio/` project path.

## Updating the site

To add a project, update the project cards in [`index.html`](../index.html) with verified name, description, contribution, technologies, and evidence links. Add screenshots only when authentic assets are available, with descriptive `alt` text and stable dimensions. Replace the unverified GitHub placeholder only after confirming the correct profile URL.

## Known limitations and follow-up

- No résumé file is present; the résumé action currently opens an email request rather than linking to a nonexistent document.
- No GitHub profile, project repositories, demos, screenshots, or public CTF write-ups were verified in the supplied repository.
- The listed project areas are learning/practice work and are intentionally not presented with unsupported metrics or completion claims.
- A future update can add authentic project evidence and a verified GitHub link without changing the layout system.
