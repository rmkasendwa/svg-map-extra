// Create the tooltip
export const createTooltip = function () {
	if (this.tooltip) return false;
	this.tooltip = this.createElement('div', 'svg-map-tooltip', document.getElementsByTagName('body')[0]);
	this.tooltipContent = this.createElement('div', 'svg-map-tooltip-content-wrapper', this.tooltip);
	this.tooltipPointer = this.createElement('div', 'svg-map-tooltip-pointer', this.tooltip);
};

// Set the tooltips content
export const setTooltipContent = function (content) {
	if (!this.tooltip) return;
	this.tooltipContent.innerHTML = '';
	this.tooltipContent.append(content);
};

// Show the tooltip
export const showTooltip = function (e) {
	this.tooltip.classList.add('svg-map-active');
	this.moveTooltip(e);
};

// Hide the tooltip
export const hideTooltip = function () {
	this.tooltip.classList.remove('svg-map-active');
};

// Move the tooltip
export const moveTooltip = function (e) {
	const x = e.pageX || (e.touches && e.touches[0] ? e.touches[0].pageX : null);
	const y = e.pageY || (e.touches && e.touches[0] ? e.touches[0].pageY : null);

	if (x === null || y === null) return;

	const offsetToWindow = 6;
	const offsetToPointer = 12;
	const offsetToPointerFlipped = 32;

	const wWidth = window.innerWidth;
	const tWidth = this.tooltip.offsetWidth;
	const tHeight = this.tooltip.offsetHeight;

	// Adjust pointer when reaching window sides
	const left = x - tWidth / 2;
	if (left <= offsetToWindow) {
		x = offsetToWindow + (tWidth / 2);
		this.tooltipPointer.style.marginLeft = (left - offsetToWindow) + 'px';
	} else if (left + tWidth >= wWidth - offsetToWindow) {
		x = wWidth - offsetToWindow - (tWidth / 2);
		this.tooltipPointer.style.marginLeft = ((wWidth - offsetToWindow - e.pageX - (tWidth / 2)) * -1) + 'px';
	} else {
		this.tooltipPointer.style.marginLeft = '0px';
	}

	// Flip tooltip when reaching top window edge
	const top = y - offsetToPointer - tHeight;
	if (top <= offsetToWindow) {
		this.tooltip.classList.add('svg-map-tooltip-flipped');
		y += offsetToPointerFlipped;
	} else {
		this.tooltip.classList.remove('svg-map-tooltip-flipped');
		y -= offsetToPointer;
	}

	this.tooltip.style.left = x + 'px';
	this.tooltip.style.top = y + 'px';
};