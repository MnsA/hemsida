function loadWeatherData(callback) {
	var url = 'http://opendata-download-metfcst.smhi.se/api/category/pmp1.5g/version/1/geopoint/lat/{1}/lon/{2}/data.json';
	var lat = 63.8, lon = 20.3;
	
	// if testing
	if(true) {
		callback(weatherResponse);
	} else {
		var req = $.getJSON(url.replace('{1}', lat).replace('{2}', lon));
		req.done(callback);
	}
}

function getWeatherInfo(wData) {
	var wInfo = {};

	// celsius
	wInfo.temperature = wData.t;

	// meters / second
	wInfo.windSpeed = wData.ws;

	// percent
	wInfo.cloudiness = wData.tcc * (100 / 8);

	// mm / hour
	wInfo.rainAmount = wData.pit;

	// string
	wInfo.rainType = wData.pcat;

	return wInfo;
}

function rainTypeString(type) {
	var names = ['none', 'snow', 'snow and rain', 'rain', 'drizzle', 'freezing rain', 'freezing drizzle'];
	return names[type] ? names[type] : 'invalid type';
}

function findCorrectWeather(timeseries) {
	var now = new Date();
	for(var i = 0; i < timeseries.length; i++) {
		var t = new Date(timeseries[i].validTime);
		if(t.getDate() == now.getDate()) {
			return timeseries[i];
		}
	}
	return null;
}

function withWeatherInfo(callback) {
	loadWeatherData(function(resp) {
		var wData = findCorrectWeather(resp.timeseries);
		callback(getWeatherInfo(wData));
	});
}
