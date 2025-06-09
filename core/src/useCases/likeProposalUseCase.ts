import ProposalsRepository from "../repositories/proposalsRepository.ts";

export class LikeProposalUseCase {
  private _proposalsRepository: ProposalsRepository;

  constructor(proposalsRepository: ProposalsRepository) {
    this._proposalsRepository = proposalsRepository;
  }

  public async likeProposal(proposalId: number): Promise<void> {
    return this._proposalsRepository.likeProposal(proposalId);
  }
}