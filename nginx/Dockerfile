FROM nginx:alpine

# Install certbot
RUN apk add --no-cache certbot certbot-nginx

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Script to obtain and renew certificates
COPY obtain-certs.sh /obtain-certs.sh
RUN chmod +x /obtain-certs.sh

CMD ["/bin/sh", "-c", "/obtain-certs.sh && nginx -g 'daemon off;'"]
