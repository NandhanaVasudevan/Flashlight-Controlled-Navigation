import { RadiantRiddleComponent } from "./components/flashlightScreen/flashlight.js";

export function main(random = false) {
	const boxes = document.querySelectorAll(".box");
	const winnerText = document.querySelector("#winner");
	let turn1 = true;
	const player1 = "X";
	const player2 = "O";
	const score = {
		player1: 0,
		player2: 0,
	};

	if (winnerText) {
		winnerText.innerHTML = displayScore(score);
	}

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
			let itemBox;
			if (random) {
				itemBox = getRandomBox();
			} else {
				itemBox = box;
			}

			const availableBoxes = Array.from(boxes).filter(
				(box) => box.textContent === ""
			);

			if (availableBoxes.length === 0) {
				setTimeout(endTicTacToe, 500);
				return;
			}

			itemBox.innerText = turn1 ? player1 : player2;
			itemBox.disabled = true;

			if (isWinner()) {
				if (itemBox.innerText === "X") {
					score.player1++;
				} else {
					score.player2++;
				}
				winnerText.innerHTML = displayScore(score);
				if (random) {
					endTicTacToe();
					return;
				}

				resetBoxes();
			} else if (isDraw()) {
				if (!random) resetBoxes();
				else endTicTacToe();
			}

			turn1 = !turn1;
		});
	});

	const isDraw = () => {
		return (
			Array.from(boxes).every((box) => box.innerText !== "") && !isWinner()
		);
	};

	const isWinner = () => {
		for (let pattern of winPatterns) {
			const val0 = boxes[pattern[0]].innerText;
			const val1 = boxes[pattern[1]].innerText;
			const val2 = boxes[pattern[2]].innerText;

			if (val0 !== "" && val0 === val1 && val1 === val2) return true;
		}

		return false;
	};

	function getRandomBox() {
		const availableBoxes = Array.from(boxes).filter(
			(box) => box.textContent === ""
		);
		if (availableBoxes.length === 0) return null;
		const randomIndex = Math.floor(Math.random() * availableBoxes.length);
		return availableBoxes[randomIndex];
	}

	function initiateCrashEffect() {
		const container = document.querySelector(".tic-tac-toe");
		container.classList.add("crash-container");
		const boxes = document.querySelectorAll(".box");
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
		if (random) initiateCrashEffect();
	}

	function resetBoxes() {
		boxes.forEach((box) => {
			box.disabled = false;
			box.textContent = "";
		});
	}

	function displayScore({ player1, player2 }) {
		return `X - ${player1}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;O - ${player2}`;
	}
}

main(true);
