FROM node:18
WORKDIR /usr/src/clean-node-api

COPY ./package.json .
RUN npm install --omit=dev --legacy-peer-deps

COPY ./dist ./dist

EXPOSE 5000

CMD npm start