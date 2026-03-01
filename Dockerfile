# Multi-stage build for Astro landing page with API support

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

# Build the Astro site with SSR support
RUN npm run build

# Stage 2: Production image with Node.js (not nginx, since we need API support)
FROM node:20-alpine

WORKDIR /app

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --only=production

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Copy node_modules from builder (needed for nodemailer)
COPY --from=builder /app/node_modules ./node_modules

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=4321

# Expose port
EXPOSE 4321

# Start the Node.js server
CMD ["node", "./dist/server/entry.mjs"]
