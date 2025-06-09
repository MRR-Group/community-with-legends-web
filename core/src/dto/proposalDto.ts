import UserDto, {userDtoToEntity} from "./userDto.ts";
import GameDto, {gameDtoToEntity} from "./gameDto.ts";
import Proposal from "../entities/proposal.ts";

export default interface ProposalDto {
  id: number;
  user: UserDto;
  targetUser: UserDto;
  game: GameDto;
  status: "pending"|"accepted"|"rejected";
  created_at: Date;
  votes: number;
  user_vote: boolean;
  user_vote_type: number;
}

export function proposalDtoToEntity(data: ProposalDto): Proposal {
  const sender = userDtoToEntity(data.user);
  const receiver = userDtoToEntity(data.targetUser);
  const game = gameDtoToEntity(data.game);

  return new Proposal(data.id, sender, receiver, game, data.status, data.created_at, data.votes, data.user_vote, data.user_vote_type);
}