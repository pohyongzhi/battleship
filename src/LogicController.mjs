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
