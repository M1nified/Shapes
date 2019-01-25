"use strict";

const settings = {
    speedScale: 0.000002
}

window.addEventListener('load', function onLoad() {
    const
        canvas = document.querySelector('.canvas'),
        ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let shape = new Circle();
    shape = Polygon.makeRegularPolygon(3, Math.min(canvas.width, canvas.height) / 3);
    shape
        .setPosition(canvas.width / 2, canvas.height / 2)
        .addMarkerTimes(null, 5)
        .drawShape(ctx)
        .drawCenter(ctx)
        .drawMarkers(ctx)
    function setup() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        shape
            .setPosition(canvas.width / 2, canvas.height / 2)
        if (shape instanceof Circle) {
            shape
                .setRadius(Math.min(canvas.width, canvas.height) / 3)
        }

    }
    setup();
    window.addEventListener('resize', () => {
        setup();
    })

    let lastT = null;
    function frame(timestamp) {
        if (lastT === null)
            lastT = timestamp
        const dT = timestamp - lastT;
        // Store the current transformation matrix
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
