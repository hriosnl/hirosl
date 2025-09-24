# Hiro San Lorenzo · Portfolio v2

A Next.js App Router site that showcases my design-engineering work through interactive component demos, writing samples, and lived-in UI polish. The build targets production deployments to Vercel (or any Node host) and tracks engagement with Vercel Analytics and Speed Insights.

## Key Features

- **Component gallery** – Animated UI experiments (motion, toggles, carousels) grouped with device mockups and autoplaying reels.
- **Writing hub** – Long-form articles with inline media, audio snippets, and reusable typography styles.
- **Responsive layouts** – Custom hooks for breakpoint detection and time-of-day messaging, plus tailored mobile/desktop flows.
- **Performance instrumentation** – Vercel Analytics and Speed Insights wired at the root layout for real-world telemetry.

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router, TypeScript, React 19)
- [Turbopack](https://nextjs.org/docs/app/building-your-application/optimizing/turbopack) (experimental) for dev/build tooling
- [Tailwind CSS 4](https://tailwindcss.com/) via PostCSS plugin
- [Motion](https://motion.dev/) for animations
- [Lucide](https://lucide.dev/), Google Fonts, @number-flow/react, @zuude-ui/ios-mockups
- pnpm for dependency management

## Getting Started

### Prerequisites

- Node.js ≥ 20 (match the active LTS used by Next.js 15)
- [pnpm](https://pnpm.io/) ≥ 8

### Installation

```bash
pnpm install
pnpm dev           # starts Next.js dev server at http://localhost:3000
```

Add `--turbopack` to `pnpm dev` if you want to experiment with Turbopack locally (already enabled in the package script).

## Available Scripts

| Command      | Description                                                     |
| ------------ | --------------------------------------------------------------- |
| `pnpm dev`   | Run the development server with Turbopack hot reloading         |
| `pnpm build` | Create a production build (uses Turbopack – still experimental) |
| `pnpm start` | Serve the production build (`pnpm build` must succeed first)    |
| `pnpm lint`  | Run ESLint with the `next/core-web-vitals` ruleset              |

> **Note:** Turbopack is opt-in and not yet the stable Next.js build pipeline. If you hit issues, swap to `next build` / `next dev` without `--turbopack`.

## Project Structure

```
app/                    # App Router routes, layouts, and pages
  component/            # Individual component case study pages
  writing/              # Article layout and content
components/             # Shared UI (e.g., BackHome, LowPolyPortrait)
hooks/                  # Custom React hooks (breakpoints, time period)
lib/                    # Utility helpers (e.g., className combiner)
public/                 # Images, videos, article media
styles.css              # Design tokens (currently unused by App Router)
```

## Assets

Media lives in `public/videos` and `public/images`. Most clips are lightweight MP4s, but raw PNGs are also present alongside WebP copies; feel free to remove or convert the PNGs before deploying to reduce bundle size.

## Deployment

1. Create a production build: `pnpm build`
2. Start locally to verify: `pnpm start`
3. Deploy to Vercel (recommended) or any Node host that supports Next.js 15.

For Vercel:

- Push to the main branch connected to Vercel.
- Configure the project with `pnpm install` / `pnpm build` / `pnpm start`.
- No runtime env vars are required today.

If you prefer the stable webpack pipeline, change the build script to `next build` before deploying.

## Accessibility & Performance Checklist

- Replace placeholder links (e.g., `/component/not-available`) as content ships.
- Consider adding `poster`, `loading="lazy"`, and dimension attributes to `<video>` tags for better LCP.
- Generate `sitemap.xml`, `robots.txt`, and Open Graph metadata for discoverability.

## Testing & Quality

No automated tests ship with the repo yet. Recommended additions:

- Component snapshots or visual regression tests (Playwright/Vitest)
- Lighthouse or Web Vitals monitoring in CI
- Type-check script (`tsc --noEmit`) wired into CI

## Roadmap

- Swap build tooling to stable `next build` once the Turbopack experiment ends
- Add more writing samples and component pages
- Implement light/dark theming
- Integrate form/email capture for the “Let’s Talk” CTA

## License

All rights reserved. Contact hriosnl@gmail.com for usage inquiries.
