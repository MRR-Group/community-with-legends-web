import Asset from "../entities/asset.ts";
import ImageAsset from "../entities/imageAsset.ts";
import VideoAsset from "../entities/videoAsset.ts";
import UnsupportedAssetTypeException from "../exceptions/unsupportedAssetTypeException.ts";

export default interface AssetDto {
    id: number,
    link: string,
    type: "Image" | "Video",
}

export function assetDtoToEntity(data: AssetDto):Asset {
    if (data.type === "Image") {
        return new ImageAsset(data.id, data.link);
    }
    else if (data.type === "Video") {
        return new VideoAsset(data.id, data.link);
    }

    throw new UnsupportedAssetTypeException(data.type);
}