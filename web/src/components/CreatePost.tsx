import PostModel from "../../../core/src/entities/post.ts";
import {SubmitHandler, useForm} from "react-hook-form";
import Input from "./Input.tsx";
import {SelectFetch} from "react-select-fetch";
import {useState} from "react";
import GameDto from "../../../core/src/dto/gameDto.ts";
import TagDto from "../../../core/src/dto/tagDto.ts";
import AssetSelector, {Asset} from "./AssetSelector.tsx";
import Button from "./Button.tsx";
import {useTranslation} from "react-i18next";

export interface CreatePostForm {
    content: string,
}

export interface SubmitProp {
    content: string,
    gameId?: number,
    tags: number[],
    asset?: Asset,
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
    const [asset, setAsset] = useState<Asset>();
    const {t} = useTranslation('feedPage');

    const handleSubmitClick: SubmitHandler<CreatePostForm> = async(data) => {
        await onSubmit({
            content: data.content,
            gameId: selectedGame?.value,
            tags: selectedTags.map((tag) => tag.value),
            asset
        });

        reset();
        setGame(null);
        setSelectedTags([]);
        setAsset(undefined);
    };

    return(
        <div className='p-0.5 bg-gradient-to-b from-[#1E9AC8] to-[#8E2CFE] rounded-[10px] max-w-96 md:max-w-96 w-full'>
            <div className='flex flex-col gap-4 bg-background px-4 py-4 rounded-lg max-w-96 md:max-w-96 relative box-border w-full'>
                <form onSubmit={handleSubmit(handleSubmitClick)} className='flex gap-4 flex-col bg-background px-5 rounded-lg xs:min-w-80 w-full'>
                    <div className='flex flex-col gap-2'>
                        <Input
                            register={register}
                            errors={errors}
                            title={t('Create a post')}
                            type='text'
                            placeholder={t('Join the conversation!')}
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
                            placeholder={t('Select game')}
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
                            placeholder={t('Select tags')}
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

                    <AssetSelector onChange={setAsset} asset={asset} errors={errors}/>

                    </div>

                    <div className='flex justify-center w-full pt-1'>
                        <Button value={t('Submit')}/>
                    </div>
                </form>
            </div>
        </div>
    )
}