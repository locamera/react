#!/bin/bash

COMPOSE="/usr/local/bin/docker compose --no-ansi"
DOCKER="/usr/bin/docker"

# Load environment variables
source .env

cd $CERTBOT_PATH

$COMPOSE run --rm certbot renew
$COMPOSE exec frontend nginx -s reload

$DOCKER system prune -af
