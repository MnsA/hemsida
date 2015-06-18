function withWeatherData(f) {
	var r = $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=Umea,se');
	r.done(f);
}

function displayWeather() {
	var wt = $('#weathertext');
	withWeatherData(function(wd) {
		wt.text(wd.weather[0].main);
		console.log("fuck");
	});
}

$(document).ready(displayWeather);