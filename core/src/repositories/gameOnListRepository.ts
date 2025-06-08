import axios from "axios";
import Response from "../dto/response.ts";
import GameOnList from "../entities/gameOnList.ts";
import GameOnListDto, {gameOnListDtoToEntity} from "../dto/gameOnListDto.ts";

export default class GameOnListRepository {
  public async byId(gameOnListId: number):Promise<GameOnList> {
    const response = await axios.get<Response<GameOnListDto>>(`/api/user-games/${gameOnListId}`);
    const gameOnList = response.data.data;

    return gameOnListDtoToEntity(gameOnList);
  }

  public async byUser(userId: number):Promise<GameOnList[]> {
    const response = await axios.get<Response<GameOnListDto[]>>(`/api/users/${userId}/games`);
    const listsOfGames = response.data.data.map((gameList) => gameOnListDtoToEntity(gameList));

    return listsOfGames;
  }

  public async addGameToList(game_id?: number, status?: 'to_play'|'playing'|'played'): Promise<GameOnList> {
    const response = await axios.post(`/api/user-games`, {game_id, status});
    const content = await this.byId(response.data.id);

    return content;
  }

  public async removeGameFromList(gameOnListId: number): Promise<void> {
    await axios.delete(`/api/user-games/${gameOnListId}`);
  }
}