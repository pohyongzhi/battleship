# Battleship Game

This is a simple implementation of the classic Battleship game using JavaScript, HTML, and CSS. The game features a player versus CPU setup, where the player can click on the CPU board to make an attack, and the CPU will automatically make random attacks on the player's board.

## Features

-   **Interactive Boards**: The player can view their board and the CPU's board, with visual updates for hits and misses.
-   **Random Ship Placement**: Ships are randomly placed on the board for both the player and the CPU.
-   **Victory/Defeat Conditions**: The game ends when either the player or the CPU sinks all the opponent's ships.

## Code Overview

### `DisplayController.mjs`

-   Handles the rendering of the player's and CPU's boards.
-   Listens for player clicks on the CPU's board to make attacks.
-   Updates the board display based on the result of the attack.
-   Displays end-game messages based on the win/loss conditions.

### `Gameboard.mjs`

-   Manages the game board, including the placement of ships and tracking of hit/miss coordinates.
-   Contains logic for checking if all ships have been sunk.

### `LogicController.mjs`

-   Provides utility functions like `isHit` to check if an attack hits a ship and `cpuAttack` to handle CPU attacks on the player's board.

### `Ship.mjs`

-   Defines the `Ship` class, which tracks the length, hits, and sinking status of a ship.

### `Player.mjs`

-   Defines the `Player` class, which contains a `Gameboard` instance for each player (player and CPU).

## Setup

1. Clone the repository.
2. Open `index.html` in your browser to start the game.

## How to Play

1. Click the "Start" button to begin the game.
2. Click on the CPU's board to attack.
3. Watch as the CPU makes its move.
4. The game ends when all ships of either the player or the CPU are sunk.

## To Do

-   Improve CPU attack logic.
-   Add difficulty levels.
-   Enhance UI/UX with animations and sound effects.

## License

This project is open-source and available under the MIT License.
