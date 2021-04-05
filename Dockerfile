FROM node:15.12-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn
COPY . ./
EXPOSE 3000
CMD ["yarn", "start"]
