import $ from 'cash-dom';

// Create the tooltip
export const createTooltip = rootElement => {
	const tooltip = $('<div class="svg-map-tooltip">').appendTo(rootElement || document.body);
	const tooltipContentContainer = $('<div class="svg-map-tooltip-content-wrapper">').appendTo(tooltip);
	const tooltipPointer = $('<div class="svg-map-tooltip-pointer">').appendTo(tooltip);
	return { tooltip, tooltipContentContainer, tooltipPointer };
};

// Hide the tooltip
export const hideTooltip = tooltip => tooltip.removeClass('svg-map-active');

// Move the tooltip
export const moveTooltip = (event, { tooltip, tooltipPointer }) => {
	let x = event.pageX || (event.touches && event.touches[0] ? event.touches[0].pageX : null);
	let y = event.pageY || (event.touches && event.touches[0] ? event.touches[0].pageY : null);
	if (x && y) {
		const offsetToWindow = 6;
		const offsetToPointer = 12;
		const offsetToPointerFlipped = 32;

		const wWidth = window.innerWidth;
		const tWidth = tooltip[0].offsetWidth;
		const tHeight = tooltip[0].offsetHeight;

		// Adjust pointer when reaching window sides
		const left = x - tWidth / 2;
		if (left <= offsetToWindow) {
			x = offsetToWindow + (tWidth / 2);
			tooltipPointer.css('margin-left', left - offsetToWindow);
		} else if (left + tWidth >= wWidth - offsetToWindow) {
			x = wWidth - offsetToWindow - (tWidth / 2);
			tooltipPointer.css('margin-left', (wWidth - offsetToWindow - event.pageX - (tWidth / 2)) * -1);
		} else {
			tooltipPointer.css('margin-left', 0);
		}

		// Flip tooltip when reaching top window edge
		const top = y - offsetToPointer - tHeight;
		if (top <= offsetToWindow) {
			tooltip.addClass('svg-map-tooltip-flipped');
			y += offsetToPointerFlipped;
		} else {
			tooltip.removeClass('svg-map-tooltip-flipped');
			y -= offsetToPointer;
		}

		tooltip.css('left', x);
		tooltip.css('top', y);
	}
};

// Set the tooltips content
export const setTooltipContent = (tooltipContent, content) => {
	tooltipContent.empty().append(content);
};

// Show the tooltip
export const showTooltip = (event, { tooltip, tooltipPointer }) => {
	tooltip.addClass('svg-map-active');
	moveTooltip(event, { tooltip, tooltipPointer });
};