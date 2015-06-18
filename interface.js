function loadWeatherData(callback) {
	var url = 'http://api.openweathermap.org/data/2.5/weather';
	var param = '?q=Umea,se&units=metric'
	var req = $.getJSON(url + param);
	req.done(callback);
}

function getWeatherInfo(wData) {
	var wInfo = {};

	// temperature in celsius
	wInfo.temp = wData.main.temp;

	return wInfo;
}

function withWeatherInfo(callback) {
	loadWeatherData(function(wData) {
		callback(getWeatherInfo(wData));
	});
}
