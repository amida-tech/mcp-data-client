# node image
FROM node:12.14.1-alpine3.11 as builder

# set /app directory as default working directory
WORKDIR /app/
COPY . /app/

# Run yarn
RUN yarn install --pure-lockfile
RUN yarn build
RUN yarn install --production --frozen-lockfile

FROM node:12.14.1-alpine3.11

WORKDIR /app/

COPY --from=builder /app/ /app/

# expose port 4000
EXPOSE 3000

# cmd to start service
CMD ["npm", "start"]