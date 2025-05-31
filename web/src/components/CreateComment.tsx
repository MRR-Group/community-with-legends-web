import PostModel from "../../../core/src/entities/post.ts";
import {SubmitHandler, useForm} from "react-hook-form";
import Input from "./Input.tsx";

export interface CreateCommentForm {
    content: string,
}

interface CreateCommentFormProps {
    onSubmit: (content: string) => Promise<void>,
    errors: {[key: string]: string[]},
}

export default function CreateComment({onSubmit, errors}: CreateCommentFormProps) {
    const { register, handleSubmit, reset } = useForm<PostModel>();

    const handleSubmitClick: SubmitHandler<CreateCommentForm> = async(data) => {
        await onSubmit(data.content);

        reset();
    };

    return(
        <div className='p-0.5 bg-gradient-to-b from-[#1E9AC8] to-[#8E2CFE] rounded-[10px] max-w-96 md:max-w-128'>
            <div className='flex flex-col gap-4 bg-background px-4 py-4 rounded-lg max-w-96 md:min-w-96 md:max-w-128 relative box-border'>
                <form onSubmit={handleSubmit(handleSubmitClick)} className='flex gap-4 flex-col bg-background px-5 rounded-lg xs:min-w-80'>
                    <div className='flex flex-col gap-2'>
                        <Input
                            register={register}
                            errors={errors}
                            title='Create a comment'
                            type='text'
                            placeholder='Join the conversation!'
                            name='content'
                        />
                    </div>

                    <div className='flex justify-center w-full pt-1'>
                        <input className='p-0.5 bg-primary rounded-lg max-w-28 w-full text-xl cursor-pointer hover:bg-primary-hover hover:scale-110 active:scale-90 transition-transform' type='submit' value='Comment'/>
                    </div>
                </form>
            </div>
        </div>
    )
}