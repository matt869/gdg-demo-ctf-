# GDG Demo CTF - Cybersecurity Department

Landing site for a community cybersecurity program: interactive defense (blue team)
and offense (red team) rooms, guided learning tracks, and chapter information.

Live site: https://matt869.github.io/gdg-demo-ctf-/

Static single-page app - React 18 + TypeScript + Tailwind CSS, built with Vite.
No backend, no database, no API keys.

## Requirements

Node.js 20 or newer.

## Local development

```
npm install
npm run dev
```

Vite serves the site at http://localhost:5173 with hot reload.

## Production build

```
npm run build      # outputs to dist/
npm run preview    # serves dist/ locally to check the built site
npm run check      # TypeScript type check
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and
publishes `dist/` to GitHub Pages.

One-time setup on a fresh clone of this repository: open **Settings > Pages** and set
**Source** to **GitHub Actions**.

Asset paths are relative (`base: "./"` in `vite.config.ts`) and routing uses the URL
hash (`/#/rooms`), so the build works from a repository sub-path without server
rewrite rules or a `404.html` fallback.

## Structure

```
index.html              page shell
public/                 static files copied as-is (favicon, .nojekyll)
src/main.tsx            entry point
src/App.tsx             routes
src/pages/              Home, Rooms, 404
src/components/         page sections and widgets
src/components/ui/      shared primitives (shadcn/ui)
src/hooks/              reusable hooks
src/lib/utils.ts        class-name helper
src/index.css           theme tokens and global styles
tailwind.config.ts      design tokens, keyframes, animations
```

## Routes

| Path       | Page                          |
| ---------- | ----------------------------- |
| `/#/`      | Home                          |
| `/#/rooms` | Room catalogue with filtering |

## Known stubs

The front end is complete; these controls are intentionally inert until a backend
exists:

- Sign in / sign up in the auth modal, including the Google and GitHub buttons
- "Join room" and "Start challenge" buttons
- Footer links to `/docs`, `/pricing`, `/status`, `/changelog` and similar pages

## License

MIT
