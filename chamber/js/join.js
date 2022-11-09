import {pageFunctions} from "./modules.js";
//Defer loading images
pageFunctions.deferImages();
//Display a banner on Monday and Tuesday
pageFunctions.displayBanner();
//Handle the hamburgerMenu button
pageFunctions.hamburgerMenu();
//Display the date in the header
pageFunctions.displayDate();
//Last Visited
pageFunctions.lastVisited();
//autofill date field
pageFunctions.autoFillDateTime();