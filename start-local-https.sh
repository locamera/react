#!/bin/bash

# Generate local SSL certificate
./generate-local-ssl.sh

# Start Docker Compose
docker compose up --build
