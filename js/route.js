// route.js

// Event listener for the Start button on the index.html page
document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.querySelector('.start-btn');

  if (startButton) {
    startButton.addEventListener('click', () => {
      // Navigate to the flashlight screen
      window.location.href = 'flashlightScreen/flashlightScreen.html';
      sessionStorage.setItem('accessGranted', 'true');
    });
  }

  // Check if the user is trying to access flashlightscreen.html directly
  const accessGranted = sessionStorage.getItem('accessGranted');
  const isFlashlightScreen = window.location.pathname.includes('flashlightScreen.html');

  if (isFlashlightScreen && accessGranted !== 'true') {
    // If access is not granted, redirect to the index.html
    window.location.href = 'index.html';
  }
});
