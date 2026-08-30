# Challenges & Resolutions

## 1. Intentional merge conflict (required for marks)

### How it happened

1. After `feature/ui-and-styling` was merged into `develop`, `src/index.html`
   contained the heading `<h1>Todo List</h1>`.
2. **Ayesha** branched `feature/ui-polish` from `develop` and rebranded the
   heading to `<h1>TaskFlow</h1>`, adding a tagline `<p>` underneath.
3. **Rajasinghe** branched `feature/seo-and-meta` from the same commit of
   `develop` (before `feature/ui-polish` was merged) and, on the *same line*,
   changed the heading to `<h1>Todo List Application</h1>` while adding
   `<meta name="description">` and `<meta name="theme-color">` tags.
4. `feature/ui-polish` was reviewed and merged into `develop` first.
5. Rajasinghe then ran `git merge origin/develop` into `feature/seo-and-meta`
   to catch up, and Git halted:

   ```
   Auto-merging src/index.html
   CONFLICT (content): Merge conflict in src/index.html
   Automatic merge failed; fix conflicts and then commit the result.
   ```

### The conflicted region

```html
<<<<<<< HEAD
        <h1>Todo List Application</h1>
=======
        <h1>TaskFlow</h1>
        <p class="app__tagline">Plan the day. One task at a time.</p>
>>>>>>> origin/develop
```

### How we resolved it

On the pull-request thread the team agreed to keep the rebranded heading and
tagline from `develop`, and keep the new meta tags from this branch. The
markers were removed and the file edited to:

```html
        <h1>TaskFlow</h1>
        <p class="app__tagline">Plan the day. One task at a time.</p>
```

Then:

```bash
git add src/index.html
git commit -m "fix: resolve merge conflict in index.html heading"
git push origin feature/seo-and-meta
```

The `feature/seo-and-meta` pull request then showed as mergeable and was
merged into `develop`.

## 2. `npm ci` failed in CI

**Symptom:** the first CI run failed at *Install Dependencies* with
`npm ci can only install with an existing package-lock.json`.

**Cause:** `package-lock.json` had not been committed.

**Fix:** ran `npm install` locally and committed `package-lock.json`. `npm ci`
and the `cache: npm` step both work once the lockfile is tracked.

## 3. GitHub Pages returned 404 after the first deploy

**Symptom:** `deploy.yml` succeeded but the live URL showed "There isn't a
GitHub Pages site here."

**Cause:** the Pages source was still set to "Deploy from a branch".

**Fix:** Repo **Settings → Pages → Build and deployment → Source → GitHub
Actions**, then re-ran the deploy workflow.

## 4. Coordinating parallel work with two people

With both of us touching one small codebase we kept collisions down by:

- Splitting by area — `todo.js` / tests / CSS / DOM wiring vs. `.github/` and docs.
- Keeping feature branches short-lived and merging `develop` back in daily.
- Using pull-request reviews as the sync point rather than editing each other's branches.
