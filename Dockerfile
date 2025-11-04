# Multi-stage build
FROM node:18-alpine AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

FROM node:18-alpine AS server
WORKDIR /app
COPY server/package*.json ./
RUN npm install --only=production
COPY server/ ./
COPY --from=client-build /app/client/build ./public

EXPOSE 5000
CMD ["npm", "start"]