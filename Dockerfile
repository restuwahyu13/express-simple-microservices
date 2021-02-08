FROM node:14-alpine
WORKDIR /app
COPY package*.json \
  .env ./
COPY . ./
RUN npm install
EXPOSE 3000
CMD npm start