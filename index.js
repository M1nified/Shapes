"use strict";

const settings = {
    speedScale: 0.000002,
    corners: 3,
    markers: 5
}
window.addEventListener('load', function onLoad() {
    const
        canvas = document.querySelector('.canvas'),
        ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let shape

    function setup() {
        if (settings.corners < 3)
            shape = new Circle();
        else
            shape = Polygon.makeRegularPolygon(settings.corners, Math.min(canvas.width, canvas.height) / 3, shape);
        shape
            .adjustMarkerCount(settings.markers)
            // .addMarker(new Marker().setPosition(0))
            // .addMarker(new Marker().setPosition(0.25))
            // .addMarker(new Marker().setPosition(0.60))
            // .addMarker(new Marker().setPosition(0.65))
            // .addMarker(new Marker().setPosition(0.75))
            // .addMarker(new Marker().setPosition(0.15))
            .drawShape(ctx)
            .drawCenter(ctx)
            .drawMarkers(ctx)

    }
    function fitScreen() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        if (shape instanceof Circle) {
            shape
                .setRadius(Math.min(canvas.width, canvas.height) / 3)
        } else if (shape instanceof Polygon) {
            shape = Polygon.makeRegularPolygon(settings.corners, Math.min(canvas.width, canvas.height) / 3, shape);
        }
        shape
            .setPosition(canvas.width / 2, canvas.height / 2)

    }
    setup();
    fitScreen();
    window.addEventListener('resize', () => {
        fitScreen();
    })
    window.addEventListener("wheel", event => {
        if (event.shiftKey) {
            settings.corners -= Math.sign(event.deltaY);
            settings.corners = Math.max(settings.corners, 2);
        } else {
            settings.markers -= Math.sign(event.deltaY);
            settings.markers = Math.max(settings.markers, 2);
            shape.adjustMarkerCount(settings.markers)
        }
        setup();
        fitScreen();

    })

    let lastT = null;
    function frame(timestamp) {
        if (lastT === null)
            lastT = timestamp
        const dT = timestamp - lastT;
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        shape
            .drawShape(ctx)
            .drawCenter(ctx)
            .drawMarkers(ctx)
            .updateMarkersByTime(dT)
        lastT = timestamp;
        window.requestAnimationFrame(frame);
    }
    window.requestAnimationFrame(frame);
});
