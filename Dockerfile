# Stage 1: Build frontend
FROM node:20-alpine AS frontend-build

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Setup backend and copy frontend build
FROM node:20-alpine

WORKDIR /app/backend

# Copy backend package.json and install dependencies
COPY backend/package*.json ./
RUN npm install --production

# Copy backend source code
COPY backend/ ./

# Copy frontend build into backend public folder
COPY --from=frontend-build /app/frontend/dist ./public

# Expose port
ENV PORT=5000
EXPOSE 5000

# Start the server
CMD ["node", "Server.js"]
