import ProposalsRepository from "../repositories/proposalsRepository.ts";

export class DeleteProposalUseCase {
  private _proposalsRepository: ProposalsRepository;

  constructor(proposalsRepository: ProposalsRepository) {
    this._proposalsRepository = proposalsRepository;
  }

  public async deleteProposal(proposalId: number): Promise<void> {
    return this._proposalsRepository.deleteProposal(proposalId);
  }
}