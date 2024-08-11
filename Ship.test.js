import { test, expect } from "@jest/globals";
import { Ship } from "./Ship.mjs";

test("Hit test", () => {
    const ship = new Ship();
    ship.setLength(3);

    expect(ship.getHit()).toBe(0);
    ship.hit();
    expect(ship.getHit()).toBe(1);
});

test("Sink test", () => {
    const ship1 = new Ship();
    ship1.setLength(1);
    ship1.hit();
    expect(ship1.isSunk()).toBe(true);

    const ship2 = new Ship();
    ship2.setLength(3);
    ship2.hit();
    expect(ship2.isSunk()).toBe(false);
});
