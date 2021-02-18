import countries from './countries';

// Print numbers with commas
export const numberWithCommas = (number, separator = ',') => String(number).replace(/\B(?=(\d{3})+(?!\d))/g, separator);

// Get a color between two other colors
export const getColor = (colorMax, colorMin, ratio) => {
	colorMax = colorMax.slice(1);
	colorMin = colorMin.slice(1);
	colorMax.length === 3 && (colorMax = colorMax.split('').map(a => a + a).join(''));
	colorMin.length === 3 && (colorMin = colorMin.split('').map(a => a + a).join(''));
	const r = Math.ceil(parseInt(colorMax.substring(0, 2), 16) * ratio + parseInt(colorMin.substring(0, 2), 16) * (1 - ratio));
	const g = Math.ceil(parseInt(colorMax.substring(2, 4), 16) * ratio + parseInt(colorMin.substring(2, 4), 16) * (1 - ratio));
	const b = Math.ceil(parseInt(colorMax.substring(4, 6), 16) * ratio + parseInt(colorMin.substring(4, 6), 16) * (1 - ratio));
	return '#' + getHex(r) + getHex(g) + getHex(b);
};

// Get a hex value
export const getHex = value => ('0' + value.toString(16)).slice(-2);

// Get the name of a country by its ID
export const getCountryName = (countryCode, countryNames = countries) => countryNames[countryCode];