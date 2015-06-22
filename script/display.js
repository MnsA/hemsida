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
		console.log(wInfo);
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
	var bgColor = getWord(wInfo.cloudiness, cloudColors);
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
	
	text += textCube.nearestText([wInfo.temperature, wInfo.windSpeed, wInfo.rainAmount]);
	
	//text += getWord(wInfo.temperature, temperWords);
	//text += ' och ';
	//text += getWord(wInfo.windSpeed, windWords);

	textElem.text(text);

	centerText();
}

function getWord(value, words) {
	// not good searching...
	for(var i = 0; i < words.length - 1; i++) {
		if(value >= words[i][0] && value < words[i + 1][0]) {
			return words[i][1];
		}
	}
	return words[words.length - 1][1];
}

var temperWords = [
	[-300, 'Norrlänsk Vinter'],
	[-20, 'väldigt kallt'],
	[-10, 'kallt'],
	[0, 'ganska kallt'],
	[10, 'lagomt varmt'],
	[20, 'ganska varmt'],
	[30, 'jättevarmt']
];
var windWords = [
	[0, 'Ingen vind'],
	[5, 'lite blåsigt'],
	[10, 'ganska blåsigt'],
	[20, 'blåsigt']
	[30, 'Orkan!'],
	[50, 'TORNADO!']
];
var cloudColors = [
	[0, '#4DA4FF'],
	[20, '#CADCFF'],
	[50, '#919191'],
	[80, '#4C4C4C']
];


var textCube = new TextCube([60, 10, 50]);
// temp, wind, rainType, rain
textCube.addPoints([
	[0, 10, 0], "kallt och blåsigt",
	[20, 5, 0], "varmt och stilla"
	[10, 10, 20], "regnigt och hemskt"
]);