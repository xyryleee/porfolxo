# Portfolio Context Handoff

## Purpose

This directory contains Xyryle Adrian B. Cator's personal web developer portfolio. It is a static, multi-page site intended to present a professional introduction, biography, projects, and contact information.

## Site map

- `index.html` — home/hero page with portrait, introduction, theme-aware shared header, and footer.
- `about.html` — personal/about page.
- `projects.html` — project showcase page.
- `contact.html` — contact page.
- `shared/styles.css` — shared visual styles and animation classes.
- `shared/navbar.js` — single source of truth for the responsive header, active-page state, mobile menu, and light/dark theme toggle.
- `shared/scroll-reveal.js` — IntersectionObserver-based reveal behavior for elements marked with `data-reveal`.
- `assets/` — portfolio imagery and video/media files used by the pages.
- `README.md` — currently only contains the project name and is not a setup guide.

## Visual and interaction language

- Tailwind CSS is loaded from the CDN in each page; the pages use Tailwind utility classes plus `shared/styles.css`.
- Typography uses Hanken Grotesk for the main UI and JetBrains Mono for code-style labels.
- The primary accent is purple, with light and dark themes controlled by the `dark` class on `<html>`.
- Theme preference is stored in `localStorage` under `xyryle-theme`; system preference is used when no saved preference exists.
- The header is mounted through `<div id="site-header-mount"></div>` and rendered by `shared/navbar.js`.
- Preserve reduced-motion support when changing animations.

## Working conventions

- Keep the four page names and the shared asset paths stable unless a coordinated navigation change is intended.
- Put site-wide header behavior in `shared/navbar.js`; do not duplicate navbar markup across pages.
- Put reusable reveal behavior in `shared/scroll-reveal.js` and opt pages/elements in with `data-reveal`.
- Maintain responsive behavior for mobile and desktop layouts.
- Use descriptive image `alt` text and preserve the existing semantic HTML structure.
- Avoid introducing a build step or framework unless the project direction explicitly changes; this is currently a browser-served static site.

## Current state

- The site is organized and functional as a static front-end, but there is no package manifest, build script, automated test suite, or documented local server workflow.
- Several social links and the home-page “Learn More About Me” button still use placeholder `#` destinations and should be wired to real destinations if those profiles/sections are finalized.
- `README.md` should eventually be expanded with preview instructions, page descriptions, and deployment notes.
- External dependencies currently include Tailwind CDN and Google Fonts, so offline rendering is not guaranteed.

## Handoff checklist

Before changing shared behavior:

1. Check all four pages for matching header/footer expectations.
2. Verify both light and dark themes.
3. Verify the mobile menu and active navigation state.
4. Check reduced-motion behavior for reveal and hero animations.
5. Test the affected page at narrow and wide viewport sizes.

There is no configured automated validation command; validation is currently browser-based inspection plus checking changed HTML, CSS, and JavaScript for syntax and broken paths.

## Domain glossary

- **Portfolio site** — the complete static website in this directory.
- **Page** — one of the four top-level HTML documents linked from the shared navigation.
- **Shared header** — the responsive navigation rendered by `shared/navbar.js`.
- **Theme** — the light/dark appearance selected from saved preference or system preference.
- **Reveal** — the one-time entrance animation applied to an element with `data-reveal`.
- **Project asset** — an image or video in `assets/` used to represent portfolio work.
