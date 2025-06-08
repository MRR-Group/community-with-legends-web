import GameOnListRepository from "../repositories/gameOnListRepository.ts";

export class RemoveGameFromListUseCase {
  private _gameOnListRepository: GameOnListRepository;

  constructor(gameOnListRepository: GameOnListRepository) {
    this._gameOnListRepository = gameOnListRepository;
  }

  public async removeGameFromList(game_id: number): Promise<void> {
    return this._gameOnListRepository.removeGameFromList(game_id);
  }
}