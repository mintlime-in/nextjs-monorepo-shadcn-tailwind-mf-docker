ARG NODE_VERSION=24.13.0
FROM node:${NODE_VERSION}-slim AS base
WORKDIR /app

####################################################
FROM base AS prepare
# RUN yarn global add turbo
RUN npm install -g turbo
COPY . .
RUN turbo prune web --docker

####################################################
FROM base AS installer
COPY --from=prepare /app/out/json/ .
RUN npm install

####################################################
FROM prepare AS builder
COPY --from=installer /app .
RUN npm run build

####################################################
FROM node:${NODE_VERSION}-slim AS runner

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN apt update && apt install -y curl dnsutils jq yq

USER nextjs

COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

# CMD node apps/docs/server.js
