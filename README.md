# skeumorphism-lib

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

Reusable controls currently live in `src/components/ui/`. Shared material tokens and responsive styles live in `src/app/globals.css`. The documentation pages and installable component registry are not implemented yet.

Form previews are local interactions and do not send email.
