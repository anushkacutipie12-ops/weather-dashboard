# Weather Dashboard

A simple web app that shows the current weather and a 5-day forecast for any city, using the OpenWeatherMap API.

## Features
- Search weather by city name
- Shows current temperature, condition, and humidity
- Shows a 5-day forecast
- Handles invalid city names and network errors gracefully
- Loading state while fetching data

## How to run it locally
1. Clone this repo
   ```
   git clone https://github.com/anushkacutipie12-ops/weather-dashboard.git
   ```
2. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
3. Create a file called `config.js` in the project folder with this content:
   ```js
   const API_KEY = "your_api_key_here";
   ```
4. Open `index.html` in your browser (or use the Live Server extension in VS Code)

## Built with
- HTML, CSS, JavaScript (no frameworks)
- [OpenWeatherMap API](https://openweathermap.org/api)

## What I'd improve with more time
- Add a "use my current location" button using the Geolocation API
- Cache recent searches so repeated lookups don't hit the API again
- Add unit toggle (Celsius / Fahrenheit)
- Better mobile responsiveness

## Live demo
https://anushkacutipie12-ops.github.io/weather-dashboard/