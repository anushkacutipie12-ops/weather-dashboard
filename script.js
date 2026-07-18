// get the elements from html
let cityInput = document.getElementById("city-input");
let searchButton = document.getElementById("search-button");
let weatherCard = document.getElementById("weather-card");
let messageEl = document.getElementById("message");
let forecastArea = document.getElementById("forecast-area");

let cityNameEl = document.getElementById("city-name");
let temperatureEl = document.getElementById("temperature");
let conditionEl = document.getElementById("condition");
let humidityEl = document.getElementById("humidity");

// when search button is clicked
searchButton.addEventListener("click", function () {
  let city = cityInput.value.trim();

  if (city === "") {
    messageEl.textContent = "Please type a city name.";
    weatherCard.style.display = "none";
    forecastArea.innerHTML = "";
    return;
  }

  getWeather(city);
  getForecast(city);
});

// function to call the api for current weather
async function getWeather(city) {
  let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + API_KEY + "&units=metric";

  messageEl.textContent = "Loading...";
  weatherCard.style.display = "none";
  searchButton.disabled = true;

  try {
    let response = await fetch(url);

    if (!response.ok) {
      messageEl.textContent = "City not found. Check spelling?";
      searchButton.disabled = false;
      return;
    }

    let data = await response.json();

    cityNameEl.textContent = data.name;
    temperatureEl.textContent = Math.round(data.main.temp) + "°C";
    conditionEl.textContent = data.weather[0].description;
    humidityEl.textContent = "Humidity: " + data.main.humidity + "%";

    weatherCard.style.display = "block";
    messageEl.textContent = "";
    searchButton.disabled = false;

  } catch (error) {
    console.log(error);
    messageEl.textContent = "Something went wrong. Check your internet.";
    searchButton.disabled = false;
  }
}

// function to call the api for 5-day forecast
async function getForecast(city) {
  let url = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + API_KEY + "&units=metric";

  try {
    let response = await fetch(url);

    if (!response.ok) {
      forecastArea.innerHTML = "";
      return;
    }

    let data = await response.json();

    // the forecast api gives data every 3 hours (40 items for 5 days)
    // we just want one entry per day, so we grab the ones around 12:00
    let dailyForecasts = data.list.filter(function (item) {
      return item.dt_txt.includes("12:00:00");
    });

    forecastArea.innerHTML = ""; // clear old forecast before adding new one

    dailyForecasts.forEach(function (day) {
      let date = new Date(day.dt_txt);
      let dayName = date.toLocaleDateString("en-US", { weekday: "short" });

      let card = document.createElement("div");
      card.className = "forecast-day";
      card.innerHTML =
        "<p class='forecast-day-name'>" + dayName + "</p>" +
        "<p class='forecast-temp'>" + Math.round(day.main.temp) + "°C</p>" +
        "<p class='forecast-condition'>" + day.weather[0].description + "</p>";

      forecastArea.appendChild(card);
    });

  } catch (error) {
    console.log(error);
    forecastArea.innerHTML = "";
  }
}