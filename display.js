$(document).ready(displayWeather);

function displayWeather() {
	withWeatherInfo(function(wInfo) {
		setupBody();
		setupText();
		console.log(wInfo);
	});
}

function setupBody() {
	
}

function setupText() {
	var text = $('#weatherText');

	var pageH = $(document).height();
	var textH = text.height();
	
	text.css('text-align', 'center')
	text.css('margin-top', (pageH / 2) - (textH / 2) + 'px');
}
