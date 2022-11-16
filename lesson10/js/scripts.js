//ADD the key and change units to imperial
const apiURL = "https://api.openweathermap.org/data/2.5/weather?lat=61.2163129&lon=-149.894852&appid=39bef332b3242a9fe5c82f1b824a81f9&units=imperial"

//Go fetch it and then wait for a response.
async function getWeatherData() {
  const response = await fetch(apiURL);
  if (response.ok) {
    // the API will send us JSON...but we have to convert the response before we can use it
    // .json() also returns a promise...so we await it as well.
    data = await response.json();
    output(data);
  }
}

function output(result) {
  console.log(result);

  const temp = document.getElementById('temperature');
  const desc = document.getElementById('weatherDesc');
  const wind = document.getElementById('windSpeed');
  const chill = document.getElementById('windChill');
  const sprite = document.getElementById('weatherSprite');
  const c_time = new Date();

  const words = result.weather[0].description.split(" ")
  const description = words.map((word) => {return word[0].toUpperCase() + word.substring(1)}).join(" ");

  sprite.classList.remove('day');
  sprite.classList.add(getSprite(c_time.getTime, result));

  temp.textContent = result.main.temp.toFixed(0);
  desc.textContent = description;

  wind.textContent = result.wind.speed.toFixed(0);
  chill.textContent = result.main.feels_like.toFixed(0);
}

function getSprite(time, weather) {
  let isDay = false;
  let spriteName = 'day';
  if (time > weather.sys.sunrise && time < weather.sys.sunset) {
    isDay = true;
  }
  switch (weather.weather[0].main) {
    case "Clear":
      if (isDay) {
        spriteName = 'day';
      } else {
        spriteName = 'night';
      }
      break;
    case "Cloudy":
      if (isDay) {
        spriteName = 'day-cloudy';
      } else {
        spriteName = 'night-cloudy';
      }
      break;
    case "Rain":
      spriteName = 'rain';
      break;
    case "Snow":
      spriteName = 'snow';
      break;
    case "Mist":
    case "Dust":
    case "Fog":
      spriteName = 'fog';
      break;  
    default:
      spriteName = 'day';
      break;
  }
  return spriteName;
}

getWeatherData();