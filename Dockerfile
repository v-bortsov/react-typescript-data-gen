FROM node:15.12-alpine

WORKDIR /usr/src/app
COPY package*.json ./
COPY . ./
EXPOSE 3000
CMD ["npm", "run start"]
