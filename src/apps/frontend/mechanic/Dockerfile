#
#
#
FROM node:alpine as pruner

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update

# Set working directory
WORKDIR /app

# 
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=mechanic --docker

#
#
#
FROM node:alpine as builder

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update

# Set working directory
WORKDIR /app

# Install the dependencies (as they change less often)
RUN yarn global add pnpm
COPY .gitignore .gitignore
COPY --from=pruner /app/out/full/ ./
COPY --from=pruner /app/out/pnpm-*.yaml .
RUN pnpm install

# Build the project and its dependencies
RUN pnpm mechanic:build

#
#
#
FROM node:alpine as runner

RUN apk add --no-cache curl

# Set working directory
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/src/apps/frontend/mechanic/public/ ./public/
COPY --from=builder /app/src/apps/frontend/mechanic/next.config.js .
COPY --from=builder /app/src/apps/frontend/mechanic/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/src/apps/frontend/mechanic/.next/standalone/ ./
COPY --from=builder --chown=nextjs:nodejs /app/src/apps/frontend/mechanic/.next/static/ ./src/apps/frontend/mechanic/.next/static/

CMD node src/apps/frontend/mechanic/server.js