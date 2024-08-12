import { test, expect } from "@jest/globals";
import { Gameboard } from "./Gameboard.mjs";
import { Ship } from "./Ship.mjs";

test("Receive attack test", () => {
    const gameboard = new Gameboard();
    const ship = new Ship(3);

    gameboard.shipCoords = ["0,0", "0,1", "0,2"];
    gameboard.board[0][0] = ship;
    gameboard.board[0][1] = ship;
    gameboard.board[0][2] = ship;

    expect(ship.getHit()).toBe(0);

    gameboard.receiveAttack("0,0");

    expect(ship.getHit()).toBe(1);

    gameboard.receiveAttack("0,1");
    expect(ship.getHit()).toBe(2);
});

test("Check sunk ships", () => {
    const gameboard = new Gameboard();
    const ship = new Ship(1);

    gameboard.shipCoords = ["0,0"];
    gameboard.board[0][0] = ship;

    gameboard.receiveAttack("0,0");
    expect(gameboard.sunkShips[0].isSunk()).toBe(true);
});
