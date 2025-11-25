FROM node:22-alpine AS base

ARG PORT=3000

ENV PORT=$PORT

# ---- Build Stage ----
FROM base AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# ---- Run Stage ----
FROM base AS runner

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production && yarn cache clean

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]
