import {Entity} from "./entity.ts";

export default abstract class Asset extends Entity {
  public readonly link: string;
  public readonly type: "Image" | "Video";

  protected constructor(id: number, link: string, type: "Image" | "Video") {
    super(id);

    this.link = link;
    this.type = type;
  }
}