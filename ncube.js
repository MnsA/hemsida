function NCube(dims) {
	this.dimCount = dims;
}

NCube.prototype.addPoint = function(point, value) {
	this.points.push({
		pos: point,
		text: value
	});
}

NCube.prototype.nearestText = function(pos) {
	var bestPoint = null;
	var bestDist = Number.POSITIVE_INFINITY;
	for(var i = 0; i < this.points.length; i++) {
		var dist = this.distance(pos, this.points[i].pos);
		if(dist < bestDist) {
			bestDist = dist;
			bestPoint = this.points[i];
		}
	}
	return bestPoint.value;
}

NCube.prototype.distance = function(pos1, pos2) {
	var distSqr = 0;
	for(var i = 0; i < this.dimCount; i++) {
		var diff = p2[i] - p1[i];
		distSqr += diff * diff;
	}
	return Math.sqrt(distSqr);
}