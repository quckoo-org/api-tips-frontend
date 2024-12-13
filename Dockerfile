FROM node:22.11.0-alpine3.20 AS builder
WORKDIR /app

RUN corepack enable
RUN corepack prepare yarn@4.5.3 --activate

COPY .yarnrc.yml ./
COPY package.json yarn.lock ./

RUN yarn install --immutable --inline-builds

COPY . .
RUN yarn build:proto
RUN yarn build

FROM node:22.11.0-alpine3.20 AS runner
WORKDIR /app

RUN corepack enable
RUN corepack prepare yarn@4.5.3 --activate

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]