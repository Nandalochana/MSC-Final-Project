# Use the official Node.js image
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Start the app
CMD ["npm", "start"]
