#!/bin/sh
set -e

echo "Waiting for database..."
until bundle exec rails db:version >/dev/null 2>&1; do
  sleep 2
done

bundle exec rails db:prepare

if [ "${RUN_DB_SEED}" = "true" ]; then
  bundle exec rails db:seed
fi

exec "$@"
