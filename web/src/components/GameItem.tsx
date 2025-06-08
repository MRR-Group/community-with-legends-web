import Game from "../../../core/src/entities/game.ts";

interface GameItemProps {
  game: Game,
}

export default function GameItem({game}: GameItemProps) {
  return (
    <div className='max-w-56 sm:max-w-41 md:max-w-52 w-full'>
      <img src={game.cover} alt='Game Cover' className='rounded-2xl'/>
      <div className='text-xl text-center'>
        {game.name}
      </div>
    </div>
  )
}