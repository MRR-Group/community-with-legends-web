import PostModel from "../../../core/src/entities/post.ts";
import {SubmitHandler, useForm} from "react-hook-form";
import Input from "./Input.tsx";
import {SelectFetch} from "react-select-fetch";
import {useState} from "react";
import GameDto from "../../../core/src/dto/gameDto.ts";
import TagDto from "../../../core/src/dto/tagDto.ts";

export interface CreatePostForm {
    content: string,
}

export interface SubmitProp {
    content: string,
    gameId?: number,
    tags: number[],
}

interface CreatePostFormProps {
    onSubmit: (props: SubmitProp) => Promise<void>,
    errors: {[key: string]: string[]},
}

interface SelectElement {
    value: number,
    label: string,
}

export default function CreatePost({onSubmit, errors}: CreatePostFormProps) {
    const { register, handleSubmit, reset } = useForm<PostModel>();
    const [selectedGame, setGame] = useState<SelectElement|null>(null);
    const [selectedTags, setSelectedTags] = useState<readonly SelectElement[]>([]);

    const handleSubmitClick: SubmitHandler<CreatePostForm> = async(data) => {
        await onSubmit({content: data.content, gameId: selectedGame?.value, tags: selectedTags.map((tag) => tag.value)});
        reset();
        setGame(null);
        setSelectedTags([]);
    };

    return(
        <div className='p-0.5 bg-gradient-to-b from-[#1E9AC8] to-[#8E2CFE] rounded-[10px] max-w-96 md:max-w-128'>
            <div className='flex flex-col gap-4 bg-background px-5 rounded-lg max-w-96 md:max-w-128 relative box-border'>
                <form onSubmit={handleSubmit(handleSubmitClick)} className='flex gap-4 flex-col bg-background px-5 rounded-lg xs:min-w-80'>
                    <div className='flex flex-col gap-2'>
                        <Input
                            register={register}
                            errors={errors}
                            title='Create a post'
                            type='text'
                            placeholder='Join the conversation!'
                            name='content'
                        />

                        <SelectFetch
                            styles={{
                                control: (styles) => ({...styles, backgroundColor: '#212023', color: '#FFF', border: 'none', boxShadow: 'none'}),
                                option: (styles) => ({...styles, backgroundColor: '#212023', color: '#FFF'}),
                                placeholder: (styles) => ({...styles, color: '#8e8f90' , fontSize: '14px', fontWeight: '400'}),
                                singleValue: (styles) => ({...styles, color: '#FFF'}),
                                input: (styles) => ({...styles, color: '#FFF'}),
                                loadingMessage: (styles) => ({...styles, backgroundColor: '#212023', color: '#FFF'}),
                            }}
                            className='text-text bg-background'
                            placeholder='Select game'
                            url="/api/games/search"
                            value={selectedGame}
                            onChange={setGame}
                            mapResponse={(response: any) => ({
                                options: response.data.map((game: GameDto) => ({
                                    value: game.id,
                                    label: game.name,
                                })),
                                hasMore: response.links.next !== null,
                            })}
                            queryParams={{
                                limit: 10
                            }}
                        />

                        <SelectFetch
                            styles={{
                                control: (styles) => ({...styles, backgroundColor: '#212023', color: '#FFF', border: 'none', boxShadow: 'none'}),
                                option: (styles) => ({...styles, backgroundColor: '#212023', color: '#FFF'}),
                                placeholder: (styles) => ({...styles, color: '#8e8f90', fontSize: '14px', fontWeight: '400'}),
                                singleValue: (styles) => ({...styles, color: '#FFF'}),
                                input: (styles) => ({...styles, color: '#FFF'}),
                                loadingMessage: (styles) => ({...styles, backgroundColor: '#212023', color: '#FFF'}),
                                multiValue: (styles) => ({...styles, backgroundColor: '#8E2CFE'}),
                                multiValueLabel: (styles) => ({...styles, color: '#FFF'}),
                            }}
                            isMulti={true}
                            className='text-text bg-background'
                            placeholder='Select tags'
                            url="/api/tags/search"
                            value={selectedTags}
                            onChange={setSelectedTags}
                            mapResponse={(response: any) => ({
                                options: response.data.map((tag: TagDto) => ({
                                    value: tag.id,
                                    label: tag.name,
                                })),
                                hasMore: false,
                            })}
                        />

                    </div>

                    <div className='flex justify-center w-full pb-4 pt-1'>
                        <input className='p-0.5 bg-primary rounded-lg max-w-28 w-full text-xl cursor-pointer hover:bg-primary-hover hover:scale-110 active:scale-90 transition-transform' type='submit' value='Submit'/>
                    </div>
                </form>
            </div>
        </div>
    )
}