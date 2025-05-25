interface ButtonProps {
    text: string,
}
export default function PostButtons({text}: ButtonProps) {
    return (
        <div className='p-1.5 bg-primary rounded-lg text-xs max-w-fit m-1'>
            {text}
        </div>
    )
}