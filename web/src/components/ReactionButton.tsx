interface ReactionButtonProps {
    text: string,
    onClick: () => void,
}

export default function ReactionButton({text, onClick}: ReactionButtonProps) {
    return (
        <div className='p-2 bg-primary rounded-lg text-xs max-w-fit m-1 cursor-pointer' onClick={onClick}>
            {text}
        </div>
    )
}