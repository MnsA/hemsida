function loadWeatherData(callback) {
	var url = 'http://opendata-download-metfcst.smhi.se/api/category/pmp1.5g/version/1/geopoint/lat/{1}/lon/{2}/data.json';
	var lat = 63.8, lon = 20.3;
	
	// if testing
	if(true) {
		callback(weatherResponse);
	} else {
		// is cached by default
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
	var totalClouds = (100 / 8) * wData.tcc;
	wInfo.cloudiness = (100 / 8) * (wData.lcc + wData.mcc + wData.hcc) / 3;

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
	var nowUT = Date.now();

	// sorts in place
	timeseries.sort(function(a, b) {
		var at = Date.parse(a.validTime).valueOf();
		var bt = Date.parse(b.validTime).valueOf();
		// <0 becomes [a, b]
		// >0 becomes [b, a]
		return Math.abs(nowUT - at) - Math.abs(nowUT - bt);
	});
	timeseries.forEach(function(a) {
		console.log(a.validTime);
	});
	return timeseries[0];
	
	
	// unused code //
	var bestUT = new Date("Jan 1, 1800").valueOf();
	// needs to be farther from the current date
	// than any of the weather predictions' timestamps
	var bestWeather = null;
	for(var i = 0; i < timeseries.length; i++) {
		var t = new Date(timeseries[i].validTime).valueOf();
		if(Math.abs(nowUT - t) < Math.abs(nowUT - bestUT)) {
			bestUT = t;
			bestWeather = timeseries[i];
		}
	}
	return bestWeather;
}

function withWeatherInfo(callback) {
	loadWeatherData(function(resp) {
		var wData = findCorrectWeather(resp.timeseries);
		callback(getWeatherInfo(wData));
	});
}
