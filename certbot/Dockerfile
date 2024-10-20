# Build stage
FROM node:16 as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY .. .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf.template
COPY ../.env /app/.env

RUN apk add --no-cache openssl

EXPOSE 80 443

CMD ["/bin/sh", "-c", "source /app/.env && envsubst '$$DOMAIN_NAME' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
