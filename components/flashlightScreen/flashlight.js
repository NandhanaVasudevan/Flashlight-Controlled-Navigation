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
			document.querySelectorAll(".scattered-item").forEach((e) => e.remove());
			const flashlightGame = document.querySelector(
				".radiant-riddle-container"
			);
			while (flashlightGame.firstChild) {
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

			document.querySelectorAll("link").forEach((link) => link.remove());
			const link = document.createElement("link");
			link.rel = "stylesheet";
			link.href = "styles.css";
			document.head.insertAdjacentElement("beforeend", link);
			document.body.insertAdjacentHTML("afterbegin", tictactoe);
			main(false);
		}, 500);
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

			container.insertAdjacentElement("afterbegin", item);
		});
	}

	function createElementFromString(strings) {
		const length = strings.length;
		return strings.map((string, index) => {
			const span = document.createElement("span");
			span.className = "scattered-item";
			span.innerText = string;
			if (index === length - 1) {
				span.setAttribute("id", "answer");
				span.addEventListener("click", handleAnswerClick);
			}
			return span;
		});
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
