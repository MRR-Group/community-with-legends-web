import GameOnListRepository from "../repositories/gameOnListRepository.ts";
import GameOnList from "../entities/gameOnList.ts";

export class AddGameToListUseCase {
  private _gameOnListRepository: GameOnListRepository;

  constructor(gameOnListRepository: GameOnListRepository) {
    this._gameOnListRepository = gameOnListRepository;
  }

  public async addGameToList(game_id?: number, status?: 'to_play'|'playing'|'played'): Promise<GameOnList> {
    return this._gameOnListRepository.addGameToList(game_id, status);
  }
}