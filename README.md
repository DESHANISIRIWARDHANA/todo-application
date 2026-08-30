# TaskFlow — Todo List Application

![CI Pipeline](https://github.com/DESHANISIRIWARDHANA/todo-application/actions/workflows/ci.yml/badge.svg)
![Deploy to Production](https://github.com/DESHANISIRIWARDHANA/todo-application/actions/workflows/deploy.yml/badge.svg)

> Advanced Git & DevOps Team Collaboration Assignment
> Module: Systems Administration & Maintenance

## Group Information

- **Student 1:** R.H.M.P.S. Rajasinghe - ITBIN-2211-0269 - Role: DevOps Engineer
- **Student 2:** Siriwardhana Rampalage Ayesha Deshani - ITBIN-2110-0022 - Role: Full-Stack Developer

## Project Description

**TaskFlow** is a lightweight, responsive todo-list web app. Users can add,
complete, and delete tasks, filter the list by status (all / active /
completed), see a live count of remaining tasks, and clear completed items in
one click. Tasks persist between visits using the browser's `localStorage`, so
the app works fully offline with no backend required.

The value proposition: a distraction-free daily task list that loads instantly,
works on any device, and never loses your data.

## Live Deployment

🔗 **Live URL:** https://deshanisiriwardhana.github.io/todo-application/

## Technologies Used

- **HTML5 / CSS3 / JavaScript (ES Modules)** — no runtime framework
- **Vite** — local dev server (`npm run dev`)
- **ESLint** — code linting (flat config, `eslint.config.js`)
- **Vitest** — unit tests for the task-list logic
- **GitHub Actions** — CI (lint + test + build) and CD (deploy)
- **GitHub Pages** — production hosting, auto-deployed on merge to `main`

## Features

- **Add / delete / complete tasks** — with input validation (empty tasks are rejected).
- **Filter tasks** — All / Active / Completed, with the active filter highlighted.
- **Task counter** — live "N tasks left" indicator.
- **Clear completed** — remove all finished tasks at once.
- **Offline persistence** — tasks are saved to `localStorage` and restored on load.
- **Responsive UI** — single-column layout that adapts from mobile to desktop, with light/dark theme support via `prefers-color-scheme`.

## Branch Strategy

We followed a standard Git Flow branching model:

- `main` — production branch. **Protected**; auto-deploys to GitHub Pages via `deploy.yml` on every merge.
- `develop` — integration branch where feature branches are combined and tested before release.
- `feature/*` — one branch per task, merged into `develop` via reviewed Pull Requests using `--no-ff`.

Feature branches used in this project:

| Branch | Owner | Scope |
| --- | --- | --- |
| `feature/ci-cd-pipeline` | Rajasinghe | GitHub Actions CI + deploy workflows, PR template, branch-protection docs |
| `feature/todo-core-logic` | Ayesha | Task model, pure list operations, unit tests, storage layer |
| `feature/ui-and-styling` | Ayesha | HTML structure, responsive stylesheet, DOM wiring |
| `feature/ui-polish` | Ayesha | Heading rebrand and tagline |
| `feature/seo-and-meta` | Rajasinghe | SEO meta tags, theme colour (**merge conflict resolved here**) |

## Individual Contributions

### R.H.M.P.S. Rajasinghe — DevOps Engineer

- Initialised the repository, `package.json`, `.gitignore`, `.gitattributes` and the `main` / `develop` branch structure.
- Authored the CI workflow (`.github/workflows/ci.yml`) — lint, unit tests and build on every push and PR.
- Authored the GitHub Pages deployment workflow (`.github/workflows/deploy.yml`) — automatic production deploy on merge to `main`.
- Added the pull-request template and documented the branch protection rules (`docs/branch-protection.md`).
- Added SEO meta tags / theme colour (`feature/seo-and-meta`) and **resolved the merge conflict** in `src/index.html` (`docs/challenges.md`).
- Coordinated the `develop` → `main` release and verified the live deployment.

### Siriwardhana Rampalage Ayesha Deshani — Full-Stack Developer

- Designed the task data model and implemented the pure task-list logic in `src/scripts/todo.js` (add, delete, toggle, edit, filter, count, clear completed).
- Implemented the guarded `localStorage` persistence layer (`src/scripts/storage.js`).
- Wrote the Vitest unit suite in `tests/todo.test.js` (13 tests).
- Built the semantic, accessible markup (`src/index.html`) and the responsive light/dark stylesheet (`src/styles/main.css`).
- Wired the DOM to the task logic with event delegation and rendering (`src/scripts/main.js`).
- Rebranded the heading and added the tagline (`feature/ui-polish`); maintained this `README.md`.

> Run `git shortlog -sn --all` or `git log --oneline --author="Ayesha"` to see each member's commits.

## Setup & Installation Instructions

### Prerequisites

- Node.js (version 20 or higher)
- Git installed locally

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DESHANISIRIWARDHANA/todo-application.git
   ```
2. Navigate into the directory:
   ```bash
   cd todo-application
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
   The app opens at `http://localhost:5173`.

### Available Scripts

| Command            | Description                                        |
| ------------------ | -------------------------------------------------- |
| `npm run dev`      | Start the Vite dev server with hot reload          |
| `npm run lint`     | Lint `src/`, `tests/`, and `scripts/` with ESLint  |
| `npm test`         | Run the Vitest unit suite once                     |
| `npm run build`    | Copy `src/` → `dist/` (validated static build)     |
| `npm run preview`  | Serve the built `dist/` folder locally             |

### CI/CD Deployment Process

**CI (`ci.yml`)** runs on every push to `main`, `develop`, and any
`feature/**` branch, and on every pull request into `main` or `develop`:

1. Checkout code and set up Node 20 with npm dependency caching.
2. `npm ci` — clean, reproducible install from `package-lock.json`.
3. `npm run lint` — ESLint must pass (lint failures block the pipeline).
4. `npm test` — all Vitest unit tests must pass.
5. `npm run build` — the static build must succeed.
6. The `dist/` folder is uploaded as a build artifact.

**CD (`deploy.yml`)** runs only on push/merge to `main`:

1. Rebuilds the project on a clean runner.
2. Uploads `dist/` as a GitHub Pages artifact.
3. `actions/deploy-pages` publishes it to the live URL.

Because `main` is protected, code only reaches production through a reviewed PR
(`develop` → `main`), which then triggers the deployment automatically.

### Challenges & Resolutions

See [docs/challenges.md](docs/challenges.md) for the full write-up. In short:

- **Intentional merge conflict** in `src/index.html` between `feature/ui-polish`
  and `feature/seo-and-meta` (both edited the `<h1>`), resolved by keeping the
  rebranded heading plus the new meta tags.
- **`npm ci` failed in CI** until `package-lock.json` was committed.
- **GitHub Pages 404** until the Pages source was switched to "GitHub Actions".

## Build Status

![CI Pipeline](https://github.com/DESHANISIRIWARDHANA/todo-application/actions/workflows/ci.yml/badge.svg)
![Deploy to Production](https://github.com/DESHANISIRIWARDHANA/todo-application/actions/workflows/deploy.yml/badge.svg)
