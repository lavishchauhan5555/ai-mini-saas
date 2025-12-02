# -----------------------
# Build Frontend
# -----------------------
FROM node:20 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run build

# -----------------------
# Build Backend + Full App
# -----------------------
FROM node:20 AS backend
WORKDIR /app

# Copy backend
COPY backend/package*.json ./
RUN npm install
COPY backend .

# Copy frontend build output into backend/public
RUN mkdir -p /app/public
COPY --from=frontend-build /app/frontend/dist /app/public

EXPOSE 5000
CMD ["node", "Server.js"]
