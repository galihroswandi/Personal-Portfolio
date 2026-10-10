# Galih Roswandi · portfolio

Bilingual (Indonesian + English) personal portfolio. Static Astro site, deployed to Vercel.

> Work in progress. Sections below are filled in as the phases land.

## Requirements

- Node 24 (`.nvmrc`), pnpm via corepack: `corepack enable pnpm`

## Setup

```sh
corepack enable pnpm
pnpm install
pnpm dev            # http://localhost:4321 → redirects to /id/ or /en/
```

## Scripts

| Script           | What it does                                   |
| ---------------- | ---------------------------------------------- |
| `pnpm dev`       | Dev server                                     |
| `pnpm build`     | Static build into `dist/`                      |
| `pnpm preview`   | Serve `dist/` locally                          |
| `pnpm lint`      | ESLint + Prettier check                        |
| `pnpm format`    | Prettier write + ESLint fix                    |
| `pnpm typecheck` | `astro check` (TypeScript + Astro templates)   |
| `pnpm test`      | Vitest unit tests                              |
| `pnpm test:e2e`  | Playwright smoke tests against the built site  |
| `pnpm check`     | lint + typecheck + test + build (what CI runs) |

## Structure

See `docs/decisions.md` for non-obvious choices.
