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

WORKDIR /app

RUN mv docker/nginx.conf /etc/nginx/conf.d/default.conf

# Heroku does not support running as root
RUN chmod 777 -R . /var/lib/nginx /var/log/nginx /run/nginx
RUN adduser -D myuser
USER myuser

CMD supervisord -c docker/supervisord.conf
