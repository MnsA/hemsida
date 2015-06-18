// TODO: use another weather api (smhi?)

function loadWeatherData(callback) {
	var url = 'http://opendata-download-metfcst.smhi.se/api/category/pmp1.5g/version/1/geopoint/lat/{1}/lon/{2}/data.json';
	var lat = 60, lon = 20;
	var req = $.getJSON(url.replace('{1}', lat).replace('{2}', lon));
	req.done(callback);
}

function getWeatherInfo(wData) {
	var wInfo = {};

	wInfo.temper = 20;

	return wInfo;
}

function withWeatherInfo(callback) {
	loadWeatherData(function(wData) {
		callback(getWeatherInfo(wData));
	});
}
