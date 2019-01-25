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
    drawMarkers(ctx) {
        const markerToPointMapping = marker => {
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
        }
        return super.drawMarkers(ctx, markerToPointMapping);
    }
}
