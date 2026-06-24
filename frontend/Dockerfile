# =============================================================
# Vue 3 frontend Dockerfile
# Multi-stage: development (Vite dev server, hot reload) és
# production (statikus build, Nginx-szel kiszolgálva)
# =============================================================

# -----------------------------------------------------------
# DEVELOPMENT — volume mount-tal, Vite dev server
# -----------------------------------------------------------
FROM node:20-alpine AS development

WORKDIR /app

COPY package*.json ./
RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# -----------------------------------------------------------
# BUILD — statikus assetek előállítása
# -----------------------------------------------------------
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# -----------------------------------------------------------
# PRODUCTION — Nginx kiszolgálja a statikus build-et
# -----------------------------------------------------------
FROM nginx:1.27-alpine AS production

COPY --from=build /app/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
