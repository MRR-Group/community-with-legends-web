import {Entity} from "./entity.ts";
import Game from "./game.ts";

export default class GameOnList extends Entity {
  public readonly status: "to_play" | "playing" | "played";
  public readonly game: Game;

  public constructor(id: number, status: "to_play" | "playing" | "played", game: Game) {
    super(id);

    this.status = status;
    this.game = game;
  }
}