#!/usr/bin/env bash
set -euo pipefail

APP_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$APP_ROOT"

export PYTHONPATH="$APP_ROOT/.python_packages/lib/site-packages:$APP_ROOT/backend${PYTHONPATH:+:$PYTHONPATH}"
export SQLITE_PATH="${SQLITE_PATH:-/home/data/db.sqlite3}"
export DJANGO_STATIC_ROOT="${DJANGO_STATIC_ROOT:-/home/data/staticfiles}"

mkdir -p "$(dirname "$SQLITE_PATH")" "$DJANGO_STATIC_ROOT"
python backend/manage.py migrate --noinput
python backend/manage.py collectstatic --noinput --clear

exec python -m gunicorn --chdir backend config.wsgi:application \
  --bind "0.0.0.0:${PORT:-8000}" \
  --workers "${WEB_CONCURRENCY:-2}" \
  --timeout 120
