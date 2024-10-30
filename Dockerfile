FROM node:23.0.0-alpine3.19

RUN apk update && apk upgrade

RUN apk add git
RUN apk add openssh
RUN apk add python3

RUN mkdir /root/.ssh

COPY ssh_key/* /root/.ssh/

WORKDIR /apps
COPY package*.json ./

RUN npm i

CMD [ "node", "." ]
