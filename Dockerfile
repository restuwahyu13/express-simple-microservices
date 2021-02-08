# Set node version image for application
FROM node:14-alpine

# Set working directory for application
WORKDIR /usr/src/app

# Update packages and install dependency packages for services
RUN apt-get update \
  && apt-get dist-upgrade -y \
  && apt-get clean

# Copy package.json and any config to working directory
COPY package*.json \
  .env /usr/src/app/

# Copy all file to working directory
COPY . /usr/src/app

# Install dependencies package for applications use
RUN cd /usr/src/app \
  &&  npm install \
  && npm audit fix

# Run application
CMD npm start