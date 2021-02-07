FROM nodejs:14-alpine
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
COPY . ./
RUN npm install
CMD npm start