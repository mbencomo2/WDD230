import {pageFunctions} from "./modules.js";

//Display a banner on Monday and Tuesday
pageFunctions.displayBanner();
//Handle the hamburgerMenu button
pageFunctions.hamburgerMenu();
//Display the date in the header
pageFunctions.displayDate();

const requestURL = './data/data.json';
const cards = document.querySelector('#directory');

fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    const directory = jsonObject['members'];
    directory.forEach(displayCompanies);
    pageFunctions.deferImages();
  });

function displayCompanies(company) {
  const card = document.createElement('section');
  const details = document.createElement('ul');
  const name = document.createElement('h2');
  const Phone = document.createElement('li');
  const address = document.createElement('li');
  const website = document.createElement('li');
  const logo = document.createElement('img');

  name.innerHTML =`${company.name}`;
  name.classList.add('text-shadow')
  logo.setAttribute('src', 'https://via.placeholder.com/200x100')
  logo.setAttribute('data-src', company.logoURL);
  logo.setAttribute('alt', `${company.logoURL}`);
  logo.setAttribute('loading', 'lazy');
  address.innerHTML = `${company.streetAddress}`
  Phone.innerHTML = `${company.phone}`;
  website.innerHTML = `<a href="${company.webAddress}">${company.webAddress}</a>`;

  card.appendChild(name);
  card.appendChild(logo);
  details.appendChild(address);
  details.appendChild(Phone);
  details.appendChild(website);
  card.appendChild(details);
  card.classList.add('content',"rounded-corners", "drop-shadow", "text-shadow")
  cards.appendChild(card);
}

document.getElementById('bentoBtn').addEventListener('click', () => {
  document.getElementById('directory').classList.add('cards');
  document.querySelectorAll('section').forEach((section) => {
    section.classList.add('content');
    section.classList.add('drop-shadow');
    section.classList.add('rounded-corners');
    section.classList.add('text-shadow');
    section.classList.remove('row');
  });
  document.querySelectorAll('section >img').forEach((img) => {
    img.style = '';
  });
});

document.getElementById('listBtn').addEventListener('click', () => {
  document.getElementById('directory').classList.remove('cards');
  document.querySelectorAll('section').forEach((section) => {
    section.classList.remove('content');
    section.classList.remove('drop-shadow');
    section.classList.remove('rounded-corners');
    section.classList.remove('text-shadow');
    section.classList.add('row');
  });
  document.querySelectorAll('section > img').forEach((img) => {
    img.style = 'display: none;'
  });
});