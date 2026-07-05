// Day 1 goal: prove we can hit the API and get data back.
// No UI logic yet - just fetch + log.

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
    return data;
  } catch (error) {
    console.error("Something went wrong fetching weather data:", error);
  }
}

// Run it on page load so you can immediately check the console
fetchWeather(CITY);
