FROM alpine:3.8
LABEL maintainer "Alexander Pehm <alexander@alexanderpehm.at>"

RUN apk add --no-cache nodejs npm

COPY package.json package-lock.json buildRollup.sh server.js ./
COPY rollup.config.pr.js ./rollup.config.js
COPY src ./src

RUN npm install
RUN npm install -g rollup && ./buildRollup.sh && rollup -c
EXPOSE 8000
ENTRYPOINT ["npm","run","server"]