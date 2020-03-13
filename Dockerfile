FROM node:lts-alpine
RUN apk add --no-cache nginx supervisor
RUN mkdir /run/nginx

WORKDIR /app
COPY . .

WORKDIR /app/frontend
RUN npm install --only=production
RUN npm run build --production
RUN rm -rf node_modules

WORKDIR /app/backend
RUN npm install --only=production

RUN mv /app/docker/nginx.conf /etc/nginx/conf.d/default.conf
CMD supervisord -c /app/docker/supervisord.conf
