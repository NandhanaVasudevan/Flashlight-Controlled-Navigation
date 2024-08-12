function placeItemsRandomly(items, minDistance = 50) {
	const placedItems = [];
	const existingElements = Array.from(
		document.querySelectorAll("body > *")
	).filter((el) => !items.includes(el));

	items.forEach((item) => {
		let isOverlapping;
		let x, y;

		do {
			isOverlapping = false;

			x = Math.random() * (window.innerWidth - item.offsetWidth - 20);
			y = Math.random() * (window.innerHeight - item.offsetHeight - 20);

			for (let placedItem of placedItems) {
				const placedRect = placedItem.getBoundingClientRect();
				const newRect = {
					left: x,
					right: x + item.offsetWidth,
					top: y,
					bottom: y + item.offsetHeight,
				};

				if (
					newRect.right + minDistance > placedRect.left &&
					newRect.left < placedRect.right + minDistance &&
					newRect.bottom + minDistance > placedRect.top &&
					newRect.top < placedRect.bottom + minDistance
				) {
					isOverlapping = true;
					break;
				}
			}

			if (!isOverlapping) {
				for (let existingElement of existingElements) {
					const existingRect = existingElement.getBoundingClientRect();
					const newRect = {
						left: x,
						right: x + item.offsetWidth,
						top: y,
						bottom: y + item.offsetHeight,
					};

					if (
						newRect.right > existingRect.left &&
						newRect.left < existingRect.right &&
						newRect.bottom > existingRect.top &&
						newRect.top < existingRect.bottom
					) {
						isOverlapping = true;
						break;
					}
				}
			}
		} while (isOverlapping);

		item.style.position = "absolute";
		item.style.left = `${x}px`;
		item.style.top = `${y}px`;

		document.body.appendChild(item);
		placedItems.push(item);
	});
}

export const createElementFromString = (strings) =>
	strings.map((string) => {
		const span = document.createElement("span");
		span.class = "scattered-item";
		span.innerText = string;
		return span;
	});

export const clickHandler = () => {
	const list = ["a", "b", "c", "d", "e"]; //dummy list
	const elements = createElementFromString(list);

	placeItemsRandomly(elements, 300);
};
