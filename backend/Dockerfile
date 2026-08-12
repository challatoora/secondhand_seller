# =========================
# Stage 1: Dependencies
# =========================
FROM node:16-alpine AS dependencies

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev


# =========================
# Stage 2: Production
# =========================
FROM node:16-alpine AS production

WORKDIR /app

# Create non-root user
RUN addgroup -S appgroup && \
    adduser -S appuser -G appgroup

# Copy package files
COPY --from=dependencies /app/package*.json ./

# Copy production dependencies
COPY --from=dependencies /app/node_modules ./node_modules

# Copy backend source
COPY backend ./backend

# Set permissions
RUN chown -R appuser:appgroup /app

# Run as non-root
USER appuser

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

CMD ["node", "backend/server.js"]