import countries from './countries';

// Print numbers with commas
export const numberWithCommas = (number, separator = ',') => String(number).replace(/\B(?=(\d{3})+(?!\d))/g, separator);

// Get a color between two other colors
export const getColor = (colorMax, colorMin, ratio, algorithm) => {
	if (algorithm === "HSL_SHIFT") {
		if (ratio >= 1) return colorMax;
		if (ratio <= 0) return colorMin;
		const { h: minHueCandidate, s: minSaturationCandidate, l: minLuminanceCandidate } = hexToHsl(colorMin);
		const { h: maxHueCandidate, s: maxSaturationCandidate, l: maxLuminanceCandidate } = hexToHsl(colorMax);

		const minHue = Math.min(minHueCandidate, maxHueCandidate);
		const maxHue = Math.max(minHueCandidate, maxHueCandidate);
		let shiftedHue = Math.round(minHue + ((maxHue - minHue) * ratio));
		shiftedHue <= 360 || (shiftedHue = 360);

		const minSaturation = Math.min(minSaturationCandidate, maxSaturationCandidate);
		const maxSaturation = Math.max(minSaturationCandidate, maxSaturationCandidate);
		let shiftedSaturation = Math.round(minSaturation + ((maxSaturation - minSaturation) * ratio));
		shiftedSaturation <= 100 || (shiftedSaturation = 100);

		const minLuminance = Math.min(minLuminanceCandidate, maxLuminanceCandidate);
		const maxLuminance = Math.max(minLuminanceCandidate, maxLuminanceCandidate);
		let shiftedLuminance = Math.round(minLuminance + ((maxLuminance - minLuminance) * ratio));
		shiftedLuminance <= 100 || (shiftedLuminance = 100);

		return `hsl(${shiftedHue},${shiftedSaturation}%,${shiftedLuminance}%)`;
	}
	colorMax = colorMax.slice(1);
	colorMin = colorMin.slice(1);
	colorMax.length === 3 && (colorMax = colorMax.split('').map(a => a + a).join(''));
	colorMin.length === 3 && (colorMin = colorMin.split('').map(a => a + a).join(''));
	let red = Math.ceil(parseInt(colorMax.substring(0, 2), 16) * ratio + parseInt(colorMin.substring(0, 2), 16) * (1 - ratio));
	red <= 255 || (red = 255);

	let green = Math.ceil(parseInt(colorMax.substring(2, 4), 16) * ratio + parseInt(colorMin.substring(2, 4), 16) * (1 - ratio));
	green <= 255 || (green = 255);

	let blue = Math.ceil(parseInt(colorMax.substring(4, 6), 16) * ratio + parseInt(colorMin.substring(4, 6), 16) * (1 - ratio));
	blue <= 255 || (blue = 255);

	return '#' + getHex(red) + getHex(green) + getHex(blue);
};


// Get a hex value
export const getHex = value => ('0' + value.toString(16)).slice(-2);

// Get the name of a country by its ID
export const getCountryName = (countryCode, countryNames = countries) => countryNames[countryCode];

export const hexToHsl = hex => {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	const r = parseInt(result[1], 16) / 255;
	const g = parseInt(result[2], 16) / 255;
	const b = parseInt(result[3], 16) / 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h, s, l = (max + min) / 2;
	if (max == min) {
		h = s = 0; // achromatic
	} else {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}
	s = s * 100;
	s = Math.round(s);
	l = l * 100;
	l = Math.round(l);
	h = Math.round(360 * h);
	return { h, s, l };
};