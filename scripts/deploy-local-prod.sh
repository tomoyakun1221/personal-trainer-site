#!/bin/sh
set -e
cd "$(dirname "$0")/.."

if [ ! -f .env.production ]; then
  echo "Creating .env.production from example..."
  cp .env.production.example .env.production
  echo "Edit .env.production and set SECRET_KEY_BASE / JWT_SECRET (run: sh scripts/generate-secrets.sh)"
  exit 1
fi

docker compose -f docker-compose.prod.yml --env-file .env.production up --build -d
echo ""
echo "Site: http://localhost:${PORT:-8080}"
echo "Admin: http://localhost:${PORT:-8080}/admin/login"
