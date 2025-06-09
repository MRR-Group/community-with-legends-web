import ProposalsRepository from "../repositories/proposalsRepository.ts";

export class RemoveProposalReactionUseCase {
  private _proposalsRepository: ProposalsRepository;

  constructor(proposalsRepository: ProposalsRepository) {
    this._proposalsRepository = proposalsRepository;
  }

  public async removeReactionToProposal(proposalId: number): Promise<void> {
    return this._proposalsRepository.removeReactionToProposal(proposalId);
  }
}