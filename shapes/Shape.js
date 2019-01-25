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
    drawMarkers(ctx, markerToPointMappingFunction) {
        const markers = this.markers
            .sort((markerA, markerB) => markerA.position - markerB.position)
            .map(markerToPointMappingFunction)
        markers.forEach(([point, _marker]) => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
            ctx.fillStyle = this.markerStyle.fillStyle;
            ctx.strokeStyle = this.markerStyle.strokeStyle;
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        })
        ctx.beginPath();
        let [{ x0, y0 }] = markers[0];
        ctx.moveTo(x0, y0);
        markers.forEach(([point, _marker]) => {
            let { x, y } = point;
            ctx.lineTo(x, y);
        })
        ctx.fillStyle = this.figureStyle.fillStyle;
        ctx.strokeStyle = this.figureStyle.strokeStyle;
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        // const connectMarkerPoints = (pointA, pointB) => {
        //     let { x, y } = pointA,
        //         { x: x2, y: y2 } = pointB;
        //     ctx.moveTo(x, y);
        //     ctx.lineTo(x2, y2);
        //     ctx.strokeStyle = "red";
        //     ctx.stroke();
        // }
        // for (let i = 1; i < markers.length; i++) {
        //     connectMarkerPoints(markers[i][0], markers[i - 1][0]);
        // }
        // if (markers.length > 1) {
        //     connectMarkerPoints(markers[0][0], markers[markers.length - 1][0]);
        // }
        return this;
    }
    drawCenter(ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 2, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        return this;
    }
    addMarker(marker = null) {
        if (marker === null) {
            marker = new Marker().setPosition(Math.random()).setMovementSpeed(settings.speedScale * Math.random() * 100).setMovementDirection(Math.random() - .5)
        }
        this.markers.push(marker);
        return this;
    }
    addMarkers(markers = []) {
        markers.forEach(marker => {
            if (marker instanceof Marker) {
                this.addMarker(marker);
            }
        });
        return this;
    }
    addMarkerTimes(marker = null, times) {
        for (let i = 0; i < times; i++)
            this.addMarker(marker);
        return this;
    }
    adjustMarkerCount(count) {
        while (this.markers.length > count) {
            this.markers.pop();
        }
        while (this.markers.length < count) {
            this.addMarker();
        }
        return this;
    }

    updateMarkersByTime(dT) {
        this.markers.forEach(marker => marker.updateByTime(dT));
        return this;
    }
}
