FROM node:alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

COPY . .

EXPOSE 4000

CMD ["sh", "-c", "npm install && npx prisma generate && npx prisma migrate deploy && npm start"]
