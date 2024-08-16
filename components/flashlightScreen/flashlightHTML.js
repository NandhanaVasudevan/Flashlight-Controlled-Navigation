export const htmlComp = `
<div class="welcome-screen">
  <div class="welcome-box">
      <h1>Welcome To <span class="title">RadiantRiddle</span></h1>
      <p class="subtitle">- Unveil the Unknown -</p>
      <div class="instructions">
          <p>Instructions:</p>
          <p>1. Correct the Tic-Tac-Toe game by completing the code.</p>
          <p>2. Use your mouse to explore the site with the flashlight.</p>
          <p>3. Collect all puzzle pieces.</p>
          <p>4. Play the corrected Tic-Tac-Toe game as many times as you want!</p>
      </div>
      <button class="start-btn">Start</button>
  </div>
</div>
`;

export const bottomText = (question="") => `
  <span class="target-text">${question}</span>
`;