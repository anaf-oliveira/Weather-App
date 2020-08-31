// Current day and Time

function currentDate() {
  let currentDateTime = new Date();
  let h3 = document.querySelector("h3");

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[currentDateTime.getDay()];

  let hours = currentDateTime.getHours();
  let minutes = currentDateTime.getMinutes();

  h3.innerHTML = `${day} ${hours}:${minutes}`;
  if (minutes <= 9) {
    minutes = `0${minutes}`;
  }
}
currentDate();

// Convert temperature to Fahrenheit/Celsius
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = (temperature * 9) / 5 + 32;
}

let fahrenheit = document.querySelector("#buttonFahren");
fahrenheit.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = "18º";
}

let celsius = document.querySelector("#buttonCelsius");
celsius.addEventListener("click", convertToCelsius);

//Weather of Current City

function searchCity(event) {
  event.preventDefault();
  let inputValue = document.querySelector("#city-search");
  let city = document.querySelector("h1");
  if (inputValue.value) {
    city.innerHTML = `${inputValue.value}`;
  } else {
    alert("Please type a valid city name.");
  }
  let apiKey = "fdfe8350c0dbed11edb7a6fc3233a5d7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=`;
  axios
    .get(`${apiUrl}${inputValue.value}&units=metric&appid=${apiKey}`)
    .then(currentWeather);
}

let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", searchCity);

function currentWeather(response) {
  console.log(response.data.main.temp);
  console.log(response.data.weather[0].description);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}ºC`;
  let description = document.querySelector("#description");
  description.innerHTML = `${response.data.weather[0].description}`;
  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${wind}km/h`;
}

function handlePosition(position) {
  navigator.geolocation.getCurrentPosition(currentLocation);
}

function currentLocation(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "fdfe8350c0dbed11edb7a6fc3233a5d7";
  let geoLocation = "https://api.openweathermap.org/data/2.5/weather?";
  axios
    .get(
      `${geoLocation}lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
    )
    .then(giveLocation);
}

function giveLocation(response) {
  console.log(response.data.main.temp);
  console.log(response.data.name);
  let roundTemp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = `${roundTemp}°C`;
  let cityElement = document.querySelector("#city-value");
  cityElement.innerHTML = response.data.name;
}
let currentButton = document.querySelector("#current-btn");
currentButton.addEventListener("click", handlePosition);
