import Asset from "./asset.ts";

export default class VideoAsset extends Asset {

  public constructor(id: number, link: string) {
    super(id, link, "Video");
  }
}