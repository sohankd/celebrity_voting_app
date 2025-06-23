# Build Phase
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npx tailwindcss init
COPY . .

# Accept server URL via build argument
ARG REACT_APP_SERVER_URL
ENV REACT_APP_SERVER_URL=$REACT_APP_SERVER_URL

RUN echo $REACT_APP_SERVER_URL

RUN npm run build

# Serve Phase with Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config (optional)
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
