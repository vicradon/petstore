FROM node:18-alpine

WORKDIR /var/www/app

COPY . /var/www/app/

RUN npm install --production

RUN npx sequelize db:migrate

EXPOSE 8000

CMD ["node", "index.js"]