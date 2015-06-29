FROM ubuntu:14.10

ENV DEV_PORT 8080
ENV PORT 3000

RUN apt-get update 
RUN apt-get install -y nodejs  
RUN apt-get install -y nodejs-legacy
RUN apt-get install -y npm

RUN mkdir /code
ADD ./ /code
WORKDIR /code

EXPOSE 8080
EXPOSE 3000

RUN npm install
CMD npm start