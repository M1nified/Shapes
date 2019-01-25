class Polygon extends Shape {
    constructor() {
        super();
        this.corners = [];
    }
    addCorner(point) {
        if (!(point instanceof Point))
            throw `Argument 0 has to be an instance of Point.`;
        this.corners.push(point);
        return this;
    }
    static makeRegularPolygon(cornersCount = 3, r = 100) {
        if (cornersCount < 3)
            throw `Argument 1 has to be greater or equal 3.`;
        const polygon = new Polygon();
        for (let angle = 0; angle < 2 * Math.PI; angle += 2 * Math.PI / cornersCount) {
            const
                x = Math.cos(angle) * r,
                y = Math.sin(angle) * r;
            polygon.addCorner(new Point(x, y));
        }
        return polygon;
    }
    drawShape(ctx) {
        ctx.beginPath();
        const { x: x0, y: y0 } = this.corners[0];
        ctx.moveTo(x0 + this.position.x, y0 + this.position.y);
        this.corners.forEach(({ x, y }) => {
            ctx.lineTo(x + this.position.x, y + this.position.y);
        })
        ctx.fillStyle = this.shapeStyle.fillStyle;
        ctx.strokeStyle = this.shapeStyle.strokeStyle;
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        return super.drawShape(ctx);
    }
    drawMarkers(ctx) {
        function lineF(pointA, pointB) {
            const
                a = (pointA.x - pointB.x) / (pointA.y - pointB.y),
                b = pointA.y - a * pointA.x;
            return x => a * x + b;
        }
        const sideFunctions = this.corners.map((corner, index) => {
            const prevCorner = this.corners[index < this.corners.length - 1 ? index + 1 : 0];
            return lineF(corner, prevCorner);
        })
        const markerToPointMapping = marker => {
            const
                angle = 2 * Math.PI * marker.position,
                angleLineF = x => x * Math.tan(angle)
            let point = new Point(0, 0);
            for (let i = 0; i < this.corners.length; i++) {
                const
                    cornerA = this.corners[i],
                    cornerB = this.corners[i < this.corners.length - 2 ? i + 1 : 0],
                    line = lineF(cornerA, cornerB),
                    bOfLine = line(0),
                    aOfLine = line(1) - bOfLine,
                    aOfAngleLine = angleLineF(1),
                    x = bOfLine / (aOfAngleLine - aOfLine),
                    y = angleLineF(x)
                    ctx.fillText(`${x}, ${y}`, x, y);
                if (x <= Math.max(cornerA.x, cornerB.x)
                    && x >= Math.min(cornerA.x, cornerB.x)
                    && y <= Math.max(cornerA.y, cornerB.y)
                    && y >= Math.min(cornerA.y, cornerB.y)) {
                    point = new Point(x + this.position.x, y + this.position.y);
                }
            }
            for (let line of sideFunctions) {
            }
            return [point, marker];
        }
        return super.drawMarkers(ctx, markerToPointMapping);
    }
}