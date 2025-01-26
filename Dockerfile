FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 50051
EXPOSE 8080

CMD ["npm", "start"]