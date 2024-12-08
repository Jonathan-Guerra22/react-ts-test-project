FROM node:21.2.0-alpine3.18 AS base

ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app



FROM base AS dependencies

COPY package.json package-lock.json ./
RUN yarn install --frozen-lockfile



FROM base AS build

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN yarn build



FROM base AS run

COPY --from=build /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
EXPOSE 3000
# ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]