FROM ubuntu:14.10

RUN apt-get update 
RUN apt-get install -y nodejs  
RUN apt-get install -y nodejs-legacy
RUN apt-get install -y npm

RUN mkdir /code
WORKDIR /code

EXPOSE 8080