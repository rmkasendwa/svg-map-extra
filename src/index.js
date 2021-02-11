import svgPanZoom from 'svg-pan-zoom';
import countries from './svg-map/countries';
import defaultOptions from './svg-map/default-options';
import emojiFlags from './svg-map/emoji-flags';
import mapPaths from './svg-map/map-paths';
import { createElement, getColor, numberWithCommas } from './svg-map/utils';
export default class SVGMap {
	constructor(options = {}) {
		if (!options.targetElementID || !document.getElementById(options.targetElementID)) {
			if (!options.targetElement) throw new TypeError('Target element not found');
		}
		this.options = { ...defaultOptions, ...options };
		// Global id
		this.id = this.options.targetElementID || btoa(Math.random());

		// Cache wrapper element
		this.wrapper = this.options.targetElementID ? document.getElementById(this.options.targetElementID) : this.options.targetElement;

		// Create the map
		this.createMap();

		// Apply map data
		this.applyData(this.options.data);
	}


	// data----------------
	applyData(data) {
		this.options.data = data;
		let min, max;

		// Get highest and lowest value
		Object.keys(data.values).forEach(countryCode => {
			const value = parseInt(data.values[countryCode][data.applyData], 10);
			max == null && (max = value);
			min == null && (min = value);
			value > max && (max = value);
			value < min && (min = value);
		});

		data.data[data.applyData].thresholdMax && (max = Math.min(max, data.data[data.applyData].thresholdMax));
		data.data[data.applyData].thresholdMin && (min = Math.max(min, data.data[data.applyData].thresholdMin));

		// Loop through countries and set colors
		Object.keys(countries).forEach(countryCode => {
			const element = document.getElementById(`${this.id}-map-country-${countryCode}`);
			if (!element) return;
			if (!data.values[countryCode]) {
				element.setAttribute('fill', this.options.colorNoData);
				return;
			}
			const value = Math.max(min, parseInt(data.values[countryCode][data.applyData], 10));
			const ratio = max === min ? 1 : Math.max(0, Math.min(1, (value - min) / (max - min)));
			const color = getColor(this.options.colorMax, this.options.colorMin, ratio);
			element.setAttribute('fill', color);
		});
		if (this.options.fitToData) {
			const { offsetWidth: mapWidth, offsetHeight: mapHeight } = this.mapWrapper;
			const scaleFactor = mapWidth / (mapWidth > mapHeight ? 2000 : 1001);
			const mapCenterPoint = [mapWidth / 2, mapHeight / 2];
			const points = Object.keys(data.values).map(countryCode => {
				return this.mapImage.querySelector(`[data-id="${countryCode}"]`);
			}).filter(path => path != null).reduce((accumulator, path) => {
				const pathDefinition = (path.attributes.d.value.match(/[A-Za-z][\d.,-]+/g) || []).map(string => {
					const command = string.charAt(0);
					const coordinates = string.substring(1).split(string.match(',') ? ',' : /(?<=\d)(?=-)/g).map(coordinate => parseFloat(coordinate.trim()));
					command.match(/^[Hh]$/g) && coordinates.push(0);
					command.match(/^[Vv]$/g) && coordinates.unshift(0);
					return { command, coordinates };
				});
				let currentPoint = [...pathDefinition[0].coordinates];
				pathDefinition.forEach(definition => {
					if (definition.command.match(/^[A-Z]$/g)) {
						currentPoint = [...definition.coordinates];
					} else {
						const [x, y] = currentPoint;
						currentPoint = [x + definition.coordinates[0], y + definition.coordinates[1]];
					}
					definition.absoluteCoordinates = currentPoint;
				});
				pathDefinition.forEach(definition => {
					definition.absoluteCoordinates = [definition.absoluteCoordinates[0] * scaleFactor, definition.absoluteCoordinates[1] * scaleFactor];
				});
				return [...accumulator, ...pathDefinition.map(a => a.absoluteCoordinates)];
			}, []);
			this.resetMapZoom();
			if (points.length > 0) {
				const minX = Math.min(...points.map(([x]) => x));
				const minY = Math.min(...points.map(([, y]) => y));
				const maxX = Math.max(...points.map(([x]) => x));
				const maxY = Math.max(...points.map(([, y]) => y));
				const boundingBoxWidth = maxX - minX;
				const boundingBoxHeight = maxY - minY;
				const xZoomFactor = 2000 * scaleFactor / boundingBoxWidth;
				const yZoomFactor = 1001 * scaleFactor / boundingBoxHeight;
				this.mapPanZoom.pan({ x: mapCenterPoint[0] - (minX + boundingBoxWidth / 2), y: mapCenterPoint[1] - (minY + boundingBoxHeight / 2) });
				this.mapPanZoom.zoom(Math.round(Math.min(xZoomFactor, yZoomFactor) * .8));
			}
		}
	}


	// Map-----------------
	// Create the SVG map
	createMap() {
		// Create the tooltip
		this.createTooltip();

		// Create map wrappers
		this.mapWrapper = createElement('div', 'svg-map-wrapper', this.wrapper);
		this.mapImage = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		this.mapImage.setAttribute('viewBox', '0 0 2000 1001');
		this.mapImage.classList.add('svg-map-image');
		this.mapWrapper.appendChild(this.mapImage);

		// Add controls
		const mapControlsWrapper = createElement('div', 'svg-map-controls-wrapper', this.mapWrapper);
		const zoomContainer = createElement('div', 'svg-map-controls-zoom', mapControlsWrapper);
		['in', 'out'].forEach(item => {
			const zoomControlName = 'zoomControl' + item.charAt(0).toUpperCase() + item.slice(1);
			this[zoomControlName] = createElement('button', `svg-map-control-button svg-map-zoom-button svg-map-zoom-${item}-button`, zoomContainer);
			this[zoomControlName].type = 'button';
			this[zoomControlName].addEventListener('click', () => this.zoomMap(item));
		});

		// Add accessible names to zoom controls
		this.zoomControlIn.setAttribute('aria-label', 'Zoom in');
		this.zoomControlOut.setAttribute('aria-label', 'Zoom out');

		// Fix countries
		const localMapPaths = { ...mapPaths };

		if (!this.options.countries.EH) {
			localMapPaths.MA.d = localMapPaths['MA-EH'].d;
			delete localMapPaths.EH;
		}
		delete localMapPaths['MA-EH'];

		// Add map elements
		Object.keys(localMapPaths).filter(countryCode => localMapPaths[countryCode].d).forEach(countryCode => {
			const countryElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			countryElement.setAttribute('d', localMapPaths[countryCode].d);
			countryElement.setAttribute('id', `${this.id}-map-country-${countryCode}`);
			countryElement.setAttribute('data-id', countryCode);
			countryElement.classList.add('svg-map-country');

			this.mapImage.appendChild(countryElement);

			['mouseenter', 'touchdown'].forEach(event => countryElement.addEventListener(event, () => countryElement.closest('g').appendChild(countryElement)));

			// TODO Tooltip events
			// Make Country fixed on click
			/* countryElement.addEventListener('click', () => {
			  const countryCode = countryElement.getAttribute('data-id');
			  console.log(countryCode);
			});*/

			// Tooltip events
			// Add tooltip when touch is used
			countryElement.addEventListener('touchstart', event => {
				this.setTooltipContent(this.getTooltipContent(countryCode));
				this.showTooltip(event);
				this.moveTooltip(event);
			});

			countryElement.addEventListener('mouseenter', event => {
				this.setTooltipContent(this.getTooltipContent(countryCode));
				this.showTooltip(event);
			});

			countryElement.addEventListener('mousemove', event => this.moveTooltip(event));

			// Hide tooltip when event is mouseleav or touchend
			['mouseleave', 'touchend'].forEach(event => countryElement.addEventListener(event, () => this.hideTooltip()));

		});

		// Init pan zoom
		this.mapPanZoom = svgPanZoom(this.mapImage, {
			zoomEnabled: true,
			fit: true,
			center: true,
			minZoom: this.options.minZoom,
			maxZoom: this.options.maxZoom,
			zoomScaleSensitivity: this.options.zoomScaleSensitivity,
			controlIconsEnabled: false,
			mouseWheelZoomEnabled: this.options.mouseWheelZoomEnabled, // TODO Only with key pressed
			onZoom: () => this.setControlStatuses(),
			beforePan: (oldPan, newPan) => {
				const gutterWidth = this.mapWrapper.offsetWidth * 0.85;
				const gutterHeight = this.mapWrapper.offsetHeight * 0.85;
				const sizes = this.mapPanZoom.getSizes();
				const leftLimit = -((sizes.viewBox.x + sizes.viewBox.width) * sizes.realZoom) + gutterWidth;
				const rightLimit = sizes.width - gutterWidth - (sizes.viewBox.x * sizes.realZoom);
				const topLimit = -((sizes.viewBox.y + sizes.viewBox.height) * sizes.realZoom) + gutterHeight;
				const bottomLimit = sizes.height - gutterHeight - (sizes.viewBox.y * sizes.realZoom);
				return {
					x: Math.max(leftLimit, Math.min(rightLimit, newPan.x)),
					y: Math.max(topLimit, Math.min(bottomLimit, newPan.y))
				}
			}
		});


		// Init pan zoom
		this.mapPanZoom.zoom(this.options.initialZoom);

		// Initial zoom statuses
		this.setControlStatuses();
	}
	// Create the tooltip content
	getTooltipContent(countryCode) {
		const tooltipContentWrapper = createElement('div', 'svg-map-tooltip-content-container');
		if (this.options.hideFlag === false) {
			// Flag
			const flagContainer = createElement('div', 'svg-map-tooltip-flag-container svg-map-tooltip-flag-container-' + this.options.flagType, tooltipContentWrapper)
			if (this.options.flagType === 'image') {
				createElement('img', 'svg-map-tooltip-flag', flagContainer)
					.setAttribute('src', this.options.flagURL.replace('{0}', countryCode.toLowerCase()));
			} else if (this.options.flagType === 'emoji') {
				flagContainer.innerHTML = emojiFlags[countryCode];
			}
		}

		// Title
		createElement('div', 'svg-map-tooltip-title', tooltipContentWrapper).innerHTML = this.getCountryName(countryCode);

		// Content
		const tooltipContent = createElement('div', 'svg-map-tooltip-content', tooltipContentWrapper);
		if (!this.options.data.values[countryCode]) {
			createElement('div', 'svg-map-tooltip-no-data', tooltipContent).innerHTML = this.options.noDataText;
		} else {
			let tooltipContentTable = '<table>';
			Object.keys(this.options.data.data).forEach(key => {
				let value = this.options.data.values[countryCode][key];
				const item = typeof this.options.data.data[key] === "function" ? this.options.data.data[key](value) : this.options.data.data[key];
				item.floatingNumbers && (value = value.toFixed(1));
				item.thousandSeparator && (value = numberWithCommas(value, item.thousandSeparator));
				value = item.format ? item.format.replace('{0}', `<span>${value}</span>`) : `<span>${value}</span>`;
				tooltipContentTable += `
					<tr>
						<td>${item.name || ''}</td>
						<td>${value}</td>
					</tr>
				`;
			});
			tooltipContentTable += '</table>';
			tooltipContent.innerHTML = tooltipContentTable;
		}
		return tooltipContentWrapper;
	}
	// Set the disabled statuses for buttons
	setControlStatuses() {
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
	}
	// Zoom map
	zoomMap(direction) {
		if (this['zoomControl' + direction.charAt(0).toUpperCase() + direction.slice(1)].classList.contains('svg-map-disabled')) return false;
		this.mapPanZoom[direction == 'in' ? 'zoomIn' : 'zoomOut']();
	}
	// Reset map
	resetMapZoom() {
		const viewPort = this.mapWrapper.querySelector('.svg-pan-zoom_viewport');
		viewPort.style.transition = 'transform .3s';
		setTimeout(() => viewPort.style.transition = '', 400);
		this.mapPanZoom.reset();
	}



	// Tooltips------------
	// Create the tooltip
	createTooltip() {
		if (this.tooltip) return false;
		this.tooltip = createElement('div', 'svg-map-tooltip', document.getElementsByTagName('body')[0]);
		this.tooltipContent = createElement('div', 'svg-map-tooltip-content-wrapper', this.tooltip);
		this.tooltipPointer = createElement('div', 'svg-map-tooltip-pointer', this.tooltip);
	}
	// Set the tooltips content
	setTooltipContent(content) {
		if (this.tooltip) {
			this.tooltipContent.innerHTML = '';
			this.tooltipContent.append(content);
		}
	}
	// Show the tooltip
	showTooltip(event) {
		this.tooltip.classList.add('svg-map-active');
		this.moveTooltip(event);
	}
	// Hide the tooltip
	hideTooltip() {
		this.tooltip.classList.remove('svg-map-active');
	}
	// Move the tooltip
	moveTooltip(event) {
		let x = event.pageX || (event.touches && event.touches[0] ? event.touches[0].pageX : null);
		let y = event.pageY || (event.touches && event.touches[0] ? event.touches[0].pageY : null);
		if (x && y) {
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
				this.tooltipPointer.style.marginLeft = ((wWidth - offsetToWindow - event.pageX - (tWidth / 2)) * -1) + 'px';
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
		}
	}


	// Utils-----------------------
	// Get the name of a country by its ID
	getCountryName(countryCode) {
		return this.options.countryNames && this.options.countryNames[countryCode] ? this.options.countryNames[countryCode] : countries[countryCode];
	}
}