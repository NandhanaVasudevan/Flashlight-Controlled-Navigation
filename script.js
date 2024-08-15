import { RadiantRiddleComponent } from "./components/flashlightScreen/flashlight.js";

const boxes = document.querySelectorAll(".box");
const winnerText = document.querySelector("#winner");
let gameOver = false;
let turn1 = true;
const player1 = "X";
const player2 = "O";

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
		if (gameOver) return;
		box.innerText = turn1 ? player1 : player2;
		box.disabled = true;

		if (isWinner()) {
			winnerText.textContent = `${box.innerText} won! Reset game to play again`;
			winnerText.style.visibility = "visible";
			gameOver = true;

			endTicTacToe();
		}

		turn1 = !turn1;
	});
});

const isWinner = () => {
	for (let pattern of winPatterns) {
		const val0 = boxes[pattern[0]].innerText;
		const val1 = boxes[pattern[1]].innerText;
		const val2 = boxes[pattern[2]].innerText;

		if (val0 !== "" && val0 === val1 && val1 === val2) return true;
	}

	return false;
};

function endTicTacToe() {
	const ticTacToeContainer = document.querySelector(".tic-tac-toe");
	ticTacToeContainer.remove();
	const body = document.querySelector('body');
	body.appendChild(RadiantRiddleComponent());
}

