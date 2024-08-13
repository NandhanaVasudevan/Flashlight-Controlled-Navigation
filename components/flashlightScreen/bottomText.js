import { blank, htmlEntities } from "../../constants/constants.js";

export const bottomText = (question) => `
<div class="target">
  <span class="target-text">${question}</span>
</div>
`;

export const textItems = {
	html: {
		questions: [
			`${htmlEntities["<"]}p class="my-name">${blank}${htmlEntities["<"]}/p>`,
		],
		answers: ["abcd"],
	},
};
