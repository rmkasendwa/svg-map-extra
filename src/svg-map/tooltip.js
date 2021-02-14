import { createElement } from './utils';

// Create the tooltip
export const createTooltip = () => {
	const tooltip = createElement('div', 'svg-map-tooltip', document.body);
	const tooltipContentContainer = createElement('div', 'svg-map-tooltip-content-wrapper', tooltip);
	const tooltipPointer = createElement('div', 'svg-map-tooltip-pointer', tooltip);
	return { tooltip, tooltipContentContainer, tooltipPointer };
};

// Hide the tooltip
export const hideTooltip = tooltip => tooltip.classList.remove('svg-map-active');

// Move the tooltip
export const moveTooltip = (event, { tooltip, tooltipPointer }) => {
	let x = event.pageX || (event.touches && event.touches[0] ? event.touches[0].pageX : null);
	let y = event.pageY || (event.touches && event.touches[0] ? event.touches[0].pageY : null);
	if (x && y) {
		const offsetToWindow = 6;
		const offsetToPointer = 12;
		const offsetToPointerFlipped = 32;

		const wWidth = window.innerWidth;
		const tWidth = tooltip.offsetWidth;
		const tHeight = tooltip.offsetHeight;

		// Adjust pointer when reaching window sides
		const left = x - tWidth / 2;
		if (left <= offsetToWindow) {
			x = offsetToWindow + (tWidth / 2);
			tooltipPointer.style.marginLeft = (left - offsetToWindow) + 'px';
		} else if (left + tWidth >= wWidth - offsetToWindow) {
			x = wWidth - offsetToWindow - (tWidth / 2);
			tooltipPointer.style.marginLeft = ((wWidth - offsetToWindow - event.pageX - (tWidth / 2)) * -1) + 'px';
		} else {
			tooltipPointer.style.marginLeft = '0px';
		}

		// Flip tooltip when reaching top window edge
		const top = y - offsetToPointer - tHeight;
		if (top <= offsetToWindow) {
			tooltip.classList.add('svg-map-tooltip-flipped');
			y += offsetToPointerFlipped;
		} else {
			tooltip.classList.remove('svg-map-tooltip-flipped');
			y -= offsetToPointer;
		}

		tooltip.style.left = x + 'px';
		tooltip.style.top = y + 'px';
	}
};

// Set the tooltips content
export const setTooltipContent = (tooltipContent, content) => {
	tooltipContent.innerHTML = '';
	tooltipContent.append(content);
}

// Show the tooltip
export const showTooltip = (event, { tooltip, tooltipPointer }) => {
	tooltip.classList.add('svg-map-active');
	moveTooltip(event, { tooltip, tooltipPointer });
};