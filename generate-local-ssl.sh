#!/bin/bash

# Set variables
DOMAIN="localhost"
CERT_DIR="./ssl"

# Create directory for SSL certificates
mkdir -p $CERT_DIR

# Generate SSL certificate
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout $CERT_DIR/privkey.pem \
    -out $CERT_DIR/fullchain.pem \
    -subj "/C=US/ST=State/L=City/O=Organization/OU=Unit/CN=$DOMAIN"

echo "Self-signed SSL certificate generated for $DOMAIN"
