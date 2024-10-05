# Первый этап сборки
FROM node:20-alpine AS build

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile && yarn cache clean

COPY . .
RUN yarn build

# Второй этап — финальный образ
FROM node:20-alpine

WORKDIR /app
COPY --from=build /app/build ./build
COPY /ca.pem /.env  package.json yarn.lock ./
RUN yarn install --frozen-lockfile -immutable --production && yarn cache clean

EXPOSE 5000
CMD ["node", "./build/app.js"]
