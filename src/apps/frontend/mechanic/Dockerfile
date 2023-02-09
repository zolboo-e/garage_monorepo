#
# 
#  
FROM node:alpine as base

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update

# Install pnpm as global
RUN npm install --global pnpm

# Configure pnpm global
ENV PNPM_HOME="/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"

# 
# 
# 
FROM base as pruned

# Set working directory
WORKDIR /app

# 
RUN pnpm install -g turbo
COPY . .
RUN turbo prune --scope=mechanic --docker

# 
# 
# 
FROM base as builder

# Set working directory
WORKDIR /app

# Install the dependencies (as they change less often)
COPY --from=pruned /app/out/full .
COPY --from=pruned /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

# Build the project and its dependencies
RUN pnpm db:migrate:deploy; pnpm mechanic:build

#
# 
#  
FROM base as runner

# Set working directory
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app .
CMD pnpm mechanic:start