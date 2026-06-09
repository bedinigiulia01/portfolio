#!/usr/bin/env bash
# Publish the built site (dist/) to the `deploy` branch that Hostinger serves.
#
# Usage:  npm run deploy        (recommended — builds first, then runs this)
#         bash scripts/deploy.sh  (publishes the existing dist/ as-is)
#
# How it works: source code lives on `main`; the built static site lives on the
# `deploy` branch with index.html at the root. Hostinger's Git deploy pulls
# `deploy` into public_html, so the web root always has a real index.html.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
BRANCH="deploy"

if [ ! -f "dist/index.html" ]; then
  echo "✗ dist/index.html not found — run 'npm run build' first." >&2
  exit 1
fi

WT="$(mktemp -d)"
cleanup() { git worktree remove "$WT" --force >/dev/null 2>&1 || true; git worktree prune >/dev/null 2>&1 || true; }
trap cleanup EXIT

# Reset the deploy branch to a fresh copy of dist/ in an isolated worktree
git worktree add -B "$BRANCH" "$WT" HEAD >/dev/null
cd "$WT"
git rm -rqf . >/dev/null 2>&1 || true
cp -R "$ROOT/dist/." .
touch .nojekyll                       # harmless; avoids any Jekyll processing
git add -A

if git diff --cached --quiet; then
  echo "Nothing changed — '$BRANCH' is already up to date."
  exit 0
fi

git commit -q -m "Deploy: $(date '+%Y-%m-%d %H:%M')"
git push -fq origin "$BRANCH"
echo "✓ Built site pushed to '$BRANCH'."
echo "  → In Hostinger, trigger the deploy (or enable auto-deploy) to refresh public_html."
