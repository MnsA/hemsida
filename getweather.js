function withWeatherData(f) {
	var r = $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=Umea,se');
	r.done(f);
}

function displayWeather() {
	var wt = $('#weathertext');
	withWeatherData(function(wd) {
		console.log(wd);
		wt.text(wd.main.temp);
	});
}

function setupWeatherText() {
	var elem = $('#weathertext');
	
	var dh = $(document).height();
	var h = elem.height();
	
	elem.css('text-align', 'center')
	elem.css('margin-top', (dh / 2) - h);
}

$(document).ready(function() {
	setupWeatherText();
	displayWeather();
});