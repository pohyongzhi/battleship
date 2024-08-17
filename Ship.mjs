export class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
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
