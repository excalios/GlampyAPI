FROM node:lts

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

#USER node

CMD [ "npm", "start"]
