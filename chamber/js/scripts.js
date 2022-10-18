// Hamburger Menu
document.getElementById('burgerBtn').addEventListener('click', () => {
  document.getElementById('primaryNav').classList.toggle('open');
  document.getElementById('burgerBtn').classList.toggle('open');
})

// Last Modified
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;

// Date
const datefield = document.querySelector("#date");
const now = new Date();
const fulldate = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(now);
datefield.innerHTML = `${fulldate}`;
document.querySelector('#year').textContent = now.getFullYear()

//Display Banner when date is Monday or Tuesday
if (now.getDay() == 1 || now.getDay() == 2) {
  const banner = document.createElement('p');
  banner.id = 'banner'
  banner.classList = 'rounded-corners'
  banner.textContent = '🤝🏼 Come join us for the chamber meet and greet Wednesday at 7:00 p.m.';
  document.querySelector('header').appendChild(banner);
};


//windchill calculator
const s = document.querySelector('#windSpeed').textContent;
const t = document.querySelector('#temperature').textContent;
let chill = document.querySelector('#windChill');
if (t <= 10) {
  chill.innerHTML = `${windChillCalc(t, s)}&deg; C`;
}
else {
  chill.innerHTML = 'N/A&deg; C'
}

function windChillCalc(t, s) {
  let windChillTemp = 35.74 + 0.6215 * t - 35.75 * s ** (0.16) + 0.4275 * t * s ** (0.16);
  windChillTemp = Math.round(windChillTemp);
  return windChillTemp;
}