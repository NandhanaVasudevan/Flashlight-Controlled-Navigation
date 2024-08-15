const codeText = '&lt;h1 class="title" id="title"&gt;RadiantRiddle&lt;/h1&gt;';
const typingSpeed = 50; // Speed of typing in milliseconds
let currentIndex = 0;

function typeText() {
    const element = document.getElementById("code-line");
    if (currentIndex < codeText.length) {
        element.innerHTML += codeText.charAt(currentIndex);
        currentIndex++;
        setTimeout(typeText, typingSpeed);
    }
}

document.addEventListener("DOMContentLoaded", typeText);
