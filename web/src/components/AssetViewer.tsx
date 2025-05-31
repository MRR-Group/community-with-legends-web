import Asset from "../../../core/src/entities/asset.ts";
import VideoAsset from "../../../core/src/entities/videoAsset.ts";
import ImageAsset from "../../../core/src/entities/imageAsset.ts";
import YouTubePlayer from "./YouTubePlayer.tsx";

interface AssetViewerProps {
     asset?: Asset,
}

export default function AssetViewer({asset}:AssetViewerProps) {
    if (asset instanceof VideoAsset) {
        return (
            <YouTubePlayer url={asset.link}/>
        )
    }

    else if (asset instanceof ImageAsset) {
        return (
            <img src={asset.link} alt='Post Image' className='max-h-[620px] md:max-w-[430px] mx-auto'/>
        )
    }

    else {
        return null;
    }
}