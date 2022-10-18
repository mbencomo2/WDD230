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