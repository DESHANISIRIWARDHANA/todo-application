/**
 * Minimal build step: validates required source files exist, then copies
 * the static `src/` tree into `dist/` for deployment (GitHub Pages).
 *
 * Kept dependency-free on purpose so the CI `npm run build` stage is fast
 * and easy to reason about.
 */
import { cp, rm, mkdir, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');

const REQUIRED = [
  'index.html',
  'styles/main.css',
  'scripts/main.js',
  'scripts/todo.js',
  'scripts/storage.js',
];

async function assertRequiredFiles() {
  for (const rel of REQUIRED) {
    try {
      await access(path.join(SRC, rel), constants.R_OK);
    } catch {
      throw new Error(`Build failed: missing required source file src/${rel}`);
    }
  }
}

async function main() {
  await assertRequiredFiles();
  await rm(DIST, { recursive: true, force: true });
  await mkdir(DIST, { recursive: true });
  await cp(SRC, DIST, { recursive: true });
  console.log('Build complete: src/ -> dist/');
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
