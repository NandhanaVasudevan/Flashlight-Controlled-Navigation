function loadCSS(filename) {
	const link = document.createElement("link");
	link.rel = "stylesheet";
	link.type = "text/css";
	link.href = `components/typing/${filename}`;
	document.head.appendChild(link);
}

export function TypingText({
	container = document,
	text,
	speed,
}) {
	let currentIndex = 0;

	const css = document.querySelector(
		'link[href*="components/typing/typing.css"]'
	);

	if (!css) loadCSS("typing.css");

	const codeBox = document.createElement("div");
	codeBox.className = "code-box";
	container.insertAdjacentElement("beforeend", codeBox);

	function typeText() {
		if (currentIndex < text.length) {
			const char = text.charAt(currentIndex);
			codeBox.textContent += char;
			currentIndex++;
			setTimeout(typeText, speed);
		}
	}

	typeText();
}
