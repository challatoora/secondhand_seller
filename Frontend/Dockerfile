FROM node:16-alpine AS build

WORKDIR /app

COPY Frontend/package*.json ./

RUN npm ci

COPY Frontend/ ./

RUN npm run build

# Stage 2: Nginx

FROM nginx:alpine AS production

# Remove default 
RUN rm -rf /usr/share/nginx/html/*

# Copy React production
COPY --from=build /app/build /usr/share/nginx/html

# Nginx config
COPY Frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Create non-root user
RUN addgroup -S appgroup && \
    adduser -S appuser -G appgroup

# Give user ownership of required nginx directories
RUN chown -R appuser:appgroup \
    /usr/share/nginx/html \
    /var/cache/nginx \
    /var/log/nginx \
    /etc/nginx/conf.d \
    /run

# Nginx needs writable PID location
RUN sed -i 's|pid        /var/run/nginx.pid;|pid        /tmp/nginx.pid;|' /etc/nginx/nginx.conf

USER appuser

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
