export class Ship {
    constructor() {
        this.length = 0;
        this.hits = 0;
    }

    setLength(length) {
        this.length = length;
    }

    getLength() {
        return this.length;
    }

    getHit() {
        return this.hits;
    }

    hit() {
        this.hits++;
    }

    isSunk() {
        return this.hits >= this.length ? true : false;
    }
}
