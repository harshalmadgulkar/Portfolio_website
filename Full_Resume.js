"use strict";
/////////////// ScrollingEffect ///////////////

var navMenuAnchorTags = document.querySelectorAll(".nav-menu a");
console.log(navMenuAnchorTags);
for (var i = 0; i < navMenuAnchorTags.length; i++) {
  navMenuAnchorTags[i].addEventListener("click", function (event) {
    event.preventDefault();
    var targetSectionID = this.textContent.trim().toLowerCase();
    var targetSection = document.getElementById(targetSectionID);
    console.log(targetSection);

    var interval = setInterval(function () {
      var targetSectionCoordinates = targetSection.getBoundingClientRect();
      if (targetSectionCoordinates.top <= 0) {
        clearInterval(interval);
        return;
      }
      window.scrollBy(0, 50);
    }, 50);
    console.log(targetSection);
  });
}

/////////////// skill bar fill animation ///////////////

//1.Handle scroll event on window
//2.Check that skills sections container visible or not
//3.Ensure that intial width of coloured skill divs is zero
var progressBars = document.querySelectorAll(".skill-progress>div");
var skillContainer = document.getElementById("skill-container");

window.addEventListener("scroll", checkScroll);
//this will be used to animate only once By default we assume that anumation is not done
var animationDone = false;

//Make bar width 0 so that animation will start from 0 to targetWidth
function initializeBars() {
  for (let bar of progressBars) {
    bar.style.width = 0 + "%";
    // console.log(bar.style.width);
  }
}
//set width 0 at start
initializeBars();

//animation of fill bar using setInterval
function fillBars() {
  for (let bar of progressBars) {
    // console.log('fillBars');
    let targetWidth = bar.getAttribute("data-bar-width");
    // console.log(targetWidth);
    let currentWidth = 0;

    let interval = setInterval(function () {
      if (currentWidth > targetWidth) {
        clearInterval(interval);
      }
      currentWidth++;
      bar.style.width = currentWidth + "%";
    }, 25);
  }
}

//check whether we have reached skill section or not
function checkScroll() {
  // console.log("scrolling");
  var coordinates = skillContainer.getBoundingClientRect();
  if (!animationDone && coordinates.top < window.innerHeight) {
    // console.log(animationDone);
    animationDone = true;
    // console.log(animationDone);
    fillBars();
  } 
  else if (coordinates.top > window.innerHeight) {
    animationDone = false;
    initializeBars();
  }
}