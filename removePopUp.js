import { FlashScreen } from "./constants/constants.js";

function removePopUp() {
  const body = document.querySelector("body");
  const popUp = document.querySelector(".welcome-screen");

  // Remove the welcome screen
  if (popUp) {
    body.removeChild(popUp);
  }

  // Load the content of flashlightscreen.html from the flashLight folder
  fetch(FlashScreen.html)
    .then(response => response.text())
    .then(data => {
      // Create a temporary element to hold the fetched HTML
      const tempDiv = document.createElement('div');
      tempDiv.className = 'flashlight';
      console.log(data);
      tempDiv.innerHTML = data;
      console.log(`Data = ${data}`);
      body.prepend(tempDiv);

      // Extract the part of the HTML you want to inject (e.g., the body content)
      const flashlightContent = document.querySelector('body').innerHTML;

      // Inject the content into the current page's body
      body.innerHTML = flashlightContent;

      // Load the additional JavaScript file if necessary
      const script = document.createElement('script');
      script.src = FlashScreen.js; // Adjust the path as needed
      body.appendChild(script);
    })
    .catch(error => {
      console.error('Error loading flashlightscreen.html:', error);
    });
}

// Attach the event listener to the Start button
const button = document.querySelector(".start-btn");
if (button) {
  button.addEventListener("click", removePopUp);
}
