$(document).ready(displayWeather);

function displayWeather() {
	withWeatherInfo(function(wInfo) {
		setupBody(wInfo);
		setupText(wInfo);
	});
}

function setupBody(wInfo) {
	$(document.body).css('background-color', 'blue');
}

function setupText(wInfo) {
	var textElem = $('#weatherText');

	// center the text
	var pageH = $(document).height();
	var textH = textElem.height();
	textElem.css('text-align', 'center')
	textElem.css('margin-top', (pageH / 2) - (textH / 2) + 'px');

	var text = '';
	text += getWord(wInfo.temperature, temperWords);

	textElem.text(text);

	console.log(wInfo);
}

function getWord(value, words) {
	for(var i = 0; i < words.length - 1; i++) {
		if(value >= words[i][0] && value < words[i + 1][0]) {
			return words[i][1];
		}
	}
	return words[words.length - 1][1];
}

var temperWords = [
	[-20, 'väldigt kallt'],
	[-10, 'kallt'],
	[0, 'ganska kallt'],
	[10, 'lagom varmt'],
	[20, 'ganska varmt'],
	[30, 'jättevarmt']
];
