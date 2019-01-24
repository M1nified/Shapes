class Marker {
    constructor() {
        this.movementDirection = 1;
        this.movementSpeed = .0001;
        this.position = 0;
    }
    setPosition(positionPercent) {
        this.position = positionPercent;
        return this;
    }
    setMovementDirection(movementDirection) {
        this.movementDirection = Math.sign(movementDirection);
        return this;
    }
    setMovementSpeed(movementSpeed) {
        this.movementSpeed = movementSpeed;
        return this;
    }
    updateByTime(dT) {
        this.position += this.movementDirection * this.movementSpeed * dT;
        this.position %= 1;
        if (this.position < 0)
            this.position += 1;
        return this;
    }
}
