import ProposalsRepository from "../repositories/proposalsRepository.ts";
import Proposal from "../entities/proposal.ts";

export class CreateProposalUseCase {
  private _proposalsRepository: ProposalsRepository;

  constructor(proposalsRepository: ProposalsRepository) {
    this._proposalsRepository = proposalsRepository;
  }

  public async createProposal(receiverId: number, gameId: number): Promise<Proposal> {
    return this._proposalsRepository.createProposal(receiverId, gameId);
  }
}