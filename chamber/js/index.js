import { pageFunctions } from "./modules.js";
//Display a banner on Monday and Tuesday
pageFunctions.displayBanner();
//Handle the hamburgerMenu button
pageFunctions.hamburgerMenu();
//Display the date in the header
pageFunctions.displayDate();
//Display last document modified date
pageFunctions.lastModified();
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
    ouput(directory.members);
    //Defer loading images
    pageFunctions.deferImages();
  }
}
loadSpotlights();

function ouput(data) {
  const goldMembers = [];
  let memberIndex = null;
  data.forEach((member) => {
    if (member.membership == "Gold") {
      goldMembers.push(member);
    }
  });
  let memberIndex_1 = getRandomInt(0, goldMembers.length - 1);
  let spotlightNum = 1;
  outputSpotlights(goldMembers[memberIndex_1], spotlightNum);

  let memberIndex_2 = getRandomInt(0, goldMembers.length - 1);
  // Make sure we don't have the same index twice
  while (memberIndex_2 == memberIndex_1) {
    memberIndex_2 = getRandomInt(0, goldMembers.length - 1);
  }
  spotlightNum = spotlightNum + 1;
  outputSpotlights(goldMembers[memberIndex_2], spotlightNum);
}

function outputSpotlights(member, spotlightNum) {
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
  spotlight.id = `spotlight${spotlightNum}`;
  spotlight.classList.add('content', 'text-shadow', 'drop-shadow', 'rounded-corners');
  document.querySelector('.container').appendChild(spotlight);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}