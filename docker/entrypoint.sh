#!/bin/sh
# shellcheck disable=SC2016
set -eux

HERE=$(dirname "$0")

# If we are running outside Heroku, let's set a sane $PORT.
export PORT=${MY_PORT:-8000}

# We need to take the port from the environment (given by Heroku,
# within 3000-60000 range) and save it to nginx config.
envsubst '${PORT}' < "$HERE/nginx.template.conf" > "$HERE/nginx.conf"

supervisord -c "$HERE/supervisord.conf"
