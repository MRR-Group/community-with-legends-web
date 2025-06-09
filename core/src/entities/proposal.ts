import {Entity} from "./entity.ts";
import {User} from "./user.ts";
import Game from "./game.ts";

export default class Proposal extends Entity {
  public readonly sender: User;
  public readonly receiver: User;
  public readonly game: Game;
  public readonly status: "pending"|"accepted"|"rejected";
  public readonly created_at: Date;
  public readonly votes: number;
  public readonly user_vote: boolean;
  public readonly user_vote_type: number;

  public constructor(id: number, sender: User, receiver: User, game: Game, status: "pending"|"accepted"|"rejected", created_at: Date, votes: number, user_vote: boolean, user_vote_type: number) {
    super(id);

    this.sender = sender;
    this.receiver = receiver;
    this.game = game;
    this.status = status;
    this.created_at = created_at;
    this.votes = votes;
    this.user_vote = user_vote;
    this.user_vote_type = user_vote_type;
  }
}