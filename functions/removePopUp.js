import { flashlightHTML, mouseMoveListener } from "../components/flashlightScreen/flashlight.js"

function addMouseMoveListener() {
  const body = document.querySelector('body');
  body.insertAdjacentHTML('afterbegin', flashlightHTML);
  mouseMoveListener();
}

function removePopUp() {
  const body = document.querySelector("body");
  const popUp = document.querySelector(".welcome-screen");

  if (popUp) {
    body.removeChild(popUp);
  }

  addMouseMoveListener();
}

const button = document.querySelector(".start-btn");

if (button) {
  button.addEventListener("click", removePopUp);
}
