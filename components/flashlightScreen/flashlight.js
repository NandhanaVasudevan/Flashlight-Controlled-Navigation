import { blank, words } from "../../constants/constants.js";
import { htmlComp } from "./flashlightHTML.js";
import { textItems } from "./questions.js";
import { TypingText } from "../typing/typing.js";
import { tictactoe } from "../tictactoe/tictactoeHTML.js";
import { main } from "../../script.js";

export function RadiantRiddleComponent() {
	const container = document.createElement("div");
	const link = document.querySelector("link");
	link.href = "components/flashlightScreen/flashlight.css";
	container.classList.add("radiant-riddle-container");

	container.innerHTML = htmlComp;
	initializeComponent(container);

	return container;
}

function initializeComponent(container) {
	let currentCategory = "html";
	let currentQuestionIndex = 0;

	const startButton = container.querySelector(".start-btn");
	if (startButton) {
		startButton.addEventListener("click", removePopUp);
	}

	function removePopUp() {
		const popUp = container.querySelector(".welcome-screen");
		if (popUp) {
			container.removeChild(popUp);
			const div = document.createElement("div");
			div.className = "flashlight";
			document.body.insertAdjacentElement("afterbegin", div);
		}

		showNextQuestion();
		addMouseMoveListener();
	}

	function addMouseMoveListener() {
		document.addEventListener("mousemove", listenerFunction);
	}

	function listenerFunction(event) {
		const flashlight = document.querySelector(".flashlight");
		flashlight.style.left = event.pageX + "px";
		flashlight.style.top = event.pageY + "px";

		const links = document.querySelectorAll("nav.hidden-nav a");
		links.forEach((link) => {
			const rect = link.getBoundingClientRect();
			const distance = Math.hypot(
				rect.x + rect.width / 2 - event.clientX,
				rect.y + rect.height / 2 - event.clientY
			);

			if (distance < 100) {
				link.style.opacity = 1;
			} else {
				link.style.opacity = 0;
			}
		});

		// Check if the mouse is near the scattered items
		checkHoverEffect(event);
	}

	function checkHoverEffect(event) {
		const items = document.querySelectorAll(".scattered-item");
		items.forEach((item) => {
			const rect = item.getBoundingClientRect();
			const distance = Math.hypot(
				rect.x + rect.width / 2 - event.clientX,
				rect.y + rect.height / 2 - event.clientY
			);

			if (distance < 200) {
				item.style.opacity = 1; // Reveal item
			} else {
				item.style.opacity = 0; // Hide item
			}
		});
	}

	function showNextQuestion() {
		const questionSet = textItems[currentCategory];
		if (currentQuestionIndex < questionSet.questions.length) {
			const text = questionSet.questions[currentQuestionIndex];
			const codeBox = document.querySelector(".code-box");
			if (codeBox) {
				codeBox.remove();
			}

			TypingText({ container: container, text: text, speed: 50 });

			placeItemsRandomly(
				createElementFromString([
					...words[currentCategory],
					questionSet.answers[currentQuestionIndex],
				])
			);
		} else {
			moveToNextCategory();
		}
	}

	function moveToNextCategory() {
		if (currentCategory === "html") {
			currentCategory = "css";
		} else if (currentCategory === "css") {
			currentCategory = "js";
		} else {
			console.log("All questions completed!");
			backToTicTacToe();
			console.log("returning");
			return;
		}
		currentQuestionIndex = 0;
		showNextQuestion();
	}

	function backToTicTacToe() {
		setTimeout(() => {
		  // Clean up the flashlight effect and its elements
		  document.querySelectorAll(".scattered-item").forEach((e) => e.remove());
		  const flashlightGame = document.querySelector(".radiant-riddle-container");
		  while (flashlightGame && flashlightGame.firstChild) {
			flashlightGame.removeChild(flashlightGame.firstChild);
		  }
		  try {
			document.removeEventListener("mousemove", listenerFunction);
		  } catch (e) {
			console.log(e);
		  }
	  
		  if (flashlightGame) flashlightGame.remove();
		  const flashlight = document.querySelector(".flashlight");
	  
		  if (flashlight) flashlight.remove();
	  
		  // Remove existing stylesheets and add the Tic Tac Toe stylesheet
		  document.querySelectorAll("link").forEach((link) => link.remove());
		  const link = document.createElement("link");
		  link.rel = "stylesheet";
		  link.href = "styles.css";
		  document.head.insertAdjacentElement("beforeend", link);
	  
		  // Reset the Tic Tac Toe game HTML and initialize it in normal mode
		  document.body.innerHTML = ""; // Clear the body content
		  document.body.insertAdjacentHTML("afterbegin", tictactoe);
	  
		  // Reinitialize the Tic Tac Toe game in normal mode
		  initializeNormalTicTacToe();
		  
		}, 500); // Adjust the delay as needed
	  }
	  
	  function initializeNormalTicTacToe() {
		const boxes = document.querySelectorAll(".box");
		const winnerText = document.querySelector("#winner");
		const player1 = "X";
		const player2 = "O";
		const score = { player1: 0, player2: 0 }; // Initialize score
	  
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
	  
			// Place the user's "X" in the clicked box
			box.innerText = player1;
			box.disabled = true;
	  
			if (isWinner(player1)) {
			  winnerText.innerHTML = `X wins!`;
			  updateScore(player1);
			  setTimeout(resetGame, 1000); // Delay before resetting the game
			  return;
			}
	  
			if (isDraw()) {
			  winnerText.innerHTML = "It's a draw!";
			  setTimeout(resetGame, 1000); // Delay before resetting the game
			  return;
			}
	  
			// Computer's move after the user's move
			setTimeout(() => {
			  const computerMove = getComputerMove();
			  if (computerMove) {
				computerMove.innerText = player2;
				computerMove.disabled = true;
	  
				if (isWinner(player2)) {
				  winnerText.innerHTML = `O wins!`;
				  updateScore(player2);
				  setTimeout(resetGame, 1000); // Delay before resetting the game
				  return;
				}
	  
				if (isDraw()) {
				  winnerText.innerHTML = "It's a draw!";
				  setTimeout(resetGame, 1000); // Delay before resetting the game
				  return;
				}
			  }
			}, 500); // Delay to simulate thinking
		  });
		});
	  
		function isDraw() {
		  return Array.from(boxes).every((box) => box.innerText !== "") && !isWinner(player1) && !isWinner(player2);
		}
	  
		function isWinner(player) {
		  return winPatterns.some((pattern) => {
			const [a, b, c] = pattern;
			return boxes[a].innerText === player && boxes[b].innerText === player && boxes[c].innerText === player;
		  });
		}
	  
		function updateScore(winner) {
		  if (winner === player1) {
			score.player1++;
		  } else if (winner === player2) {
			score.player2++;
		  }
		  winnerText.innerHTML = `X - ${score.player1} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; O - ${score.player2}`;
		}
	  
		function getComputerMove() {
		  const availableBoxes = Array.from(boxes).filter((box) => box.textContent === "");
		  if (availableBoxes.length === 0) return null;
		  const randomIndex = Math.floor(Math.random() * availableBoxes.length);
		  return availableBoxes[randomIndex];
		}
	  
		function resetGame() {
		  boxes.forEach((box) => {
			box.disabled = false;
			box.textContent = "";
		  });
		}
	  }
	  
	  
	function placeItemsRandomly(items) {
		container
			.querySelectorAll(".scattered-item")
			.forEach((item) => item.remove());
		items.forEach((item) => {
			const x = Math.random() * (window.innerWidth - item.offsetWidth - 100);
			const y = Math.random() * (window.innerHeight - item.offsetHeight - 100);

			item.style.left = `${x}px`;
			item.style.top = `${y}px`;
			item.style.opacity = 0; // Initially hidden

			container.insertAdjacentElement("afterbegin", item);
		});
	}

	function createElementFromString(strings) {
		const length = strings.length;
		const items = strings.map((string, index) => {
			const span = document.createElement("span");
			span.className = "scattered-item";
			span.innerText = string;
			span.style.color = "black"; // Initial color is black
	
			if (index === length - 1) {
				span.setAttribute("id", "answer");
				span.addEventListener("click", handleAnswerClick);
			}
	
			return span;
		});
	
		// Add a mousemove event listener to check the distance between the flashlight and the scattered items
		document.addEventListener("mousemove", function (event) {
			const flashlight = document.querySelector(".flashlight");
	
			if (flashlight) {
				const flashlightRect = flashlight.getBoundingClientRect();
	
				items.forEach((item) => {
					const itemRect = item.getBoundingClientRect();
					const distance = Math.hypot(
						flashlightRect.x + flashlightRect.width / 2 - (itemRect.x + itemRect.width / 2),
						flashlightRect.y + flashlightRect.height / 2 - (itemRect.y + itemRect.height / 2)
					);
	
					if (distance <= 50) {
						item.style.color = "gray"; // Change color to gray
					} else {
						item.style.color = "black"; // Change back to black
					}
				});
			}
		});
	
		return items;
	}
	

	function handleAnswerClick(event) {
		const clickedElement = event.target;
		const textBox = container.querySelector(".code-box");

		textBox.textContent = textBox.textContent.replace(
			blank,
			clickedElement.innerText
		);

		clickedElement.remove();

		setTimeout(() => {
			currentQuestionIndex++;
			showNextQuestion();
		}, 2000);
	}
}
