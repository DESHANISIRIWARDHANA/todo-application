# Branch Protection Configuration

This document records the branch protection rules applied to the repository,
as part of the DevOps Engineer deliverables.

## Protected branch: `main`

Configured under **Settings → Branches → Add branch ruleset / branch
protection rule** with the branch name pattern `main`.

| Setting                                                       | Value            | Reason                                          |
| ------------------------------------------------------------ | ---------------- | ---------------------------------------------- |
| Require a pull request before merging                        | ✅ Enabled       | No direct pushes to production.                |
| Require approvals                                            | ✅ 1             | The other team member must review every change.|
| Dismiss stale approvals when new commits are pushed          | ✅ Enabled       | Force re-review after changes.                 |
| Require status checks to pass before merging                 | ✅ Enabled       | CI must be green before merge.                 |
| Required status check                                        | `build-and-test` | The job defined in `ci.yml`.                   |
| Require branches to be up to date before merging             | ✅ Enabled       | Force integration with the latest `main`.      |
| Require conversation resolution before merging               | ✅ Enabled       | All review comments must be resolved.          |
| Do not allow bypassing the above settings                    | ✅ Enabled       | Rules apply to administrators too.             |
| Allow force pushes                                           | ❌ Disabled      | Protect history.                               |
| Allow deletions                                              | ❌ Disabled      | Prevent accidental branch loss.               |

## Protected branch: `develop` (lighter rules)

Branch name pattern `develop`:

- Require a pull request before merging: ✅
- Require approvals: ✅ 1
- Require status checks to pass (`build-and-test`): ✅
- Allow force pushes / deletions: ❌

## Verification

A direct push to `main` is rejected:

```
$ git push origin main
remote: error: GH006: Protected branch update failed for refs/heads/main.
remote: error: Changes must be made through a pull request.
```

All production changes therefore flow:
`feature/*` → PR → `develop` → PR → `main` → automatic deploy.
