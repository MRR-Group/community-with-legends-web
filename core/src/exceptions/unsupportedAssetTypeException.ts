import CustomException from "./customException.ts";

export default class UnsupportedAssetTypeException extends CustomException {
  public constructor(type: string) {
    super(`Unsupported asset type: ${type}`);
  }
}