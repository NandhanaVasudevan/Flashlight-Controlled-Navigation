import {
	bottomText,
	textItems,
} from "../components/flashlightScreen/bottomText.js";
import { blank, words } from "../constants/constants.js";

function placeItemsRandomly(items, question = "") {
	items.forEach((item) => {
		const x = Math.random() * (window.innerWidth - item.offsetWidth - 100);
		const y = Math.random() * (window.innerHeight - item.offsetHeight - 100);

		item.style.left = `${x}px`;
		item.style.top = `${y}px`;

		document.body.appendChild(item);
	});
	document.body.insertAdjacentHTML("beforeend", bottomText(question));
}

export const createElementFromString = (strings) => {
	const length = strings.length;
	return strings.map((string, index) => {
		const span = document.createElement("span");
		span.className = "scattered-item";
		span.innerText = string;
		if (index === length - 1) {
			span.setAttribute("id", "answer");
			span.addEventListener("onclick", () => console.log("Clicked"));
		}

		return span;
	});
};

export const clickHandler = () => {
	const answer = textItems.html.answers[0];
	const filteredList = [...words["html"], answer];

	const elements = createElementFromString(filteredList);
	document.addEventListener("click", (event) => {
		const clickedElement = event.target;
		if (!clickedElement.classList.contains("scattered-item")) return;

		if (clickedElement.id === "answer") {
			const textBox = document.querySelector('.target-text');
			textBox.textContent = textBox.textContent.replace(blank, clickedElement.innerText);
			document.getElementById('answer').remove();
		} else {
			console.log("Wrong word clicked!");
		}
	});

	placeItemsRandomly(elements, textItems.html.questions[0]);
};
