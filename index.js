let now = new Date();
let dayNToday = now.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let dayToday = days[now.getDay()];
let year = now.getFullYear();

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
  "December"
];
let monthToday = months[now.getMonth()];

let h2 = document.querySelector("#date");
h2.innerHTML = `${dayToday}, ${monthToday} ${dayNToday}, ${year}`;

let hours = now.getHours();

function Fullminutes() {
  if (now.getMinutes() < 10) {
    return "0" + now.getMinutes();
  } else {
    return now.getMinutes();
  }
}

let h3 = document.querySelector("#time");
h3.innerHTML = ` ${hours}:${Fullminutes()}`;

function search(city) {
  let apiKey = "8e7395d4f989412fff4eb060663c2eeb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(temperature);
}

function handleSubmit(event) {
  event.preventDefault();

  let searchCity = document.querySelector("#search-city");
  console.log(searchCity.value);
  search(searchCity.value);
}

search("Guimarães,pt");

//function searchLocal(event) {
//event.preventDefault();
//let searchCity = document.querySelector("#search-city");
//if (searchCity.value.length) {
// let city = document.querySelector("#city");
// city.innerHTML = searchCity.value;
//acrescentado
// let apiKey = "f50b4a4ce3859818084fedaf5e77af8a";
// let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&units=metric`;
//
// axios.get(`${apiUrl}&appid=${apiKey}`).then(temperature);
//}
//}

// acrescentado
function temperature(response) {
  //let tempNow = document.querySelector("h1");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let temperatureDay = document.querySelector("#curr-temperature");
  let temperatureMin = document.querySelector("#min-temperature");
  let temperatureMax = document.querySelector("#max-temperature");
  let clouds = document.querySelector("#clouds");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let iconDayElement = document.querySelector("#iconDay");

  celsiusTemperature = response.data.main.temp;
  celsiusTemperatureMin = response.data.main.temp_min;
  celsiusTemperatureMax = response.data.main.temp_max;

  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  temperatureDay.innerHTML = Math.round(celsiusTemperature);
  temperatureMin.innerHTML = Math.round(celsiusTemperatureMin);
  temperatureMax.innerHTML = Math.round(celsiusTemperatureMax);
  clouds.innerHTML = `Cloudiness: ${response.data.clouds.all} %`;
  humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)} %`;
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} m/s`;
  iconDayElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconDayElement.setAttribute("alt", response.data.weather[0].description);
}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", handleSubmit);

function convertToFahrenheit() {
  event.preventDefault();
  let temperatureDay = document.querySelector("#curr-temperature");
  let temperatureMin = document.querySelector("#min-temperature");
  let temperatureMax = document.querySelector("#max-temperature");

  //let link = document.querySelector("#fahrenheit");
  //link.classList.add("active");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  //let celsiusLink = document.querySelector("#celsius");
  temperatureMin.innerHTML = Math.round((celsiusTemperatureMin * 9) / 5 + 32);
  temperatureMax.innerHTML = Math.round((celsiusTemperatureMax * 9) / 5 + 32);
  temperatureDay.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius() {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureMin = document.querySelector("#min-temperature");
  let temperatureMax = document.querySelector("#max-temperature");
  let temperatureDay = document.querySelector("#curr-temperature");
  //let link = document.querySelector("#celsius");
  //link.classList.add("active");
  //let fahrenheitLink = document.querySelector("#fahrenheit");
  //fahrenheitLink.classList.remove("active");
  temperatureDay.innerHTML = Math.round(celsiusTemperature);
  temperatureMin.innerHTML = Math.round(celsiusTemperatureMin);
  temperatureMax.innerHTML = Math.round(celsiusTemperatureMax);
}

let celsiusTemperature = null;
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);
  let gps = document.querySelector("#gps");
  gps.innerHTML = `Latitude: ${Math.floor(lat * 1000 + 0.5) /
    1000} Longitude:${Math.floor(lon * 1000 + 0.5) / 1000} `;
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);
