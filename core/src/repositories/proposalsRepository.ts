import axios from "axios";
import Response from "../dto/response.ts";
import Proposal from "../entities/proposal.ts";
import ProposalDto, {proposalDtoToEntity} from "../dto/proposalDto.ts";

export default class ProposalsRepository {
  public async byId(proposalId: number):Promise<Proposal> {
    const response = await axios.get<Response<ProposalDto>>(`/api/proposals/${proposalId}`);
    const proposal = response.data.data;

    return proposalDtoToEntity(proposal);
  }

  public async byUser(userId: number):Promise<Proposal[]> {
    const response = await axios.get<Response<ProposalDto[]>>(`/api/users/${userId}/proposals`);
    const proposals = response.data.data.map((proposal) => proposalDtoToEntity(proposal));

    return proposals;
  }

  public async createProposal(receiverId: number, gameId: number): Promise<Proposal> {
    const response = await axios.post(`/api/users/${receiverId}/games/${gameId}/propose`);
    const proposal = await this.byId(response.data.id);

    return proposal;
  }

  public async deleteProposal(proposalId: number): Promise<void> {
    await axios.delete(`/api/proposals/${proposalId}`);
  }

  public async acceptProposal(proposalId: number): Promise<void> {
    await axios.post(`/api/proposals/${proposalId}/accept`);
  }

  public async rejectProposal(proposalId: number): Promise<void> {
    await axios.post(`/api/proposals/${proposalId}/reject`);
  }

  public async likeProposal(proposalId: number): Promise<void> {
    await axios.post(`/api/proposals/${proposalId}/like`);
  }

  public async dislikeProposal(proposalId: number): Promise<void> {
    await axios.post(`/api/proposals/${proposalId}/dislike`);
  }

  public async removeReactionToProposal(proposalId: number): Promise<void> {
    await axios.delete(`/api/proposals/${proposalId}/like`);
  }
}