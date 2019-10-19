FROM mhart/alpine-node:12.2
RUN apk update && apk upgrade && apk add curl git file imagemagick
WORKDIR /code/
COPY package.json yarn.lock ./
RUN yarn
COPY . .
CMD ["node", "index.js"]
