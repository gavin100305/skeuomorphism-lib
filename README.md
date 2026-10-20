# skeuomorphism-lib

A standalone project for a skeuomorphic React component library and its documentation site. This repository is independent of the portfolio project.

## Stack

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- ESLint
- npm

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. If another app uses that port, run:

```bash
npm run dev -- --port 3001
```

## Commands

```bash
npm run dev    # Start development
npm run build  # Create a production build
npm start      # Serve the production build
npm run lint   # Run ESLint
```

## Current scope

The landing page includes an interactive object showcase, a six-component carousel, animated block concepts, a syntax-colored example panel, and a sample testimonial marquee. Theme selection follows the system initially and persists in local storage.

Portable components now live in `src/components/skeuomorphic/`. Each imports its own namespaced stylesheet from that directory’s `styles/` folder. The website’s global CSS is not part of the portable source. The documentation previews are available; the installable registry will follow.

Form previews are local interactions and do not send email.

## Component collection

Open `/docs` for the component index. The collection contains documented components with interactive previews, props, and accessibility notes. Portfolio designs were extracted into provider-neutral components; their original project is unchanged.

Component filenames and exports are prefixed (`skeuo-button.tsx`, `SkeuoButton`). Shared material tokens use `--sk-*`, and component classes use `sk-*`. Native CSS ships with each component, so consumers do not need our Tailwind configuration or root layout. See [the independence guide](docs/component-independence.md). The installable registry remains a later step.

The website opts into click sounds through `SkeuoSoundProvider` and supplies its original WAV playback callback. Portable components are silent by default and include no fixed audio URL. Website sounds can be muted using the header sound control. The preference is stored locally. Form demonstrations do not send data.

## Registry

The shadcn registry includes 19 items: foundational controls, cards, forms, calendars, timers, carousels, and optional theme/sound providers.
Run `npm run registry:build` to regenerate the public registry files.
See [registry setup and local installation](docs/registry.md) for usage and validation details.

See [semantic theming](docs/theming.md) for standard primary, secondary, material, and focus colors.
