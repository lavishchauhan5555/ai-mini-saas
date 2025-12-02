# Stage 1: Build frontend
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Setup backend
FROM node:20-alpine
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install --production
COPY backend/ ./

# Copy frontend build to backend
COPY --from=frontend-build /app/frontend/dist ./public

# Set environment variable for Node
ENV NODE_ENV=production

# Expose port
EXPOSE 5000

# Start backend
CMD ["node", "Server.js"]
