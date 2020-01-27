# node image
FROM node:12.14.1-alpine3.11 as builder

# set /app directory as default working directory
WORKDIR /app/
COPY . /app/

# Run yarn
RUN yarn install --pure-lockfile
RUN yarn build
RUN yarn install --production --frozen-lockfile

FROM nginx:1.17.8

RUN apt-get update && apt-get install gzip

RUN rm /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
# COPY --from=builder /app/public/favicon.ico /usr/share/nginx/html/favicon.ico
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf 
COPY --from=builder /app/docker-entrypoint.sh /etc/nginx/docker-entrypoint.sh
RUN chmod a+x /etc/nginx/docker-entrypoint.sh

# expose port 80
EXPOSE 80

# cmd to start service
ENTRYPOINT ["/etc/nginx/docker-entrypoint.sh"]