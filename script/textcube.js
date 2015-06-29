function TextCube(sides) {
	this.sides = sides;
	this.points = [];
}

TextCube.prototype.addPoint = function(point, value) {
	this.points.push({
		pos: point,
		value: value
	});
}

TextCube.prototype.addPoints = function(ps) {
	for(var i = 0; i < ps.length; i += 2) {
		this.points.push({
			pos: ps[i],
			value: ps[i + 1]
		});
	}
}

TextCube.prototype.nearest = function(pos) {
	var tc = this;
	this.points.sort(function(a, b) {
		// sort for smallest value
		return tc.distance(pos, a.pos) - tc.distance(pos, b.pos);
	});
	
	for(var i = 0; i < this.points.length; i++) {
		console.log("dist to " + this.points[i].value + ": " + tc.distance(pos, this.points[i].pos));
	}

	return this.points[0].value;
}

TextCube.prototype.distance = function(posA, posB) {
	var distSqr = 0;
	for(var i = 0; i < this.sides.length; i++) {
		var diff = (posA[i] - posB[i]) / this.sides[i];
		distSqr += diff * diff;
	}
	return Math.sqrt(distSqr);
}