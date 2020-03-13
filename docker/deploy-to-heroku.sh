#!/bin/bash
set -eu

echo "Installing Heroku CLI..."
wget -qO- https://toolbelt.heroku.com/install.sh | sh

echo "Logging in to Heroku Docker repository..."
echo "$HEROKU_API_KEY" | docker login --username=_ --password-stdin registry.heroku.com

echo "Building and uploading the container..."
heroku container:push web --app "$HEROKU_APP_NAME"

echo "Telling Heroku to start the new container..."
heroku container:release web --app "$HEROKU_APP_NAME"
