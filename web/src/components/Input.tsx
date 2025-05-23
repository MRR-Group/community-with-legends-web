import ErrorMessage from "./ErrorMessage.tsx";
import {UseFormRegister} from "react-hook-form";

interface InputProps {
    register: UseFormRegister<any>,
    errors: {[key: string]: string[]},
    title: string,
    placeholder: string,
    type: "text" | "email" | "password",
    name: string,
}

export default function Input({register, errors, title, placeholder, type, name}: InputProps) {
    return (
        <label className='flex flex-col text-xl'>
            {title}
            <input className='bg-background-light rounded text-sm p-2 outline-none mt-2'
                   placeholder={placeholder} type={type} {...register(name)}/>
            <ErrorMessage errors={errors} category={name}/>
        </label>
    )
}