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
COPY --from=builder /app/nginx-root.conf /etc/nginx/nginx.conf 
COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf.d/default.conf 
RUN touch /var/run/nginx.pid && \
  chown -R 50000:50000 /var/run/nginx.pid && \
  chown -R 50000:50000 /var/cache/nginx
COPY --from=builder /app/docker-entrypoint.sh /etc/nginx/docker-entrypoint.sh
RUN chmod a+x /etc/nginx/docker-entrypoint.sh
RUN chown -R 50000:50000 /etc/nginx/ && chown -R 50000:50000 /usr/share/nginx/

# expose port 8080, set user
EXPOSE 8080
USER 50000:50000

# cmd to start service
ENTRYPOINT ["/etc/nginx/docker-entrypoint.sh"]