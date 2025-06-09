import ProposalsRepository from "../repositories/proposalsRepository.ts";

export class DislikeProposalUseCase {
  private _proposalsRepository: ProposalsRepository;

  constructor(proposalsRepository: ProposalsRepository) {
    this._proposalsRepository = proposalsRepository;
  }

  public async dislikeProposal(proposalId: number): Promise<void> {
    return this._proposalsRepository.dislikeProposal(proposalId);
  }
}