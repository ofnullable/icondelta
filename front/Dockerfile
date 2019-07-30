FROM node

WORKDIR /

COPY . .

RUN ["npm", "install", "--unsafe-perm", "node-sass"]
RUN npm install

EXPOSE 3030

CMD ["npm", "start"]