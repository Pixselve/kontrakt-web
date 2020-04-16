FROM node:alpine

RUN mkdir -p /usr/src/app
COPY package*.json /usr/src/app/

RUN apk add python make g++

RUN cd /usr/src/app/; npm install
WORKDIR /usr/src/app
COPY . /usr/src/app



RUN npm run build

CMD [ "npm", "run", "start" ]

EXPOSE 8080
