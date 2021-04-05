FROM node:12

WORKDIR /usr/src/app

COPY . .

EXPOSE 3333

CMD ["tail", "-f", "/dev/null"]
