// Reset map
export const resetMapZoom = ({ mapWrapper, mapPanZoom }) => {
	const viewPort = mapWrapper.querySelector('.svg-pan-zoom_viewport');
	viewPort.style.transition = 'transform .3s';
	setTimeout(() => viewPort.style.transition = '', 400);
	mapPanZoom.reset();
};

// Set the disabled statuses for buttons
export const setControlStatuses = ({ zoomControlIn, zoomControlOut, mapPanZoom, minZoom, maxZoom }) => {
	zoomControlIn.classList.remove('svg-map-disabled');
	zoomControlIn.setAttribute('aria-disabled', 'false');
	zoomControlOut.classList.remove('svg-map-disabled');
	zoomControlOut.setAttribute('aria-disabled', 'false');

	if (mapPanZoom.getZoom().toFixed(3) <= minZoom) {
		zoomControlOut.classList.add('svg-map-disabled');
		zoomControlOut.setAttribute('aria-disabled', 'true');
	}
	if (mapPanZoom.getZoom().toFixed(3) >= maxZoom) {
		zoomControlIn.classList.add('svg-map-disabled');
		zoomControlIn.setAttribute('aria-disabled', 'true');
	}
}