# Build Stage for Next.js Application
FROM node:21-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . . 
RUN npm run build

# Production Stage
FROM node:21-alpine

WORKDIR /app
COPY --from=build /app ./   
EXPOSE ${CLIENT_PORT}
CMD ["npm", "start"]