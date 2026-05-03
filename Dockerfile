# ============================================
# Stage 1 — Build the React frontend
# ============================================
FROM node:18-alpine AS frontend-build

WORKDIR /app/client

COPY client/package*.json ./
RUN npm ci --production=false

COPY client/ ./
RUN npm run build

# ============================================
# Stage 2 — Production server
# ============================================
FROM node:18-alpine AS production

# Install curl for healthcheck
RUN apk add --no-cache curl

WORKDIR /app

# Install server dependencies
COPY server/package*.json ./
RUN npm ci --omit=dev

# Copy server source
COPY server/ ./

# Copy built frontend from Stage 1 into server's public directory
COPY --from=frontend-build /app/client/dist ./public

# Create non-root user and switch to it
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown -R appuser:appgroup /app
USER appuser

EXPOSE 3000

# Healthcheck — verifies the /api/health endpoint responds
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

CMD ["node", "src/index.js"]