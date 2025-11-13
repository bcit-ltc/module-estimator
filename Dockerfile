# Dockerfile

## Development
FROM nginx:alpine AS dev

COPY src/ /usr/share/nginx/html

COPY conf.d/default.conf /etc/nginx/conf.d/default.conf

## Release/production
FROM nginxinc/nginx-unprivileged:1.29-alpine3.22-perl AS release

LABEL maintainer=courseproduction@bcit.ca
LABEL org.opencontainers.image.source="https://github.com/bcit-ltc/module-estimator"
LABEL org.opencontainers.image.description="Module Estimator is a tool used to estimate the time required to build a module."

COPY conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=dev /usr/share/nginx/html/ ./
