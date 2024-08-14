import { Gameboard } from "./Gameboard.mjs";
import { Player } from "./Player.mjs";
import { DisplayController } from "./DisplayController.mjs";

const player = new Player(new Gameboard());
const cpu = new Player(new Gameboard());
const displayController = new DisplayController(
    player.gameboard,
    cpu.gameboard
);
