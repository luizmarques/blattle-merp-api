FROM node:22.11.0-slim

USER node

WORKDIR /home/node/api

CMD [ "tail", "-f", "/dev/null" ]