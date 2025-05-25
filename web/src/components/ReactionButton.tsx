interface ReactionButtonProps {
    text: string,
}
export default function ReactionButton({text}: ReactionButtonProps) {
    return (
        <div className='p-2 bg-primary rounded-lg text-xs max-w-fit m-1 cursor-pointer'>
            {text}
        </div>
    )
}