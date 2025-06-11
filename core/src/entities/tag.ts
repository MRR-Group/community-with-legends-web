import {Entity} from "./entity.ts";

export default class Tag extends Entity {
  public readonly name: string;

  public constructor(id: number, name: string) {
    super(id);

    this.name = name;
  }
}