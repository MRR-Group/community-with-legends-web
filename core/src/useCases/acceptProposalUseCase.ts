import ProposalsRepository from "../repositories/proposalsRepository.ts";

export class AcceptProposalUseCase {
  private _proposalsRepository: ProposalsRepository;

  constructor(proposalsRepository: ProposalsRepository) {
    this._proposalsRepository = proposalsRepository;
  }

  public async acceptProposal(proposalId: number): Promise<void> {
    return this._proposalsRepository.acceptProposal(proposalId);
  }
}