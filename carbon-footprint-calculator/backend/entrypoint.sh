#!/bin/sh
set -e

echo "Waiting for MySQL..."
while ! python -c "
import os
import sys
try:
    import MySQLdb
    conn = MySQLdb.connect(
        host=os.environ.get('DB_HOST', 'db'),
        user=os.environ.get('DB_USER', 'cfc_user'),
        passwd=os.environ.get('DB_PASSWORD', 'cfc_pass'),
        db=os.environ.get('DB_NAME', 'carbon_footprint_calculator'),
        port=int(os.environ.get('DB_PORT', 3306)),
        connect_timeout=5
    )
    conn.close()
    sys.exit(0)
except Exception:
    sys.exit(1)
" 2>/dev/null; do
    echo "MySQL is not ready - sleeping 2s"
    sleep 2
done

echo "MySQL is ready."
python manage.py migrate --noinput
exec gunicorn backend.wsgi:application --bind 0.0.0.0:8000
