// Day 3: just building the visible structure - fetch logic stays as-is,
// but we're not auto-running it anymore. Day 4 will connect it to the search button.

const CITY = "London";

async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      // e.g. city not found, bad API key, etc.
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log("Raw API response:", data);

    const cleanData = parseWeatherData(data);
    console.log("Cleaned weather data:", cleanData);

    return cleanData;
  } catch (error) {
    console.error("Something went wrong fetching weather data:", error);
  }
}

// Takes the messy raw API object and returns just the fields we'll actually use
function parseWeatherData(rawData) {
  return {
    city: rawData.name,
    temperature: Math.round(rawData.main.temp),
    feelsLike: Math.round(rawData.main.feels_like),
    condition: rawData.weather[0].main,        // e.g. "Clouds", "Rain", "Clear"
    description: rawData.weather[0].description, // e.g. "light rain"
    humidity: rawData.main.humidity,
    icon: rawData.weather[0].icon,             // used later to show a weather icon
  };
}

// Grab references to the HTML elements we'll need to update
const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-button");
const weatherCard = document.getElementById("weather-card");
const messageEl = document.getElementById("message");

const cityNameEl = document.getElementById("city-name");
const temperatureEl = document.getElementById("temperature");
const conditionEl = document.getElementById("condition");
const humidityEl = document.getElementById("humidity");

// Takes the clean weather object and puts it into the page
function displayWeather(weatherData) {
  cityNameEl.textContent = weatherData.city;
  temperatureEl.textContent = `${weatherData.temperature}°C`;
  conditionEl.textContent = weatherData.description;
  humidityEl.textContent = `Humidity: ${weatherData.humidity}%`;

  weatherCard.style.display = "block";
  messageEl.textContent = "";
}

// Runs when the Search button is clicked
async function handleSearch() {
  const city = cityInput.value.trim();

  if (city === "") {
    messageEl.textContent = "Please enter a city name.";
    weatherCard.style.display = "none";
    return;
  }

  const weatherData = await fetchWeather(city);

  if (weatherData) {
    displayWeather(weatherData);
  } else {
    // fetchWeather already logged the real error - just show something to the user
    messageEl.textContent = "Couldn't find that city. Try checking the spelling.";
    weatherCard.style.display = "none";
  }
}

searchButton.addEventListener("click", handleSearch);
