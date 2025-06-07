import {Entity} from "./entity.ts";

export default class Hardware extends Entity {
  public readonly title: string;
  public readonly value: string;

  public constructor(id: number, title: string, value: string) {
    super(id);

    this.title = title;
    this.value = value;
  }
}