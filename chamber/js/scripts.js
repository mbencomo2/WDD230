import {pageFunctions, chillCalc} from "./modules.js"

// Hamburger Menu
pageFunctions.hamburgerMenu();

// Last Modified
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;

// Date
pageFunctions.displayDate();

//Display Banner when date is Monday or Tuesday
pageFunctions.displayBanner();

//Calculate WindChill
if (document.title == 'Anchorage Chamber of Commerce') {
  chillCalc.calcWindChill();
}

//Defer Loading Images
pageFunctions.deferImages();

//last visited text
if (document.title == 'Anchorage: Discover') {
  pageFunctions.lastVisited();
}