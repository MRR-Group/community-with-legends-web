import ToggleButton from "./ToggleButton.tsx";
import Show from "./Show.tsx";
import Input from "./Input.tsx";

interface AssetSelectorProps {
    asset?: Asset,
    onChange: (value?: Asset) => void,
    errors: {[key: string]: string[]},
}

export interface Asset {
    type: 'image'|'video',
    value: string,
}

export default function AssetSelector({onChange, asset, errors}: AssetSelectorProps) {
    function setSelectedType(type: undefined|'video'|'image') {
        if (type === undefined) {
            onChange(undefined);
        }
        else {
            onChange({type: type, value: asset?.value ?? ''});
        }
    }

    function setTypeValue(value: string) {
        if (asset?.type !== undefined) {
            onChange({type: asset.type, value});
        }
    }

    return (
        <div>
            <div className='flex justify-between'>
                <ToggleButton isClicked={asset?.type === 'image'} onClick={() => setSelectedType('image')}>
                    Image
                </ToggleButton>
                <ToggleButton isClicked={asset?.type === 'video'} onClick={() => setSelectedType('video')}>
                    Video
                </ToggleButton>
                <ToggleButton isClicked={asset?.type === undefined} onClick={() => setSelectedType(undefined)}>
                    None
                </ToggleButton>
            </div>
            <Show when={asset?.type !== undefined}>
                <Input
                    errors={errors}
                    type='text'
                    placeholder='Add link'
                    name='content'
                    onChange={setTypeValue}
                    value={asset?.value}
                />
            </Show>
        </div>
    )
}