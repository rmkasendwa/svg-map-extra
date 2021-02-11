import mapPaths from './map-paths';
import emojiFlags from './emoji-flags';
import { createTooltip } from './tooltip';
import { createElement } from './utils';
// Create the SVG map
export const createMap = function () {

	// Create the tooltip
	// const tooltip = createTooltip();

	// Create map wrappers
	const mapWrapper = createElement('div', 'svg-map-wrapper', this.wrapper);
	const mapImage = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	mapImage.setAttribute('viewBox', '0 0 2000 1001');
	mapImage.classList.add('svg-map-image');
	mapWrapper.appendChild(mapImage);

	// Add controls
	// const mapControlsWrapper = createElement('div', 'svg-map-controls-wrapper', mapWrapper);
	// const zoomContainer = createElement('div', 'svg-map-controls-zoom', mapControlsWrapper);
	// ['in', 'out'].forEach(item => {
	// 	const zoomControlName = 'zoomControl' + item.charAt(0).toUpperCase() + item.slice(1);
	// 	this[zoomControlName] = createElement('button', 'svg-map-control-button svg-map-zoom-button svg-map-zoom-' + item + '-button', zoomContainer);
	// 	this[zoomControlName].type = 'button';
	// 	this[zoomControlName].addEventListener('click', () => zoomMap(item));
	// });

	// Add accessible names to zoom controls
	// this.zoomControlIn.setAttribute('aria-label', 'Zoom in');
	// this.zoomControlOut.setAttribute('aria-label', 'Zoom out');

	// Fix countries
	// var mapPaths = Object.assign({}, mapPaths);

	// if (!this.options.countries.EH) {
	// 	mapPaths.MA.d = mapPaths['MA-EH'].d;
	// 	delete mapPaths.EH;
	// }
	// delete mapPaths['MA-EH'];

	// Add map elements
	Object.keys(mapPaths).filter(countryCode => mapPaths[countryCode].d).forEach(countryCode => {
		const countryElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		countryElement.setAttribute('d', mapPaths[countryCode].d);
		countryElement.setAttribute('id', `${this.id}-map-country-${countryCode}`);
		countryElement.setAttribute('data-id', countryCode);
		countryElement.classList.add('svg-map-country');

		mapImage.appendChild(countryElement);

		['mouseenter', 'touchdown'].forEach(event => {
			countryElement.addEventListener(event, () => countryElement.closest('g').appendChild(countryElement));
		});

		// Tooltip events
		// Add tooltip when touch is used
		// countryElement.addEventListener('touchstart', event => {
		// 	this.setTooltipContent(this.getTooltipContent(countryCode));
		// 	this.showTooltip(event);
		// 	this.moveTooltip(event);
		// });

		// countryElement.addEventListener('mouseenter', event => {
		// 	this.setTooltipContent(this.getTooltipContent(countryCode));
		// 	this.showTooltip(event);
		// });

		// countryElement.addEventListener('mousemove', event => this.moveTooltip(event));

		// Hide tooltip when event is mouseleav or touchend
		// ['mouseleave', 'touchend'].forEach(event => {
		// 	countryElement.addEventListener(event, () => this.hideTooltip());
		// });

	});

	// Init pan zoom
	// this.mapPanZoom = svgPanZoom(mapImage, {
	// 	zoomEnabled: true,
	// 	fit: true,
	// 	center: true,
	// 	minZoom: this.options.minZoom,
	// 	maxZoom: this.options.maxZoom,
	// 	zoomScaleSensitivity: this.options.zoomScaleSensitivity,
	// 	controlIconsEnabled: false,
	// 	mouseWheelZoomEnabled: this.options.mouseWheelZoomEnabled, // TODO Only with key pressed
	// 	onZoom: () => this.setControlStatuses(),
	// 	beforePan: (oldPan, newPan) => {
	// 		const gutterWidth = this.mapWrapper.offsetWidth * 0.85;
	// 		const gutterHeight = this.mapWrapper.offsetHeight * 0.85;
	// 		const sizes = this.getSizes();
	// 		const leftLimit = -((sizes.viewBox.x + sizes.viewBox.width) * sizes.realZoom) + gutterWidth;
	// 		const rightLimit = sizes.width - gutterWidth - (sizes.viewBox.x * sizes.realZoom);
	// 		const topLimit = -((sizes.viewBox.y + sizes.viewBox.height) * sizes.realZoom) + gutterHeight;
	// 		const bottomLimit = sizes.height - gutterHeight - (sizes.viewBox.y * sizes.realZoom);
	// 		return {
	// 			x: Math.max(leftLimit, Math.min(rightLimit, newPan.x)),
	// 			y: Math.max(topLimit, Math.min(bottomLimit, newPan.y))
	// 		}
	// 	}
	// });


	// Init pan zoom
	// this.mapPanZoom.zoom(this.options.initialZoom);

	// Initial zoom statuses
	// this.setControlStatuses();
}

// Create the tooltip content
export const getTooltipContent = function (countryCode, options) {
	const tooltipContentWrapper = createElement('div', 'svg-map-tooltip-content-container');

	if (options.hideFlag === false) {
		// Flag
		const flagContainer = createElement('div', `svg-map-tooltip-flag-container svg-map-tooltip-flag-container-${options.flagType}`, tooltipContentWrapper)
		switch (options.flagType) {
			case 'image':
				createElement('img', 'svg-map-tooltip-flag', flagContainer).setAttribute('src', options.flagURL.replace('{0}', countryCode.toLowerCase()));
				break;
			case 'emoji':
				flagContainer.innerHTML = emojiFlags[countryCode];
				break;
		}
	}

	// Title
	createElement('div', 'svg-map-tooltip-title', tooltipContentWrapper).innerHTML = this.getCountryName(countryCode);

	// Content
	var tooltipContent = createElement('div', 'svg-map-tooltip-content', tooltipContentWrapper);
	if (!options.data.values[countryCode]) {
		createElement('div', 'svg-map-tooltip-no-data', tooltipContent).innerHTML = options.noDataText;
	} else {
		let tooltipContentTable = '<table>';
		Object.keys(options.data.data).forEach(function (key) {
			var value = options.data.values[countryCode][key];
			var item = typeof options.data.data[key] === "function" ? this.options.data.data[key](value) : this.options.data.data[key];
			item.floatingNumbers && (value = value.toFixed(1));
			item.thousandSeparator && (value = this.numberWithCommas(value, item.thousandSeparator));
			value = item.format ? item.format.replace('{0}', '<span>' + value + '</span>') : '<span>' + value + '</span>';
			tooltipContentTable += '<tr><td>' + (item.name || '') + '</td><td>' + value + '</td></tr>';
		}.bind(this));
		tooltipContentTable += '</table>';
		tooltipContent.innerHTML = tooltipContentTable;
	}
	return tooltipContentWrapper;
};

// Set the disabled statuses for buttons
export const setControlStatuses = function () {

	this.zoomControlIn.classList.remove('svg-map-disabled');
	this.zoomControlIn.setAttribute('aria-disabled', 'false');
	this.zoomControlOut.classList.remove('svg-map-disabled');
	this.zoomControlOut.setAttribute('aria-disabled', 'false');

	if (this.mapPanZoom.getZoom().toFixed(3) <= this.options.minZoom) {
		this.zoomControlOut.classList.add('svg-map-disabled');
		this.zoomControlOut.setAttribute('aria-disabled', 'true');
	}
	if (this.mapPanZoom.getZoom().toFixed(3) >= this.options.maxZoom) {
		this.zoomControlIn.classList.add('svg-map-disabled');
		this.zoomControlIn.setAttribute('aria-disabled', 'true');
	}
};

// Zoom map
export const zoomMap = function (direction) {
	if (this['zoomControl' + direction.charAt(0).toUpperCase() + direction.slice(1)].classList.contains('svg-map-disabled')) {
		return false;
	}
	this.mapPanZoom[direction == 'in' ? 'zoomIn' : 'zoomOut']();
};

// Reset map
export const resetMapZoom = function (direction) {
	const viewPort = mapWrapper.querySelector('.svg-pan-zoom_viewport');
	viewPort.style.transition = 'transform .3s';
	setTimeout(() => viewPort.style.transition = '', 400);
	this.mapPanZoom.reset();
};