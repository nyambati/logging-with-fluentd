FROM node:12-alpine

LABEL app=logger

COPY . /usr/app

WORKDIR /usr/app

CMD node logger