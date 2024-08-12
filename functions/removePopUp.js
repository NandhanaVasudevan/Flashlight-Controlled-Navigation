import { FlashScreenPaths } from "../constants/constants.js";

function removePopUp() {
  const body = document.querySelector("body");
  const popUp = document.querySelector(".welcome-screen");

  if (popUp) {
    body.removeChild(popUp);
  }

  addMouseMoveListener();
}

function addMouseMoveListener() {
  fetch(FlashScreenPaths.html)
    .then(response => response.text())
    .then(data => {
      const body = document.querySelector('body');
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = data;

      body.prepend(tempDiv);

      const flashlightContent = document.querySelector('body').innerHTML;

      body.innerHTML = flashlightContent;

      const script = document.createElement('script');
      script.src = FlashScreenPaths.js;
      body.appendChild(script);
    })
    .catch(error => {
      console.error('Error loading flashlightscreen.html:', error);
    });
}

const button = document.querySelector(".start-btn");

if (button) {
  button.addEventListener("click", removePopUp);
}
