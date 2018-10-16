FROM node:8

RUN mkdir -p /app/weatherapp-frontend
WORKDIR /app/weatherapp-frontend

COPY package.json /app/weatherapp-frontend
COPY package-lock.json /app/weatherapp-frontend

RUN npm install

COPY . /app/weatherapp-frontend

EXPOSE 9000

CMD [ "npm", "start" ]