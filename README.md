# WARSHA — Cinematic Landing Page

A modern, responsive bilingual (Arabic / English) landing page for the **WARSHA** engineering utility app, rebuilt around the original logo and screenshots.

## Run locally

No build step, dependencies, or backend required. Open `index.html` in a browser, or use a local development server:

```sh
python -m http.server 8000
```

Then visit http://localhost:8000/.

## Files

- `index.html` — semantic responsive page, app content and accessible modal
- `styles.css` — dark industrial design, animations, RTL/LTR layouts, mobile styles
- `script.js` — bilingual toggle, scroll reveals, mobile navigation, accessible dialog, interactive demonstration calculator, background playback control
- `assets/warsha-logo.webp` — cropped transparent brand logo supplied by the project owner
- `assets/warsha-app.webp` — optimized screenshot of the actual WARSHA app
- `assets/{gears,lathe,drill}.webp` — card images extracted from that screenshot
- `assets/workshop-loop.mp4` — original **procedurally generated**, seamless looping industrial-motion background video (not footage of a real machine)
- `assets/workshop-poster.webp` — video fallback poster

## Live features

- Arabic / English switch with saved preference
- Responsive accessible navigation + focus-trapped availability modal
- Scroll progress, reveal and hover animations
- Muted autoplay background loop with `prefers-reduced-motion` fallback
- Live **spur gear pitch-circle diameter** demo: `d = module × number_of_teeth`, with input validation

## Important: download links

**No APK / ZIP / iOS links have been invented.** Download releases in the original repository are not available yet, so the page intentionally shows “Coming soon” and a status modal. Add real release files before enabling actual download buttons.

## Deployment

Replace or upload these files to the root of `warsha-website` on GitHub. Enable GitHub Pages in **Settings → Pages → Deploy from branch → main → /(root)**, or deploy the folder on any static hosting service.

If the site already has Pages enabled, committing `index.html`, `styles.css`, `script.js` and `assets/` to `main` is all that's needed. The code works without a JavaScript bundler.

## Notes

- The hero uses an original abstract motion graphic exported as an MP4 video, so no stock-video copyright or third-party CDN is required.
- Fonts load from Google Fonts when online, with local system fallbacks.
- Animations and video respect reduced-motion preferences.
- Calculator is a demonstration for **standard spur gears** and is not a substitute for professional verification of real machinery settings.

The optional `tools/generate_assets.py` script documents how the reference assets and procedural animation were produced. It requires the user's original upload filenames in `/mnt/data/`, plus Pillow, NumPy and FFmpeg; the generated website does not need it.