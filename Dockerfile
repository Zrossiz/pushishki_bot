FROM node:20.11.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .env

CMD ["npm", "run", "start"]