FROM nginx:alpine

WORKDIR /app

COPY ./public/ .

COPY ./docker/nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080
