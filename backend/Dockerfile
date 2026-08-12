FROM node:16-alpine AS dev
WORKDIR /app
COPY package*.json ./
RUN npm ci


# Stage 2: Production
FROM node:16-alpine AS Prod
WORKDIR /app

RUN addgroup -S appgroup && \
    adduser -S appuser -G appgroup

COPY --from=dev /app/node_modules ./node_modules
COPY backend ./backend

RUN chown -R appuser:appgroup /app

USER appuser
ENV NODE_ENV=production
EXPOSE 5000

CMD ["node", "backend/server.js"]

    