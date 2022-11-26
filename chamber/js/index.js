import { pageFunctions } from "./modules.js";
//Display a banner on Monday and Tuesday
pageFunctions.displayBanner();
//Handle the hamburgerMenu button
pageFunctions.hamburgerMenu();
//Display the date in the header
pageFunctions.displayDate();
//Get weather info
pageFunctions.getWeather();


//Load Company Spotlights on Homepage
const apiURL = "./data/data.json"

//Go fetch it and then wait for a response.
async function loadSpotlights() {
  const response = await fetch(apiURL);
  if (response.ok) {
    // the API will send us JSON...but we have to convert the response before we can use it
    // .json() also returns a promise...so we await it as well.
    const directory = await response.json();
    outputSpotlights(directory.members);
    //Defer loading images
    pageFunctions.deferImages();
  }
}
loadSpotlights();

function outputSpotlights(data) {
  const goldMembers = [];
  data.forEach((member) => {
    if (member.membership == "Gold") {
      goldMembers.push(member);
    }
  });
  let num = 1;
  goldMembers.forEach((member) => {
    if (member.membership == "Gold" && num <= 2) {
      const spotlight = document.createElement('div');
      const name = document.createElement('h2');
      const logo = document.createElement('img');
      const spacer = document.createElement('hr');
      const ul = document.createElement('ul');
      const link = document.createElement('li');
      const phone = document.createElement('li');

      name.textContent = member.name;
      logo.setAttribute('src', 'https://via.placeholder.com/150');
      logo.setAttribute('data-src', member.logoURL);
      logo.setAttribute('alt', `${member.name} Logo`);
      link.innerHTML = `<a href="${member.webAddress}">${member.webAddress}</a>`;
      phone.innerHTML = `<a href="${member.phone}">${member.phone}</a>`;

      ul.appendChild(link);
      ul.appendChild(phone);

      spotlight.appendChild(name);
      spotlight.appendChild(logo);
      spotlight.appendChild(spacer);
      spotlight.appendChild(ul)
      spotlight.id = `spotlight${num}`;
      spotlight.classList.add('content', 'text-shadow', 'drop-shadow', 'rounded-corners');
      document.querySelector('.container').appendChild(spotlight);
      num = num + 1;
    }
  })
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}