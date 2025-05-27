import {useCore} from "../providers/coreProvider.tsx";

interface ReactionButtonProps {
    text: string,
    hasReacted: boolean,
    postId: number,
}

export default function ReactionButton({text, hasReacted, postId}: ReactionButtonProps) {
    const {addReactionUseCase, removeReactionUseCase} = useCore();

    function useReaction() {
        if (hasReacted) {
            removeReactionUseCase.removeReaction(postId);
        }
        else {
            addReactionUseCase.addReaction(postId);
        }
    }

    return (
        <div className='p-2 bg-primary rounded-lg text-xs max-w-fit m-1 cursor-pointer' onClick={useReaction}>
            {text}
        </div>
    )
}