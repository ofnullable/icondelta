FROM node

WORKDIR /app

COPY . /app

RUN npm install --save node-sass

EXPOSE 3030

CMD ["npm", "start"]