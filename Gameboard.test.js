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

test("Test all ships sunk", () => {
    const gameboard = new Gameboard();
    const ship1 = new Ship(1);
    const ship2 = new Ship(2);
    const ship3 = new Ship(2);
    const ship4 = new Ship(3);
    const ship5 = new Ship(4);

    gameboard.sunkShips.push(ship1);
    gameboard.sunkShips.push(ship2);
    gameboard.sunkShips.push(ship3);
    gameboard.sunkShips.push(ship4);
    gameboard.sunkShips.push(ship5);

    expect(gameboard.isAllShipsSunk()).toBe(true);
});
