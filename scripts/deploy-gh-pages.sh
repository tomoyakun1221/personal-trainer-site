#!/bin/sh
set -e
cd "$(dirname "$0")/.."

ROOT="$PWD"
DIST="$ROOT/frontend/dist"
NODE_DIR="${NODE_DIR:-/tmp/node-portable}"

if ! command -v node >/dev/null 2>&1; then
  if [ ! -x "$NODE_DIR/bin/node" ]; then
    echo "Node not found. Downloading portable Node 20..."
    rm -rf "$NODE_DIR"
    mkdir -p "$NODE_DIR"
    ARCH="$(uname -m)"
    case "$ARCH" in
      arm64) NODE_PKG="node-v20.18.0-darwin-arm64" ;;
      x86_64) NODE_PKG="node-v20.18.0-darwin-x64" ;;
      *) echo "Unsupported architecture: $ARCH"; exit 1 ;;
    esac
    curl -fsSL "https://nodejs.org/dist/v20.18.0/${NODE_PKG}.tar.gz" | tar xz -C "$NODE_DIR" --strip-components=1
  fi
  export PATH="$NODE_DIR/bin:$PATH"
fi

echo "Building frontend..."
cd "$ROOT/frontend"
npm install
VITE_BASE_PATH=/personal-trainer-site/ VITE_STATIC_SITE=true npm run build:pages
cp dist/index.html dist/404.html
touch dist/.nojekyll

echo "Deploying to gh-pages branch..."
cd "$DIST"
git init
git checkout -B gh-pages
git add -A
git commit -m "Deploy $(date -u +%Y-%m-%dT%H:%M:%SZ)"
git push -f "$(git -C "$ROOT" remote get-url origin)" gh-pages

echo ""
echo "Done. Site: https://tomoyakun1221.github.io/personal-trainer-site/"
echo "If not updated, set GitHub Pages source to branch gh-pages / root."
