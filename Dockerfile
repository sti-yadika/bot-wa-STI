FROM node:23.0.0-alpine3.19

WORKDIR /apps
COPY package*.json ./

RUN npm i

CMD [ "node", "." ]