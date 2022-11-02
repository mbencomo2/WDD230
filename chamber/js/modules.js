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
      const currVisit = getDate();
      const days = calcDays(calcSeconds(currVisit)) - calcDays(lastVisit);
      document.getElementById('lastVisit').textContent = `Last Visit: ${days} days ago`;
      storeVisit();
    }
    else {
      storeVisit();
    }
  },
  autoFillDateTime() {
    document.getElementById('dateField').valueAsDate = new Date();
  }
};

const chillCalc = {
  calcWindChill() {
    const s = document.querySelector('#windSpeed').textContent;
    const t = document.querySelector('#temperature').textContent;
    let chill = document.querySelector('#windChill');

    if (t <= 50) {
      chill.innerHTML = `${windChillCalc(t, s)}&deg; F`;
    }
    else {
      chill.innerHTML = 'N/A'
    }
  }
};

function storeVisit() {
  const currVisit = getDate();
  localStorage.setItem('lastVisit', calcSeconds(currVisit));
}

function calcSeconds(date) {
  const year = date.getFullYear() * 3153600;
  const month = calcMonthSeconds(date.getMonth());
  const day = date.getDate() * 86400;
  const seconds = year + month + day;
  return seconds;
}

function calcMonthSeconds(month) {
  let seconds = null;
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      seconds = 2678400;
      break;

    case 2:
    case 4:
    case 6:
    case 9:
    case 11:
      seconds = 259200;
      break
  }
  return seconds
}

function calcDays(seconds) {
  return Math.round(seconds / 86400);
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

export { pageFunctions, chillCalc };
