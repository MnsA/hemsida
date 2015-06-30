$(document).ready(displayWeather);
$(window).resize(centerText);

function displayWeather() {
	var fg = addForeground('lightgray');
	withWeatherInfo(function(wInfo) {
		console.log('current data: ', wInfo);
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
	var bgColor = getColor(wInfo.cloudiness);
	$(document.body).css('background-color', bgColor);
}

function centerText() {
	var textElem = $('#weatherText');
	
	textElem.css({
		textAlign: 'center',
		position: 'absolute',
		width: 'auto',
		height: 'auto'
	});

	textElem.css('left', ($(window).width() / 2) - (textElem.width() / 2) + 'px');
	textElem.css('top', ($(window).height() / 2) - (textElem.height() / 2) + 'px');
}

function setupText(wInfo) {
	var textElem = $('#weatherText');
	var text = textCube.nearest([wInfo.temperature, wInfo.windSpeed, wInfo.cloudiness, wInfo.rainAmount]);
	textElem.text(text);
	centerText();
}

function getColor(value) {
	var colors = [
	[0, '#4DA4FF'],
	[20, '#CADCFF'],
	[50, '#919191'],
	[80, '#4C4C4C']
];
	// not good searching...
	for(var i = 0; i < colors.length - 1; i++) {
		if(value >= colors[i][0] && value < colors[i + 1][0]) {
			return colors[i][1];
		}
	}
	return colors[colors.length - 1][1];
}

var textCube = new TextCube([40, 10, 100, 50]);
// temp, wind, clouds, rain
textCube.addPoints(weatherTextList);