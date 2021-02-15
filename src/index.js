import SVGPanZoom from 'svg-pan-zoom';
import $ from 'cash-dom';
import countries from './svg-map/countries';
import defaultOptions from './svg-map/default-options';
import emojiFlags from './svg-map/emoji-flags';
import mapPaths from './svg-map/map-paths';
import { resetMapZoom, setControlStatuses } from './svg-map/map';
import { createTooltip, hideTooltip, moveTooltip, setTooltipContent, showTooltip } from './svg-map/tooltip';
import { getColor, getCountryName } from './svg-map/utils';
export default class SVGMap {
	constructor(options = {}) {
		if (!options.targetElementID || !document.getElementById(options.targetElementID)) {
			if (!options.targetElement) throw new TypeError('Target element not found');
		}
		this.options = { ...defaultOptions, ...options };

		const container = this.options.targetElementID ? document.getElementById(this.options.targetElementID) : this.options.targetElement;

		// Create the map
		// Create the tooltip content
		const getTooltipContent = countryCode => {
			const tooltipContentWrapper = $('<div class="svg-map-tooltip-content-container">');
			if (this.options.hideFlag === false) {
				// Flag
				const flagContainer = $(`<div class="svg-map-tooltip-flag-container svg-map-tooltip-flag-container-${this.options.flagType}">`).appendTo(tooltipContentWrapper);
				switch (this.options.flagType) {
					case "image":
						flagContainer.append($('<img class="svg-map-tooltip-flag">').attr('src', this.options.flagURL.replace('{0}', countryCode.toLowerCase())));
						break;
					case "emoji":
						flagContainer.html(emojiFlags[countryCode]);
						break;
				}
			}

			// Title
			tooltipContentWrapper.append($('<div class="svg-map-tooltip-title">').html(getCountryName(countryCode, this.options.countryNames)));

			// Content
			const tooltipContent = $('<div class="svg-map-tooltip-content">').appendTo(tooltipContentWrapper);
			if (this.options.data && this.options.data.values[countryCode]) {
				tooltipContent.append(this.options.getTooltipContent(this.options.data.data, this.options.data.values, countryCode));
			} else {
				tooltipContent.append($('<div class="svg-map-tooltip-no-data">').html(this.options.noDataText));
			}
			return tooltipContentWrapper;
		};

		// Zoom map
		const zoomMap = (buttonControl, direction) => {
			if (buttonControl.hasClass('svg-map-disabled')) return false;
			this.panZoom[direction == 'in' ? 'zoomIn' : 'zoomOut']();
		};

		// Create the tooltip
		const { tooltip, tooltipContentContainer, tooltipPointer } = createTooltip();

		// Create map wrappers
		this.wrapper = $('<div class="svg-map-wrapper">').appendTo(container);
		const mapImage = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		mapImage.setAttribute('viewBox', '0 0 2000 1001');
		mapImage.classList.add('svg-map-image');
		this.wrapper.append(mapImage);

		// Add controls
		const mapControlsWrapper = $('<div class="svg-map-controls-wrapper">').appendTo(this.wrapper);
		const zoomContainer = $('<div class="svg-map-controls-zoom">').appendTo(mapControlsWrapper);
		const zoomControlIn = $('<button class="svg-map-control-button svg-map-zoom-button svg-map-zoom-in-button">').appendTo(zoomContainer);
		const zoomControlOut = $('<button class="svg-map-control-button svg-map-zoom-button svg-map-zoom-out-button">').appendTo(zoomContainer);
		[[zoomControlIn, 'in'], [zoomControlOut, 'out']].forEach(([buttonControl, direction]) => {
			buttonControl.type = 'button';
			buttonControl.on('click', () => zoomMap(buttonControl, direction));
			buttonControl.attr('aria-label', `Zoom ${direction}`);
		});

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
			countryElement.setAttribute('data-id', countryCode);
			countryElement.classList.add('svg-map-country');

			mapImage.appendChild(countryElement);

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
				setTooltipContent(tooltipContentContainer, getTooltipContent(countryCode));
				showTooltip(event, { tooltip, tooltipPointer });
				moveTooltip(event, { tooltip, tooltipPointer });
			});

			countryElement.addEventListener('mouseenter', event => {
				setTooltipContent(tooltipContentContainer, getTooltipContent(countryCode));
				showTooltip(event, { tooltip, tooltipPointer });
			});

			countryElement.addEventListener('mousemove', event => moveTooltip(event, { tooltip, tooltipPointer }));

			// Hide tooltip when event is mouseleav or touchend
			['mouseleave', 'touchend'].forEach(event => countryElement.addEventListener(event, () => hideTooltip(tooltip)));

		});

		// Init pan zoom
		this.panZoom = SVGPanZoom(mapImage, {
			zoomEnabled: true,
			fit: true,
			center: true,
			minZoom: this.options.minZoom,
			maxZoom: this.options.maxZoom,
			zoomScaleSensitivity: this.options.zoomScaleSensitivity,
			controlIconsEnabled: false,
			mouseWheelZoomEnabled: this.options.mouseWheelZoomEnabled, // TODO Only with key pressed
			onZoom: () => setControlStatuses({ mapPanZoom: this.panZoom, maxZoom: this.options.maxZoom, minZoom: this.options.minZoom, zoomControlIn: zoomControlIn, zoomControlOut: zoomControlOut }),
			beforePan: (oldPan, newPan) => {
				const gutterWidth = this.wrapper.offsetWidth * 0.85;
				const gutterHeight = this.wrapper.offsetHeight * 0.85;
				const sizes = this.panZoom.getSizes();
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
		this.panZoom.zoom(this.options.initialZoom);

		// Initial zoom statuses
		setControlStatuses({ mapPanZoom: this.panZoom, maxZoom: this.options.maxZoom, minZoom: this.options.minZoom, zoomControlIn: zoomControlIn, zoomControlOut: zoomControlOut });

		// Apply map data
		this.options.data && this.applyData(this.options.data);
		this.destroy = () => {
			tooltip.remove();
		};
	}
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
			const element = this.wrapper.find(`[data-id="${countryCode}"]`)[0];
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
			const { offsetWidth: mapWidth, offsetHeight: mapHeight } = this.wrapper[0];
			const scaleFactor = mapWidth / (mapWidth > mapHeight ? 2000 : 1001);
			const mapCenterPoint = [mapWidth / 2, mapHeight / 2];
			const points = Object.keys(data.values).map(countryCode => {
				return this.wrapper.find(`[data-id="${countryCode}"]`)[0];
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
			resetMapZoom({ mapWrapper: this.wrapper, mapPanZoom: this.panZoom });
			if (points.length > 0) {
				const minX = Math.min(...points.map(([x]) => x));
				const minY = Math.min(...points.map(([, y]) => y));
				const maxX = Math.max(...points.map(([x]) => x));
				const maxY = Math.max(...points.map(([, y]) => y));
				const boundingBoxWidth = maxX - minX;
				const boundingBoxHeight = maxY - minY;
				const xZoomFactor = 2000 * scaleFactor / boundingBoxWidth;
				const yZoomFactor = 1001 * scaleFactor / boundingBoxHeight;
				this.panZoom.pan({ x: mapCenterPoint[0] - (minX + boundingBoxWidth / 2), y: mapCenterPoint[1] - (minY + boundingBoxHeight / 2) });
				this.panZoom.zoom(Math.round(Math.min(xZoomFactor, yZoomFactor) * .8));
			}
		}
	}
}