FROM docker.io/node:22.11-bookworm-slim AS builder
WORKDIR /app

ARG BUILD_ENV=production

# install and use yarn 4.x
RUN corepack enable
RUN corepack prepare yarn@4.5.1 --activate

# install dependencies
COPY package.json yarn.lock .yarnrc.yml ./
RUN yarn install --immutable

COPY . .
RUN mkdir build
#RUN yarn build:proto
RUN yarn build

FROM ghcr.io/nginxinc/nginx-unprivileged:1.25.2-alpine-slim AS final
WORKDIR /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder --chown=101:101 /app/build/ .
