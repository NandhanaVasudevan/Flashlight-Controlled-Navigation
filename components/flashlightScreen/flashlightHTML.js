export const htmlComp = `
<div class="welcome-screen">
  <div class="welcome-box">
      <h1>Welcome To <span class="title">RadiantRiddle</span></h1>
      <p class="subtitle">- Unveil the Unknown -</p>
      <div class="instructions">
          <p>Instructions:</p>
          <p>1. Use your mouse to navigate the flashlight and discover hidden elements.</p>
          <p>2. Collect all the pieces to solve the puzzle.</p>
          <p>3. Once the puzzle is solved, the full content will be revealed.</p>
          <p>4. Enjoy your journey!</p>
      </div>
      <button class="start-btn">Start</button>
  </div>
</div>
<div class="flashlight"></div>
`;

export const bottomText = (question="") => `
  <span class="target-text">${question}</span>
`;