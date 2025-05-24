import Game from "../entities/game.ts";

export default interface GameDto {
    id: number,
    name: string,
    cover: string,
}

export function gameDtoToEntity(data: GameDto):Game {
    return new Game(data.id, data.name, data.cover);
}