# Weatherapp :sunny: :cloud: :snowflake: :sweat_drops:
Weatherapp uses Open Weather Map to keep you updated with the current weather in your location. This application is based on Marko Klemetti's application. You can see all the modifications I've made from the commits of this repository.


### Note before starting to use!!!
You need to register in [openweathermap](http://openweathermap.org/) as a user and get your own API key. Add your key to backend > src > index.js > line 8 as your appId.


### How to run the app with Node.js
- You need to have Node installed to your computer

- Install node modules separately to frontend and backend directories with **npm i** and run both with **npm start**


### How to run the app with Docker (easier and nicer)
- You need to have Node, Docker and Docker compose installed to your computer

- Run **docker-compose build** in the master directory, then run **docker-compose up** and it will be up and running.


## Changes to original app
- Configure *effortless to use* -development environment to this project with Docker Compose. If you want to change the ports of your development enviroment check .env file. It shouldn't be necessary to rebuild the docker compose containers after doing it once.

- New API for location data interactions. With this tool it's possible to use the browser's location when fetching the weather data. I planned to create a location search, where the user can select the city that's weather should be displayed. This feature might follow up later but not yet.

- Styling and content changes