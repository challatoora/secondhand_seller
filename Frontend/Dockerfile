# =========================
# Stage 1: Build React app
# =========================
FROM node:16-alpine AS build

WORKDIR /app

# Copy frontend package files
COPY Frontend/package.json ./
COPY Frontend/package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy frontend source
COPY Frontend/ ./

# Build React application
RUN npm run build


# =========================
# Stage 2: Nginx
# =========================
FROM nginx:alpine AS production

# Remove default Nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy React production build
COPY --from=build /app/build /usr/share/nginx/html

# Copy Nginx configuration
COPY Frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Create non-root user
RUN addgroup -S appgroup && \
    adduser -S appuser -G appgroup

# Give required directories to non-root user
RUN chown -R appuser:appgroup \
    /usr/share/nginx/html \
    /var/cache/nginx \
    /var/log/nginx \
    /etc/nginx/conf.d \
    /run

# Use writable PID location
RUN sed -i 's|pid        /var/run/nginx.pid;|pid        /tmp/nginx.pid;|' /etc/nginx/nginx.conf

USER appuser

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]