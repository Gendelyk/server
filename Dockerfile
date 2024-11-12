###################
# DEVELOPMENT
###################
FROM node:18.12.0-slim as development

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

COPY src ./src
COPY .env ./
COPY tsconfig*.json ./

CMD [ "npm", "run", "start:dev" ]

EXPOSE 3000

# Use the official Node.js image
FROM node:18-alpine as production

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Command to run the application
CMD ["npm", "start"]
