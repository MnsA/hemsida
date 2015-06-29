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

	textElem.css('left', ($(window).width() / 2) - (textElem.width() / 2) + 'px');
	textElem.css('top', ($(window).height() / 2) - (textElem.height() / 2) + 'px');
}

function setupText(wInfo) {
	var textElem = $('#weatherText');
	var text = textCube.nearest([wInfo.temperature, wInfo.windSpeed, wInfo.cloudiness, wInfo.rainAmount]);
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

/*var temperWords = [
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
];*/

var cloudColors = [
	[0, '#4DA4FF'],
	[20, '#CADCFF'],
	[50, '#919191'],
	[80, '#4C4C4C']
];

var textCube = new TextCube([40, 10, 100, 50]);
// temp, wind, clouds, rain
textCube.addPoints([
	[0, 10, 60, 0], "Kallt och blåsigt.",
	[20, 5, 0, 0], "Varmt och stilla.",
	[10, 10, 100, 20], "Regnigt och hemskt.",
	[20, 0, 0, 0], "Mycket fint väder.",
	[30, 1, 0, 0], "Gå ut!",
	[-10, 0, 100, 5], "Snö och sånt.",
	[-20, 10, 0, 0], "Iskallt och blåsigt.",
	[-30, 3, 0, 0], "Stanna inomhus om du inte är en norrlänning.",
	[20, 10, 40, 0], "Varmt och blåsigt.",
	[10, 1, 60, 0], "Ganska fint väder."
]);