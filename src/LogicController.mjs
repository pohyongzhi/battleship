import { Gameboard } from "./Gameboard.mjs";
import { Player } from "./Player.mjs";
import { DisplayController } from "./DisplayController.mjs";

export function isHit(cpuBoard, position) {
    for (let i = 0; i < cpuBoard.shipCoords.length; i++) {
        if (cpuBoard.shipCoords[i].includes(position)) {
            return true;
        }
    }

    return false;
}

export function cpuAttack(playerBoard) {
    let tempXY = "";

    function getCoords() {
        // Generate a random X and Y
        const X = Math.floor(Math.random() * 100) % 10;
        const Y = Math.floor(Math.random() * 100) % 10;

        return X + "," + Y;
    }

    function isValidPosition(tempXY) {
        if (playerBoard.hitCoords.includes(tempXY)) {
            return false;
        }

        return true;
    }

    tempXY = getCoords();

    // Check if XY values already exists in the hit coords
    while (!isValidPosition(tempXY)) {
        tempXY = getCoords();
    }

    // Call attack
    playerBoard.receiveAttack(tempXY);
}

export function buttonEventListeners() {
    let player = new Player(new Gameboard());
    let cpu = new Player(new Gameboard());
    let displayController = new DisplayController(
        player.gameboard,
        cpu.gameboard
    );

    // Starting screen overlay
    const startingScreen = document.querySelector(".starting-screen");

    const startBtn = document.querySelector(".start-btn");
    startBtn.addEventListener("click", () => {
        startingScreen.style.display = "none";
    });

    const randomizeBtn = document.querySelector(".randomize-btn");
    randomizeBtn.addEventListener("click", () => {
        player = new Player(new Gameboard());
        cpu = new Player(new Gameboard());
        displayController = new DisplayController(
            player.gameboard,
            cpu.gameboard
        );
    });

    // Winning Screen
    const endingScreen = document.querySelector(".ending-screen");

    const closeBtn = document.querySelector(".close-btn");
    closeBtn.addEventListener("click", () => {
        endingScreen.style.display = "none";

        // At least reset once
        player = new Player(new Gameboard());
        cpu = new Player(new Gameboard());
        displayController = new DisplayController(
            player.gameboard,
            cpu.gameboard
        );

        startingScreen.style.display = "flex";
    });
}
