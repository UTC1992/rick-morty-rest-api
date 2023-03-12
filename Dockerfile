# stage 1

FROM node:18-alpine as build

WORKDIR /usr

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src

RUN npm install
RUN npm run build

COPY .env .

EXPOSE 8080

CMD ["npm", "run", "dev"]