$(document).ready(displayWeather);
$(window).resize(centerText);

function displayWeather() {
	var fg = addForeground('lightgray');
	withWeatherInfo(function(wInfo) {
		setupBody(wInfo);
		setupText(wInfo);
		fg.fadeOut({
			duration: 500,
			easing: 'linear'
		});
	});
}

function addForeground(color) {
	var fg = $('<div id="foreground"></div>');
	fg.css({
		backgroundColor: color,
		pointerEvents: 'none',
		position: 'fixed',
		top: 0,
		left: 0,
		width: window.innerWidth + 'px',
		height: window.innerHeight + 'px',
		opacity: 1
	});
	$(document.body).append(fg);
	return fg;
}

function setupBody(wInfo) {
	$(document.body).css('background-color', 'blue');
}

function centerText() {
	var textElem = $('#weatherText');
	
	textElem.css({
		textAlign: 'center',
		position: 'absolute',
		width: 'auto',
		height: 'auto'
	});
	
	setTimeout(centerText2, 1);
}

function centerText2() {
	var textElem = $('#weatherText');
	
	
	var pageH = $(window).height();
	var pageW = $(window).width();
	
	var textH = textElem.height();
	var textW = textElem.width();

	textElem.css('left', (pageW / 2) - (textW / 2) + 'px');
	textElem.css('top', (pageH / 2) - (textH / 2) + 'px');
}

function setupText(wInfo) {
	var textElem = $('#weatherText');

	var text = '';
	text += getWord(wInfo.temperature, temperWords);

	textElem.text(text);

	centerText();
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
