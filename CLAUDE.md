# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio site (Vite + React 18, function components, plain CSS). Deployed to GitHub Pages at https://utkarshyadav009.github.io/portfolio/ from the `gh-pages` branch. Originally forked from `Dorota1997/react-frontend-dev-portfolio` (the `upstream` remote); the 2026 redesign replaced that Create React App template entirely, so upstream changes no longer apply.

## Commands

- `npm run dev` — dev server (Vite, port 5173; `.claude/launch.json` has a `portfolio` config)
- `npm run build` — production build into `build/`
- `npm run preview` — serve the built site locally
- `npm run deploy` — builds (via `predeploy`) and publishes `build/` to the `gh-pages` branch. This publishes the live site.

There are no tests or linters.

## Architecture

**Content lives in one file, `public/data/site.json`, not in components.** Adding or editing a project, job or skill is a JSON edit. `src/App.jsx` fetches it at runtime with a relative URL (which is why `vite.config.js` sets `base: "./"`), then passes slices to the section components in `src/components/`.

The page uses progressive disclosure: each project shows a short teaser card, and the full write-up opens in a single shared native `<dialog>` (`Dialog.jsx`). Keep teasers short; put detail in the dialog fields.

Key fields in `site.json`:
- `selected[]` — recent work. Teaser fields: `chapter` (`"costar"` → card grid in `Story.jsx`, `"bmo"` → the featured block in `Featured.jsx`), `icon` (a key of `ICONS` in `Doodles.jsx`), `hook` (one line), `headline` `{value, label}`. Dialog fields: `tagline`, `year`, `context`, `summary`, `results[]` of `{value, label}` (real measured numbers only), optional `notes`, `stack[]`, `links[]`, optional `linkNote`, `images[]` of `{src, alt}`.
- `earlier[]` — older projects shown as a polaroid grid (`EarlierWork.jsx`): `title`, `year`, `dates`, `summary`, `images[]` (paths), optional `youtube` (must be an `/embed/` URL), optional `url`, `tags[]`.
- `costar` (`dates`, `blurb`), `experience[]` (one line each: `dates`, `role`, `org`), `treasureHunts`, `skills[]`, plus top-level `name`, `role`, `lede`, `intro[]`, `links[]`, `photo`, `photoCaption`, `now`.

Images live under `public/images/` (project images in `public/images/portfolio/<Project-Name>/`); paths in JSON are relative to `public/`.

Styling is one file, `src/styles.css`, driven by CSS custom properties on `:root`. Dark ("night") mode is defined twice on purpose: under `@media (prefers-color-scheme: dark)` guarded by `:root:not([data-theme="light"])`, and under `:root[data-theme="dark"]`. The header toggle sets `data-theme` on `<html>` and stores it in `localStorage`; an inline script in `index.html` applies the saved theme before first paint.

Doodles (`src/components/Doodles.jsx`) are original inline SVGs. Their colours come from CSS classes (`.ln` for outlines, `.f-<token>` for fills), because `var()` does not resolve inside SVG presentation attributes. The `#wobble` / `#wobble-border` SVG filters (rendered once by `WobbleDefs`) give the hand-drawn edge; `.card` applies it to a `::before` pseudo-element so text is never distorted.

Design rules (deliberate, keep them): a cosy storybook look taken from the owner's green knitted jumper — parchment paper, knit green, black line-art, cookie brown; Fraunces (SOFT/WONK axes) for headings, Nunito for body, Gaegu for small handwritten labels; wobbly outlines with hard offset shadows; original doodles only (cartoons are inspiration, never copied characters or art). Copy stays short and factual: real, checkable numbers, no slogans.
