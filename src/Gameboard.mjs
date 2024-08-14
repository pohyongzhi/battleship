import { Ship } from "./Ship.mjs";

export class Gameboard {
    constructor() {
        this.board = null;
        this.populateBoard();
        this.shipCoords = [];
        this.hitCoords = [];
        this.sunkShips = [];
        this.initializeAllShip();
    }

    populateBoard() {
        this.board = new Array(10)
            .fill(null)
            .map(() => new Array(10).fill(null));
    }

    initializeAllShip() {
        const carrier = new Ship(5);
        this.generateShipCoordinates(carrier, carrier.getLength());

        const battleship = new Ship(4);
        this.generateShipCoordinates(battleship, battleship.getLength());

        const destroyer = new Ship(3);
        this.generateShipCoordinates(destroyer, destroyer.getLength());

        const submarine = new Ship(3);
        this.generateShipCoordinates(submarine, submarine.getLength());

        const patrolBoat = new Ship(2);
        this.generateShipCoordinates(patrolBoat, patrolBoat.getLength());
    }

    generateShipCoordinates(ship, shipLength) {
        // If 0, ship will be vertical. If 1, ship will be horizontal
        const position = Math.floor(Math.random() * 100) % 2;

        let result = [];

        const getResult = () => {
            let temp = [];
            if (position === 0) {
                // Get random X and Y position
                const X = Math.floor(Math.random() * 100) % 10;
                const Y = Math.floor(Math.random() * 100) % 5;

                for (let i = Y; i < Y + shipLength; i++) {
                    temp.push(X + "," + i);
                }
            } else {
                // Get random X and Y position
                const X = Math.floor(Math.random() * 100) % 5;
                const Y = Math.floor(Math.random() * 100) % 10;

                for (let i = X; i < X + shipLength; i++) {
                    temp.push(i + "," + Y);
                }
            }

            return temp;
        };

        const isValidPosition = (resultArr) => {
            for (let i = 0; i < resultArr.length; i++) {
                const stringResult = JSON.stringify(resultArr[i]);
                if (this.shipCoords.includes(stringResult)) {
                    return false;
                }
            }

            return true;
        };

        // Keep calling getResult until there are no collision
        result = getResult();

        while (!isValidPosition(result)) {
            result = getResult();
        }

        // Add result to shipCoords
        this.shipCoords.push(result);

        // Look through result and set the array to point to the ship
        const setShips = (shipPosArr) => {
            shipPosArr.forEach((pos) => {
                const [X, Y] = pos.split(",");

                this.board[X][Y] = ship;
            });
        };

        setShips(result);
    }

    receiveAttack(coords) {
        // Add coords to hitCoords
        this.hitCoords.push(coords);

        // Get the coords
        const [X, Y] = coords.split(",");

        // Go into the ship and add to the hit counter
        if (this.board[X][Y] !== null) {
            const ship = this.board[X][Y];
            ship.hit();

            // Check if sunk. If it is, add to the sunkShips
            if (ship.isSunk()) {
                this.sunkShips.push(ship);
            }
        }
    }

    isAllShipsSunk() {
        return this.sunkShips.length === 5 ? true : false;
    }
}
