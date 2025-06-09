import ProposalsRepository from "../repositories/proposalsRepository.ts";

export class RejectProposalUseCase {
  private _proposalsRepository: ProposalsRepository;

  constructor(proposalsRepository: ProposalsRepository) {
    this._proposalsRepository = proposalsRepository;
  }

  public async rejectProposal(proposalId: number): Promise<void> {
    return this._proposalsRepository.rejectProposal(proposalId);
  }
}