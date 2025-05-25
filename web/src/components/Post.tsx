import PostModel from "../../../core/src/entities/post.ts";
import Show from "./Show.tsx";
import ReactionButton from "./ReactionButton.tsx";
import ReplyButton from "./ReplyButton.tsx";

interface PostProps {
    data: PostModel,
}

export default function Post({data}: PostProps) {
    return(
        <div className='p-0.5 bg-gradient-to-b from-[#1E9AC8] to-[#8E2CFE] rounded-[10px] max-w-64 md:max-w-128'>
            <div className='flex flex-col gap-4 bg-background px-5 rounded-lg max-w-64 md:max-w-128 pb-2 relative box-border'>
                <div className='flex items-center'>
                    <img src={data.user.avatar} className='h-14 rounded-full'/>
                    <div className='flex flex-col ml-4'>
                        <div className='text-xl'>
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

                <div className=''>
                    {data.content}
                </div>

                <div>
                    <ReactionButton text={`👍 x ${data.reactions}`}/>
                </div>

                <div className='absolute -bottom-5 right-7'>
                    <ReplyButton text={'Reply'}/>
                </div>
            </div>
        </div>
    )
}