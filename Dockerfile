FROM node:16.14-alpine
RUN apk --no-cache add --virtual .builds-deps build-base python3
WORKDIR /app
ADD package*.json .
RUN npm install
ADD . .
CMD npm start