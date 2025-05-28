import ErrorMessage from "./ErrorMessage.tsx";
import {UseFormRegister} from "react-hook-form";
import {ChangeEvent} from "react";

interface InputProps {
    register?: UseFormRegister<any>,
    errors: {[key: string]: string[]},
    title?: string,
    placeholder: string,
    type: "text" | "email" | "password",
    name: string,
    onChange?: (value: string) => void,
    value?: string,
}

export default function Input({register, errors, title, placeholder, type, name, onChange, value}: InputProps) {
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        if (onChange !== undefined) {
            onChange(e.target.value);
        }
    }

    return (
        <label className='flex flex-col text-xl'>
            {title}
            <input
                className='bg-background-light rounded text-sm p-2 outline-none mt-2'
                placeholder={placeholder}
                type={type}
                onChange={handleChange}
                value={value}
                {...(register ? register(name) as any : {})}
            />
            <ErrorMessage errors={errors} category={name}/>
        </label>
    )
}