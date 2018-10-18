const debug = require('debug')('weathermap');

const Koa = require('koa');
const router = require('koa-router')();
const fetch = require('node-fetch');
const cors = require('kcors');

const appId = process.env.APPID || ''; // Add your API key here
const mapURI = process.env.MAP_ENDPOINT || "http://api.openweathermap.org/data/2.5";

let targetCity = {
  currCity: 'Helsinki,fi'
};

//Port for weather API
const port = process.env.PORT || 9000;

//Port for location API
const portForLocationAPI = 8080;

//API for weather data
const app = new Koa();

//API for getting the location from frontend
const getLocation = new Koa(); 

app.use(cors());
getLocation.use(cors());

//Create API content
router.get('/api/location', ctx => {
  ctx.type = 'application/json; charset=utf-8';
  ctx.body = targetCity;
});

//Allow frontend to send data to API
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
  .use(require('koa-body')()) //Use koa-body
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port);
getLocation.listen(portForLocationAPI);

console.log(`App listening on port ${port}`);
console.log(`LocationAPI listening on port ${portForLocationAPI}`);
