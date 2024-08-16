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

        for (let x = 0; x < 10; x++) {
            const tempRow = document.createElement("div");
            tempRow.className = "row";

            for (let y = 0; y < 10; y++) {
                const tempCol = document.createElement("div");
                tempCol.className = "box";
                tempCol.id = x + "," + y;

                tempRow.appendChild(tempCol);

                tempCol.addEventListener("click", () => {
                    function executeAttack(
                        playerBoard,
                        cpuBoard,
                        displayPlayerBoard
                    ) {
                        // Add to hit position
                        cpuBoard.receiveAttack(position);

                        // Check if hit
                        if (isHit(cpuBoard, position)) {
                            tempCol.style.backgroundColor = "#e63946";
                        } else {
                            tempCol.style.backgroundColor = "#2c7da0";
                        }

                        // Check player win condition
                        if (cpuBoard.isAllShipsSunk()) {
                            console.log("you win");
                        }

                        // Randomize attacks
                        cpuAttack(playerBoard);

                        // Re-display
                        displayPlayerBoard(playerBoard);

                        // Check cpu win condition
                        if (playerBoard.isAllShipsSunk()) {
                            console.log("You lose");
                        }
                    }

                    const position = x + "," + y;

                    // Check if hitCoords already exists
                    if (!cpuBoard.hitCoords.includes(position)) {
                        executeAttack(
                            this.playerBoard,
                            cpuBoard,
                            this.displayPlayerBoard
                        );
                    }
                });
            }

            cpuBoardContent.appendChild(tempRow);
        }
    }
}
