// get the elements from html
let cityInput = document.getElementById("city-input");
let searchButton = document.getElementById("search-button");
let weatherCard = document.getElementById("weather-card");
let messageEl = document.getElementById("message");

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
    return;
  }

  getWeather(city);
});

// function to call the api
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

    // put the data into the html
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
