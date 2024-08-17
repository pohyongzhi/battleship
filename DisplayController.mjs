import { cpuAttack, isHit } from "./LogicController.mjs";

export class DisplayController {
    constructor(playerBoard, cpuBoard) {
        this.playerBoard = playerBoard;
        this.cpuBoard = cpuBoard;
        this.displayPlayerBoard(playerBoard);
        this.displayCpuBoard(cpuBoard);
    }

    displayPlayerBoard(playerBoard) {
        const playerBoardContent = document.querySelector(
            ".player-board-content"
        );

        playerBoardContent.innerHTML = "";

        for (let x = 0; x < 10; x++) {
            const tempRow = document.createElement("div");
            tempRow.className = "row";

            for (let y = 0; y < 10; y++) {
                const tempCol = document.createElement("div");
                tempCol.className = "box";

                const XY = x + "," + y;

                // WRONG WAY OF WRITING CODE
                if (playerBoard.hitCoords.includes(XY)) {
                    tempCol.style.backgroundColor = "#2c7da0";
                }

                for (let i = 0; i < playerBoard.shipCoords.length; i++) {
                    if (
                        playerBoard.shipCoords[i].includes(XY) &&
                        playerBoard.hitCoords.includes(XY)
                    ) {
                        tempCol.style.backgroundColor = "#e63946";
                    } else if (playerBoard.shipCoords[i].includes(XY)) {
                        tempCol.style.backgroundColor = "#4ecca3";
                    }
                }

                tempRow.appendChild(tempCol);
            }

            playerBoardContent.appendChild(tempRow);
        }
    }

    displayCpuBoard(cpuBoard) {
        const cpuBoardContent = document.querySelector(".cpu-board-content");

        cpuBoardContent.innerHTML = "";

        for (let x = 0; x < 10; x++) {
            const tempRow = document.createElement("div");
            tempRow.className = "row";

            for (let y = 0; y < 10; y++) {
                const tempCol = document.createElement("div");
                tempCol.className = "box";
                tempCol.id = x + "," + y;

                tempRow.appendChild(tempCol);

                tempCol.addEventListener("click", () => {
                    const position = x + "," + y;

                    // Check if hitCoords already exists
                    if (!cpuBoard.hitCoords.includes(position)) {
                        this.executeAttack(position);
                    }
                });
            }

            cpuBoardContent.appendChild(tempRow);
        }
    }

    executeAttack(position) {
        // Add to hit position
        this.cpuBoard.receiveAttack(position);
        this.updateBoardDisplay(position);

        // Check player win condition
        if (this.cpuBoard.isAllShipsSunk()) {
            this.displayEndScreen("YOU WON!");
            return;
        }

        // Randomize attacks
        cpuAttack(this.playerBoard);

        // Re-display
        this.displayPlayerBoard(this.playerBoard);

        // Check cpu win condition
        if (this.playerBoard.isAllShipsSunk()) {
            this.displayEndScreen("YOU LOSE!");
        }
    }

    updateBoardDisplay(position) {
        const tempCol = document.getElementById(position);

        if (isHit(this.cpuBoard, position)) {
            tempCol.style.backgroundColor = "#e63946";
        } else {
            tempCol.style.backgroundColor = "#2c7da0";
        }
    }

    displayEndScreen(msg) {
        const endingScreen = document.querySelector(".ending-screen");
        const endingScreenMsg = document.querySelector(".ending-screen-msg");

        endingScreen.style.display = "flex";
        endingScreenMsg.innerHTML = msg;
    }
}
