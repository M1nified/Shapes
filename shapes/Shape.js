class Shape {
    constructor() {
        this.position = new Point(0, 0);
        this.markers = [];
        this.figureStyle = {
            strokeStyle: "black",
            fillStyle: "rgba(79, 255, 79, 0.85)"
        }
        this.markerStyle = {
            strokeStyle: "black",
            fillStyle: "black"
        }
        this.shapeStyle = {
            strokeStyle: "rgb(79, 79, 79)",
            fillStyle: "rgb(79, 79, 79)"
        }
    }
    setPosition(xOrPoint = 0, y = 0) {
        if (xOrPoint instanceof Point) {
            this.position = xOrPoint;
        } else {
            this.position = new Point(xOrPoint, y);
        }
        return this;
    }
    drawShape(ctx) {
        return this;
    }
    drawMarkers(ctx) {
        return this;
    }
    addMarker(marker = null) {
        if (marker === null) {
            marker = new Marker().setPosition(Math.random()).setMovementSpeed(settings.speedScale * Math.random() * 100).setMovementDirection(Math.random() - .5)
        }
        this.markers.push(marker);
        return this;
    }
    addMarkerTimes(marker = null, times) {
        for (let i = 0; i < times; i++)
            this.addMarker(marker);
        return this;
    }
    updateMarkersByTime(dT) {
        this.markers.forEach(marker => marker.updateByTime(dT));
        return this;
    }
}
