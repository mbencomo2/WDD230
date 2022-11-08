import lazyLoader from "./lazyload.js";

const requestURL = 'https://byui-cit230.github.io/lessons/lesson-09/data/latter-day-prophets.json';
const cards = document.querySelector('.cards');

fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    console.log(jsonObject);  // temporary checking for valid response and data parsing
    const prophets = jsonObject['prophets'];
    prophets.forEach(displayProphets);
    lazyLoader.init();
  });

function displayProphets(prophet) {
  const card = document.createElement('section');
  const name = document.createElement('h2');
  const details = document.createElement('ul');
  const birth = document.createElement('li');
  const birthplace = document.createElement('li');
  const portrait = document.createElement('img');
  const nameText = `${prophet.name} ${prophet.lastname}`;

  name.textContent = nameText;
  portrait.setAttribute('src', 'https://via.placeholder.com/300x400')
  portrait.setAttribute('data-src', prophet.imageurl);
  birth.innerHTML = `<b>Birth Date</b>: ${prophet.birthdate}`;
  birthplace.innerHTML = `<b>Birth Place</b>: ${prophet.birthplace}`
  portrait.setAttribute('alt', `Portrait of ${nameText} - ${prophet.order} Latter-day President`);
  portrait.setAttribute('loading', 'lazy');

  card.appendChild(name);
  details.appendChild(birth);
  details.appendChild(birthplace);
  card.appendChild(details);
  card.appendChild(portrait);
  cards.appendChild(card);
};