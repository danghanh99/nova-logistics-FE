FROM node:13-alpine as build-stage

WORKDIR '/app'

COPY package.json .
RUN npm install
COPY . .

EXPOSE 8083

CMD ["npm", "start"]