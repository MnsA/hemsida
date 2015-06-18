// TODO: use another weather api (smhi?)

function loadWeatherData(callback) {
	var url = 'http://api.openweathermap.org/data/2.5/weather';
	var param = '?q=Umea,se&units=metric'
	//var req = $.getJSON(url + param);
	//req.done(callback);
	//fake request when testing
	callback($.parseJSON('{"coord":{"lon":20.26,"lat":63.83},"sys":{"message":0.0239,"country":"SE","sunrise":1434586433,"sunset":1434661582},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],"base":"stations","main":{"temp":10.574,"temp_min":10.574,"temp_max":10.574,"pressure":1018.56,"sea_level":1019.81,"grnd_level":1018.56,"humidity":85},"wind":{"speed":7.06,"deg":43.5042},"clouds":{"all":36},"dt":1434638569,"id":602150,"name":"Umea","cod":200}'));
}

function getWeatherInfo(wData) {
	var wInfo = {};

	// temperature in celsius
	wInfo.temper = wData.main.temp;

	// cloudiness in percent
	wInfo.clouds = wData.clouds ? wData.clouds.all : 0;

	// rain/snow for last 3h in mm
	wInfo.rain = wData.rain ? wData.rain['3h'] : 0;
	wInfo.snow = wData.snow ? wData.snow['3h'] : 0;

	return wInfo;
}

function withWeatherInfo(callback) {
	loadWeatherData(function(wData) {
		callback(getWeatherInfo(wData));
	});
}
