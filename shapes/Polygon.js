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
    static makeRegularPolygon(cornersCount = 3, r = 100, fromShape) {
        if (cornersCount < 3)
            throw `Argument 1 has to be greater or equal 3.`;
        const polygon = new Polygon();
        for (let angle = 0; angle < 2 * Math.PI; angle += 2 * Math.PI / cornersCount) {
            const
                x = Math.cos(angle) * r,
                y = Math.sin(angle) * r;
            polygon.addCorner(new Point(x, y));
        }
        if (fromShape) {
            polygon
                .addMarkers(fromShape.markers)

        }
        return polygon;
    }
    drawShape(ctx) {
        ctx.beginPath();
        const { x: x0, y: y0 } = this.corners[0];
        ctx.moveTo(x0 + this.position.x, y0 + this.position.y);
        this.corners.forEach(({ x, y }) => {
            ctx.lineTo(x + this.position.x, y + this.position.y);
            // ctx.fillText(`${x} ${y}`, x + this.position.x, y + this.position.y)
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
                a = pointA.x === pointB.x
                    ? 0
                    : (pointA.y - pointB.y) / (pointA.x - pointB.x),
                b = pointA.y - a * pointA.x;
            return x => a * x + b;
        }
        const
            sideFunctions = this.corners.map((corner, index) => {
                const prevCorner = this.corners[index < this.corners.length - 1 ? index + 1 : 0];
                return lineF(corner, prevCorner);
            }),
            sides = this.corners.map((corner, index) => {
                const prevCorner = this.corners[index < this.corners.length - 1 ? index + 1 : 0];
                return {
                    cornerA: corner,
                    cornerB: prevCorner
                };
            })
        const markerToPointMapping = marker => {
            const
                angle = 2 * Math.PI * marker.position,
                angleLineF = x => x * Math.tan(angle)
            let point = null,
                backupPoint = new Point(0, 0);

            // ctx.beginPath();
            // ctx.moveTo(this.position.x, this.position.y);
            // ctx.lineTo(1000 + this.position.x, angleLineF(1000) + this.position.y)
            // ctx.lineTo(-1000 + this.position.x, angleLineF(-1000) + this.position.y)
            // ctx.closePath();
            // ctx.strokeStyle = "red";
            // ctx.stroke();

            for (let { cornerA, cornerB } of sides) {
                const
                    line = lineF(cornerA, cornerB),
                    bOfLine = line(0),
                    aOfLine = line(1) - bOfLine,
                    bOfAngleLine = 0,
                    aOfAngleLine = angleLineF(1) - bOfAngleLine,
                    x = aOfLine === 0
                        ? aOfAngleLine === 0 ? 0 : (bOfLine) / aOfAngleLine
                        : bOfLine / (aOfAngleLine - aOfLine),
                    y = angleLineF(x)

                if (
                    (marker.position >= 0 && marker.position <= .25 && x >= 0 && y >= 0)
                    || (marker.position >= .25 && marker.position <= .5 && x <= 0 && y >= 0)
                    || (marker.position >= .5 && marker.position <= .75 && x <= 0 && y <= 0)
                    || (marker.position >= .75 && marker.position <= 1 && x >= 0 && y <= 0)
                ) {
                    backupPoint = new Point(x, y);
                    if (
                        x <= Math.max(cornerA.x, cornerB.x) + 1
                        && x >= Math.min(cornerA.x, cornerB.x) - 1
                        && y <= Math.max(cornerA.y, cornerB.y) + 1
                        && y >= Math.min(cornerA.y, cornerB.y) - 1
                    ) {
                        point = new Point(x, y);
                        break;
                    }

                }
            }
            if (point === null) {
                point = backupPoint;
            }
            point = new Point(point.x + this.position.x, point.y + this.position.y);
            return [point, marker];
        }
        return super.drawMarkers(ctx, markerToPointMapping);
    }
}