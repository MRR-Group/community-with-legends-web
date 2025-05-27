import PostModel from "../../../core/src/entities/post.ts";
import Show from "./Show.tsx";
import ReactionButton from "./ReactionButton.tsx";
import ReplyButton from "./ReplyButton.tsx";
import {useCore} from "../providers/coreProvider.tsx";
import {useEffect, useState} from "react";

interface PostProps {
    data: PostModel,
    onPostPreview?: () => void,
}

export default function Post({data, onPostPreview}: PostProps) {
    const { addReactionUseCase, removeReactionUseCase } = useCore();
    const [reactions, setReactions] = useState(data.reactions);
    const [clicked, setClicked] = useState(data.userReacted);

    useEffect(() => {
        setReactions(data.reactions);
        setClicked(data.userReacted);
    }, [data]);

    async function addReaction() {
        await addReactionUseCase.addReaction(data.id);
        setReactions(reactions + 1);
        setClicked(true);
    }

    async function removeReaction() {
        await removeReactionUseCase.removeReaction(data.id);
        setReactions(reactions - 1);
        setClicked(false);
    }

    async function handleReactionButtonClick() {
        if (clicked) {
            await removeReaction();
        }
        else {
            await addReaction();
        }
    }

    return(
        <div className='p-0.5 bg-gradient-to-b from-[#1E9AC8] to-[#8E2CFE] rounded-[10px] max-w-96 md:max-w-128'>
            <div className='flex flex-col gap-4 bg-background px-5 rounded-lg max-w-96 md:max-w-128 pb-2 relative box-border'>
                <div className='flex items-center'>
                    <img src={data.user.avatar} className='h-14 rounded-full' alt='User Avatar'/>
                    <div className='flex flex-col ml-4'>
                        <div className='text-xl hover:underline cursor-pointer'>
                            {data.user.name}
                        </div>

                        <Show when={data.game !== undefined}>
                            <div className='text-primary -mt-2'>
                                {data.game?.name}
                            </div>
                        </Show>

                        <div className='text-text-hover text-xs -mt-1'>
                            {data.createdAt.toDateString()}
                        </div>
                    </div>
                </div>

                <Show when={data.tags !== undefined && data.tags.length > 0}>
                    <div className='flex flex-wrap'>
                        {data.tags.map((tag) => (
                            <div className='p-1.5 bg-primary rounded-lg text-xs max-w-fit m-1'>
                                {tag.name}
                            </div>
                        ))}
                    </div>
                </Show>

                <div>
                    {data.content}
                </div>

                <div>
                    <ReactionButton text={`👍 x ${reactions}`} onClick={handleReactionButtonClick}/>
                </div>

                <div className='absolute -bottom-5 right-7' onClick={onPostPreview}>
                    <ReplyButton text={'Reply'}/>
                </div>
            </div>
        </div>
    )
}