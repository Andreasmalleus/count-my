FROM node:alpine

ENV WORKDIR = /usr/app/
WORKDIR $WORKDIR

COPY package*.json .
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

CMD "npm" "run" "dev"
