/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables

 * 
*/

const headerList = document.getElementsByTagName('h2');
const sectionHeaders = Array.apply(null, headerList);

const sections = document.getElementsByTagName('section');
const sectionsList = Array.apply(null, sections);

const positions = [];

//Get y coordinate of sections to use

for (var i = 0; i < sectionsList.length; i++) {
    var posY = sectionsList[i].getBoundingClientRect();
    var y = posY.top;
    positions.push(y);
}

positions.push(sectionsList[sectionsList.length - 1].getBoundingClientRect().bottom);


// Build nav

for (var i = 0; i < sectionHeaders.length; i++) {
    //Create list items for sticky navigation
    const newNavElement = document.createElement('li');
    //Add title inside list item
    newNavElement.textContent = sectionHeaders[i].innerHTML;
    //Select the navigation container div
    const mainHeading = document.getElementById('navbar__list');
    //Add list items to navigation container
    mainHeading.appendChild(newNavElement);
    //Add links to navigation items
    document.getElementsByTagName('li')[i].innerHTML = '<a href=#section' + [i + 1] + '>' + sectionHeaders[i].innerHTML + '</a>';
}



//Change active link depending on the scroll position
const list = document.getElementsByTagName('li');
const navList = Array.apply(null, list);

const setActive = function() {
    navList.forEach(element => element.classList.remove("active-class"));

    for (var i = 0; i <= sectionsList.length; i++) {
        if (window.pageYOffset >= positions[i] && window.pageYOffset <= positions[i + 1]) {
            //sectionsList[i].classList.add("active-class");
            navList[i].classList.add("active-class");
        }
    }
}


//Show or hide the nav depending on the scroll position
const showHideNav = function() {
    //Get position of the first section, nav will appear when user reaches first section
    const position = sectionHeaders[0].getBoundingClientRect();
    const y = position.top;
    //Change the visibility of the nav
    const navVisibility = document.querySelector('.navbar__menu ul');
    if (window.pageYOffset > y) {
        navVisibility.style.display = 'block';
    } else {
        navVisibility.style.display = 'none';
    }
}

//Event listener for scroll positions
window.addEventListener("scroll", showHideNav);
window.addEventListener("scroll", setActive);