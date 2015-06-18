function withWeatherData(f) {
	var r = $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=Umea,se');
	r.done(f);
}

$.ready(function() {
	withWeatherData(function(data) {
		console.log(data);
	});
});