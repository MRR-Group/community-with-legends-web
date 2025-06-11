import Game from "../entities/game.ts";
import GameOnList from "../entities/gameOnList.ts";

export default interface GameOnListDto {
  id: number,
  status: "to_play" | "playing" | "played",
  game: Game,
}

export function gameOnListDtoToEntity(data: GameOnListDto): GameOnList {
  return new GameOnList(data.id, data.status, data.game);
}