function withWeatherData(f) {
	var r = $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=Umea,se');
	r.done(f);
}

function displayWeather() {
	var textElem = $('#weatherText');
	withWeatherData(function(wd) {
		textElem.text(wd.main.temp);
		
		pageCenterText(textElem);
	});
}

function pageCenterText(elem) {
	var pageH = $(document).height();
	var elemH = elem.height();
	
	elem.css('text-align', 'center')
	elem.css('margin-top', (pageH / 2) - (elemH / 2) + 'px');
}

$(document).ready(displayWeather);