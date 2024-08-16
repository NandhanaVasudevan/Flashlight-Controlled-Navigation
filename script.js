import { RadiantRiddleComponent } from "./components/flashlightScreen/flashlight.js";

export function main(random = false) {
  const boxes = document.querySelectorAll(".box");
  const winnerText = document.querySelector("#winner");
  const player1 = "X";
  const player2 = "O";
  const score = { player1: 0, player2: 0 };

  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      if (box.innerText !== "") return;

      // Randomly place "X"
      const randomXBox = getRandomBox();
      if (randomXBox) {
        randomXBox.innerText = player1;
        randomXBox.disabled = true;
      }

      if (isWinner()) {
        score.player1++;
        winnerText.innerHTML = displayScore(score);
        endTicTacToe();
        return;
      }

      if (isDraw()) {
        endTicTacToe();
        return;
      }

      // Automatically place "O" in another random box
      setTimeout(() => {
        const randomOBox = getRandomBox();
        if (randomOBox) {
          randomOBox.innerText = player2;
          randomOBox.disabled = true;
        }

        if (isWinner()) {
          score.player2++;
          winnerText.innerHTML = displayScore(score);
          endTicTacToe();
        } else if (isDraw()) {
          endTicTacToe();
        }
      }, 500);
    });
  });

  function getRandomBox() {
    const availableBoxes = Array.from(boxes).filter((box) => box.textContent === "");
    if (availableBoxes.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * availableBoxes.length);
    return availableBoxes[randomIndex];
  }

  const isDraw = () => {
    return Array.from(boxes).every((box) => box.innerText !== "") && !isWinner();
  };

  const isWinner = () => {
    return winPatterns.some((pattern) => {
      const [a, b, c] = pattern;
      return boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[a].innerText === boxes[c].innerText;
    });
  };

  function resetBoxes() {
    boxes.forEach((box) => {
      box.disabled = false;
      box.textContent = "";
    });
  }

  function displayScore({ player1, player2 }) {
    return `X - ${player1}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;O - ${player2}`;
  }

  function initiateCrashEffect() {
    const container = document.querySelector(".tic-tac-toe");
    container.classList.add("crash-container");
    boxes.forEach((box, index) => {
      box.classList.add("crash-box");
      box.style.animationDelay = `${index * 0.1}s`;
    });

    setTimeout(() => {
      document.body.innerHTML = "";
      document.body.appendChild(RadiantRiddleComponent());
    }, 3000);
  }

  function endTicTacToe() {
    setTimeout(() => {
      initiateCrashEffect();
    }, 1000); // Adding delay before starting the crash effect
  }
}

main(true);
