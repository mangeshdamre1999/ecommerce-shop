#!/usr/bin/env bash
# Build the site and publish dist/ to the gh-pages branch.
# Usage: ./deploy.sh
set -euo pipefail

REPO_URL="https://github.com/mangeshdamre1999/ecommerce-shop.git"

# node is installed via nvm, so make sure it is on PATH even in a bare shell.
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

# GH_PAGES switches the Vite base to the repo sub-path (see vite.config.ts).
GH_PAGES=1 npm run build

cd dist
touch .nojekyll                 # stop Pages running the output through Jekyll
rm -rf .git
git init -q -b gh-pages
git add -A
git commit -q -m "Deploy to GitHub Pages"
git push -q --force "$REPO_URL" gh-pages
rm -rf .git

echo "Deployed: https://mangeshdamre1999.github.io/ecommerce-shop/"
