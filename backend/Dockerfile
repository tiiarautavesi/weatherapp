FROM node:8

RUN mkdir -p /app/weatherapp-backend
WORKDIR /app/weatherapp-backend

COPY package.json /app/weatherapp-backend
COPY package-lock.json /app/weatherapp-backend

RUN npm install

COPY . /app/weatherapp-backend

EXPOSE 9000

CMD [ "npm", "run", "dev" ]