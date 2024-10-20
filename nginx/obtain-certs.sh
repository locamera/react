#!/bin/sh

# Wait for Nginx to start
sleep 5

# Obtain or renew certificate
certbot --nginx -d ${DOMAIN_NAME} --non-interactive --agree-tos -m ${ADMIN_EMAIL} --redirect

# Renew certificates every 12 hours
while :; do
    certbot renew
    sleep 12h
done
