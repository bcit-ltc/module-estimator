## Release/production
FROM nginxinc/nginx-unprivileged:alpine3.22-perl

LABEL maintainer=courseproduction@bcit.ca
LABEL org.opencontainers.image.source="https://github.com/bcit-ltc/module-estimator"
LABEL org.opencontainers.image.description="Module Estimator is a tool used to estimate the time required to build a module."

WORKDIR /usr/share/nginx/html

COPY src/ /usr/share/nginx/html
