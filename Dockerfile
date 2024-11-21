FROM node:22.8.0-slim

RUN npm install -g @nestjs/cli@10.4.5

USER node

WORKDIR /home/node/api-merp-combat-dummy

CMD [ "tail", "-f", "/dev/null" ]