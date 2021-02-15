// Reset map
export const resetMapZoom = ({ mapWrapper, mapPanZoom }) => {
	const viewPort = mapWrapper.find('.svg-pan-zoom_viewport');
	viewPort.css('transition', 'transform .3s');
	setTimeout(() => viewPort.css('transition', ''), 400);
	mapPanZoom.reset();
};

// Set the disabled statuses for buttons
export const setControlStatuses = ({ zoomControlIn, zoomControlOut, mapPanZoom, minZoom, maxZoom }) => {
	zoomControlIn.add(zoomControlOut).removeClass('svg-map-disabled').attr('aria-disabled', 'false');
	mapPanZoom.getZoom().toFixed(3) <= minZoom && zoomControlOut.addClass('svg-map-disabled').attr('aria-disabled', 'true');
	mapPanZoom.getZoom().toFixed(3) >= maxZoom && zoomControlIn.addClass('svg-map-disabled').attr('aria-disabled', 'true');
}