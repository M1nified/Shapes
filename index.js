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

    const shape = new Circle();
    shape
        .setPosition(canvas.width / 2, canvas.height / 2)
        .setRadius(Math.min(canvas.width, canvas.height) / 3)
        .addMarkerTimes(null, 5)
        .drawShape(ctx)
        .drawCenter(ctx)
        .drawMarkers(ctx)

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        shape
            .setPosition(canvas.width / 2, canvas.height / 2)
            .setRadius(Math.min(canvas.width, canvas.height) / 3)
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
