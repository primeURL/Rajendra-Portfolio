# Multi-stage build for Astro landing page

# Stage 1: Build the application
FROM node:20-alpine AS builder

ARG PUBLIC_SITE_URL

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL

# Build the Astro site
RUN npm run build

# Stage 2: Production image with nginx
FROM nginx:alpine

# Install curl for healthchecks
RUN apk add --no-cache curl

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy nginx configuration
COPY nginx-docker.conf /etc/nginx/conf.d/default.conf

# Copy built static files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Set proper permissions
RUN chmod -R 755 /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
