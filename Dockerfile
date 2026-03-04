FROM node:25-alpine3.22

RUN apk add --no-cache make

WORKDIR /app

COPY . .

RUN make install

RUN make build

CMD ["make", "start"]