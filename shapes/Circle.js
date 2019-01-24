class Circle extends Shape {
    constructor() {
        super();
        this.radius = 0;
    }
    setRadius(r) {
        this.radius = r;
        return this;
    }
    drawShape(ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = this.shapeStyle.strokeStyle;
        ctx.fillStyle = this.shapeStyle.fillStyle;
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        return super.drawShape(ctx);
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
    drawMarkers(ctx) {
        const markers = this.markers.sort((markerA, markerB) => markerA.position - markerB.position).map(marker => {
            // debugger;
            const
                alpha = 2 * Math.PI * marker.position,
                beta = (Math.PI - alpha) / 2,
                center = this.position,
                startPoint = new Point(this.position.x + this.radius, this.position.y),
                cosBeta = Math.cos(beta),
                distanceToStart = 2 * cosBeta * this.radius,
                dx = cosBeta * distanceToStart,
                dy = Math.tan(beta) * dx,
                point = new Point(startPoint.x - dx, startPoint.y + dy);
            return [point, marker];
        })
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
        return super.drawMarkers(ctx);
    }
}
