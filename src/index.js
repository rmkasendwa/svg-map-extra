import defaultOptions from './svg-map/default-options';
import countries from './svg-map/countries';
import { getColor } from "./svg-map/utils";
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
	applyData(data) {
		this.options.data = data;
		let min, max;

		// Get highest and lowest value
		Object.keys(data.values).forEach(countryCode => {
			const value = parseInt(data.values[countryCode][data.applyData], 10);
			max === null && (max = value);
			min === null && (min = value);
			value > max && (max = value);
			value < min && (min = value);
		});

		data.data[data.applyData].thresholdMax && (max = Math.min(max, data.data[data.applyData].thresholdMax));
		data.data[data.applyData].thresholdMin && (min = Math.max(min, data.data[data.applyData].thresholdMin));

		// Loop through countries and set colors
		Object.keys(countries).forEach(countryCode => {
			const element = document.getElementById(this.id + '-map-country-' + countryCode);
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
	getCountryName(countryCode) {
		return this.options.countryNames && this.options.countryNames[countryCode] ? this.options.countryNames[countryCode] : countries[countryCode];
	}
};