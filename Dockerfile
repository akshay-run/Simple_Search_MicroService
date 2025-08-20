# Simple Dockerfile (use SQL auth when running in container)
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "src/index.js"]
