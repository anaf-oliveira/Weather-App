// Current day and Time

function currentDate() {
  let currentDateTime = new Date();
  let todayElement = document.querySelector("#today");

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

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];

  let hours = currentDateTime.getHours();
  let minutes = currentDateTime.getMinutes();

  todayElement.innerHTML = `${day} ${month} ${hours}:${minutes}`;
  if (minutes <= 10) {
    minutes = `0${minutes}`;
  }
}
currentDate();

//Temperature & description

function currentWeather(response) {
  console.log(response.data);
  let city = response.data.name;
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = `${city}`;

  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${description}`;
  
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = `${temperature}`;

  let max = Math.round(response.data.main.temp_max);
  let maxTemp = document.querySelector("#max-temp");
  maxTemp.innerHTML = `High ↑ ${max-temp} ºC`;

  let min = Math.round(response.data.main.temp_min);
  let minTemp = document.querySelector("#min-temp");
  minTemp.innerHTML = `Low ↓ ${min-temp} ºC`;

  let humidity = response.data.main.humidity;
  let humidityPercentage = document.querySelector("#humidity");
  humidityPercentage.innerHTML = `Humidity    ${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `Wind   ${wind} km/h`;
}

//Current location

function userLocation(position) {
  console.log(position);
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "973ea1dbddc08703f9c4bcb680bae914";
  let geoLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  
  axios.get(geoLocation).then(currentWeather);
  
function currentLocation(event) {
event.preventDefault();
  navigator.geolocation.currentLocation(userLocation);
}

  let currentLocationButton = document.querySelector("#current-button");
  currentLocationButton.addEventListener("click", currentLocation);
