# WARSHA — ورشة

Modern, lightweight Arabic/English landing page for the WARSHA workshop app.

## Run locally

Open `index.html` in a browser or serve this directory with `python -m http.server 8000`.

## Stack

Plain HTML, CSS and JavaScript. No build step, framework, autoplay background video or runtime dependencies. The website uses existing local brand/app/workshop visuals under `assets/`; Cairo and Manrope load from Google Fonts with system font fallbacks.

## Sections

- Responsive hero, featuring the WARSHA brand and in-app screenshot.
- Intro and three machining-tool cards.
- Live standard spur-gear pitch diameter demo: `d = m × Z` (module in mm, number of teeth integer).
- Arabic/English interface toggle, accessible modal showing release status.
- Subtle scroll reveals, mobile navigation, reduced-motion support.

## Release status

This landing page is not the released Android/Windows app. Android and Windows download links are not available, and iOS is untested. Add verified release links only when actual builds are available.

## Hosting

GitHub Pages deploys the repository automatically from `.github/workflows/deploy.yml` after pushes to `main`.