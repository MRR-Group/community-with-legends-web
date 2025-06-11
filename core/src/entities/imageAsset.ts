import Asset from "./asset.ts";

export default class ImageAsset extends Asset {

  public constructor(id: number, link: string) {
    super(id, link, "Image");
  }
}