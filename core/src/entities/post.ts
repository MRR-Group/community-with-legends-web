import {Entity} from "./entity.ts";
import {User} from "./user.ts";
import Game from "./game.ts";
import Tag from "./tag.ts";
import Asset from "./asset.ts";
import Comment from "./comment.ts";

export default class Post extends Entity {
  public readonly content: string;
  public readonly createdAt: Date;
  public readonly user: User;
  public readonly game?: Game;
  public readonly tags: Tag[];
  public readonly asset?: Asset;
  public readonly reactions: number;
  public readonly userReacted: boolean;
  public readonly comments: Comment[];

  public constructor(id: number, content: string, createdAt: Date, user: User, game: Game|undefined, tags: Tag[], asset: Asset|undefined, reactions: number, userReacted: boolean, comments: Comment[]) {
    super(id);

    this.content = content;
    this.createdAt = createdAt;
    this.user = user;
    this.game = game;
    this.tags = tags;
    this.asset = asset;
    this.reactions = reactions;
    this.userReacted = userReacted;
    this.comments = comments;
  }
}