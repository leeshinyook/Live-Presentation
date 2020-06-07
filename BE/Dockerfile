FROM node:12.13.0-alpine

# installation nodemon
# RUN npm install yarn
RUN yarn global add nodemon

COPY package.json /tmp/package.json
ADD config.json /tmp

RUN cd /tmp; yarn install

# RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app

COPY . /tmp

EXPOSE 3001 3000

WORKDIR /tmp

CMD ["yarn", "start"]