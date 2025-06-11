import {Entity} from "./entity.ts";
import {User} from "./user.ts";

export default class Comment extends Entity {
  public readonly content: string;
  public readonly createdAt: Date;
  public readonly user: User;

  public constructor(id: number, content: string, createdAt: Date, user: User) {
    super(id);

    this.content = content;
    this.createdAt = createdAt;
    this.user = user;
  }
}