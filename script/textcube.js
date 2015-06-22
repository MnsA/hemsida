function TextCube(sides) {
	this.sides = sides;
	this.points = [];
}

TextCube.prototype.addPoint = function(point, value) {
	this.points.push({
		pos: point,
		text: value
	});
}

TextCube.prototype.addPoints = function(ps) {
	for(var i = 0; i < ps.length; i += 2) {
		this.points.push({
			pos: ps[i],
			text: ps[i + 1]
		});
	}
}

TextCube.prototype.nearestText = function(pos) {
	var bestPoint = null;
	var bestDist = Number.POSITIVE_INFINITY;
	for(var i = 0; i < this.points.length; i++) {
		var dist = this.distance(pos, this.points[i].pos);
		console.log('distance to "' + this.points[i].text + '": ' + dist);
		if(dist < bestDist) {
			bestDist = dist;
			bestPoint = this.points[i];
		}
	}
	return bestPoint.text;
}

TextCube.prototype.distance = function(posA, posB) {
	var distSqr = 0;
	for(var i = 0; i < this.sides.length; i++) {
		var diff = (posA[i] - posB[i]) / this.sides[i];
		distSqr += diff * diff;
	}
	return Math.sqrt(distSqr);
}