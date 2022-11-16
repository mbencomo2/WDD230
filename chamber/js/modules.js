const pageFunctions = {
  displayBanner() {
    const now = getDate();
    if (now.getDay() == 1 || now.getDay() == 2) {
      const banner = document.createElement('p');
      banner.id = 'banner'
      banner.classList = 'rounded-corners'
      banner.innerHTML = '&#129309; &#128307; Come join us for the chamber meet and greet Wednesday at 7:00 p.m.';
      document.querySelector('header').appendChild(banner);
    };
  },
  displayDate() {
    const now = getDate()
    const datefield = document.querySelector("#date");
    const fulldate = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(now);
    datefield.innerHTML = `${fulldate}`;
    document.querySelector('#year').textContent = now.getFullYear()
  },
  hamburgerMenu() {
    document.getElementById('burgerBtn').addEventListener('click', () => {
      document.getElementById('primaryNav').classList.toggle('open');
      document.getElementById('burgerBtn').classList.toggle('open');
    })
  },
  deferImages() {
    const imagesToLoad = document.querySelectorAll("img[data-src]");

    const options = {
      threshold: .4,
    }

    const loadImages = (image) => {
      image.setAttribute("src", image.getAttribute("data-src"));
      image.onload = () => {
        image.removeAttribute("data-src");
      };
    };

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((items, observer) => {
        items.forEach((item) => {
          if (item.isIntersecting) {
            loadImages(item.target);
            observer.unobserve(item.target);
          }
        });
      }, options);
      imagesToLoad.forEach((img) => {
        observer.observe(img);
      });
    } else {
      imagesToLoad.forEach((img) => {
        loadImages(img);
      });
    }
  },
  lastVisited() {
    if ('lastVisit' in localStorage) {
      const lastVisit = localStorage.getItem('lastVisit');
      const currVisit = getDate().getTime();
      const days = Math.round((currVisit - lastVisit) / 86400000);
      document.getElementById('lastVisit').textContent = `Last Visit: ${days} days ago`;
      storeVisit();
    }
    else {
      storeVisit();
    }
  },
  autoFillDateTime() {
    document.getElementById('dateField').valueAsDate = new Date();
  },
  getWeather() {
    //ADD the key and change units to imperial
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?lat=61.2163129&lon=-149.894852&appid=39bef332b3242a9fe5c82f1b824a81f9&units=imperial"

    //Go fetch it and then wait for a response.
    async function getWeatherData() {
      const response = await fetch(apiURL);
      if (response.ok) {
        // the API will send us JSON...but we have to convert the response before we can use it
        // .json() also returns a promise...so we await it as well.
        const data = await response.json();
        output(data);
      }
    }
    getWeatherData();
  }
};


// External Functions needed for exports
function output(result) {
  // console.log(result);

  const temp = document.getElementById('temperature');
  const desc = document.getElementById('weatherDesc');
  const wind = document.getElementById('windSpeed');
  const sprite = document.getElementById('weatherSprite');
  const chill = document.getElementById('windChill');
  const c_time = getDate();

  const words = result.weather[0].description.split(" ")
  const description = words.map((word) => { return word[0].toUpperCase() + word.substring(1) }).join(" ");

  sprite.classList.remove('day');
  sprite.classList.add(getSprite(c_time.getTime, result));

  temp.textContent = result.main.temp.toFixed(0);
  desc.textContent = description;

  wind.textContent = result.wind.speed.toFixed(0);
  if (temp.textContent <= 50) {
    chill.innerHTML = `${windChillCalc(temp.textContent, wind.textContent)}&deg; F`;
  }
  else {
    chill.innerHTML = 'N/A'
  }
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

function storeVisit() {
  const currVisit = getDate();
  localStorage.setItem('lastVisit', currVisit.getTime());
}
function windChillCalc(t, s) {
  let windChillTemp = 35.74 + 0.6215 * t - 35.75 * (s ** 0.16) + 0.4275 * t * (s ** 0.16);
  windChillTemp = Math.round(windChillTemp);
  return windChillTemp;
}

function getDate() {
  const now = new Date();
  return now;
}

export { pageFunctions };
