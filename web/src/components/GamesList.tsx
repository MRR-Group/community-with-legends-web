import GameOnList from "../../../core/src/entities/gameOnList.ts";
import EditButton from "./EditButton.tsx";
import GameItem from "./GameItem.tsx";
import Show from "./Show.tsx";

interface GamesListProps {
  listName: string,
  listType: 'to_play'|'playing'|'played',
  games: GameOnList[],
  canEdit: boolean,
}

export default function GamesList({listName, listType, games, canEdit}: GamesListProps) {
  return (
    <div className='max-w-96 md:max-w-128 mx-auto'>
      <div className='p-0.5 bg-gradient-to-b from-[#1E9AC8] to-[#8E2CFE] rounded-[10px]'>
        <div className='relative flex gap-4 bg-background rounded-lg max-w-96 md:min-w-96 md:max-w-128 pb-4 pt-4 items-center box-border'>
          <div className='flex justify-evenly text-3xl w-full'>
            {listName}
          </div>
          <div className='absolute flex right-4'>
            <Show when={canEdit}>
              <EditButton/>
            </Show>
          </div>
        </div>
      </div>
      <div className='flex flex-wrap gap-4 justify-evenly max-w-96 md:min-w-96 md:max-w-128 pt-3'>
        {games.filter((item) => item.status === listType).map((item) => (
          <GameItem key={item.id} game={item.game}/>
        ))}
      </div>
    </div>
  )
}