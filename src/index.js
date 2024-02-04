import "./style.css";

// Super insecure storage of API key, please don't steal :)
const weatherAPI = "ed50ecfaef0b41f39f1222529240102";
const baseWeatherURL = "https://api.weatherapi.com/v1/current.json?key=";

// Holds the weather data for current location
class WeatherObject {
  // Location Info
  static country;

  static state;

  static city;

  // Temp Info
  static tempC;

  static tempF;

  static feelsLikeC;

  static feelsLikeF;

  // Wind Info
  static gustMPH;

  static gustKPH;

  static windMPH;

  static windKPH;

  static windDir;

  // Default to F and Miles
  static useF = true;

  static useM = true;

  // "Constructor"
  static setAll(weatherInfo) {
    // Location info
    this.country = weatherInfo.location.country;
    this.state = weatherInfo.location.region;
    this.city = weatherInfo.location.name;

    // Temp info
    this.tempC = weatherInfo.current.temp_c;
    this.tempF = weatherInfo.current.temp_f;
    this.feelsLikeC = weatherInfo.current.feelslike_c;
    this.feelsLikeF = weatherInfo.current.feelslike_f;

    // Wind info
    this.gustMPH = weatherInfo.current.gust_mph;
    this.gustKPH = weatherInfo.current.gust_kph;
    this.windMPH = weatherInfo.current.wind_mph;
    this.windKPH = weatherInfo.current.wind_kph;
    this.windDir = weatherInfo.current.wind_dir;
  }
}

// Displays the weather info on the page
function displayWeather() {
  // Display location and temp in header
  const location = document.querySelector(".location");
  location.textContent = `${WeatherObject.city}, ${WeatherObject.state}, ${WeatherObject.country}`;
  const tempHeader = document.querySelector(".temp-header");
  tempHeader.textContent = WeatherObject.useF
    ? `${WeatherObject.tempF} F`
    : `${WeatherObject.tempC} C`;

  // Display temperature info
  const currentTemp = document.querySelector(".current-temp");
  currentTemp.textContent = WeatherObject.useF
    ? `Current Temperature: ${WeatherObject.tempF} F`
    : `Current Temperature: ${WeatherObject.tempC} C`;
  const feelsLike = document.querySelector(".feels-like");
  feelsLike.textContent = WeatherObject.useF
    ? `Feels Like: ${WeatherObject.feelsLikeF} F`
    : `Feels Like: ${WeatherObject.feelsLikeC} C`;

  // Display wind info
  const windSpeed = document.querySelector(".wind-speed");
  windSpeed.textContent = WeatherObject.useM
    ? `Wind Speed: ${WeatherObject.windMPH} MPH`
    : `Wind Speed: ${WeatherObject.windKPH} KPH`;
  const windDir = document.querySelector(".wind-dir");
  windDir.textContent = `Direction: ${WeatherObject.windDir}`;
}

// Returns the weather data for specified location
async function getWeather(location = "84105") {
  try {
    const response = await fetch(
      `${baseWeatherURL + weatherAPI}&q=${location}`,
      {
        mode: "cors",
      }
    );
    const weatherData = await response.json();
    const data = WeatherObject.setAll(weatherData);
    displayWeather(data);
  } catch (error) {
    console.log(error);
  }
}

// Form listener
const newLocationForm = document.querySelector("form");
newLocationForm.addEventListener("submit", (e) => {
  // Don't reload page
  e.preventDefault();

  const newLocation = document.getElementById("location");
  getWeather(newLocation.value);
});

// Toggle Temp Units Listener
const toggleTemp = document.querySelector(".toggle-temp");
toggleTemp.addEventListener("click", () => {
  toggleTemp.textContent = WeatherObject.useF ? "Switch to F" : "Switch to C";

  WeatherObject.useF = !WeatherObject.useF;
  displayWeather();
});

// Toggle Distance Units Listener
const toggleDistance = document.querySelector(".toggle-distance");
toggleDistance.addEventListener("click", () => {
  toggleDistance.textContent = WeatherObject.useM
    ? "Switch to MPH"
    : "Switch to KPH";

  WeatherObject.useM = !WeatherObject.useM;
  displayWeather();
});

// Load page with default location
getWeather();
