# FROM node:16-alpine AS dev
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci


# # Stage 2: Production
# FROM node:16-alpine AS Prod
# WORKDIR /app

# RUN addgroup -S appgroup && \
#     adduser -S appuser -G appgroup

# COPY --from=dev /app/node_modules ./node_modules
# COPY backend ./backend

# RUN chown -R appuser:appgroup /app

# USER appuser
# ENV NODE_ENV=production
# EXPOSE 5000

# CMD ["node", "backend/server.js"]

# Stage 1: Dependencies
FROM node:16-alpine AS deps

WORKDIR /app

COPY package*.json ./

RUN npm ci


# Stage 2: Production
FROM node:16-alpine AS production

WORKDIR /app

# Create non-root user
RUN addgroup -S appgroup && \
    adduser -S appuser -G appgroup

# Copy package.json so Node sees "type": "module"
COPY --from=deps /app/package*.json ./

# Copy node_modules
COPY --from=deps /app/node_modules ./node_modules

# Copy backend
COPY backend ./backend

# Create uploads directory if your application needs it
RUN mkdir -p /app/uploads

# Set ownership
RUN chown -R appuser:appgroup /app

# Run as non-root
USER appuser

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

CMD ["node", "backend/server.js"]