# Kothapalli Lakshmi Prasad — Portfolio (Static)

A pure HTML / CSS / JavaScript personal portfolio with a green-forest aesthetic and live 3D scenes (flying birds, galloping horse, walking tortoise) powered by [Three.js](https://threejs.org/).

## Files
- `index.html` — semantic markup, SEO meta tags, JSON-LD schema, accessible skip link
- `styles.css` — design tokens (HSL), responsive layout, animations
- `script.js` — content data, navigation, scroll reveal, contact form, **3D scenes via Three.js**
- `Kothapalli_Lakshmi_Prasad_CV.pdf` — downloadable CV

## Run locally
The project uses an ES-module import map (no build step), so it must be served over HTTP, not opened as `file://`.

```bash
# any one of these works
npx serve .
python3 -m http.server 8080
php -S localhost:8080
```

Then open `http://localhost:8080`.

## Deploy

### GitHub Pages
1. Create a new repo and push these files to the `main` branch.
2. Settings → Pages → Source: `Deploy from branch` → Branch: `main` / `/ (root)`.
3. Your site will be at `https://<username>.github.io/<repo>/`.

### Netlify (drag-and-drop)
1. Visit https://app.netlify.com/drop
2. Drag the entire `portfolio_static` folder onto the page.
3. Done — Netlify gives you a URL instantly. Connect a custom domain in **Site settings → Domain management**.

### Vercel
1. `npm i -g vercel` then `vercel` inside the folder. Choose framework: **Other**.

## SEO
- Unique `<title>` and `<meta name="description">` (under 160 chars)
- `Person` JSON-LD schema (search engines & rich results)
- Open Graph + Twitter Card meta tags
- Single `<h1>` per page, semantic `<section>` and `<header>` structure
- Add a sitemap when you have multiple pages
- Replace the social links with your real LinkedIn / GitHub URLs

## Accessibility
- Skip-to-content link
- Keyboard-navigable nav, hamburger button has `aria-expanded`
- Meaningful `aria-label`s on icon-only buttons
- Color contrast meets WCAG AA on body text
- `prefers-reduced-motion` disables animations and pauses 3D scenes
- All form inputs have associated `<label>`s

## Performance
- Self-contained CSS and JS — no framework runtime
- Three.js loaded from CDN with HTTP/2 and aggressive cache headers
- `dpr` capped at 1.5 on 3D canvases to limit pixel cost on retina screens
- Fonts loaded via `preconnect` + `display=swap` to avoid render blocking
- Lazy-load images with `loading="lazy"` if you add any later
- Add a `manifest.webmanifest` and minimal service worker for PWA install

## Customise
- Edit data arrays at the top of `script.js` (`SKILLS`, `PROJECTS`, `EDUCATION`, `CERTS`)
- Tweak the palette via the HSL custom properties in `:root` (`styles.css`)
- Replace `Kothapalli_Lakshmi_Prasad_CV.pdf` with your latest CV
