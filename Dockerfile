FROM ubuntu:14.10

ENV DEV_PORT 8080
ENV PORT 3000

RUN apt-get update 
RUN apt-get install -y nodejs  
RUN apt-get install -y nodejs-legacy
RUN apt-get install -y npm
RUN apt-get install -y git
RUN npm install -y bower -g

RUN mkdir /code
WORKDIR /code

EXPOSE 8080
EXPOSE 3000