import ProposalsRepository from "../repositories/proposalsRepository.ts";
import GameOnList from "../entities/gameOnList.ts";
import GameOnListRepository from "../repositories/gameOnListRepository.ts";

export class AcceptProposalUseCase {
  private _proposalsRepository: ProposalsRepository;
  private _gameOnListRepository: GameOnListRepository;

  constructor(proposalsRepository: ProposalsRepository, gameOnListRepository: GameOnListRepository) {
    this._proposalsRepository = proposalsRepository;
    this._gameOnListRepository = gameOnListRepository;
  }

  public async acceptProposal(proposalId: number): Promise<GameOnList> {
    const id = await this._proposalsRepository.acceptProposal(proposalId);

    return this._gameOnListRepository.byId(id);
  }
}