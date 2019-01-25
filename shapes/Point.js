class Point {
    constructor(x = null, y = null) {
        this.x = x;
        this.y = y;
    }
    distanceTo(point) {
        return Math.sqrt(
            Math.pow(this.x - point.x, 2)
            + Math.pow(this.y - point.y, 2)
        );
    }
}
