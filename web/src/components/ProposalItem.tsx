import {User} from "../../../core/src/entities/user.ts";
import Game from "../../../core/src/entities/game.ts";
import GameItem from "./GameItem.tsx";
import Button from "./Button.tsx";
import Show from "./Show.tsx";
import {useAuth} from "../providers/authProvider.tsx";

interface ProposalItemProps {
  sender: User,
  receiver: User,
  game: Game,
  votes?: number,
  acceptProposal: () => void,
  rejectProposal: () => void,
  likeProposal: () => void,
  dislikeProposal: () => void,
  removeReaction: () => void,
  userReacted?: boolean,
}

export default function ProposalItem({sender, receiver, game, votes, acceptProposal, rejectProposal, likeProposal, dislikeProposal, removeReaction, userReacted}: ProposalItemProps) {
  const {loggedUser} = useAuth();

  return (
    <div>
      <div>
        <GameItem game={game}/>
      </div>
      <div>
        <div>
          Suggester:
        </div>
        <div>
          <Show when={loggedUser?.id === receiver.id}>
            <Button value='Accept' onClick={acceptProposal}/>
            <Button value='Reject' onClick={rejectProposal}/>
          </Show>
          <Show when={loggedUser?.id !== receiver.id && loggedUser?.id !== sender.id && !userReacted}>
            <Button value='Vote for' onClick={likeProposal}/>
            <Button value='Vote against' onClick={dislikeProposal}/>
          </Show>
          <Show when={loggedUser?.id !== receiver.id && loggedUser?.id !== sender.id && userReacted}>
            <Button value='Revoke vote' onClick={removeReaction}/>
          </Show>
        </div>
        <div>
          Votes: {votes}
        </div>
      </div>
      <div className='flex justify-center'>
        {sender.name}{sender.avatar}
      </div>
    </div>
  )
}