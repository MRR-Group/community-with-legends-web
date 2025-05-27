import PostModel from "../../../core/src/entities/post.ts";
import {SubmitHandler, useForm} from "react-hook-form";
import Input from "./Input.tsx";

export type CreatePostForm = {
    content: string,
}

interface CreatePostFormProps {
    onSubmit: SubmitHandler<CreatePostForm>,
    errors: {[key: string]: string[]},
}

export default function CreatePost({onSubmit, errors}: CreatePostFormProps) {
    const { register, handleSubmit, reset } = useForm<PostModel>();

    const handleSubmitClick: SubmitHandler<CreatePostForm> = async(data) => {
        await onSubmit(data);
        reset();
    };

    return(
        <div className='p-0.5 bg-gradient-to-b from-[#1E9AC8] to-[#8E2CFE] rounded-[10px] max-w-96 md:max-w-128'>
            <div className='flex flex-col gap-4 bg-background px-5 rounded-lg max-w-96 md:max-w-128 pb-2 relative box-border'>
                <form onSubmit={handleSubmit(handleSubmitClick)} className='flex gap-4 flex-col bg-background px-5 rounded-lg min-w-80'>
                    <div className=''>
                        <Input
                            register={register}
                            errors={errors}
                            title='Create a post'
                            type='text'
                            placeholder='Join the conversation!'
                            name='content'
                        />
                    </div>

                    <div className='flex justify-center w-full pb-4 pt-1'>
                        <input className='p-0.5 bg-primary rounded-lg max-w-28 w-full text-xl cursor-pointer' type='submit' value='Submit'/>
                    </div>
                </form>
            </div>
        </div>
    )
}