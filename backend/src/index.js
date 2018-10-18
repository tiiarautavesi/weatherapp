const debug = require('debug')('weathermap');

const Koa = require('koa');
const router = require('koa-router')();
const fetch = require('node-fetch');
const cors = require('kcors');

const appId = process.env.APPID || '';
const mapURI = process.env.MAP_ENDPOINT || "http://api.openweathermap.org/data/2.5";

let targetCity = {
  currCity: 'Helsinki,fi'
};

const port = process.env.PORT || 9000;
const portForLocationAPI = 8080;

//previous API for weather data
const app = new Koa();

//new API for getting the location from frontend
const getLocation = new Koa(); 

app.use(cors());
getLocation.use(cors());

router.get('/api/location', ctx => {
  ctx.type = 'application/json; charset=utf-8';
  ctx.body = targetCity;
});

router.post('/api/location', async ctx => {
  ctx.body = Object.assign(targetCity, ctx.request.body);
  console.log(targetCity.currCity);
});

const fetchWeather = async () => {
  const endpoint = `${mapURI}/weather?q=${targetCity.currCity}&appid=${appId}&`;
  const response = await fetch(endpoint);
  return response ? response.json() : {}
};

router.get('/api/weather', async ctx => {
  const weatherData = await fetchWeather();

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData.weather ? weatherData.weather[0] : {};
  console.log(weatherData);
});

app
  .use(router.routes())
  .use(router.allowedMethods());

getLocation
  .use(require('koa-body')()) 
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port);
getLocation.listen(portForLocationAPI);

console.log(`App listening on port ${port}`);
console.log(`LocationAPI listening on port ${portForLocationAPI}`);
