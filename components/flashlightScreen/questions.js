import { blank } from "../../constants/constants.js";

export const textItems = {
	html: {
		questions: [
			` <h1>${blank}</h1>`,

		],
		answers: ["Tic Tac Toe"],
	},
	css: {
		questions: [
			`const container = document.querySelector(".${blank}")`

		],
		answers: [".tic-tac-toe"]



	},
	js: {
		questions: [
			`const player1 = "${blank}";`,

		],
		answers: ["X"],
	},
};
