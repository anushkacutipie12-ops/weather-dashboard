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

// Run it on page load so you can immediately check the console
fetchWeather(CITY);
