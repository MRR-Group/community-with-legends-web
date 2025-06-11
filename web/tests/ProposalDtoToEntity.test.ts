import { describe, it, expect } from 'vitest';
import Proposal from '../../core/src/entities/proposal';
import {User} from '../../core/src/entities/user';
import Game from '../../core/src/entities/game';
import ProposalDto, { proposalDtoToEntity } from '../../core/src/dto/proposalDto';

describe('proposalDtoToEntity', () => {
  it('should correctly map ProposalDto to Proposal entity', () => {
    const dto: ProposalDto = {
      id: 123,
      user: {
        id: 1,
        name: 'SenderUser',
        email: 'sender@example.com',
        avatar: 'sender.png',
        permissions: ['makeComment'],
        hasPassword: true,
        hasTwitchAccount: false,
      },
      targetUser: {
        id: 2,
        name: 'ReceiverUser',
        email: 'receiver@example.com',
        avatar: 'receiver.png',
        permissions: ['viewUsers'],
        hasPassword: false,
        hasTwitchAccount: true,
      },
      game: {
        id: 10,
        name: 'Game Name',
        cover: 'http://example.com/game-cover.jpg',
      },
      status: 'pending',
      created_at: new Date('2025-06-11T10:00:00Z'),
      votes: 5,
      user_vote: true,
      user_vote_type: 1,
    };

    const proposal = proposalDtoToEntity(dto);

    expect(proposal).toBeInstanceOf(Proposal);
    expect(proposal.id).toBe(dto.id);

    expect(proposal.sender).toBeInstanceOf(User);
    expect(proposal.sender.id).toBe(dto.user.id);
    expect(proposal.sender.name).toBe(dto.user.name);
    expect(proposal.sender.email.value).toBe(dto.user.email);

    expect(proposal.receiver).toBeInstanceOf(User);
    expect(proposal.receiver.id).toBe(dto.targetUser.id);
    expect(proposal.receiver.name).toBe(dto.targetUser.name);
    expect(proposal.receiver.email.value).toBe(dto.targetUser.email);

    expect(proposal.game).toBeInstanceOf(Game);
    expect(proposal.game.id).toBe(dto.game.id);
    expect(proposal.game.name).toBe(dto.game.name);
    expect(proposal.game.cover).toBe(dto.game.cover);

    expect(proposal.status).toBe(dto.status);
    expect(proposal.created_at.toISOString()).toBe(dto.created_at.toISOString());
    expect(proposal.votes).toBe(dto.votes);
    expect(proposal.user_vote).toBe(dto.user_vote);
    expect(proposal.user_vote_type).toBe(dto.user_vote_type);
  });
});
