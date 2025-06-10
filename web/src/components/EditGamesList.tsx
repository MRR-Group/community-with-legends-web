import GameOnList from "../../../core/src/entities/gameOnList.ts";
import Button from "./Button.tsx";
import GameDto from "../../../core/src/dto/gameDto.ts";
import {SelectFetch} from "react-select-fetch";
import {useState} from "react";
import ErrorMessage from "./ErrorMessage.tsx";
import {useTranslation} from "react-i18next";

interface EditGamesListProps {
  games: GameOnList[],
  errors: { [p: string]: string[] },
  onAdd: (id?: number) => void,
  onDelete: (id: number) => void,
  onDone: () => void,
  listName: string,
}

interface SelectElement {
  value: number,
  label: string,
}

export default function EditGamesList({games, errors, onAdd, onDelete, onDone, listName}: EditGamesListProps) {
  const [selectedGame, setGame] = useState<SelectElement|null>(null);
  const {t} = useTranslation('profilePage');

  async function handleAddGame() {
    setGame(null);
    onAdd(selectedGame?.value);
  }

  async function handleRemoveGame(id: number) {
    onDelete(id);
  }

  async function handleCloseEdit() {
    onDone();
  }

  return (
    <div className='p-0.5 bg-gradient-to-b from-[#1E9AC8] to-[#8E2CFE] rounded-[10px] max-w-96 md:max-w-128 mx-auto w-full h-fit'>
      <div className='flex flex-col relative gap-4 bg-background rounded-lg max-w-96 md:min-w-96 md:max-w-128 pb-4 pt-4 items-center box-border h-fit'>
        <div className='flex justify-evenly text-3xl w-full'>
          {listName}
        </div>
        <div className='w-full'>
          {games.map((item) => (
            <div key={item.id} className='flex justify-between gap-4 pb-4 px-4'>
              <div className='text-xl text-left text-wrap'>
                {item.game.name}
              </div>
              <div className='flex items-center'>
                <Button value={t('Remove')} onClick={() => handleRemoveGame(item.id)}/>
              </div>
            </div>
          ))}
        </div>
        <div className='flex flex-col items-center w-full px-4'>
          <SelectFetch
            styles={{
              control: (styles) => ({...styles, backgroundColor: '#212023', color: '#FFF', border: 'none', boxShadow: 'none'}),
              option: (styles) => ({...styles, backgroundColor: '#212023', color: '#FFF'}),
              placeholder: (styles) => ({...styles, color: '#8e8f90' , fontSize: '14px', fontWeight: '400'}),
              singleValue: (styles) => ({...styles, color: '#FFF'}),
              input: (styles) => ({...styles, color: '#FFF'}),
              loadingMessage: (styles) => ({...styles, backgroundColor: '#212023', color: '#FFF'}),
            }}
            className='text-text bg-background w-full'
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
          <ErrorMessage errors={errors} category="game_id"/>
          <div className='pt-3'>
            <Button value={t('Add game')} onClick={handleAddGame}/>
          </div>
          <div className='pt-3 pb-2'>
            <Button value={t('Done')} onClick={handleCloseEdit}/>
          </div>
        </div>
      </div>
    </div>
  )
}