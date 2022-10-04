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
