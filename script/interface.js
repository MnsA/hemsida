var DEBUGGING = false;

function loadWeatherData(callback) {
	var url = 'http://opendata-download-metfcst.smhi.se/api/category/pmp1.5g/version/1/geopoint/lat/{1}/lon/{2}/data.json';
	var lat = 63.8, lon = 20.3;


	$.ajaxSetup({cache: true});
	var req = $.getJSON(url.replace('{1}', lat).replace('{2}', lon));
	req.done(callback);
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
		var at = Date.parse(a.validTime);
		var bt = Date.parse(b.validTime);
		// <0 becomes [a, b]
		// >0 becomes [b, a]
		return Math.abs(nowUT - at) - Math.abs(nowUT - bt);
	});
	
	console.log('using weather for ' + timeseries[0].validTime);
	return timeseries[0];
}

function withWeatherInfo(callback) {
	if(DEBUGGING) {
		callback(getUserData());
	} else {
		loadWeatherData(function(resp) {
			var wData = findCorrectWeather(resp.timeseries);
			callback(getWeatherInfo(wData));
		});
	}
}

function getUserData() {
	// gets weather data from user, for debuging
	var wInfo = {};
	wInfo.temperature = window.prompt('temperatur (°C): ');
	wInfo.windSpeed = window.prompt('vindhastighet (m/s):');
	wInfo.cloudiness =  window.prompt('molnighet (%):');
	wInfo.rainAmount = window.prompt('hur mycket regn (mm/h):');
	wInfo.rainType = 3; // rain
	return wInfo;
}