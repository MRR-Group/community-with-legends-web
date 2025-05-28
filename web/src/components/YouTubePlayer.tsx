import ReactPlayer from "react-player";
import {useWindowSize} from "react-use";
import {useMemo} from "react";

interface YouTubePlayerProps {
    url?: string,
}

const MD_YT_WIDTH = 470;

const SM_YT_WIDTH = 340;

const TAILWIND_MD = 768;

const TAILWIND_SM = 430;

const PADDING = 90;


const YT_SIZE = {
    width: 320,
    height: 180,
};

function calculateYtHeight(width: number) {
    return width * YT_SIZE.height / YT_SIZE.width;
}

function toPx(value: number) {
    return `${value}px`;
}

export default function YouTubePlayer({url}:YouTubePlayerProps) {
    const screen = useWindowSize();

    const size = useMemo(() => {
        if (screen.width >= TAILWIND_MD) {
            return {
                width: MD_YT_WIDTH,
                height: calculateYtHeight(MD_YT_WIDTH),
            }
        }

        if (screen.width >= TAILWIND_SM) {
            return {
                width: SM_YT_WIDTH,
                height: calculateYtHeight(SM_YT_WIDTH),
            }
        }

        return {
            width: screen.width - PADDING,
            height: calculateYtHeight(screen.width - PADDING),
        }
    }, [screen]);

    return (
        <ReactPlayer url={url} width={toPx(size.width)} height={toPx(size.height)}/>
    )
}