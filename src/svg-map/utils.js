// Helper to create an element with a class name
export const createElement = (type, className, appendTo, innerhtml) => {
	const element = document.createElement(type);
	if (className) {
		className = className.split(' ');
		className.forEach(item => element.classList.add(item));
	}
	innerhtml && (element.innerHTML = innerhtml);
	appendTo && appendTo.appendChild(element);
	return element;
};

// Print numbers with commas
export const numberWithCommas = (number, separator = ',') => {
	return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};

// Get a color between two other colors
export const getColor = (color1, color2, ratio) => {
	color1 = color1.slice(-6);
	color2 = color2.slice(-6);
	const r = Math.ceil(parseInt(color1.substring(0, 2), 16) * ratio + parseInt(color2.substring(0, 2), 16) * (1 - ratio));
	const g = Math.ceil(parseInt(color1.substring(2, 4), 16) * ratio + parseInt(color2.substring(2, 4), 16) * (1 - ratio));
	const b = Math.ceil(parseInt(color1.substring(4, 6), 16) * ratio + parseInt(color2.substring(4, 6), 16) * (1 - ratio));
	return '#' + this.getHex(r) + this.getHex(g) + this.getHex(b);
};

// Get a hex value
export const getHex = value => {
	value = value.toString(16);
	return ('0' + value).slice(-2);
};