# First build
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy dependencies files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile && yarn cache clean

# Copy all files
COPY . .

# Build project
RUN yarn build

# Second build
FROM node:20-alpine

WORKDIR /app

# Copy all files from build
COPY --from=build /app/build ./build
COPY /ca.pem /.env  package.json yarn.lock ./

# Installing dependencies without dev-dependencies
RUN yarn install --frozen-lockfile -immutable --production && yarn cache clean

# Set port
EXPOSE 5000
# Command when docker run
CMD ["node", "./build/app.js"]
