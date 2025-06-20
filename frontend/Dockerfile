# Build Phase
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npx tailwindcss init
COPY . .
RUN npm run build

# Serve Phase with Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config (optional)
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
