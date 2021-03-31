FROM node:14-alpine3.13
RUN mkdir -p /app/assets
WORKDIR /app
COPY client/src/ ./client/src/
COPY client/public/ ./client/public/
COPY client/package.json ./client/
COPY client/yarn.lock ./client/
COPY client/config-overrides.js ./client/
COPY controllers/ ./controllers/
COPY utils/ ./utils/
COPY app.js ./
COPY config.js ./
COPY routes.js ./
COPY server.* ./
COPY package.json .
COPY yarn.lock .
RUN yarn install \
    && cd client \
    && yarn install \
    && yarn build
CMD [ "yarn", "start" ]