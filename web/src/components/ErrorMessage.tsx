import Show from "./Show.tsx";

interface ErrorMessageProps {
    errors: {[key: string]: string[]},
    category: string,
}

export default function ErrorMessage({errors, category}: ErrorMessageProps) {
    return(
        <Show when={category in errors}>
            <p className='text-error text-xs max-w-64 mt-1'>
                {errors[category]}
            </p>
        </Show>
    )
}