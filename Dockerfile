FROM node:20-alpine

WORKDIR /app

COPY package.json /app/

RUN yarn

COPY . /app/

RUN yarn prisma generate
RUN ls
RUN yarn build

EXPOSE 3333

CMD yarn start:prod